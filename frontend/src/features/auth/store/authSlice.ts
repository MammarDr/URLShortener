import { createSlice } from "@reduxjs/toolkit";
import queryClient from "../../../app/queryClient";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("jwt") ? true : false,
    accessToken: localStorage.getItem("jwt") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("jwt", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
      queryClient.clear();
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
