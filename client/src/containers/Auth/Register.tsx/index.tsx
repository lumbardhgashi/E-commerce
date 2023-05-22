import { useMutation } from '@tanstack/react-query';
import * as React from 'react';

import { registerUser } from '../../../api/auth/register';
import { setToken } from '../../../helpers';
import { useNavigate } from 'react-router-dom';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {

  const navigate = useNavigate()

  const [data, setData] = React.useState<registerData>({
    username: "",
    email: "",
    password: "",
  });


  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess(data) {
      console.log(data);
      navigate("/")

    },
    onError(error: any) {
    },
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "submited", data
    );

    mutate(data);
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
        <label>Email:</label>
        <input
          required
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          className="form-control"
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
          autoComplete="current-password"
        />
      </div>
      <button className="btn btn-primary">Sign in</button>
    </form>
  );
};

export default Register;
