import React, { useState } from 'react'

const CustomTmsSelectBox = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const updateValue = (value) => {
        setSelectedValue(value);
    }
  return (
    <div>
                <div>{selectedValue}</div>
                <div>
                    <div onClick={()=>updateValue("Main_Page")}>Main_Page</div>
                    <div>Details_Page</div>
                    <div><input/><button>+</button></div>
                </div>
            </div>
  )
}

export default CustomTmsSelectBox