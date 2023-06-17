import { api } from "../api";

export const createOrder = async (data: any) => {
    const response = await api.post("orders", data);
    console.log(response);
    return response.data;
  };
  