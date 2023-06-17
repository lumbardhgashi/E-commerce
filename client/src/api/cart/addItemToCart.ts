import { api } from "../api";

export const addItemToCart = async (productId: string) => {
  const response = await api.post("cart/add", {productId});
  return response.data;
};
