import React from "react";
import { Navigate } from "react-router-dom";

const hasRole = (roles, requiredRole) => {
  if (Array.isArray(roles)) {
    return roles.includes(requiredRole);
  }
  return roles === requiredRole;
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = user?.roles;

  if (!user) {
    console.warn("No user found. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  if (requiredRole === "ROLE_ADMIN") {
    if (
      (Array.isArray(roles) && roles.includes("ROLE_ADMIN") && roles.includes("ROLE_CUSTOMER")) ||
      (roles === "ROLE_ADMIN" || roles === "ROLE_CUSTOMER")
    ) {
      return children;
    } else {
      console.warn("Admin roles not satisfied. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

  if (requiredRole === "ROLE_CUSTOMER") {
    if (
      (Array.isArray(roles) && roles.length === 1 && roles.includes("ROLE_CUSTOMER")) ||
      roles === "ROLE_CUSTOMER"
    ) {
      return children;
    } else {
      console.warn("Customer roles not satisfied. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

  if (requiredRole === "ROLE_DELIVERYAGENT") {
    if (hasRole(roles, "ROLE_DELIVERYAGENT")) {
      return children;
    } else {
      console.warn("Delivery Agent role missing. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

  if (requiredRole === "ROLE_RESTURANTSTAFF") {
    if (hasRole(roles, "ROLE_RESTURANTSTAFF")) {
      return children;
    } else {
      console.warn("Staff role missing. Redirecting.");
      return <Navigate to="/login" />;
    }
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
