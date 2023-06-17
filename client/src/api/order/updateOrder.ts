import { api } from "../../api";

export const updateOrder = async (id :string) => {

  const response = await api.put(`orders/${id}`);
  return response.data;
};
