import { type ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  handleClick?: () => void;
}

export default function Button({ handleClick, ...props }: ButtonProps) {
  return <button onClick={handleClick} {...props} />;
}
