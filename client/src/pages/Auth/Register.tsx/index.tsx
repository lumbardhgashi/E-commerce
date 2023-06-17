import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { Col, Form, Button } from "react-bootstrap";

import { registerUser } from '../../../api/auth/register';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast.success('Registered', {
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
    <Col md={10}>
      <div className="text-center mb-5">
        <h2 style={{ color: "#5a84ce", fontSize: "2.5rem" }}>Sign Up</h2>
        <p style={{ color: "#aaa", fontSize: "1.2rem" }}>
          Create an account to get started.
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
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mb-2" style={{ color: "#555", fontWeight: "bold" }}>Email:</Form.Label>
          <Form.Control
            name='email'
            type="email"
            value={data.email}
            onChange={onChangeHandler}
            style={{ backgroundColor: "#f8f9fa", color: "#555" }}
            required

          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="mb-2" style={{ color: "#555", fontWeight: "bold" }}>Password:</Form.Label>
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
          Sign Up
        </Button>
      </Form>
      <p className="text-center mt-3" style={{ color: "#aaa" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#5a84ce", fontWeight: "bold" }}>
          Log In
        </a>
      </p>
    </Col>
  );
};

export default Register;
