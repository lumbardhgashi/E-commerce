import { api } from "..";

export const deleteSemundja = async (id: string) => {
  const response = await api.delete(`semundja/${id}`);
  return response.data;
};
