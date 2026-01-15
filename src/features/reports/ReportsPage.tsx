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

  const { data, isLoading, isError } = usePaginatedReports();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reports</div>;

  return (
    <Reports>
      <Reports.Header>
        <h1>Reports</h1>
        <a href="/login">Are you an admin? Log in here.</a>
        <Button onClick={() => setShowCreateModal(true)}>
          Create new report
        </Button>
        <CreateReportModal
          showModal={showCreateModal}
          setShowModal={setShowCreateModal}
        />
      </Reports.Header>
      <Reports.Content>
        <ReportsPagination />
        <ul>
          {data?.reports.map((report: ReportEntity) => (
            <Report key={report.id}>
              <Report.Title>{report.title}</Report.Title>
              <Report.Description>{report.description}</Report.Description>
              <Report.Status statusValue={report.status}>
                {report.status}
              </Report.Status>
              <Report.Date>{formatDate(report.createdAt)}</Report.Date>
            </Report>
          ))}
        </ul>
      </Reports.Content>
    </Reports>
  );
};
