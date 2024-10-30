import { createSlice, current } from "@reduxjs/toolkit";

const previewSlice = createSlice({
    name:'preview',
    initialState:{
        previewData: null,
        currentStep: 1
},
    reducers:{
        addPreviewData: (state, action) => {
            console.log(action);
            
            state.previewData = action.payload;
        },
        changeCurrentStep:(state, action) => {
            state.currentStep = action.payload;
        }
    }
});

export const {addPreviewData, changeCurrentStep} = previewSlice.actions;
export default previewSlice.reducer;