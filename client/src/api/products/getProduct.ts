import { api } from "../../api";

export const getProduct = async (id :string) => {

  const response = await api.get(`products/${id}`);
  console.log(response);
  return response.data;
};
