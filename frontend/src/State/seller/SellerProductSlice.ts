import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../Types/ProductTypes";
import { api } from "../../Config/Api";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
  "/sellers/fetchSellerProducts",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/seller/products", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Products fetched", response.data);
      const data = response.data;
      return data;
    } catch (error) {
      console.log("Error fetching products", error);
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk<
  Product,
  { request: any; jwt: string | null }
>("/sellers/createProduct", async (args, { rejectWithValue }) => {
  const { request, jwt } = args;
  try {
    const response = await api.post("/seller/products", request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Product created", response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: string | null | undefined;
}
const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
      builder
        .addCase(createProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
  },
});
export default sellerProductSlice.reducer;
