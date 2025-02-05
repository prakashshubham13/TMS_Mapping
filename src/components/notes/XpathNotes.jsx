import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const XpathNotes = ({ notesList }) => {
  console.log(notesList);

  const dateKey = useSelector((state) => state.tmsPreview.date);
  const dispatch = useDispatch();

  console.log(dateKey);

  const noteRefs = useRef([]);

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
    }
  }, [dateKey, notesList]);

  return (
    <div>
      {notesList?.length > 0 ? (
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
            <p style={{ textDecoration: "underline" }}>
              {String(data?.date?.getDate()).padStart(2, "0")}-
              {String(data?.date?.getMonth() + 1).padStart(2, "0")}-
              {data?.date?.getFullYear()}
            </p>
            <h4 style={wrapStyle}>Title: {data.title}</h4>
            <p
              style={{ ...wrapStyle, cursor: "pointer", color: "blue" }}
              // title={data.oldXpath}
              // onClick={() => copyToClipboard(data.oldXpath)}
            >
              Old Xpath: <span>{/* {data.oldXpath} */}</span>
            </p>
            <p
              style={{ ...wrapStyle, cursor: "pointer", color: "blue" }}
              // title={data.newXpath}
              // onClick={() => copyToClipboard(data.newXpath)}
            >
              New Xpath: <span>{data.newXpath}</span>
            </p>
            <p style={wrapStyle}>Nodes Affected: {data.nodes}</p>
            <p style={wrapStyle}>Notes: {data.note}</p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>
          No TE notes added yet.
        </p>
      )}
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

export default XpathNotes;
