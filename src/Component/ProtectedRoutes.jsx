import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user role not allowed, redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
