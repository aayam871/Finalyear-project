import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = user?.roles || [];

  console.log("User from localStorage:", user);
  console.log("Roles from localStorage:", roles);

  if (!user || !roles.includes(requiredRole)) {
    console.warn("Access Denied! Redirecting to login...");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
