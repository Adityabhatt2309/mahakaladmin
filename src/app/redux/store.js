// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import globalReducer from '../redux/globalSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    global:globalReducer,
  },
});
export default store;
