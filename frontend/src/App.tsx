import { ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";
import Home from "./customer/Pages/Home/Home";
import Product from "./customer/Pages/Product/Product";

import Review from "./customer/Pages/Review/Review";
import Cart from "./customer/Pages/Cart/Cart";
import Checkout from "./customer/Pages/Checkout/Checkout";
import Account from "./customer/Pages/Account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductDetails from "./customer/Pages/ProductDetails/ProductDetails";
import BecomeSeller from "./customer/Pages/Become Seller/BecomeSeller";

import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import SellerDashboard from "./Seller/Pages/SellerDashboard/SellerDashboard";
import Auth from "./customer/Pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSuccess from "./customer/Pages/PaymentSuccess";
import Wishlist from "./customer/Pages/Wishlist/Wishlist";
import { createHomeCategories } from './State/customer/CustomerSlice';
import { homeCategories } from './data/HomeCategories';

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(fetchSellerProfile(token));
    }
    dispatch(createHomeCategories(homeCategories));
  }, [dispatch]);

  // Auto-redirect seller to dashboard ONLY when appropriate
  useEffect(() => {
    if (seller.profile) {
      navigate("/seller");
    }
  }, [seller.profile]);

  useEffect(() => {
    dispatch(
      fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") })
    );
  }, [auth.jwt]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment-success/:orderId"
            element={<PaymentSuccess />}
          />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
