import { Navigate, Outlet } from "react-router-dom";
import { useAdminSession } from "../features/auth/hooks/useAdminSession";

export const AdminRoute = () => {
  const { isLoading, isError } = useAdminSession();

  if (isLoading) return null;
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
