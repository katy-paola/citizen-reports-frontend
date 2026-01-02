import { Navigate, Outlet } from "react-router-dom";
import { isAdminSession } from "../features/auth/authSession";

export const NonAdminRoute = () => {
  if (isAdminSession()) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};
