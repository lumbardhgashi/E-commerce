import { api } from "..";

export const createSemundja = async (data: {name: string, specializimiId: string}) => {

  const response = await api.post(`semundja`, data);
  return response.data;
};
