import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { App } from "../App";
import Home from "../containers/Home";
import Login from "../containers/Auth/Login.tsx";
import Register from "../containers/Auth/Register.tsx";
import useUser from "../hooks/useUser";


const PrivateRoute = () => {
  const { user } = useUser(); // Access the user from the authentication context

  const navigate = useNavigate()

  if (!user) {
    // If the user does not exist, redirect to the login page or any other appropriate route
    navigate('/login')
  }

  return <Outlet />

};

const PublicRoute = () => {
  const { user } = useUser(); // Access the user from the authentication context

  const navigate = useNavigate();

  if (user) {
    // If the user exists, redirect to the home page or any other appropriate route
    navigate('/');
  }

  return <Outlet />;
};

const ProtectedRoute = () => {
  const { user } = useUser(); // Access the user from the authentication context

  const navigate = useNavigate();

  if (user.role) {
    // If the user exists, redirect to the home page or any other appropriate route
    navigate('/');
  }

  return <Outlet />;
};



export const router =
  createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "/",
              element: <Home />
            },
          ]
        },
        {
          element: <PublicRoute />,
          children: [
            {
              path: '/login',
              element: <Login />
            },
            {
              path: '/register',
              element: <Register />,
            }
          ]
        }
      ]
    },
  ]);