import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

const Popup = ({ onClose, data, index, selectedItem, selectedIndex, deleteRect, onSave }) => {
  const [expand, setExpand] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    details: "",
    nodeIds: ""
  });

  const toggleExpand = useCallback(() => {
    setExpand((prev) => !prev);
  }, []);

  const notes = data?.location[selectedIndex - 1]?.te_notes || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formValues.title || !formValues.details) {
      alert("Title and details are required.");
      return;
    }

    const newNote = {
      title: formValues.title,
      note: formValues.details,
      nodes: formValues.nodeIds
    };

    data.location[selectedIndex - 1].te_notes.push(newNote);
    setFormValues({ title: "", details: "", nodeIds: "" });
    setExpand(false);
  };

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {selectedItem} - {data.screen} - {index + 1} - {selectedIndex}
          </h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          <div>
            {notes.length > 0 ? (
              <div style={styles.notesContainer}>
                {[...notes].reverse().map((item, idx) => (
                  <div key={idx} style={styles.noteCard}>
            <p><strong>Title:</strong> {item.title}</p>
                    <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                    <p><strong>Node Ids:</strong> {item.nodeIds}</p>
                    <p><strong>Details:</strong> {item.details}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No notes added yet</p>
            )}
          </div>

          <button style={styles.expandBtn} onClick={toggleExpand}>
            {expand ? "Cancel" : "Modify"}
          </button>

          {expand && (
            <div style={styles.inputContainer}>
              <label style={styles.label}>Heading:</label>
              <input 
                style={styles.input} 
                type="text" 
                placeholder="Enter title..."
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />

              <label style={styles.label}>Details:</label>
              <textarea 
                style={styles.textarea} 
                placeholder="Enter notes here..." 
                name="details"
                value={formValues.details}
                onChange={handleChange}
              />

              <label style={styles.label}>Node Ids:</label>
              <input 
                style={styles.input} 
                type="text" 
                placeholder="Enter node IDs..." 
                name="nodeIds"
                value={formValues.nodeIds}
                onChange={handleChange}
              />

              <div style={styles.buttonContainer}>
                <button style={styles.saveBtn} onClick={()=>{onSave({...formValues,date:new Date()});setFormValues({
    title: "",
    details: "",
    nodeIds: ""
  })}}>Save</button>
                <button style={styles.deleteBtn} onClick={() => {
                  deleteRect();
                  onClose();
                }}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal") // Ensure this exists in index.html
  );
};

// Styles for Popup
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    background: "white",
    padding: "1rem",
    width: "40rem",
    maxWidth: "90%",
    borderRadius: "0.5rem",
    boxShadow: "0 0 1rem rgba(0,0,0,0.2)",
    borderTop: "0.4rem solid lightgreen",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "0.1rem solid #ddd",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#333",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.8rem",
    cursor: "pointer",
    color: "#888",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  notesContainer: {
    maxHeight: "25vh",
    overflowY: "auto",
    padding: "0.5rem",
    border: "0.1rem solid #ddd",
    borderRadius: "0.4rem",
  },
  noteCard: {
    padding: "0.5rem",
    borderBottom: "0.1rem solid #ddd",
  },
  expandBtn: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "0.4rem",
    cursor: "pointer",
    background: "skyblue",
    color: "white",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#555",
  },
  textarea: {
    width: "100%",
    height: "5rem",
    padding: "0.5rem",
    fontSize: "1rem",
    border: "0.1rem solid #ccc",
    borderRadius: "0.4rem",
    resize: "none",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    border: "0.1rem solid #ccc",
    borderRadius: "0.4rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  saveBtn: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.4rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.4rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Popup;
