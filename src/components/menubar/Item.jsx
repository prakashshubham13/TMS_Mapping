import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPreviewData, changeCurrentStep } from "../../redux/tmsPreviewSlice";
import Preview from "../preview/Preview";
import { addnewEntry, deleteEntry } from "../../redux/tmsMappingSlice";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Item = ({ name, data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state?.tmsPreview?.previewData);
  const tmsScreen = useSelector((state) => state?.tmsScreen);
  const currentStep = useSelector(state => state.tmsPreview.currentStep);

  console.log("tmsScreen-------", tmsScreen);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selecteImage, setSelectedImage] = useState(0);
  useEffect(() => {
    Object.keys(tmsScreen).forEach((data) => {
      console.log(data, "------------------", Boolean(tmsScreen[data].length));

      if (tmsScreen[data].length) {
        setSelectedScreen(data);
      }
    });

    return () => {};
  }, []);

  const [show, toggleShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoverValue, setHovervalue] = useState(null);



//   const saveSvgAsBase64 = () => {
//     const svg = svgRef.current;
//     const serializer = new XMLSerializer();
//     const svgString = serializer.serializeToString(svg);
//     const base64Svg = btoa(svgString);
//     return `data:image/svg+xml;base64,${base64Svg}`;
// };




  return (
    <div
      style={{ borderBottom: "0.1rem solid #000", padding: "0.6rem 0.5rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.2rem 0.4rem",
          fontSize: "1.2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "900",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          {" "}
          {name}
        </h2>
        <div
          onClick={() =>
            dispatch(addPreviewData(selectedItem === name ? null : name))
          }
        >
          {" "}
          {selectedItem !== name ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>


      {selectedItem === name && (
        <div>
          {show &&
            createPortal(
              <div>
                <img
                  src={tmsScreen?.[selectedScreen]?.[hoverValue]?.image}
                  alt=""
                  style={{ width: "50vw", height: "50vh",zIndex:'99' }}
                />
              </div>,
              document.getElementById("popup")
            )}

          {data.map((value, index) => (
            <div
            onClick={()=>{
              dispatch(changeCurrentStep(index + 1))
            }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0.4rem",
                border: "0.1rem solid #000",
                margin: "0.2rem 0.3rem",
                alignItems:'center'
              }}
            >
              <div style={{background:currentStep - 1 === index ? 'lightgreen' : ''}}>
                {name} {index + 1} ___ {value.screen}
              </div>
              <div onClick={(e)=>{
                e.stopPropagation();
                dispatch(deleteEntry({category:name,index}))}} style={{cursor:'pointer'}}><MdDeleteOutline/></div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 0.4rem",
              border: "0.1rem solid #000",
              margin: "0.2rem 0.3rem",
              alignItems: "center",
            }}
          >
            <select
              value={selectedScreen}
              onChange={(e) => {
                console.log(e.target);
                setSelectedScreen(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Screen...
              </option>{" "}
              {/* Placeholder option */}
              {Object.keys(tmsScreen).map(
                (screen, index) =>
                  Boolean(tmsScreen[screen].length > 0) && (
                    <option value={screen} selected={index === 0}>
                      {screen}
                    </option>
                  )
              )}
            </select>







<div style={{position:'relative',minWidth:'4vw'}} onClick={()=>setIsOpen(prev=>!prev)}>
  <div style={{display:'flex',alignItems:'center',border:'0.1rem solid black',justifyContent:'space-between',padding:'0.2rem 0.6rem'}}>{selecteImage} <FaChevronDown style={{fontSize:"0.8rem",}}/></div>
  {isOpen && <div style={{position:'absolute',background:'#fff',minWidth:'4vw'}}>
    {Boolean(selectedScreen) &&
                tmsScreen[selectedScreen]?.map((data, index) => (
                  <div style={{border:'0.1rem solid black',padding:'0.2rem 0.6rem'}} value={index} onMouseEnter={() => {
                    console.log("---------hOver--------");
                    setHovervalue(index);
                    toggleShow(true);
                  }}
                  onMouseLeave={() => toggleShow(false)}
                  onClick={()=> {setSelectedImage(index);toggleShow(false)}}
                  >
                    {index}
                  </div>
                ))}
    </div>}
</div>




            {/* <select
              value={selecteImage}
              onChange={(e) => setSelectedImage(e.target.value)}
            >
              {Boolean(selectedScreen) &&
                tmsScreen[selectedScreen]?.map((data, index) => (
                  <option value={index}>
                    {selectedScreen}___{index}
                  </option>
                ))}
            </select> */}







            <button
              style={{
                background: "transparent",
                display: "flex",
                border: "none",
              }}
              disabled={selectedScreen === null}
              onClick={() => {
                if (selectedScreen === null) return;
                dispatch(
                  addnewEntry({
                    category: selectedItem,
                    screen: selectedScreen,
                    image: selecteImage,
                    
                  })
                );
                dispatch(changeCurrentStep(data.length + 1))
              }}
            >
              {data.length}
              <FaPlus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
