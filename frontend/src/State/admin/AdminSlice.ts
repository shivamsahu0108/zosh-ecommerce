import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory } from "../../Types/HomeCategory";
import { api } from "../../Config/Api";
const API_URL = "/admin";
export const updateHomeCategory = createAsyncThunk<
  HomeCategory,
  { id: number; data: HomeCategory }
>("admin/updateHomeCategory", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`${API_URL}/home-category/${id}`, data);
    console.log("Home category updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.log("Error updating home category", error);
    return rejectWithValue(error.message);
  }
});
export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
  "admin/fetchHomeCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/home-category`);
      console.log("Home categories fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching home categories", error);
      return rejectWithValue(error.message);
    }
  }
);
interface HomeCategoryState {
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
  categoryUpdated: boolean;
}
const initialState: HomeCategoryState = {
  homeCategories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryUpdated = true;
        const index = state.homeCategories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.homeCategories[index] = action.payload;
        } else {
          state.homeCategories.push(action.payload);
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;

        state.categoryUpdated = false;
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default adminSlice.reducer;
