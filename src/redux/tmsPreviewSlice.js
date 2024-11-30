import { createSlice, current } from "@reduxjs/toolkit";

const previewSlice = createSlice({
    name:'preview',
    initialState:{
        previewData: null,
        currentStep: 1,
        date: null
},
    reducers:{
        addPreviewData: (state, action) => {
            console.log(action);
            
            state.previewData = action.payload;
        },
        changeCurrentStep:(state, action) => {
            state.currentStep = action.payload;
        },
        changeDate:(state, action) => {
            state.date = action.payload;
        }
    }
});

export const {addPreviewData, changeCurrentStep, changeDate} = previewSlice.actions;
export default previewSlice.reducer;