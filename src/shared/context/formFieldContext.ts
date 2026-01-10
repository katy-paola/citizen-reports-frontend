import { createContext, useContext } from "react";
import type { FieldValues, Path } from "react-hook-form";

type FormFieldContextValue<T extends FieldValues = FieldValues> = {
  name: Path<T>;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null
);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("Form components must be used inside <Form.Field>");
  }
  return context;
};
