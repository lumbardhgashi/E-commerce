import { api } from "../api";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const registerUser = async (data: any) => {
  
  console.log(data);
  const response = await api.post("users/signup", data);
  console.log(response);
  
  return response.data;
};
