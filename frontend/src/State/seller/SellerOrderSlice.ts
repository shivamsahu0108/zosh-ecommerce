import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../Types/OrderTypes";
import { api } from "../../Config/Api";

export const fetchSellerOrders = createAsyncThunk<Order[], string>(
  "sellerOrder/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/seller/orders", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Orders fetched", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders", error);
      return rejectWithValue(error);
    }
  }
);
export const updateOrderStatus = createAsyncThunk<
  Order,
  {
    jwt: string;
    orderId: string;
    orderStatus: OrderStatus;
  }
>(
  "sellerOrder/updateOrderStatus",
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Order status updated", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating order status", error);
      return rejectWithValue(error);
    }
  }
);
export const deleteOrder = createAsyncThunk<
  Order,
  { jwt: string; orderId: number }
>("sellerOrder/deleteOrder", async ({ jwt, orderId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/seller/orders/${orderId}/delete`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Order deleted", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting order", error);
    return rejectWithValue(error);
  }
});
interface SellerOrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}
const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: null,
};
const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellerOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) state.orders[index] = action.payload;
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default sellerOrderSlice.reducer;
