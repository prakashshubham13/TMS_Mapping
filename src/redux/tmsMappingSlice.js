import { createSlice } from "@reduxjs/toolkit";
import IbgNotes from "../components/notes/IbgNotes";

const ibg_obj = {
  "TMS Login": [
    {
      type: "select",
      question: "Login Type",
      option: ["Simple Login", "2FA Google", "Login Link"],
      value: "Simple Login",
      dependent: "",
    },
    {
      type: "note",
      question: "Add additional notes?",
      dependent: "",
      value: "",
    },
  ],
  "Pickup Date Time": [
    {
      type: "select",
      question: "Does pickup date time exist?",
      option: ["no", "yes"],
      value: "no",
      dependent: "",
    },
    {
      type: "select",
      question: "Present in range?",
      option: ["no", "yes"],
      dependent: "parent",
      value: "no",
    },
    {
      type: "select",
      question: "What to choose?",
      option: ["begining", "end"],
      dependent: "parent",
      value: "begining",
    },
    {
      type: "note",
      question: "Add additional notes?",
      dependent: "",
      value: "",
    },
  ],
};

const savedState = localStorage.getItem("tmsMapping");
const initialState = savedState
  ? JSON.parse(savedState)
  : [
      { "TMS Login": [] },
      { "Navigate to Dashboard": [] },
      { Filtering: [] },
      { "Pickup Date Time": [] },
      { "Origin City": [] },
      { "Orign State": [] },
      { "Origin Zip": [] },
      { "Origin Country": [] },
      { "Destination City": [] },
      { "Destination State": [] },
      { "Destination Zip": [] },
      { "Destination Country": [] },
      { Stops: [] },
      { Equipment: [] },
      { Distance: [] },
    ];

const tmsMappingSlice = createSlice({
  name: "tmsMapping",
  initialState,
  reducers: {
    deleteOldMapping: (state, action) => {
      const { category, index, deleteIndex } = action.payload;
      console.log(category, index, deleteIndex);

      const categoryEntry = state.find((item) => item[category]);
      console.log(categoryEntry, categoryEntry[category][index]);
      categoryEntry[category][index].location.splice(deleteIndex, 1);
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsMapping", newState);
      }
    },
    addNotes: (state, action) => {
      const { category, index, selectedIndex, noteType, note } = action.payload;
      console.log(category, index, selectedIndex);

      const categoryEntry = state.find((item) => item[category]);
      console.log(
        categoryEntry,
        categoryEntry[category],
        categoryEntry[category][index],
        categoryEntry[category][index].location
      );
      console
        .log
        // categoryEntry[category][index].location?.te_notes,
        // categoryEntry[category][index].location?.te_notes?.length,
        // categoryEntry[category][index].location[selectedIndex]
        ();

      if (
        !categoryEntry[category][index].location?.[selectedIndex].te_notes
          ?.length
      ) {
        categoryEntry[category][index].location[selectedIndex].te_notes = [];
      }
      categoryEntry[category][index].location[selectedIndex].te_notes.push(
        note
      );
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsMapping", newState);
      }
    },
    addNewMapping: (state, action) => {
      console.log(action.payload);

      const {
        category,
        screen,
        newLocation,
        index,
        notes,
        modifiedImg,
        ibgNotes,
      } = action.payload;
      console.log(...newLocation);
      // newLocation[0].te_notes = [];
      // newLocation[0].xpath_notes = [];
      // newLocation[0].ibg_notes = [];

      const categoryEntry = state.find((item) => item[category]);

      categoryEntry[category][index].location.push(...newLocation);
      categoryEntry[category][index].notes.push(...notes);
      categoryEntry[category][index].modifiedImg = modifiedImg;

      console.log(category, ibgNotes);

      categoryEntry[category][index].ibgNotes = ibgNotes.length
        ? ibgNotes
        : categoryEntry[category][index].ibgNotes;
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsMapping", newState);
      }
    },

    addnewEntry: (state, action) => {
      const { category, screen, image } = action.payload;
      console.log(category, screen, image);

      const categoryEntry = state.find((item) => item[category]);
      categoryEntry[category].push({
        screen,
        image,
        location: [],
        notes: [],
        modifiedImg: null,
        ibgNotes: ibg_obj[category]
          ? [...ibg_obj[category]]
          : [{ type: "note", question: "Add additional notes?", value: "" }],
      });
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsMapping", newState);
      }
    },

    deleteEntry: (state, action) => {
      const { category, index } = action.payload;
      const categoryEntry = state.find((item) => item[category], index);
      console.log("-----------------------", category, categoryEntry);
      console.log(categoryEntry[category]);

      categoryEntry[category].splice(index, 1);
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsMapping", newState);
      }
    },
    addNewCategory: (state, action) => {
      const { name } = action.payload;
      state.push({ [name]: [] });
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsMapping", newState);
      }
    },
  },
});

export const {
  addNewMapping,
  addnewEntry,
  addNewCategory,
  deleteEntry,
  deleteOldMapping,
  addNotes,
} = tmsMappingSlice.actions;

export default tmsMappingSlice.reducer;
