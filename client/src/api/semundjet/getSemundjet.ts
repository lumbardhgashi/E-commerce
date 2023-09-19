import { api } from "..";

export const getSemundjet = async () => {

  const response = await api.get(`/semundja`);
  return response.data;
};
