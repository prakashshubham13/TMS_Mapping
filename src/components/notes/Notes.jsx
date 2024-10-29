import React, { useState } from 'react'


const Notes = ({notesList, addNoteList}) => {
  const [note, setNote] = useState("");
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%',background:'#fbfcf8',padding:'0.2rem 0.2rem',borderLeft:'0.2rem dashed rgba(0,0,0,0.8)'}}>
      <div style={{flex:5}}>
        {notesList.map((data)=><div>
          {data}
        </div>)}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column',flex:2}}>
        <textarea style={{height:'100%'}} value={note} onChange={e=>setNote(e.target.value)} ></textarea>
        <button style={{padding:'0.4rem 1rem',}} onClick={()=>{if(!note) return;addNoteList(note);setNote('');}}>Add Notes</button>
      </div>
    </div>
  )
}

export default Notes