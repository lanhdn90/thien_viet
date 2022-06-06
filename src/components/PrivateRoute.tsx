import React from "react";
import { Navigate } from "react-router-dom";
import LayoutComponent from "./LayoutComponent/LayoutComponent";

export function PrivateRoute() {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  return !isLoggedIn ? <Navigate to="/" /> : <LayoutComponent />;
}
