import type {
  UseFormReturn,
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import { FormContext, useFormContext } from "../context/formContext";
import { useController } from "react-hook-form";
import { FormFieldContext, useFormField } from "../context/formFieldContext";

type FormWrapperProps = {
  form: UseFormReturn<any>;
  children: React.ReactNode;
};

const FormWrapper = ({ form, children }: FormWrapperProps) => {
  return (
    <FormContext.Provider value={{ form }}>{children}</FormContext.Provider>
  );
};

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  render: (props: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => React.ReactNode;
};

const FormField = <T extends FieldValues>({
  control,
  name,
  render,
}: FormFieldProps<T>) => {
  const { field } = useController({ control, name });
  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({ field })}
    </FormFieldContext.Provider>
  );
};

const FormItem = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

const FormLabel = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props} />;
};

const FormControl = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

const FormDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props} />;
};

const FormMessage = () => {
  const {
    form: {
      formState: { errors },
    },
  } = useFormContext();

  const { name } = useFormField();

  const error = errors[name];

  if (!error || typeof error.message !== "string") return null;

  return <p>{error.message}</p>;
};

const FormWrapperComponent = Object.assign(FormWrapper, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
});

export { FormWrapperComponent as Form };
