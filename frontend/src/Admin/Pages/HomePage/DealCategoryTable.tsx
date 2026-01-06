import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const DealCategoryTable = () => {
  const { customer } = useAppSelector((state) => state);
  return (
    <div>
      <HomeCategoryTable data={customer.homepageData?.dealCategories || []} />
    </div>
  );
};

export default DealCategoryTable;
