import React, { useState } from 'react'
import Item from './Item'
import { FaPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addNewCategory } from '../../redux/tmsMappingSlice';
import { FaSearch } from "react-icons/fa";
const options = ["OriginCity","OrginState","OriginZip","OriginCountry","Stops"]

const Menubar = ({list}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  return (
    <div style={{display:'flex',flexDirection:'column',minWidth:'22vw '}}>
      <h1 style={{color:'rgba(0,0,0,0.6)',textAlign:'center'}}>Feature List</h1>
      <hr/>
      <br/>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding:'0.2rem 0.8rem' }}>
        <input placeholder='Search...' value={searchInput} onChange={e=>setSearchInput(e.target.value)} style={{ flex: 1, padding: '0.5rem' }} />
        </div>
        <div style={{height:'75vh',overflowY:'auto'}}>
        {list.filter((data)=>{return Object.keys(data)[0].toLowerCase().includes(searchInput.toLowerCase())}).map((option)=>(<Item name={Object.keys(option)[0]} data={Object.values(option)[0]}/>))}
<br/>
<hr/>
<br/>
<div style={{ display: 'flex', alignItems: 'center', width: '90%', padding:'0.2rem 0.8rem',margin:'0.2rem auto',border:'0.1rem solid rgba(0,0,0,0.6)' }}>
        <input placeholder='Add New Feature' value={input} onChange={e=>setInput(e.target.value)} style={{ flex: 1, padding: '0.5rem' }} />
        <FaPlus style={{ marginLeft: '0.5rem' }} onClick={()=>{
          setInput('');
          dispatch(addNewCategory({name:input}))
          }}/>
        </div>
        </div>
    </div>
  )
}

export default Menubar