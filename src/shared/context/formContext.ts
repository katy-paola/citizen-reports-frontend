import { createContext, useContext } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

type AnyFormContext = {
  form: UseFormReturn<FieldValues>;
};

export const FormContext = createContext<AnyFormContext | null>(null);

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("Form components must be used inside <Form>");
  }
  return ctx;
}
