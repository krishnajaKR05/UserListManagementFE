import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import usersReducer from "./Slice/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
