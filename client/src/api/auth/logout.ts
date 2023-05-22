import { api } from "../api";

export const logoutUser = async () => {
  const response = await api.post("logout");

  return response.data;
};
