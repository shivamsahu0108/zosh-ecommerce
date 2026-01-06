import React from "react";
import { useAppSelector } from "../../../State/Store";

import HomeCategoryTable from "./HomeCategoryTable";

const GridTable = () => {
  const { customer } = useAppSelector((state) => state);
  return (
    <div className="">
      <HomeCategoryTable data={customer.homepageData?.grid || []} />
    </div>
  );
};

export default GridTable;
