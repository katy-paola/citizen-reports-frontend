import { Navigate, Outlet } from "react-router-dom";
import { isAdminSession } from "../features/auth/authSession";

export const GuestOnlyRoute = () => {
  if (isAdminSession()) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};
