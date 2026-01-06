import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { HomeCategory, HomeData } from "../../Types/HomeCategory";

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  "customer/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post(`/home/categories`, homeCategories);
      console.log("Home categories created successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error creating home categories", error);
      return rejectWithValue(error.message);
    }
  }
);
interface HomeState {
  homepageData: HomeData | null;
  homeCategories: HomeCategory[] | null;
  loading: boolean;
  error: string | null;
}
const initialState: HomeState = {
  homepageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homepageData = action.payload;
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to create home categories";
      });
  },
});
export default customerSlice.reducer;
