import { useState } from 'react';
import { loginUser } from '../../../api/auth/login';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

  const navigate = useNavigate()

  const [data, setData] = useState<loginData>({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data);
  };
  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess(data) {
      navigate('/')
      console.log(data, "success");
      toast.success('Logged in', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError(err: any) {
      err.response.data.errors.map((err: any) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
    },
  })


  return (

    <Col md={10}>
      <div className="text-center mb-5">
        <h2 style={{ color: "#5a84ce", fontSize: "2.5rem" }}>Sign In</h2>
        <p style={{ color: "#aaa", fontSize: "1.2rem" }}>
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="mb-2" style={{ color: "#555", fontWeight: "bold" }}>Username:</Form.Label>
          <Form.Control
            name='username'
            type="text"
            value={data.username}
            onChange={onChangeHandler}
            style={{ backgroundColor: "#f8f9fa", color: "#555" }}
            required

          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label style={{ color: "#555", fontWeight: "bold" }}>Password:</Form.Label>
          <Form.Control
            name='password'
            type="password"
            value={data.password}
            onChange={onChangeHandler}
            style={{ backgroundColor: "#f8f9fa", color: "#555" }}
            required

          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#5a84ce",
            borderColor: "#5a84ce",
            fontWeight: "bold",
            marginTop: "20px",
            width: "100%",
          }}
        >
          Sign In
        </Button>
      </Form>
      <p className="text-center mt-3" style={{ color: "#aaa" }}>
        Don't have an account?{" "}
        <a href="/register" style={{ color: "#5a84ce", fontWeight: "bold" }}>
          Register
        </a>
      </p>
    </Col>
  );
};

export default Login;
