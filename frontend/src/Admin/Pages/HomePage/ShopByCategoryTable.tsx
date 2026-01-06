import React from "react";

import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const ShopByCategoryTable = () => {
  const { customer } = useAppSelector((state) => state);
  return (
    <div className="">
      <HomeCategoryTable data={customer.homepageData?.shopByCategories || []} />
    </div>
  );
};

export default ShopByCategoryTable;
