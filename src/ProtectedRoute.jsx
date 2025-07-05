import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = user?.roles || [];

  if (!user) {
    console.warn("No user found. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  if (requiredRole === "ROLE_ADMIN") {
    
    if (roles.includes("ROLE_ADMIN") && roles.includes("ROLE_CUSTOMER")) {
      return children;
    } else {
      console.warn("Admin roles not satisfied. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

  if (requiredRole === "ROLE_CUSTOMER") {
    
    if (roles.length === 1 && roles.includes("ROLE_CUSTOMER")) {
      return children;
    } else {
      console.warn("Customer roles not satisfied. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

  if (requiredRole === "ROLE_DELIVERYAGENT") {
    if (roles.includes("ROLE_DELIVERYAGENT")) {
      return children;
    } else {
      console.warn("Delivery Agent role missing. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

 
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
