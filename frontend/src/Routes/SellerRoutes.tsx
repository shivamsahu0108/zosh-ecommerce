import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../Seller/Pages/Products/Products";
import AddProducts from "../Seller/Pages/Products/AddProducts";
import Orders from "../Seller/Pages/Orders/Orders";
import Payment from "../Seller/Pages/Payment/Payment";
import Profile from "../Seller/Pages/Account/Profile";
import Transaction from "../Seller/Pages/Payment/Transaction";
import Dashboard from "../Seller/Pages/SellerDashboard/Dashboard";

const SellerRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Products />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/account" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default SellerRoutes;
