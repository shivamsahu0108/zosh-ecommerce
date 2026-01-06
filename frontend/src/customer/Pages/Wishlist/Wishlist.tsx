import React, { useEffect } from "react";
import WishlistProductCard from "./WishlistProductCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { getWishlistByUserId } from "../../../State/customer/WishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state);
  
  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, []);
  return (
    <div className="h-[85vh] p-5 lg:p-20">
      <section>
        <h1>
          <strong>My Wishlist</strong> 5 items
        </h1>
        <div className="pt-10 flex flex-wrap g-5">
          {wishlist.wishlist?.products.map((product) => (
            <WishlistProductCard product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
