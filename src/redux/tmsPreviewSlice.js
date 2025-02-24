import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  previewData: null,
  currentStep: 1,
  date: null,
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    addPreviewData: (state, action) => {
      console.log(action);
      state.previewData = action.payload || null;
    },
    changeCurrentStep: (state, action) => {
      state.currentStep = action.payload || 1;
    },
    changeDate: (state, action) => {
      state.date = action.payload || null;
    },
  },
});

export const { addPreviewData, changeCurrentStep, changeDate } =
  previewSlice.actions;
export default previewSlice.reducer;
