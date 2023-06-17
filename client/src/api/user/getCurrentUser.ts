import { api } from "../api";

export const getCurrentUser = async () => {
  const response = await api.get("users/currentuser");
  return response.data.currentUser;
};
