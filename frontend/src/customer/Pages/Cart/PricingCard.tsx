import { Divider } from "@mui/material";
import React from "react";

const PricingCard = () => {
  return (
    <>
      <div className="space-y-3 p-5 ">
        <div className="flex justify-between items-center ">
          <span className="">Subtotal</span>
          <span>₹899</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="">Discount</span>
          <span>₹699</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="">Shipping</span>
          <span>₹79</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="">Platform fee</span>
          <span>Free</span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center font-semibold p-5 text-primary-color ">
        <span className="">Total</span>
        <span>₹209</span>
      </div>
    </>
  );
};

export default PricingCard;
