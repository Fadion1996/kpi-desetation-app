import { createSlice } from "@reduxjs/toolkit";
import { DetailState } from "../types";

const initialState = {
  activeAssembleItem: -1,
  selectedAssembleItem: -1,
  assembleItems: [],
  firstDetail: {
    width: 0,
    height: 0,
    innerRadius: 0,
    outerRadius: 0,
  },
  secondDetail: {
    width: 0,
    height: 0,
    innerRadius: 0,
    outerRadius: 0,
  },
} as DetailState;

const detailsSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    addAssembleItems(state, { payload }) {
      state.assembleItems = [...state.assembleItems, payload];
      state.activeAssembleItem = state.assembleItems.length - 1;
    },
    setActiveAssembleItem(state, { payload }) {
      state.activeAssembleItem = payload;
    },
    setSelectedAssembleItem(state, { payload }) {
      state.selectedAssembleItem = payload;
    },
    deleteAssembleItem(state, { payload }) {
      state.assembleItems = state.assembleItems.filter(
        (item, index) => index !== payload
      );
      state.selectedAssembleItem = -1;
      if (state.activeAssembleItem === payload) {
        state.activeAssembleItem = -1;
      }
    },
    displayPopup(state, { payload }) {
      state.activeAssembleItem = payload;
    },
    updateAssembleItems(state, { payload }) {
      const existingItem = state.assembleItems[state.activeAssembleItem];
      if (existingItem) {
        console.log("updateAssembleItems", existingItem, payload);
        state.assembleItems[state.activeAssembleItem] = payload;
      }
    },
    resetDetailParams(state, { payload }) {
      payload.detailType === "first"
        ? (state.firstDetail = initialState.firstDetail)
        : (state.secondDetail = initialState.secondDetail);
    },
    addNewAssembleItem(state, { payload }) {
      state.assembleItems.push(payload);
    },
  },
});

export const detailsActions = detailsSlice.actions;

export default detailsSlice.reducer;
