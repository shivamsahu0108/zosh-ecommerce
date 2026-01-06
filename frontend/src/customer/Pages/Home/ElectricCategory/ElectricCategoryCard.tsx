import React from "react";

const ElectricCategoryCard = ({ category }) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <img className="object-contain h-10" src={category.image} alt="laptop" />
      <h2 className="font-semibold text-sm text-center">{category.name}</h2>
    </div>
  );
};

export default ElectricCategoryCard;
