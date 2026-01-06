import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../Types/WishlistTypes";
import { api } from "../../Config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};
export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Wishlist fetched successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching wishlist", error);
      return rejectWithValue(error.message);
    }
  }
);
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({productId}: { productId: number }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      console.log("Product added to wishlist successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("Error adding product to wishlist", error);
      return rejectWithValue(error.message);
    }
  }
);
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getWishlistByUserId.fulfilled,
        (state, action: PayloadAction<Wishlist>) => {
          state.loading = false;
          state.wishlist = action.payload;
        }
      )
      .addCase(
        getWishlistByUserId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProductToWishlist.fulfilled,
        (state, action: PayloadAction<Wishlist>) => {
          state.loading = false;
          state.wishlist = action.payload;
        }
      )
      .addCase(
        addProductToWishlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
