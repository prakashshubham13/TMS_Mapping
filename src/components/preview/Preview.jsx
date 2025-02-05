import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewMapping, addNotes, deleteOldMapping } from "../../redux/tmsMappingSlice";
import XpathNotes from "../notes/Notes";
import MultiPagePDF from "../pdf/MultiPagePDF";
import AllNotes from "../notes/AllNotes";
import Popup from "./Popup";

const Preview = ({ data, index }) => {
  const screens = useSelector((state) => state.tmsScreen);
  const selectedItem = useSelector((state) => state?.tmsPreview?.previewData);
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [modal, toggleModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const [new_modified_img, setNewModifiedImg] = useState(null); // State to store the base64-encoded SVG
  const [notesList, setNotesList] = useState([]);
  const [ibgNotesList, setIbgNotesList] = useState([]);
  useEffect(() => {
    setRectangles([]);
    setNotesList([]);
  }, [data, screens]);

  useEffect(() => {
    console.log("***ERRER(R@#R#@R@#E",ibgNotesList,notesList);
    
    if (notesList.length === 0 && ibgNotesList.length === 0) return;
    saveFn();
    setNotesList([]);
    setIbgNotesList([]);
  }, [notesList,ibgNotesList]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
  };

  const saveFn = () => {
    console.log("-----------------------------------------save",ibgNotesList);

    saveSvgAsBase64();
    dispatch(
      addNewMapping({
        category: selectedItem,
        screen: data.screen,
        newLocation: rectangles,
        index: index,
        notes: notesList,
        ibgNotes: ibgNotesList,
        modifiedImg: saveSvgAsBase64(),
      })
    );
    // setNotesList([]);
  };

  useEffect(() => {}, []);

  const drawRectangle = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const width = mouseX - startX;
    const height = mouseY - startY;
    const newRect = { x: startX, y: startY, width, height };

    setRectangles((prev) => {
      const updatedRects = prev.slice(0, -1);
      return [...updatedRects, newRect];
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (rectangles.length > 0) {
      const newRect = rectangles[rectangles.length - 1];
      setRectangles((prev) => [...prev, newRect]);
      saveFn();
    }
  };

  const deleteRect = async () => {
    console.log("delete trigger", selectedIndex);
    console.log(data.location);

    await dispatch(
      deleteOldMapping({
        category: selectedItem,
        index: index,
        deleteIndex: selectedIndex - 1,
      })
    );

    saveFn();
  };

  const saveSvgAsBase64 = () => {
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const base64Svg = btoa(svgString);
    return `data:image/svg+xml;base64,${base64Svg}`;
    console.log("Base64 SVG:", new_modified_img); // Log to confirm
  };

  return (
    <>
      <div>{selectedIndex}</div>
      {modal && (
        <Popup
          onClose={() => toggleModal(false)}
          onSave={(note)=>{
            console.log(note+"-----------------------");
            
            dispatch(addNotes( {category: selectedItem, index:index, selectedIndex:selectedIndex - 1, noteType:"", note:note}));
          }}
          data={data}
          index={index}
          selectedItem={selectedItem}
          selectedIndex={selectedIndex}
          deleteRect={deleteRect}
        />
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 20vh)",
          padding: "0.4rem 0.8rem",
          overflowY: "hidden",
        }}
      >
        <div style={{ flex: "1", background: "#fff" }}>
          <div
            style={{
              overflow: "auto",
              margin: "auto",
              width: "60vw",
              height: "100%",
              padding: "0.4rem 0.8rem",
            }}
          >
            <svg
              ref={svgRef}
              id="svg-canvas"
              width="1000" // Ensuring width/height are consistent
              height="600"
              style={{
                border: "1px solid black",
                background: "#fff",
                margin: "auto",
              }}
              onMouseDown={startDrawing}
              onMouseMove={drawRectangle}
              onMouseUp={stopDrawing}
            >
              {screens[data.screen]?.[data.image]?.image && (
                <image
                  ref={canvasRef}
                  href={screens[data.screen][data.image].image}
                  width="1000"
                  height="600"
                />
              )}
              {[...data.location, ...rectangles].map((rect, index) => (
                <g key={index}>
                  <rect
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={rect.height}
                    fill="rgba(0,0,0,0.1)"
                    stroke="crimson"
                    strokeWidth="1"
                  />
                  <circle
                    cx={rect.x + rect.width}
                    cy={rect.y + rect.height}
                    r={5}
                    fill="red"
                    style={{ pointerEvents: "all", cursor:'pointer' }}
                    onClick={() => {
                      setSelectedIndex(index + 1);
                      toggleModal(true);
                    }}
                    // onDoubleClick={(e)=>{
                    //   e.preventDefault();
                    //   e.stopPropagation();
                    //   console.log("delete"+index);
                    //   deleteRect(index);
                    // }}
                  />
                  <rect
                    x={rect.x - 20}
                    y={rect.y - 5} // Adjust y to position background above the rectangle
                    width={20} // Adjust width based on text length if needed
                    height={15} // Adjust height for padding
                    fill="white" // Background color
                    stroke="black" // Optional border
                    strokeWidth="1"
                    rx="3" // Rounded corners
                    ry="3"
                  />

                  {/* Text Element */}
                  <text
                    x={rect.x - 15}
                    y={rect.y - 2}
                    fontSize="12"
                    fill="black"
                    textAnchor="start"
                    dominantBaseline="hanging"
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  >
                    {index + 1}
                  </text>

                  {/* Delete Bin Icon (SVG)
    <svg
      x={rect.x + rect.width - 10} // Position on top-right of rectangle
      y={rect.y - 10}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="red"
      cursor="pointer"
      onClick={() => {
        setRectangles((prev) => prev.filter((_, i) => i !== index));
      }}
    >
      <path d="M3 6h18v2H3V6zm2 4h14v12H5V10zm5 2v8H8v-8h2zm4 0v8h-2v-8h2zm4 0v8h-2v-8h2z" />
    </svg> */}
                </g>
              ))}
            </svg>
          </div>
        </div>
        <div style={{ flex: "1", background: "#fff", width: "10vw" }}>
          <AllNotes
            notesList={[...data.notes, ...notesList]}
            addNoteList={(val) => {
              console.log("--------------******************", val);

              setNotesList((prev) => [...prev, val]);
            }}
            ibgNotesList={[...data.ibgNotes]}
            addIbgNoteList={(val) => {
              console.log("--------------******************", val);
              setIbgNotesList(JSON.parse(JSON.stringify(val)));
            }}
            selectedItem={selectedItem}
            index={index}
          />
        </div>
      </div>
    </>
  );
};

export default Preview;
