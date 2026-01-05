import { type ComponentPropsWithoutRef } from "react";

const Reports = (props: ComponentPropsWithoutRef<"section">) => {
  return <section {...props} />;
};

const ReportsHeader = (props: ComponentPropsWithoutRef<"header">) => {
  return <header {...props} />;
};

const ReportsContent = (props: ComponentPropsWithoutRef<"div">) => {
  return <div style={{ display: "contents" }} {...props} />;
};

const ReportsComponent = Object.assign(Reports, {
  Header: ReportsHeader,
  Content: ReportsContent,
});

export { ReportsComponent as Reports };
