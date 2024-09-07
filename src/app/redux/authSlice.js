// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "cookies-next";
import axiosInstance from "../api/axiosInstance";
import { APIENDPOINT } from "../api/apiEndpoints";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(APIENDPOINT.adminlogin, {
        email,
        password,
      });
      const { token } = response.data;
      // Set token in cookies
      setCookie("authToken", token, {
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  deleteCookie("authToken", { path: "/login" });
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export default authSlice.reducer;
