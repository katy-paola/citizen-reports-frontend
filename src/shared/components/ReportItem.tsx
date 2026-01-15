import { type ComponentPropsWithoutRef } from "react";

const ReportItem = (props: ComponentPropsWithoutRef<"li">) => {
  return <li {...props} />;
};

const ReportTitle = (props: ComponentPropsWithoutRef<"h3">) => {
  return <h3 {...props} />;
};

const ReportDescription = (props: ComponentPropsWithoutRef<"p">) => {
  return <p {...props} />;
};

interface reportStatusProps extends ComponentPropsWithoutRef<"p"> {
  statusValue: string;
  className?: string;
}

const ReportStatus = ({
  statusValue,
  className,
  ...props
}: reportStatusProps) => {
  return (
    <p
      className={`status ${statusValue}-status ${className ? className : ""}`}
      {...props}
    />
  );
};

const ReportDate = (props: ComponentPropsWithoutRef<"small">) => {
  return <small {...props} />;
};

const ReportItemComponent = Object.assign(ReportItem, {
  Title: ReportTitle,
  Description: ReportDescription,
  Status: ReportStatus,
  Date: ReportDate,
});

export { ReportItemComponent as Report };
