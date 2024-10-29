import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPreviewData } from '../../redux/tmsPreviewSlice';
import Preview from '../preview/Preview';
import { addnewEntry } from '../../redux/tmsMappingSlice';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Item = ({name, data}) => {
    console.log(data);
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => state?.tmsPreview?.previewData)
    const tmsScreen = useSelector(state => state?.tmsScreen);
    console.log("tmsScreen-------",tmsScreen);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selecteImage, setSelectedImage] = useState(0);
    useEffect(() => {
      Object.keys(tmsScreen).forEach((data)=>{
        console.log(data,'------------------',Boolean(tmsScreen[data].length));
        
        if(tmsScreen[data].length){
          setSelectedScreen(data);
          
        }
      })
    
      return () => {
        
      }
    }, [])
    
    console.log(tmsScreen,selectedScreen,tmsScreen[selectedScreen])
    const [show, toggleShow] = useState(false);
  return (
    <div style={{borderBottom:'0.1rem solid #000',padding:'0.6rem 0.5rem'}}>
    <div style={{display:'flex',justifyContent:"space-between",padding:"0.2rem 0.4rem",fontSize:"1.2rem"}}>
           <h2 style={{fontSize:"1.3rem",fontWeight:'900',color:'rgba(0,0,0,0.8)'}}> {name}</h2>
           <div  onClick={()=>dispatch(addPreviewData(selectedItem === name ? null : name))}> {selectedItem !== name ? <FaChevronDown /> : <FaChevronUp/>}</div>
           </div>
{selectedItem === name && <div>
    
    {show && createPortal(<div style={{position:'fixed',zIndex:99,top:0,left:0,width:'100%',height:'100%',background:'red'}}>
        {/* <button onClick={()=>toggleShow(prev=>!prev)}>Add New</button> */}
       <select>
        <option>Main Page</option>
        <option>Details Page</option>
       </select>
       <select>
        <option>1</option>
        <option>2</option>
       </select>
        <Preview data={
{    "screen": "Main_Screen",
    "image": 0,
    "location": []}
}/>
    </div>,document.getElementById('popup'))}
    {data.map((value,index)=>(
        <div  style={{display:'flex',justifyContent:"space-between",padding:"0.5rem 0.4rem",border:'0.1rem solid #000',margin:'0.2rem 0.3rem'}}>
        <div>{name}{" "}{index+1}</div>
        <div>{value.screen}</div>
    </div>))}
    <div  style={{display:'flex',justifyContent:"space-between",padding:"0.5rem 0.4rem",border:'0.1rem solid #000',margin:'0.2rem 0.3rem'}}>
   
    <select value={selectedScreen} onChange={(e)=>{console.log(e.target);
    setSelectedScreen(e.target.value)
    }}>
    <option value="" disabled>Select SCreen...</option> {/* Placeholder option */}
    {Object.keys(tmsScreen).map((screen,index)=>(
      
    Boolean(tmsScreen[screen].length>0) && <option value={screen} selected={index === 0}>{screen}</option>
   ))}
       </select>
     
      <select value={selecteImage} onChange={(e)=>setSelectedImage(e.target.value)}>
       {Boolean(selectedScreen) && tmsScreen[selectedScreen]?.map((data,index)=><option value={index}>{selectedScreen}___{index}</option>)}
       </select>
       <button disabled={selectedScreen === null} onClick={()=>{
        if(selectedScreen === null) return;
        dispatch(addnewEntry({category:selectedItem,screen:selectedScreen,image:selecteImage}))}}>Add New</button>
    </div>
    </div>}
    </div>

  )
}

export default Item