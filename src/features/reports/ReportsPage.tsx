import { useState } from "react";
import { formatDate } from "../../shared/utils/formatDate";
import CreateReportModal from "./components/CreateReportModal";
import type { ReportEntity } from "./types";
import { Reports } from "../../shared/components/Reports";
import { usePaginatedReports } from "../../shared/hooks/usePaginatedReports";
import ReportsPagination from "../../shared/components/ReportsPagination";
import { Report } from "../../shared/components/ReportItem";
import Button from "../../shared/components/Button";

export const ReportsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isManualReloading, setIsManualReloading] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = usePaginatedReports();
  const reports = data?.reports ?? [];

  const handleManualReload = async () => {
    setIsManualReloading(true);
    await refetch();
    setIsManualReloading(false);
  };

  return (
    <Reports>
      <Reports.Header>
        <div className="reports-header-info">
          <h1>Community Reports</h1>
          <p>
            Browse, create, and follow the status of public issues in your
            community. <a href="/login">Are you an admin? Log in here.</a>
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          Create new report
        </Button>
        <CreateReportModal
          showModal={showCreateModal}
          setShowModal={setShowCreateModal}
        />
      </Reports.Header>
      <Reports.Content>
        <div className="reports-content-actions">
          <Button
            className="button-secondary button-small"
            onClick={handleManualReload}
            disabled={isManualReloading || reports.length === 0}
          >
            {isManualReloading ? "Reloading..." : "Reload"}
          </Button>
          <ReportsPagination />
        </div>

        <ul className="reports-list">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>
              We couldn't load the reports. Please check your internet
              connection and try again.
            </p>
          ) : reports.length === 0 ? (
            <>
              <p>
                No reports found. Be the first to report an issue in your
                community.
              </p>
            </>
          ) : (
            reports.map((report: ReportEntity) => (
              <Report key={report.id}>
                <Report.Header>
                  <Report.Title>{report.title}</Report.Title>
                </Report.Header>
                <Report.Description>{report.description}</Report.Description>
                <Report.Status statusValue={report.status}>
                  {report.status}
                </Report.Status>
                <Report.Date>
                  Reported on {formatDate(report.createdAt)}
                </Report.Date>
              </Report>
            ))
          )}
        </ul>
      </Reports.Content>
    </Reports>
  );
};
