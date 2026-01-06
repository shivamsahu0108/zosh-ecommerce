import { Favorite, ModeComment } from "@mui/icons-material";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";

const SimilarProductCard = () => {
  return (
    <div className="group px-4 relative">
      <div className="card">
        <div className="">
          <img
            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQToLt6WI5gzpW7jLXXkpel45vHl7qlg03YlUgeFmOW_ZLdX7BE0_Ho_2s8mg3AXhHJxmRzMKoHE0-7_zR2whTBwFlL-EVDdWYfvjSasT1tk5OWPgw92K_0"
            alt=""
            className="card-media object-top"
          />
        </div>
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1>Niky</h1>
          <p>Blue shirt</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">&#8377; 400</span>
          <span className="line-through text-gray-400">&#8377; 999</span>
          <span className="text-primary-color font-semibold">60%</span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
