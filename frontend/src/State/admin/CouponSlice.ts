import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Coupon, CouponState } from "../../Types/CouponTypes";
import { api } from "../../Config/Api";
const API_URL = "/api/coupons";
const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};

export const createCoupon = createAsyncThunk<Coupon, any>(
  "coupon/createCoupon",
  async (coupon, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/admin/create`, coupon, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Coupon created successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error creating coupon", error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const getAllCoupons = createAsyncThunk(
  "coupon/getAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Coupons fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching coupons", error);
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCoupon = createAsyncThunk<number, number>(
  "coupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Coupon deleted successfully", id);
      return id;
    } catch (error) {
      console.log("Error deleting coupon", error);
      return rejectWithValue(error.message);
    }
  }
);

const adminCouponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.couponCreated = true;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default adminCouponSlice.reducer;
