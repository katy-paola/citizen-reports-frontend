import { type ComponentPropsWithoutRef } from "react";

const Reports = (props: ComponentPropsWithoutRef<"section">) => {
  return <section className="main-layout" {...props} />;
};

const ReportsHeader = (props: ComponentPropsWithoutRef<"header">) => {
  return <header className="reports-header" {...props} />;
};

const ReportsContent = (props: ComponentPropsWithoutRef<"div">) => {
  return <div className="reports-content" {...props} />;
};

const ReportsComponent = Object.assign(Reports, {
  Header: ReportsHeader,
  Content: ReportsContent,
});

export { ReportsComponent as Reports };
