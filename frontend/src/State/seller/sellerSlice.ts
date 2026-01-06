import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("fetch Seller Profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export interface SellerState {
  sellers: any[];
  selectSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectSeller: [],
  profile: null,
  report: null,
  loading: false,
  error: null,
};
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default sellerSlice.reducer;
