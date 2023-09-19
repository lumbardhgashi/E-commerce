import { api } from "..";

export const updateSemundja = async (data: { id: string; name: string, specializimiId: string }) => {
  const { id, name, specializimiId } = data;

  const response = await api.put(`semundja/${id}`, {
    name,
    specializimiId
  });
  return response.data;
};
