import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../Types/CartTypes";
import { api } from "../../Config/Api";
import { CouponState } from "../../Types/CouponTypes";
const API_URL = "/api/coupons";
export const applyCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  { rejectValue: string }
>(
  "cart/applyCoupon",
  async ({ jwt, code, orderValue, apply }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/apply`, null, {
        params: { apply, code, orderValue },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Coupon applied successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error applying coupon", error);
      return rejectWithValue(error.message);
    }
  }
);
const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};
export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponApplied = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        if (action.meta.arg.apply == "true") {
          state.couponApplied = true;
        }
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to apply coupon";
        state.couponApplied = false;
      });
  },
});
export default couponSlice.reducer;
