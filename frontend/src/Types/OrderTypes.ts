import { Product } from "./ProductTypes";
import { Address, User } from "./UserTypes";

export interface OrderState {
  orders: Order[];
  orderItem: OrderItem | null;
  currentOrder: Order | null;
  paymentOrder: any | null;
  loading: boolean;
  error: string | null;
  orderCanceled: boolean;
}
export interface Order {
  id: number;
  orderId: string;
  user: User;
  sellerId: number;
  orderItems: OrderItem[];
  orderDate: string;
  shippingAddress: Address;
  paymentDetails: string;
  totalMrpPrice: number;
  totalSellingPrice?: number;
  discount?: number;
  orderStatus: string;
  totalItem: number;
  deliverDate: string;
}
export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  addresses?: Address[];
  size: string;
  quantity: number;
  sellingPrice: number;
  mrpPrice: number;
  userId: number;
}
