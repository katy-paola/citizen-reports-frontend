import { logout } from "../useCases/logout";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  return async () => {
    await logout();
    navigate("/login", { replace: true });
  };
};
