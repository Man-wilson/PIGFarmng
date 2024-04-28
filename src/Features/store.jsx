import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
  },
});
