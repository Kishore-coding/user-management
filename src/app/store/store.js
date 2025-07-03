import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userslice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});
