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
