import { createSlice } from "@reduxjs/toolkit";

const savedState = localStorage.getItem("configScreen");
const initialState = savedState
  ? JSON.parse(savedState)
  : {
      account_info: {
        name: "Account Information",
        info: [
          {
            fieldID: "TMS_field",
            fieldLabel: "TMS",
            value: "",
            fieldOptions: ["Shipwell", "Trucker", "TMS 3"],
            fieldType: "select",
            default: "",
          },
          {
            fieldID: "Client_Name_field",
            fieldLabel: "Client Name",
            value: "",
            fieldOptions: ["Client 1", "Client 2", "Client 3"],
            fieldType: "select",
            default: "",
          },
          {
            fieldID: "CADB_field",
            fieldLabel: "CADB",
            value: "",
            default: "",
            fieldType: "text",
          },
        ],
      },
      scheduler_info: {
        name: "Scheduler Information",
        info: [
          {
            fieldID: "Scheduler_start_day",
            fieldLabel: "Scheduler Start Day",
            value: "",
            fieldOptions: [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ],
            fieldType: "selectDay",
            default: "",
          },
          {
            fieldID: "Scheduler_start_time",
            fieldLabel: "Scheduler Start Time",
            value: "",
            fieldType: "time",
            default: "",
          },
          {
            fieldID: "Scheduler_end_day",
            fieldLabel: "Scheduler End Day",
            value: "",
            fieldOptions: [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ],
            fieldType: "selectDay",
            default: "",
          },
          {
            fieldID: "Scheduler_end_time",
            fieldLabel: "Scheduler End Time",
            value: "",
            fieldType: "time",
            default: "",
          },
          {
            fieldID: "Scheduler_time_zone",
            fieldLabel: "Scheduler Time Zone",
            value: "",
            fieldOptions: ["CST", "EST", "PST"],
            fieldType: "select",
            default: "",
          },
          {
            fieldID: "Scheduler_Interval_field",
            fieldLabel: "Scheduler Interval",
            value: "",
            fieldOptions: [
              "5",
              "10",
              "15",
              "20",
              "25",
              "30",
              "35",
              "40",
              "45",
              "50",
              "55",
              "60",
            ],
            fieldType: "select",
            default: "",
          },
        ],
      },
      parb_info: {
        name: "PARB Information",
        info: [
          {
            fieldID: "PARB_profile",
            fieldLabel: "PARB Profile ID",
            value: "",
            default: "PROFILE0",
            fieldOptions: ["PROFILE0", "PROFILE1", "PROFILE2", "PROFILE3"],
            fieldType: "select",
          },
          {
            fieldID: "PARB_next_day",
            fieldLabel: "Bid Past Day As",
            value: "",
            default: "Next",
            fieldOptions: ["Past", "Next", "Current"],
            fieldType: "select",
          },
        ],
      },
      workflow_info: {
        name: "Workflow Information",
        info: [
          {
            fieldID: "Workflow_url",
            fieldLabel: "Workflow URL",
            value: "",
            fieldType: "input",
            default: "",
          },
        ],
      },
      datastore_info: {
        name: "Datastore Information",
        info: [
          {
            fieldID: "Datastore_url",
            fieldLabel: "Workflow URL",
            value: "",
            fieldType: "input",
            default: "https://datastore.com",
          },
        ],
      },
    };

const configScreenSlice = createSlice({
  name: "configScreen",
  initialState,
  reducers: {
    addFieldValue: (state, action) => {
      const { screenName, fieldID, value } = action.payload;
      state[screenName].info = state[screenName].info.map((field) => {
        if (field.fieldID === fieldID) {
          return { ...field, value };
        }
        return field;
      });
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("configScreen", newState);
      }
    },
  },
});

export const { addFieldValue } = configScreenSlice.actions;
export default configScreenSlice.reducer;
