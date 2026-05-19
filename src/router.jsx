import { createBrowserRouter } from "react-router-dom";
import { requiredAuth } from "./loaders/requiredAuth";

import Layout from "./components/Layout";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import Profile from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        loader: requiredAuth,
        element: <Profile />,
      },
      {
        path: "/products/new",
        loader: requiredAuth,
        element: <ProductForm />,
      },
      {
        path: "/products/:id/edit",
        loader: requiredAuth,
        element: <ProductForm />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
