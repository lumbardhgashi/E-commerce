import { api } from "../api";

export const removeItemFromCart = async (productId: string) => {
  const response = await api.post("cart/remove", {productId});
  return response.data;
};
