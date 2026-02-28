import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
  name: "url",
  initialState: {
    currentPage: 1,
    totalCount: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    incrementCurrentPage: (state, action) => {
      const next = state.currentPage + action.payload.by;
      state.currentPage = next <= action.payload.max ? next : state.currentPage;
    },
    decrementCurrentPage: (state, action) => {
      const next = state.currentPage - action.payload.by;
      state.currentPage = next >= action.payload.min ? next : state.currentPage;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload(state.totalCount);
    },
  },
});

export const {
  setCurrentPage,
  incrementCurrentPage,
  decrementCurrentPage,
  setTotalCount,
} = urlSlice.actions;
export default urlSlice.reducer;
