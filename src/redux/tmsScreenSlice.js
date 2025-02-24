import { createSlice } from "@reduxjs/toolkit";

const savedState = localStorage.getItem("tmsScreen");
const initialState = savedState
  ? JSON.parse(savedState)
  : {
      Login_Screen: [],
      Main_Screen: [],
      Details_Screen: [],
    };

const tmsScreenSlice = createSlice({
  name: "tmsScreen",
  initialState,
  reducers: {
    addNewScreen: (state, action) => {
      state[action.payload.screenName] = [];
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsScreen", newState);
      }
    },
    uploadScreenImage: (state, action) => {
      console.log(state, action);
      state[action.payload.screenName] = [
        ...state[action.payload.screenName],
        action.payload.newImage,
      ];
      const newState = JSON.stringify(state);
      if (newState !== undefined) {
        // localStorage.setItem("tmsScreen", newState);
      }
    },
  },
});

export const { addNewScreen, uploadScreenImage } = tmsScreenSlice.actions;
export default tmsScreenSlice.reducer;
