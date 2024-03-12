import { calcTotalPrice } from "./calcTotalPrice";

export const getLSProducts = () => {
  const data = localStorage.getItem("cartProduct");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
