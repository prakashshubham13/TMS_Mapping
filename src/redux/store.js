import { configureStore } from "@reduxjs/toolkit";
import tmsScreenSlice from "./tmsScreenSlice";
import tmsMappingSlice from "./tmsMappingSlice";
import tmsPreviewSlice from './tmsPreviewSlice';
export const store = configureStore({
    reducer:{
        tmsScreen: tmsScreenSlice,
        tmsMapping: tmsMappingSlice,
        tmsPreview: tmsPreviewSlice
    }
});