import { Navigate, Outlet } from "react-router-dom";
import { useAdminSession } from "../features/auth/hooks/useAdminSession";

export const NonAdminRoute = () => {
  const { isSuccess } = useAdminSession();
  if (isSuccess) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};
