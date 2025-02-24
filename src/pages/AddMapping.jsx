import React from "react";
import Stepper from "../components/stepper/Stepper";
import Menubar from "../components/menubar/Menubar";
import Notes from "../components/notes/Notes";
import { useSelector } from "react-redux";
import MultiPagePDF from "../components/pdf/MultiPagePDF";
import { useNavigate } from "react-router-dom";

const AddMapping = () => {
  /**
   * selected menu from menubar
   * selected menu to stepper
   */
  const mappingData = useSelector((state) => state.tmsMapping);
  const selectedItem = useSelector((state) => state?.tmsPreview?.previewData);
  const navigate = useNavigate();
  mappingData.forEach((data) => {
    console.log(
      "-------------------------------",
      Object.keys(data)[0],
      Object.values(data)[0]
    );
  });

  const config = mappingData.filter(
    (data) => Object.keys(data)[0] === selectedItem
  )[0];

  console.log("selectedItem-----", selectedItem, config);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 6vh)",
        // borderTop: "0.1rem solid #000",
      }}
    >
      <div
        style={{
          flex: "1",
          background: "#fff",
          borderRight: "0.4rem solid rgba(0,0,0,0)",
        }}
      >
        <Menubar list={mappingData} />
      </div>
      <div style={{ flex: "4" }}>
        {selectedItem ? (
          <Stepper config={Object.values(config)[0] ?? []} />
        ) : null}
      </div>
      {/* <MultiPagePDF dataList={}/> */}
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
        onClick={() => navigate("/uploadScreen")}
      >
        ↑
      </button>
    </div>
  );
};

export default AddMapping;
