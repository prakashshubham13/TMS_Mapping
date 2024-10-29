import React from 'react'
import Item from './Item'

const options = ["OriginCity","OrginState","OriginZip","OriginCountry","Stops"]

const Menubar = ({list}) => {
  return (
    <div style={{display:'flex',flexDirection:'column',minWidth:'22vw '}}>
      <h1 style={{color:'rgba(0,0,0,0.6)',textAlign:'center'}}>Feature List</h1>
      <hr/>
      <br/>
        <div style={{height:'85vh',overflowY:'auto'}}>
        {list.map((option)=>(<Item name={Object.keys(option)[0]} data={Object.values(option)[0]}/>))}
        </div>
    </div>
  )
}

export default Menubar