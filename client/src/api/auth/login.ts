import { api } from "../api";


/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const loginUser = async (data: any) => {
  const form = new FormData();

  form.append("username", data.username!)
  form.append("password", data.password!)

  const response = await api.post("users/signin", form);

  return response.data;
};
