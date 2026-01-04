import { logout } from "../useCases/logout";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("/login", { replace: true });
  };
};
