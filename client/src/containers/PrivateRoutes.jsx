import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthenticate } from "../hooks/useAuthenticate";
import { Spinner } from "../components";

const PrivateRoutes = ({ userType }) => {
  const { isAuthenticated, isLoading } = useAuthenticate(userType);
  if (isLoading) {
    return <Spinner type="centralizedSpinner" />;
  }
  if (isAuthenticated) {
    return <Outlet />;
  }
};

export default PrivateRoutes;
