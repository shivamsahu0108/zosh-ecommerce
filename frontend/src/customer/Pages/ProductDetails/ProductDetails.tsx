import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import {
  Add,
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector((state) => state);
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, [productId]);
  const handleActiveImage = (index: number) => {
    setActiveImage(index);
  };
  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5 ">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item, index) => (
              <img
                onClick={() => handleActiveImage(index)}
                key={item}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>
        <section>
          <div className="text-primary-color">
            <h1 className="font-bold text-lg text-primary-color">
              {product.product?.seller?.businessDetails.businessName}
            </h1>
            <p className="text-gray-500 font-semibold">
              {product.product?.title}
            </p>
            <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
              <div className="flex gap-1 items-center">
                <span className="">4</span>
                <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
              </div>
              <Divider orientation="vertical" flexItem />
              <span className="">234 ratings</span>
            </div>
            <div className="">
              <div className="price flex items-center gap-3 mt-5 text-2xl">
                <span className="font-sans text-gray-800">
                  &#8377; {product.product?.sellingPrice}
                </span>
                <span className="line-through text-gray-400">
                  &#8377; {product.product?.mrpPrice}
                </span>
                <span className="text-primary-color font-semibold">
                  {product.product?.discountPercent}%
                </span>
              </div>
              <p className="text-sm">
                Inclusive of all taxes. Free shopping above &#8377; 500
              </p>
              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-4">
                  <Shield sx={{ color: teal[500] }} />
                  <p className="text-sm">Authentic & Quality Assured</p>
                </div>
                <div className="flex items-center gap-4">
                  <WorkspacePremium sx={{ color: teal[500] }} />
                  <p className="text-sm">100% money back guarantee</p>
                </div>
                <div className="flex items-center gap-4">
                  <LocalShipping sx={{ color: teal[500] }} />
                  <p className="text-sm">Free shipping & returns</p>
                </div>
                <div className="flex items-center gap-4">
                  <Wallet sx={{ color: teal[500] }} />
                  <p className="text-sm">Pay on delivery might be available</p>
                </div>
              </div>
              <div className="mt-7 space-y-2">
                <h1>QUANTITY</h1>
                <div className="flex items-center gap-2 w-[140px] justify-between">
                  <Button
                    disabled={quantity == 1}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <Remove />
                  </Button>
                  <span>{quantity}</span>
                  <Button onClick={() => setQuantity(quantity + 1)}>
                    <Add />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-5">
              <Button
                fullWidth
                startIcon={<AddShoppingCart />}
                variant="contained"
                sx={{ py: "1rem" }}
              >
                Add to Bag
              </Button>
              <Button
                fullWidth
                startIcon={<FavoriteBorder />}
                variant="outlined"
                sx={{ py: "1rem" }}
              >
                Wishlist
              </Button>
            </div>
            <div className="mt-5">
              <p>{product.product?.description}</p>
            </div>
          </div>
          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>
      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Products</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
