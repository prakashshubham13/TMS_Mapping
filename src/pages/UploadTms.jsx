import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadScreenImage } from '../redux/tmsScreenSlice';
import AddScreenComponent from '../components/uploads/AddScreenComponent';
import CustomTmsSelectBox from '../components/uploads/CustomTmsSelectBox';
const UploadTms = () => {
    const screens = useSelector(state=>state.tmsScreen);
    const dispatch = useDispatch();
    console.log(screens);
    const addImage = (name, newImage) => {
        dispatch(uploadScreenImage({screenName:name, newImage}));
    }
  return (

    <div>
                <form>
        {Object.keys(screens).map((screen)=>(<AddScreenComponent name={screen} imageList={screens[screen]} addImage={addImage}/>))}
        {/* <fieldset> */}
            {/* <input/>
            <CustomTmsSelectBox/> */}
        {/* <button>Add New Screen</button> */}
        {/* </fieldset> */}
        </form>
    </div>
  )
}

export default UploadTms