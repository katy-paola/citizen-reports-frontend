import { useFormContext } from "../context/formContext";
import { useFormField } from "../context/formFieldContext";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const {
    form: {
      formState: { errors },
    },
  } = useFormContext();

  const { name } = useFormField();

  const hasError = errors[name];

  return (
    <input
      {...props}
      name={name}
      aria-invalid={hasError ? "true" : "false"}
      data-invalid={hasError ? "true" : "false"}
    />
  );
};
