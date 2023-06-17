import { api } from "../api";

export const createPayment = async (data: any) => {
    const response = await api.post("payments", data);
    console.log(response);
    return response.data;
  };
  