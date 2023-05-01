import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import detailsReducer from "./details-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    details: detailsReducer,
  },
});

export default store;
