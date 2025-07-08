import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../component/Loading";

const PrivateRoutes = ({ children }) => {
  const { User, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (!User) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoutes;
