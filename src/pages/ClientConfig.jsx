import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons/faFileImport";
import { addFieldValue } from "../redux/ConfigScreenSlice";
import { useSelector, useDispatch } from "react-redux";

const containerStyle = {
  width: "90vw",
  margin: "auto auto",
  padding: "2rem",
  // backgroundColor: "#fff",
  // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.5rem",
};

const sectionStyle = {
  margin: "1rem 0",
  padding: "1rem",
  // border: "0.1rem solid #ccc",
  borderRadius: "0.5rem",
  // backgroundColor: "rgb(0 123 255 / 50%)",
};

const buttonStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "1rem 2rem",
  backgroundColor: "#fff",
  color: "#000",
  fontWeight: "900",
  fontSize: "1rem",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  backgroundColor: "rgb(0 123 255 / 70%)",
  color:"#fff"
};

const contentStyle = {
  padding: "1rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "0.5rem",
  fontWeight: "bold",
  color: "#333",
};

const selectStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid #ccc",
  marginBottom: "1rem",
  display: "inline-block",
  backgroundColor: "#fff",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid #ccc",
  marginBottom: "1rem",
  display: "inline-block",
  backgroundColor: "#fff",
  color: "#333",
};

const iconStyle = {
  marginLeft: "0.5rem",
  cursor: "pointer",
  color: "#007bff",
};

const SelectField = ({ field, configKey, disabledOptions = [] }) => {
  const dispatch = useDispatch();
  const handleImportDefault = () => {
    if (field.default) {
      dispatch(
        addFieldValue({
          screenName: configKey,
          fieldID: field.fieldID,
          value: field.default,
        })
      );
    }
  };
  return (
    <div>
      <label style={labelStyle}>
        {field.fieldLabel}
        {field.default && (
          <FontAwesomeIcon
            icon={faFileImport}
            style={iconStyle}
            onClick={handleImportDefault}
          />
        )}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <select
          style={selectStyle}
          value={field.value || ""}
          onChange={(e) =>
            dispatch(
              addFieldValue({
                screenName: configKey,
                fieldID: field.fieldID,
                value: e.target.value,
              })
            )
          }
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {field.fieldOptions.map((option, index) => (
            <option
              key={index}
              value={option}
              disabled={disabledOptions.includes(option)}
              hidden={disabledOptions.includes(option)}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const InputField = ({ type = "text", field, configKey }) => {
  const dispatch = useDispatch();
  const handleImportDefault = () => {
    if (field.default) {
      dispatch(
        addFieldValue({
          screenName: configKey,
          fieldID: field.fieldID,
          value: field.default,
        })
      );
    }
  };
  return (
    <div>
      <label style={labelStyle}>
        {field.fieldLabel}
        {field.default && (
          <FontAwesomeIcon
            icon={faFileImport}
            style={iconStyle}
            onClick={handleImportDefault}
          />
        )}
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={type}
          style={inputStyle}
          value={field.value}
          onChange={(e) =>
            dispatch(
              addFieldValue({
                screenName: configKey,
                fieldID: field.fieldID,
                value: e.target.value,
              })
            )
          }
        />
      </div>
    </div>
  );
};

const TimeField = ({ field, configKey }) => {
  const dispatch = useDispatch();
  const handleImportDefault = () => {
    if (field.default) {
      dispatch(
        addFieldValue({
          screenName: configKey,
          fieldID: field.fieldID,
          value: field.default,
        })
      );
    }
  };
  return (
    <div>
      <label style={labelStyle}>
        {field.fieldLabel}
        {field.default && (
          <FontAwesomeIcon
            icon={faFileImport}
            style={iconStyle}
            onClick={handleImportDefault}
          />
        )}
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="time"
          style={inputStyle}
          value={field.value}
          onChange={(e) =>
            dispatch(
              addFieldValue({
                screenName: configKey,
                fieldID: field.fieldID,
                value: e.target.value,
              })
            )
          }
        />
      </div>
    </div>
  );
};

const ClientConfig = () => {
  const [isOpen, setIsOpen] = useState({});
  const dispatch = useDispatch();
  const configData = useSelector((state) => state.configScreen);

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div style={containerStyle}>
      {Object.keys(configData).map((data) => (
        <div key={data} style={sectionStyle}>
          <button
            style={{
              ...buttonStyle,
              ...(isOpen[data] ? buttonHoverStyle : {}),
            }}
            onClick={() => toggleSection(data)}
          >
            <span>{configData[data].name}</span>
            <span>{isOpen[data] ? "−" : "+"}</span>
          </button>
          {isOpen[data] && (
            <div style={contentStyle}>
              {configData[data].info.map((field, index) => (
                <div key={index}>
                  {field.fieldType === "select" && (
                    <SelectField configKey={data} field={field} />
                  )}
                  {field.fieldType === "selectDay" && (
                    <SelectField configKey={data} field={field} />
                  )}
                  {field.fieldType === "time" && (
                    <TimeField configKey={data} field={field} />
                  )}
                  {field.fieldType === "input" && (
                    <InputField configKey={data} field={field} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientConfig;
