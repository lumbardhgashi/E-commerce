import { api } from "..";

export const getCategories = async (query = "") => {

  const response = await api.get(`categories${query}`);
  return response.data;
};
