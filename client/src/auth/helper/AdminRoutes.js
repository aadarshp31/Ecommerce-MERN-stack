import React from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ element: Component }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    <Component />
  ) : (
    <Navigate to="/signin" />
  );
};

export default AdminRoute;
