const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const baseUrl = "http://ecommerce.dev/api";

const init = async () => {
  const { data: superAdmin } = await client.post(
    `${baseUrl}/users/signup`,
    {
      username: "admin4",
      email: "admin4@mail.com",
      password: "password",
      role: "admin",
    },
    {
      jar,
    }
  );

  console.log({ superAdmin });

  const { data: category } = await client.post(
    `${baseUrl}/categories`,
    {
      name: "Category",
    },
    {
      jar,
    }
  );

  console.log({ category });
};

init();
