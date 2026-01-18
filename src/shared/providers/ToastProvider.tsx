import { useEffect, useState } from "react";

import { Toast } from "../components/Toast";
import { registerToast } from "../utils/toast";
import {
  INITIAL_TOAST,
  ToastContext,
  type ToastState,
} from "../context/toastContext";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>(INITIAL_TOAST);

  useEffect(() => {
    registerToast((message, type) => {
      setToast({ message, type, visible: true });

      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
    });
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};
