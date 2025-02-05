import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate } from "../../redux/tmsPreviewSlice";

const Notes = ({ notesList, addNoteList }) => {
  const [note, setNote] = useState({
    date: "",
    title: "",
    oldXpath: "",
    newXpath: "",
    nodes: "",
    note: "",
  });
  const dateKey = useSelector((state) => state.tmsPreview.date);
  const dispatch = useDispatch();

  console.log(dateKey);

  const noteRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNote = () => {
    if (
      !note.title ||
      !note.oldXpath ||
      !note.newXpath ||
      !note.nodes ||
      !note.note
    ) {
      alert("Please fill all fields before adding a note.");
      return;
    }
    addNoteList({ ...note, date: new Date() });
    setNote({
      date: "",
      title: "",
      oldXpath: "",
      newXpath: "",
      nodes: "",
      note: "",
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`Copied to clipboard: ${text}`))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  useEffect(() => {
    if (dateKey && noteRefs.current.length) {
      // Find the index of the note that matches the dateKey
      const index = notesList.findIndex((data) => {
        console.log(
          data.date,
          "------------",
          data.title,
          dateKey,
          data.date.getTime() === dateKey.getTime()
        );

        return data.date.getTime() === dateKey.getTime();
      });
      console.log(index);

      if (notesList.length - index - 1 !== -1 && noteRefs.current[index]) {
        // Scroll to that particular note
        noteRefs.current[notesList.length - index - 1].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      dispatch(changeDate(null));
    }
  }, [dateKey, notesList]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 26vh)",
        overflowY: "hidden",
        background: "#fbfcf8",
        padding: "0.4rem",
        
      }}
    >
      {/* Notes List */}
      <div style={{ flex: 5, overflowY: "auto", marginBottom: "1rem" }}>
        {notesList.length > 0 ? (
          [...notesList].reverse().map((data, index) => (
            <div
              key={index}
              ref={(el) => (noteRefs.current[index] = el)} // Assign ref to each note
              style={{
                padding: "0.4rem",
                marginBottom: "0.4rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "0.4rem",
                background: "#fff",
              }}
            >
              <p style={{textDecoration:"underline"}}>
                {String(data?.date?.getDate()).padStart(2,"0")}-{String(data?.date?.getMonth() + 1).padStart(2,"0")}-{data?.date?.getFullYear()}
              </p>
              <h4 style={wrapStyle}>Title: {data.title}</h4>
              <p
                style={{ ...wrapStyle, cursor: "pointer", color: "blue" }}
                title={data.oldXpath}
                onClick={() => copyToClipboard(data.oldXpath)}
              >
                Old Xpath: <span>{data.oldXpath}</span>
              </p>
              <p
                style={{ ...wrapStyle, cursor: "pointer", color: "blue" }}
                title={data.newXpath}
                onClick={() => copyToClipboard(data.newXpath)}
              >
                New Xpath: <span>{data.newXpath}</span>
              </p>
              <p style={wrapStyle}>Nodes Affected: {data.nodes}</p>
              <p style={wrapStyle}>Notes: {data.note}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>
            No xpath notes added yet.
          </p>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(0, 0, 0, 0.2)",
          margin: "1rem 0",
        }}
      ></div>

      {/* Add New Note */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
          gap: "0.4rem",
        }}
      >
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
          style={inputStyle}
        />
        <input
          name="oldXpath"
          value={note.oldXpath}
          onChange={handleChange}
          placeholder="Old Xpath"
          style={inputStyle}
        />
        <input
          name="newXpath"
          value={note.newXpath}
          onChange={handleChange}
          placeholder="New Xpath"
          style={inputStyle}
        />
        <input
          name="nodes"
          value={note.nodes}
          onChange={handleChange}
          placeholder="Nodes Affected"
          style={inputStyle}
        />
        <textarea
          name="note"
          value={note.note}
          onChange={handleChange}
          placeholder="Additional Note"
          style={{ ...inputStyle, height: "80px", resize: "none" }}
        />
        <button
          onClick={handleAddNote}
          style={{
            padding: "0.6rem",
            background: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "0.4rem",
            cursor: "pointer",
          }}
        >
          Add Xpath Update
        </button>
      </div>
    </div>
  );
};

// Common input style
const inputStyle = {
  padding: "0.6rem",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "0.4rem",
  width: "100%",
};

const wrapStyle = {
  margin: "0 0 0.2rem",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  whiteSpace: "normal",
};

export default Notes;
