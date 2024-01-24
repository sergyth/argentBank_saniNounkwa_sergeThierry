import { configureStore } from "@reduxjs/toolkit";
import {loginReducer, userReducer } from "./redux";


/**
 * Configures store
 */
export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer
  }

})