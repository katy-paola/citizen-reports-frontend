import { createContext } from "react";

export type ToastType = "info" | "success" | "error";

export type ToastState = {
  message: string;
  type: ToastType;
  visible: boolean;
};
export const INITIAL_TOAST: ToastState = {
  message: "",
  type: "info",
  visible: false,
};
export const ToastContext = createContext<ToastState>(INITIAL_TOAST);
