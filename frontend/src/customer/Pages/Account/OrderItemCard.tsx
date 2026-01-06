import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import { ElectricBolt } from "@mui/icons-material";
import { Order, OrderItem } from "../../../Types/OrderTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
} from "../../../State/customer/OrderSlice";
import { useEffect } from "react";

const OrderItemCard = ({ item, order }: { item: OrderItem; order: Order }) => {
  const navigate = useNavigate();
 
  return (
    <div
      className="text-sm bg-white p-5 space-y-4 border border-gray-200 rounded-md cursor-pointer"
      onClick={() => navigate(`/account/order/${order.id}/${item.id}`)}
    >
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: teal[500] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className=" font-bold text-primary-color">PENDING</h1>
          <p>Arriving by {order.deliverDate}</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img className="w-[70px]" src={item.product?.images[0]} alt="" />
        </div>
        <div className="">
          <h1 className="font-bold pb-1">
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p>{item.product.title}</p>
          <div>
            <strong>size: </strong>
            FREE
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
