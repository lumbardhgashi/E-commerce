import { api } from "..";

export const getSpecializimet = async () => {

  const response = await api.get(`specializimi`);
  return response.data;
};
