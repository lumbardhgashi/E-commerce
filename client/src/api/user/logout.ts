import { api } from "../api";

export const logoutUser = async () => {
  const response = await api.post("users/signout");

  return response.data;
};
