import { api } from "..";

export const updateCategory = async (data: { id: string; name: string }) => {
  const { id, name } = data;

  const response = await api.put(`categories/${id}`, {
    name,
  });
  return response.data;
};
