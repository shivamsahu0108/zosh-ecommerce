import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../State/Store";

const ElectricCategory = () => {
  const { customer } = useAppSelector((state) => state);
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b ">
      {customer.homepageData?.electricCategories
        ?.slice(0, 6)
        .map((category) => (
          <ElectricCategoryCard key={category.id} category={category} />
        ))}
    </div>
  );
};

export default ElectricCategory;
