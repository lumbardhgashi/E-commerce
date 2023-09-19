import { api } from "..";

export const deleteSpecializimi = async (id: string) => {
  const response = await api.delete(`specializimi/${id}`);
  return response.data;
};
