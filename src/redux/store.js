import { configureStore } from "@reduxjs/toolkit";
import tmsScreenSlice from "./tmsScreenSlice";
import tmsMappingSlice from "./tmsMappingSlice";
import tmsPreviewSlice from "./tmsPreviewSlice";
import configScreenSlice from "./ConfigScreenSlice";
import checklistSlice from "./checklistSlice";

export const store = configureStore({
  reducer: {
    tmsScreen: tmsScreenSlice,
    tmsMapping: tmsMappingSlice,
    tmsPreview: tmsPreviewSlice,
    configScreen: configScreenSlice,
    checklist: checklistSlice,
  },
});

store.subscribe(() => {
  const tmsScreenState = JSON.stringify(store.getState().tmsScreen);
  if (tmsScreenState !== undefined) {
    // localStorage.setItem("tmsScreen", tmsScreenState);
  }

  const tmsMappingState = JSON.stringify(store.getState().tmsMapping);
  if (tmsMappingState !== undefined) {
    // localStorage.setItem("tmsMapping", tmsMappingState);
  }

  const configScreenState = JSON.stringify(store.getState().configScreen);
  if (configScreenState !== undefined) {
    // localStorage.setItem("configScreen", configScreenState);
  }
});
