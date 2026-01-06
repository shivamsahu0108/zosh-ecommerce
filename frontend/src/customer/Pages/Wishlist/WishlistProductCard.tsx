import React from "react";
import { Product } from "../../../Types/ProductTypes";
import { Close } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../State/Store";
import { addProductToWishlist } from "../../../State/customer/WishlistSlice";

const WishlistProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const handleWishlist = () => {
    product.id && dispatch(addProductToWishlist({ productId: product.id }));
  };
  return (
    <div className="w-60 relative">
      <div className="w-full">
        <img src={product.images[0]} alt="" className="object-top w-full" />
      </div>
      <div className="pt-3 space-y-1">
        <p className="">{product.title}</p>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">
            &#8377; {product.sellingPrice}
          </span>
          <span className="thin-line-through text-gray-400">
            &#8377; {product.mrpPrice}
          </span>
          <span className="text-primary-color font-semibold">
            {product.discountPercent}%
          </span>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <Button onClick={handleWishlist}>
          <Close
            sx={{ color: teal[500], fontSize: "2rem" }}
            className="cursor-pointer rounded-full p-1"
          />
        </Button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
