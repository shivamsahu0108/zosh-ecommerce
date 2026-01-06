import React from "react";
import { Deal } from "../../../../Types/DealTypes";

const DealCard = ({ deal }: {deal: Deal}) => {
  return (
    <div className="w-[13rem] cursor-pointer">
      <img
        className="border-x-[7px] border-t-[7px] border-pink-600 w-full h-fit object-cover object-top "
        src={deal.category.image}
        alt=""
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center p-2 text-center">
        <p className="text-lg font-semibold">{deal.category.name}</p>
        <p className="text-2xl font-bold">{deal.discount}% Off</p>
        <p className="text-balance text-lg">Shop Now</p>
      </div>
    </div>
  );
};

export default DealCard;
