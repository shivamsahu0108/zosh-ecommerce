import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Divider } from "@mui/material";
import Orders from "./Orders";
import OrdersDetails from "./OrdersDetails";
import UserDetails from "./UserDetails";
import Address from "./Address";
import { logout } from "../../../State/AuthSlice";
import { useAppDispatch } from "../../../State/Store";
const menu = [
  { name: "Orders", path: "/account/orders" },
  { name: "Profile", path: "/account" },
  { name: "Saved Cards", path: "/account/saved-card" },
  { name: "Addresses", path: "/account/addresses" },
  { name: "Logout", path: "/" },
];
const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = (item: any) => {
    if (item.path === "/") {
      dispatch(logout(navigate));
    }
    navigate(item.path);
  };
  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div className="">
        <h1 className="text-xl font-bold pb-5">Account</h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[70vh]">
        <section className="col-span-1 lg:border-r border-gray-200 lg:pr-5 py-5 h-full">
          {menu.map((item) => (
            <div
              onClick={() => handleClick(item)}
              key={item.name}
              className={`py-3 cursor-pointer hover:text-white hover:bg-primary-color px-5 rounded-md ${
                location.pathname === item.path
                  ? "text-white bg-primary-color"
                  : ""
              } border-b border-gray-200 `}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </section>
        <section className=" lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="order/:orderId/:orderItemId"
              element={<OrdersDetails />}
            />
            <Route path="/addresses" element={<Address />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
