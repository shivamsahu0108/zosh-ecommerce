import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { Product } from "../../Types/ProductTypes";

const API_URL = "/products";
export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      const data = response.data;
      console.log("Product fetched: ", data);
      return data;
    } catch (error) {
      console.log("Error fetching product: ", error);
      return rejectWithValue(error.message);
    }
  }
);
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: { query: query },
      });
      const data = response.data;
      console.log("Products fetched by search: ", data);
      return data;
    } catch (error) {
      console.log("Error fetching products by search: ", error);
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });
      const data = response.data;
      console.log("Products all fetched: ", data);
      return data;
    } catch (error) {
      console.log("Error fetching products: ", error);
      return rejectWithValue(error.message);
    }
  }
);
interface ProductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null | undefined | any;
  searchProduct: Product[];
}
const initialState: ProductState = {
  product: null,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
  searchProduct: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder
        .addCase(searchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(searchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.searchProduct = action.payload;
        })
        .addCase(searchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }),
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload.content;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});
export default productSlice.reducer;
