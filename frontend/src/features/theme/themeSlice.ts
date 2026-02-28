import { createSlice } from "@reduxjs/toolkit";

function changeTo(color: string) {
  const htmlElement = document.documentElement;
  htmlElement.classList.remove(color === "light" ? "dark" : "light");
  htmlElement.classList.add(color);
  localStorage.setItem("theme", color);
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    color: (() => {
      const curr = localStorage.getItem("theme") || "light";
      changeTo(curr);
      return curr;
    })(),
  },
  reducers: {
    setTheme: (state, action) => {
      state.color = action.payload;
      changeTo(state.color);
    },
    toggleTheme: (state) => {
      state.color = state.color === "light" ? "dark" : "light";
      changeTo(state.color);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
