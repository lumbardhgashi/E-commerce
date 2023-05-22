import * as React from 'react';
import { loginUser } from '../../../api/auth/login';
import { setToken } from '../../../helpers';
import { useMutation } from '@tanstack/react-query';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [data, setData] = React.useState<loginData>({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("called");
    mutate(data);
  };
  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess(data) {
      setToken(data.token)
    },
    onError(error: any) {
    },
  })
  return (
    <form
    className="needs-validation"
    onSubmit={onSubmitHandler}
  >
    <h1>Sign in</h1>
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
      <label>Password:</label>
      <input
        required
        type="password"
        name="password"
        value={data.password}
        onChange={onChangeHandler}
        className="form-control"
        autoComplete='"current-password"'
      />
    </div>
    <button className="btn btn-primary">Sign in</button>
  </form>
  );
};

export default Login;
