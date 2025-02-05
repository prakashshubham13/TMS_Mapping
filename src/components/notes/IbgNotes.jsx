import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate } from "../../redux/tmsPreviewSlice";

const IbgNotes = ({ ibgNotesList, addIbgNoteList, selectedItem, index }) => {
  const [note, setNote] = useState(ibgNotesList);
  const dateKey = useSelector((state) => state.tmsPreview.date);
  const dispatch = useDispatch();

console.log("================",note,selectedItem, index);

useEffect(()=>{
    setNote(ibgNotesList);
},[ibgNotesList])

  const noteRefs = useRef([]);


  const handleAddNote = () => {
console.log(note);

    addIbgNoteList(note);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`Copied to clipboard: ${text}`))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

//   useEffect(() => {
//     if (dateKey && noteRefs.current.length) {
//       // Find the index of the note that matches the dateKey
//       const index = ibgNotesList.findIndex((data) => {
//         console.log(
//           data.date,
//           "------------",
//           data.title,
//           dateKey,
//           data.date.getTime() === dateKey.getTime()
//         );

//         return data.date.getTime() === dateKey.getTime();
//       });
//       console.log(index);

//       if (ibgNotesList.length - index - 1 !== -1 && noteRefs.current[index]) {
//         // Scroll to that particular note
//         noteRefs.current[ibgNotesList.length - index - 1].scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//       dispatch(changeDate(null));
//     }
//   }, [dateKey, ibgNotesList]);

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
        {note.length > 0 ? (
          note.map(
            (data, index) =>
              (data.dependent !== "parent" ||
                !(
                  index > 0 &&
                  data.dependent === "parent" &&
                  note[index - 1]?.value === "no"
                )) && (
                <div
                  key={index}
                  ref={(el) => (noteRefs.current[index] = el)} // Assign ref to each note
                  style={{
                    padding: "0.4rem",
                    marginBottom: "0.4rem",
                    // border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "0.4rem",
                    // background: "#fff",
                  }}
                >



                  {data.type === "checkbox" && (
                    <div>
                      {data.question}: <input type="checkbox" />
                    </div>
                  )}
                  {data.type === "select" && (
                    <>
                      <div>{data.question}</div>
                      <div>
                        <select
                          value={data.value}


                          onChange={(e) => {
                            console.log("---", ibgNotesList);

                            setNote((prevNotes) => {
                              let newNotes = [...prevNotes]; // Clone the array
                              newNotes[index] = {
                                ...newNotes[index],
                                value: e.target.value,
                              }; // Clone the object and update value

                              console.log("Updated Notes:", newNotes);
                              return [...newNotes]; // Set the new state
                            });
                          }
                        
                        
                        }
                        >
                          {data.option.map((opt) => (
                            <option value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              )
          )
        ) : (
          <p style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>
            No ibg notes added yet.
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
        <p>{note[note.length - 1]?.question}</p>
        <textarea
          name="note"
          value={note[note.length - 1]?.value}
          onChange={(e) => {
            console.log("---", ibgNotesList);

            setNote((prevNotes) => {
              let newNotes = [...prevNotes]; // Clone the array
              newNotes[newNotes.length - 1] = {
                ...newNotes[newNotes.length - 1],
                value: e.target.value,
              }; // Clone the object and update value

              console.log("Updated Notes:", newNotes);
              return [...newNotes]; // Set the new state
            });
          }}
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
          Save
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

export default IbgNotes;
