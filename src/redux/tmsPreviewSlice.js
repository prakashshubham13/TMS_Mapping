import { createSlice } from "@reduxjs/toolkit";

const previewSlice = createSlice({
    name:'preview',
    initialState:{
        previewData: null
},
    reducers:{
        addPreviewData: (state, action) => {
            console.log(action);
            
            state.previewData = action.payload;
        }
    }
});

export const {addPreviewData} = previewSlice.actions;
export default previewSlice.reducer;