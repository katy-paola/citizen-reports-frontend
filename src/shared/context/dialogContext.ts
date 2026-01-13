import { createContext, useContext } from "react";

type DialogContextValue = {
  close: () => void;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used inside a Dialog");
  }
  return context;
}
