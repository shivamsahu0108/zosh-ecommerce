import { CartItem } from "../Types/CartTypes";

export const sumCartItemsMrpPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + item.mrpPrice * item.quantity,
    0
  );
};

export const sumCartItemsSellingPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0
  );
};
