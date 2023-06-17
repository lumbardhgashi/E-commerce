import { api } from "../../api";

export const getProducts = async (query = "") => {
  

  if(!query.includes("category")) {
    query += "&category"
  }
  if(!query.includes("search")) {
    query += "&search"
  }

  const response = await api.get(`products${query}`);
  return response.data;
};
