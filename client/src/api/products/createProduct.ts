import { api } from "..";

export const createProduct = async (data: {name: string}) => {

  const response = await api.post(`products`, data);
  return response.data;
};
