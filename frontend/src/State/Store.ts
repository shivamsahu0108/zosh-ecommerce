import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/SellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/CartSlice";
import orderSlice from "./customer/OrderSlice";
import wishlistSlice from "./customer/WishlistSlice";
import sellerOrderSlice from "./seller/SellerOrderSlice";
import transactionSlice from "./seller/TransactionSlice";
import adminSlice from "./admin/AdminSlice";
import dealSlice from "./admin/DealSlice";
import customerSlice from "./customer/CustomerSlice";
import adminCouponSlice from "./admin/CouponSlice";
import  allSellerSlice  from "./admin/allSellerSlice";

const rootReducer = combineReducers({ 
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  customer: customerSlice,

  //seller  slice
  sellerOrder: sellerOrderSlice,
  transactions: transactionSlice,

  //Admin slice
  admin: adminSlice,
  deal: dealSlice,
  adminCoupons: adminCouponSlice,
  allSellers: allSellerSlice,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
