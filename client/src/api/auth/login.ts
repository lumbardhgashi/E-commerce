import { api } from "../api";


/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const loginUser = async (data: any) => {
  const response = await api.post("users/signin", data);
  console.log(response);
  return response.data;
};
