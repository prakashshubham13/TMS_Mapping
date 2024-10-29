import React, { useId } from "react";
import FileUploadIcon from "../../assets/file.png";

const AddScreenComponent = ({ name, imageList, addImage }) => {
  const id = useId();

  const uploadImage = (e) => {
    const files = e.target.files;

    if (files.length) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            
            addImage(name, { 
              name: file.name, 
              image: event.target.result, 
              width, 
              height 
            });
          };
          img.src = event.target.result;
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <fieldset
      style={{
        display: "flex",
        border: "0.1rem solid black",
        padding: "0.6rem 0.3rem",
        width: "50vw",
        margin: "1rem auto",
        borderRadius: "0.4rem",
      }}
    >
      <legend>
        <h1>{name}</h1>
      </legend>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          id={id}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          multiple
          onChange={uploadImage}
        />
        <label
          htmlFor={id}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            background: "#AFDFF6",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <img src={FileUploadIcon} style={{ width: "8rem", height: "8rem" }} alt="Upload Icon" />
          <h1 style={{ color: "#1565C0" }}>Upload File</h1>
        </label>

        {!!imageList.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {imageList.map((img, index) => (
              <div key={index} style={{ margin: "0.5rem", textAlign: "center" }}>
                <img src={img.image} style={{ width: "3rem", height: "3rem" }} alt={`Uploaded ${img.name}`} />
                <p style={{ fontSize: "0.8rem" }}>{img.width}x{img.height}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default AddScreenComponent;
