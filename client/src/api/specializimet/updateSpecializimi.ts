import { api } from "..";

export const updateSpecializimi = async (data: { id: string; name: string }) => {
  const { id, name } = data;

  const response = await api.put(`specializimi/${id}`, {
    name,
  });
  return response.data;
};
