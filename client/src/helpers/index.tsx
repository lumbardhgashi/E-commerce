export const getToken = () => {
  return ("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getServerUrl = () => {
  return "https://ecommerce.dev/";
};

export const getApiUrl = () => {
  return getServerUrl() + "api/";
};

export const isOlderThanOneWeek = (dateString: Date | string) => {
  const date = new Date(dateString);

  const currentDate = new Date();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);


  return date < oneWeekAgo;
}