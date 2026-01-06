import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../Types/CartTypes";
import { api } from "../../Config/Api";
import {
  sumCartItemsMrpPrice,
  sumCartItemsSellingPrice,
} from "../../util/sumCartItems";
import { applyCoupon } from "./CouponSlice";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}
const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};
const API_URL = "/api/cart";
export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt: string | null, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Cart fetched", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
interface AddItemRequest {
  productId: number | undefined;
  size: string;
  quantity: number;
}
export const addItemToCart = createAsyncThunk<
  CartItem,
  { jwt: string | null; request: AddItemRequest }
>("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Item added to cart", response.data);
    return response.data;
  } catch (error) {
    console.log("Error adding item to cart", error);
    return rejectWithValue(error.message);
  }
});
export const deleteCartItem = createAsyncThunk<
  any,
  { jwt: string; cartItemId: number }
>("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${API_URL}/delete/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Item deleted from cart", response.data);
    return response.data;
  } catch (error) {
    console.log("Error deleting item from cart", error);
    return rejectWithValue(error.message);
  }
});

export const updateCartItem = createAsyncThunk<
  any,
  { jwt: string | null; cartItemId: number; cartItem: any }
>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Item updated in cart", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating item in cart", error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;
          state.cart?.cartItems.push(action.payload);
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.map((item) =>
            item.id === action.meta.arg.cartItemId ? action.payload : item
          );

          const mrpPrice = sumCartItemsMrpPrice(state.cart?.cartItems || []);
          const sellingPrice = sumCartItemsSellingPrice(
            state.cart?.cartItems || []
          );
          state.cart.totalMrpPrice = mrpPrice;
          state.cart.totalSellingPrice = sellingPrice;
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});
export default cartSlice.reducer;
