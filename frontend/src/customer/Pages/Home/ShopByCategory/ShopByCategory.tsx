import { useAppSelector } from "../../../../State/Store";
import ShopByCategoryCard from "./ShopByCategoryCard";

const ShopByCategory = () => {
  const { customer } = useAppSelector((state) => state);
  return (
    <div className="flex flex-wrap gap-7 justify-between lg:px-20">
      {customer.homepageData?.shopByCategories.map((item) => (
        <ShopByCategoryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ShopByCategory;
