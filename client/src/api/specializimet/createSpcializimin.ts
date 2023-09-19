import { api } from "..";

export const createSpecializimi = async (data: {name: string}) => {

  const response = await api.post(`specializimi`, data);
  return response.data;
};
