import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthenticate } from "../hooks/useAuthenticate";
import { Spinner } from "../components";

const PrivateRoutes = ({ userType }) => {
  const { isAuthenticated, isLoading } = useAuthenticate(userType);
  if (isLoading) {
    return <Spinner size="w-24 h-24" type="centralizedSpinner" />;
  }
  if (isAuthenticated) {
    return isAuthenticated && <Outlet />;
  }
};

export default PrivateRoutes;
