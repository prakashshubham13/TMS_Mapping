import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadScreenImage } from "../redux/tmsScreenSlice";
import AddScreenComponent from "../components/uploads/AddScreenComponent";
import CustomTmsSelectBox from "../components/uploads/CustomTmsSelectBox";
import "./UploadTms.css";
import { useNavigate } from "react-router-dom";

const UploadTms = () => {
  const screens = useSelector((state) => state.tmsScreen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(screens);
  const addImage = (name, newImage) => {
    dispatch(uploadScreenImage({ screenName: name, newImage }));
  };
  return (
    <div className="upload-tms-container">
      <form className="upload-tms-form">
        {Object.keys(screens).map((screen) => (
          <AddScreenComponent
            name={screen}
            imageList={screens[screen]}
            addImage={addImage}
          />
        ))}
        {/* <fieldset> */}
        {/* <input/>
            <CustomTmsSelectBox/> */}
        {/* <button>Add New Screen</button> */}
        {/* </fieldset> */}
      </form>
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate("/addMapping")}
      >
        ↓
      </button>
    </div>
  );
};

export default UploadTms;
