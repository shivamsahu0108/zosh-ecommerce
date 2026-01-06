import React from "react";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = () => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 justify-between gap-4 gap-y-8">
      {[1, 2, 3, 4, 5, 6, 7].map((product) => (
        <SimilarProductCard key={product} />
      ))}
    </div>
  );
};

export default SimilarProduct;
