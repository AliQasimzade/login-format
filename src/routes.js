import { useRoutes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import User from "./components/User";

const Router = () => {
  return useRoutes([
    { path: "/", element: <Navigate to="/login" /> },
    { path: "login", element: <Login /> },
    { path: "signup", element: <SignUp /> },
    { path: "user", element: <User /> },
  ]);
};

export default Router;
