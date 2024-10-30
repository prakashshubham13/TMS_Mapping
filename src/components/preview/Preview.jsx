import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMapping } from '../../redux/tmsMappingSlice';
import Notes from '../notes/Notes';
import MultiPagePDF from '../pdf/MultiPagePDF';

const Preview = ({ data, index }) => {
  const screens = useSelector((state) => state.tmsScreen);
  const selectedItem = useSelector(state => state?.tmsPreview?.previewData);
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const [new_modified_img, setNewModifiedImg] = useState(null); // State to store the base64-encoded SVG
  const [notesList, setNotesList] = useState([]);
  useEffect(() => {
    setRectangles([]);
    setNotesList([]);
  }, [data, screens]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
  };

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
    }
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
    <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 20vh)', padding: '0.4rem 0.8rem', overflowY:'hidden' }}>
      <div style={{ flex: '1', background: '#fff' }}>
    
        <button style={{padding:'0.4rem 0.8rem',fontWeight:'700',color:'rgba(0,0,0,0.6)',borderRadius:'0.2rem0',transform:'translateY(-0.6rem)',cursor:'pointer'}} onClick={() => {
            saveSvgAsBase64();
            dispatch(addNewMapping({ category: selectedItem, screen: data.screen, newLocation: rectangles, index: index, notes: notesList, modifiedImg: saveSvgAsBase64() }))
            setNotesList([]);
            }}>
         {/* {Boolean(rectangles.length>0 || notesList.length>0) &&  'unsaved changes'}  */}
         Save
        </button>
        <div style={{ overflow: 'auto', margin: 'auto', width: '60vw', height: '100%', padding: '0.4rem 0.8rem' }}>
          <svg
            ref={svgRef}
            id="svg-canvas"
            width="1000" // Ensuring width/height are consistent
            height="600"
            style={{ border: '1px solid black', background: '#fff', margin: 'auto' }}
            onMouseDown={startDrawing}
            onMouseMove={drawRectangle}
            onMouseUp={stopDrawing}
          >
            {screens[data.screen]?.[data.image]?.image && (
              <image ref={canvasRef} href={screens[data.screen][data.image].image} width="1000" height="600" />
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
                  fill="blue"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div style={{ flex: '1', background: '#fff' }}>
        <Notes notesList={[...data.notes, ...notesList]} addNoteList={val=>{
            console.log('--------------******************',val);
            
            setNotesList(prev=>([...prev,val]))}}/>
      </div>

    </div>
  );
};

export default Preview;
