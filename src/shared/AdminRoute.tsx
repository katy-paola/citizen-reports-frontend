import { Navigate, Outlet } from "react-router-dom";
import { isAdminSession } from "../features/auth/authSession";

export const AdminRoute = () => {
  if (!isAdminSession()) {
    return <Navigate to="/reports" replace />;
  }

  return <Outlet />;
};
