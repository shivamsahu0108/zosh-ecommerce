import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const ElectronicTable = () => {
  const { customer } = useAppSelector((state) => state);

  return (
    <div>
      <HomeCategoryTable data={customer.homepageData?.electricCategories || []} />
    </div>
  );
};

export default ElectronicTable;
