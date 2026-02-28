import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice.ts";
import authReducer from "../features/auth/store/authSlice.ts";
import toastReducer from "../shared/toast/toastSlice";
import urlReducer from "../features/url/store/urlSlice.ts";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    toast: toastReducer,
    url: urlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
