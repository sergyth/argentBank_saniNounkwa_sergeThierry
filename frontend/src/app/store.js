import { configureStore } from "@reduxjs/toolkit";
import {loginReducer} from "./loginSlice";
import { userReducer } from "./userSlice";


/**
 * Configures store
 */
export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  }),

})