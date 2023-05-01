import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarIsVisible: false,
  popupIsVisible: false,
  popupNotification: {
    title: "",
    text: "",
    onSubmit: null,
    isVisible: false,
  },
  notification: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleMenu(state) {
      state.sideBarIsVisible = !state.sideBarIsVisible;
    },
    togglePopup(state, { payload }) {
      state.popupIsVisible = payload;
    },
    togglePopupNotification(state, { payload }) {
      state.popupNotification = payload;
    },
    showNotification(state, { payload }) {
      state.notification = {
        status: payload.status,
        title: payload.title,
        message: payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
