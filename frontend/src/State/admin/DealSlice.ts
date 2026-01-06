import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, DealState } from "../../Types/DealTypes";
import { api } from "../../Config/Api";

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};
export const createDeal = createAsyncThunk(
  "deal/createDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Deal created successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error creating deal", error);
      return rejectWithValue(error.message);
    }
  }
);
export const getAllDeals = createAsyncThunk(
  "deal/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Deals fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching deals", error);
      return rejectWithValue(error.message);
    }
  }
);
export const deleteDeal = createAsyncThunk<ApiResponse, number>(
  "deal/deleteDeal",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Deal deleted successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error deleting deal", error);
      return rejectWithValue(error.message);
    }
  }
);

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDeal.fulfilled, (state) => {
        state.loading = false;
        state.dealCreated = true;
      });
  },
});
export default dealSlice.reducer;
