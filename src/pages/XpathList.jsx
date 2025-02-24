import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPreviewData,
  changeCurrentStep,
  changeDate,
} from "../redux/tmsPreviewSlice";

const XpathList = () => {
  const mappingData = useSelector((state) => state.tmsMapping);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const modifiedList = [];
    mappingData.forEach((data) => {
      Object.values(data)[0].forEach((list, index) => {
        list.notes.forEach((note) => {
          modifiedList.push({
            ...note,
            date: new Date(note.date),
            previewData: Object.keys(data)[0],
            currentStep: index + 1,
          });
        });
      });
    });

    setList(modifiedList.sort((a, b) => b.date - a.date));
  }, [mappingData]);

  return (
    <div style={containerStyle}>
      {/* Table to show data */}
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={{ ...headerCellStyle, whiteSpace: "nowrap" }}>S. No.</th>
            <th style={headerCellStyle}>Title</th>
            <th style={headerCellStyle}>Date</th>
            <th style={headerCellStyle}>Old Xpath</th>
            <th style={headerCellStyle}>New Xpath</th>
            <th style={headerCellStyle}>Nodes Affected</th>
            <th style={headerCellStyle}>Note</th>
            <th style={headerCellStyle}>Feature</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => (
            <tr
              key={index}
              style={rowStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f1f1")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              <td
                style={cellStyle}
                onClick={() => {
                  dispatch(addPreviewData(data.previewData));
                  dispatch(changeCurrentStep(data.currentStep));
                  dispatch(changeDate(data.date));
                  navigate("/addMapping");
                }}
              >
                {index + 1}
              </td>
              <td style={cellStyle}>{data.title}</td>
              <td style={cellStyle}>{data.date.toLocaleDateString()}</td>
              <td style={cellStyle}>
                <p style={wrapStyle}>{data.oldXpath}</p>
              </td>
              <td style={cellStyle}>
                <p style={wrapStyle}>{data.newXpath}</p>
              </td>
              <td style={cellStyle}>
                <p style={wrapStyle}>
                  {data.nodes.split(",").map((note, idx) => (
                    <span key={idx} style={nodeStyle}>
                      {" "}
                      {note}{" "}
                    </span>
                  ))}
                </p>
              </td>
              <td style={cellStyle}>
                <p style={wrapStyle}>{data.note}.</p>
              </td>
              <td style={cellStyle}>{data.previewData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline styles
const containerStyle = {
  padding: "1.25rem",
  backgroundColor: "#f4f4f9",
  borderRadius: "0.5rem",
  boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.1)",
  minHeight: "calc(100vh - 6vh)",
  maxHeight: "auto",
  overflowX: "auto", // Ensure horizontal scrolling on small screens
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "1.25rem",
  tableLayout: "auto", // Ensure table adjusts its width based on content
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  overflow: "hidden",
};

const headerRowStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  textAlign: "left",
  fontWeight: "bold",
};

const headerCellStyle = {
  padding: "0.75rem 0.9375rem",
  border: "0.0625rem solid #ddd",
};

const rowStyle = {
  cursor: "pointer",
  backgroundColor: "#fff",
  transition: "background-color 0.3s ease",
};

const cellStyle = {
  padding: "0.75rem 0.9375rem",
  border: "0.0625rem solid #ddd",
  textAlign: "left",
};

const wrapStyle = {
  margin: "0 0 0.125rem",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  whiteSpace: "normal",
  wordBreak: "break-word", // Ensure breaking on long words
};

const nodeStyle = {
  padding: "0.125rem",
  background: "#e9ecef",
  margin: "0.125rem",
  borderRadius: "0.125rem",
  display: "inline-block",
  textAlign: "center",
  width: "inherit",
  height: "inherit",
  fontSize: "0.9rem", // Adjust font size for better readability
};

export default XpathList;
