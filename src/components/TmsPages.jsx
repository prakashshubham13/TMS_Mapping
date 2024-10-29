import React, { useId, useState } from 'react'
import FileIcon from '../assets/file.png';
const TmsPages = () => {
    const [imageSrc, setImageSrc] = useState([]);
    const id = useId();
    const uploadImage = (e) => {
        const files = e.target.files;
        if(files.length){
            console.log(files);
            Object.values(files).forEach((file)=>{
                console.log('file--',file);
                
                 const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(prev=>[...prev,event.target.result]);
            };
            reader.readAsDataURL(file);
            })
        }
        
    }
  return (
    <div style={{}}>
        <fieldset style={{display:"flex",border:"0.1rem solid black",padding:"0.6rem 0.3rem",width:'50vw',margin:'1rem auto',borderRadius:"0.4rem"}}>
            <legend> 
                <h1>Main Page</h1>
                {/* <select>
                <option>Main Page</option>
                <option>Details Page</option>
            </select> */}
            </legend>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
            <input id={id} style={{display:'none'}} type='file' accept='image/*' multiple onChange={uploadImage}/>
            <label htmlFor={id} style={{display:'flex',justifyContent:'center',width:'100%',background:'#AFDFF6',alignItems:"center",padding:'1rem'}}>
                <img src={FileIcon} style={{width:'8rem',height:'8rem'}}/>
                <h1 style={{color:'#1565C0'}}>Upload File</h1>
            </label>
           
            {!!imageSrc.length && <div style={{display:'flex',justifyContent:'flex-start',width:'100%',marginTop:"2rem",flexWrap:'wrap'}}>
            {imageSrc.map((img)=><img src={img} style={{width:'3rem', height:'3rem'}} />)}
            </div>}
            </div>
        </fieldset>

        <button>Add New Screen</button>
        {imageSrc.map((img)=><img src={img}/>)}
    </div>
  )
}

export default TmsPages