import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

export const sellerLogin = createAsyncThunk<any, any>(
  "seller/login",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      console.log("Sent OTP", response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
