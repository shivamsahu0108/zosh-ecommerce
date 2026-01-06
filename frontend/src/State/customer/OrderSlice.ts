import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderItem, OrderState } from "../../Types/OrderTypes";
import { api } from "../../Config/Api";
import { Address } from "../../Types/UserTypes";

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};
const API_URL = "/api/orders";
export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
  "order/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Order history fetched", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user order history", error);
      return rejectWithValue(
        error.message.data.error || "Error fetching order history"
      );
    }
  }
);
export const fetchOrderById = createAsyncThunk<
  Order,
  { orderId: number; jwt: string }
>("order/fetchOrderById", async ({ orderId, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Order fetched", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching order", error);
    return rejectWithValue(error.message);
  }
});
export const createOrder = createAsyncThunk<
  any,
  { address: Address; jwt: string; paymentMethod: string }
>(
  "order/createOrder",
  async ({ address, jwt, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}`, address, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { paymentMethod: paymentMethod },
      });
      console.log("Order created", response.data);
      if (response.data.payment_link_url) {
        window.location.href = response.data.payment_link_url;
      }
      return response.data;
    } catch (error) {
      console.log("Error creating order", error);
      return rejectWithValue(error.message);
    }
  }
);
export const fetchOrderItemById = createAsyncThunk<
  OrderItem,
  { orderItemId: number; jwt: string }
>(
  "order/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/item/${orderItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Order items fetched", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching order items", error);
      return rejectWithValue(error.message);
    }
  }
);
export const paymentSuccess = createAsyncThunk<
  any,
  { paymentId: string; jwt: string; paymentLinkId: string },
  { rejectValue: string }
>(
  "orders/paymentSuccess",
  async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/payment/${paymentId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
        params: { paymentLinkId },
      });
      console.log("Payment success", response.data);
      return response.data;
    } catch (error) {
      console.log("Error in payment success", error);
      return rejectWithValue(error.message);
    }
  }
);
export const cancelOrder = createAsyncThunk<Order, any>(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/${orderId}/cancel`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Order canceled", response.data);
      return response.data;
    } catch (error) {
      console.log("Error canceling order", error);
      return rejectWithValue(error.message);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(
        fetchUserOrderHistory.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payment successful: ", action.payload);
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          action.payload.id === order.id ? action.payload : order
        );
        state.orderCanceled = true;
        state.currentOrder = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default orderSlice.reducer;
