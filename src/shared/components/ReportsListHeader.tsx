import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import Button from "./Button";
import ReportsPagination from "./ReportsPagination";
import type { ReportEntity } from "../../features/reports/types";

interface reportsListHeaderProps {
  data: {
    reports: ReportEntity[];
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  };
}

export default function ReportsListHeader({
  data: { reports, isLoading, isError, refetch },
}: reportsListHeaderProps) {
  const [isManualReloading, setIsManualReloading] = useState<boolean>(false);
  const [lastRefreshDate, setLastRefreshDate] = useState<string | Date>(
    new Date(),
  );

  const isReloadDisabled =
    isManualReloading || isLoading || (reports.length === 0 && !isError);

  const handleManualReload = async () => {
    setIsManualReloading(true);
    await refetch();
    setIsManualReloading(false);
    setLastRefreshDate(formatDate(new Date()));
  };
  return (
    <div className="reports-content-actions">
      <div className="reports-content-reload">
        <Button
          className="button-secondary button-small"
          onClick={handleManualReload}
          disabled={isReloadDisabled}
        >
          {isManualReloading ? "Reloading..." : "Reload"}
        </Button>
        <small>Last refresh: {formatDate(lastRefreshDate)}</small>
      </div>
      <ReportsPagination />
    </div>
  );
}
