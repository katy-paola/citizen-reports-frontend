import { type ComponentPropsWithoutRef } from "react";

export const Input = (props: ComponentPropsWithoutRef<"input">) => {
  return <input {...props} />;
};
