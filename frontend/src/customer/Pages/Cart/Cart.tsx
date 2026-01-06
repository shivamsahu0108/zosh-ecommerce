import React, { useEffect } from "react";
import CartItemCard from "./CartItemCard";
import { Close, LocalOffer } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Button, IconButton, TextField } from "@mui/material";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../../../State/Store";
import { fetchUserCart } from "./../../../State/customer/CartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state);
  const [couponCode, setCouponCode] = React.useState("");
  const [isCouponApplied, setIsCouponApplied] = React.useState(true);
  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, []);
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 max-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {cart.cart?.cartItems.map((item) => (
            <CartItemCard item={item} />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3 ">
          <div className=" rounded-md px-5 py-3 space-y-5 border border-gray-200">
            <div className="flex gap-3 text-sm items-center">
              <div className="flex gap-3 text-sm items-center">
                <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              </div>
              <span className="">Apply Coupons</span>
            </div>
            {isCouponApplied ? (
              <div className="flex items-center">
                <TextField
                  id="outlined-basic"
                  placeholder="Enter coupon code"
                  size="small"
                  variant="outlined"
                  value={couponCode}
                  onChange={handleChange}
                />
                <Button
                  onClick={() => {
                    if (couponCode.trim() !== "") {
                      setIsCouponApplied(false);
                    }
                  }}
                  size="small"
                >
                  Apply
                </Button>
              </div>
            ) : (
              <div className="flex">
                <div className="p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center">
                  <span>{couponCode} Applied</span>
                  <IconButton
                    onClick={() => {
                      setIsCouponApplied(true);
                      setCouponCode("");
                    }}
                    size="small"
                  >
                    <Close className="text-red-600" />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
          <div className="border rounded-md border-gray-200">
            <PricingCard />
            <div className="p-5">
              <Button
                variant="contained"
                sx={{ py: "11px" }}
                fullWidth
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
