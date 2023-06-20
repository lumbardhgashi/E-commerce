import { api } from "..";

export const updateProduct = async (data: { id: string; name: string }) => {
  const { id, name } = data;

  const response = await api.put(`products/${id}`);
  return response.data;
};
