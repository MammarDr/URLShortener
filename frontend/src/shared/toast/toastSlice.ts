import { createSlice } from "@reduxjs/toolkit";

export type ToastType = "success" | "error" | "info" | "alert";

export type Toast = {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  duration: number;
};

const toastSlice = createSlice({
  name: "toast",
  initialState: [] as Toast[],
  reducers: {
    add: (state, action) => {
      state.push({ id: crypto.randomUUID(), ...action.payload });
    },
    remove: (state, action) => {
      return state.filter((t: Toast) => t.id !== action.payload);
    },
  },
});

export const { add, remove } = toastSlice.actions;

export default toastSlice.reducer;
