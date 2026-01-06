import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../..//Config/Api";
import { SellerState } from "../seller/sellerSlice";
import { Seller } from "../../Types/SellerTypes";

export const getAllSellers = createAsyncThunk(
  "sellers/getAllSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/sellers`, {
        params: { status }, // ✅ MUST MATCH ENUM + PARAM NAME
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });

      console.log("Sellers fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching sellers", error);
      return rejectWithValue(error.message);
    }
  }
);
export const updateSellerStatus = createAsyncThunk(
  "sellers/updateSellerStatus",
  async ({ jwt, id, status }: any, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/seller/${id}/status/${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Seller status updated successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating seller status", error);
      return rejectWithValue(error.message);
    }
  }
);
const initialState: SellerState = {
  sellers: [],
  selectSeller: [],
  profile: null,
  report: null,
  loading: false,
  error: null,
};

export const allSellerSlice = createSlice({
  name: "allSellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(getAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateSellerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSellerStatus.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.loading = false;
          const index = state.sellers.findIndex(
            (seller) => seller.id === action.payload.id
          );
          if (index !== -1) {
            // Merge instead of replace
            state.sellers[index] = {
              ...state.sellers[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default allSellerSlice.reducer;
