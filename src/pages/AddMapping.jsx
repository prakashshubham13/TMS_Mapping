import React from 'react'
import Stepper from '../components/stepper/Stepper'
import Menubar from '../components/menubar/Menubar'
import Notes from '../components/notes/Notes'
import { useSelector } from 'react-redux'
import MultiPagePDF from '../components/pdf/MultiPagePDF'

const AddMapping = () => {
    /**
     * selected menu from menubar
     * selected menu to stepper
     */
    const mappingData = useSelector(state => state.tmsMapping);
    const selectedItem = useSelector(state => state?.tmsPreview?.previewData);
    mappingData.forEach((data)=>{
        console.log("-------------------------------",Object.keys(data)[0],Object.values(data)[0]);
        
    })

    const config = mappingData.filter((data)=>Object.keys(data)[0] === selectedItem)[0];

console.log("selectedItem-----",selectedItem,config);

  return (
    <div style={{display:'flex',width:'100%',height:'100%',borderTop:'0.1rem solid #000'}}>
        <div style={{flex:'1',background:'#fff',borderRight:'0.4rem solid rgba(0,0,0,0)'}}><Menubar list={mappingData}/></div>
        <div style={{flex:'4'}}>{selectedItem ? <Stepper config={
            Object.values(config)[0]
            ?? []} /> : null}</div>
    </div>
  )
}

export default AddMapping