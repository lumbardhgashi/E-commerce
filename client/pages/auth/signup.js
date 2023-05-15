import useRequest from "@/hooks/useRequest";
import Router from "next/router";
import { useState } from "react";

export default () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: data,
    onSuccess: () => {
       Router.push("/");
    },
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form
      className="needs-validation"
      onSubmit={onSubmitHandler}
    >
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Username:</label>
        <input
          required
          name="username"
          value={data.username}
          onChange={onChangeHandler}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email Address:</label>
        <input
          required
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          className="form-control"
          autoComplete="email"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          required
          type="password"
          name="password"
          value={data.password}
          onChange={onChangeHandler}
          className="form-control"
          autoComplete="new-password"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
};
