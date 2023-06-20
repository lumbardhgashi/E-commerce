import { api } from "..";

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`products/${id}`);
  return response.data;
};
