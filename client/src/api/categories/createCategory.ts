import { api } from "..";

export const createCategory = async (data: {name: string}) => {

  const response = await api.post(`categories`, data);
  return response.data;
};
