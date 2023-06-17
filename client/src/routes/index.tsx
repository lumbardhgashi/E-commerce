import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { App } from "../App";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login.tsx";
import Register from "../pages/Auth/Register.tsx";
import PublicRoute from "./publicRoute";
import AuthLayout from "../layouts/auth/AuthLayout";
import MainLayout from "../layouts/main/MainLayout";
import { Cart } from "../pages/Cart";
import PrivateRoute from "./privateRoute";
import ProductDetails from "../pages/Product";
import Checkout from "../pages/Checkout";



export const router =
  createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/",
              element: <Home />
            },
            {
              path: "/products/:productId",
              element: <ProductDetails />
            },
            
            {
              element: <PrivateRoute />,
              children: [
                {
                  path: "/cart",
                  element: <Cart />
                },
                {
                  path: "/checkout",
                  element: <Checkout />
                }
              ]
            },
          ]
        },
        {
          element: <PublicRoute />,
          children: [
            {
              element: <AuthLayout />,
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
        }
      ]
    },
  ]);