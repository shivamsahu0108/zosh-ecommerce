import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { User } from "../../Types/UserTypes";
import { Order } from "../../Types/OrderTypes";
import { Seller } from "../../Types/SellerTypes";

export interface Transaction {
  id: number;
  customer: User;
  order: Order;
  seller: Seller;
  date: string;
}
interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
}
const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};
export const fetchTransactionsBySeller = createAsyncThunk<
  Transaction[],
  string,
  {
    rejectValue: string;
  }
>("transaction/fetchTransactionsBySeller", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/transactions/seller", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Transactions fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching transactions", error);
    return rejectWithValue(error.message);
  }
});
export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  void,
  {
    rejectValue: string;
  }
>("transaction/fetchAllTransactions", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Transaction[]>("/api/transactions");
    console.log("All Transactions fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching all transactions", error);
    return rejectWithValue(error.message);
  }
});

const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default TransactionSlice.reducer;
