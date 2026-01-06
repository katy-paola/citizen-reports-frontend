import { type ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  handleClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return <button onClick={props.handleClick} {...props} />;
}
