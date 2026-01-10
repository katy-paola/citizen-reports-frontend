import { type ComponentPropsWithoutRef } from "react";

const Select = (props: ComponentPropsWithoutRef<"select">) => {
  return <select {...props} />;
};

const SelectOption = (props: ComponentPropsWithoutRef<"option">) => {
  return <option {...props} />;
};

const SelectComponent = Object.assign(Select, {
  Option: SelectOption,
});

export { SelectComponent as Select };
