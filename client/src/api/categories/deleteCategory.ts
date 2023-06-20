import { api } from "..";

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`categories/${id}`);
  return response.data;
};
