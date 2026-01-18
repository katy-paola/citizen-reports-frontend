import { useContext } from "react";
import { ToastContext } from "../context/toastContext";

export const Toast = () => {
  const toast = useContext(ToastContext);

  return (
    <div
      className={`toast ${toast.visible ? "toast-visible" : ""} toast-${toast.type}`}
    >
      {toast.message}
    </div>
  );
};
