import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../layouts/ErrorPage";
import Home from "../pages/Home/Home/Home";
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";

import App from "../App";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Products from "../pages/Dashboard/Products/Products";
import Orders from "../pages/Dashboard/Orders/Orders";
import Users from "../pages/Dashboard/Users/Users";
import Settings from "../pages/Dashboard/Settings/Settings";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
