import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    'Main_Screen':[],
    'Details_Screen':[],
    'Login_Screen':[]
};
const tmsScreenSlice = createSlice({
    name:'tmsScreen',
    initialState,
    reducers: {
        addNewScreen: (state, action) => {
            state[action.payload.screenName] = [];
        },
        uploadScreenImage: (state, action) => {
            console.log(state, action);
            
            state[action.payload.screenName] = [...state[action.payload.screenName], action.payload.newImage];
        }
    }
});

export const {addNewScreen, uploadScreenImage} = tmsScreenSlice.actions;
export default tmsScreenSlice.reducer;