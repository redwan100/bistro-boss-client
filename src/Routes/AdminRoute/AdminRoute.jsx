import React, { useContext } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin()
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <p>Loading...</p>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace />;
};

export default AdminRoute;
