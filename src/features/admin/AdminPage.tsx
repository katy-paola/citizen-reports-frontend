import { formatDate } from "../../shared/utils/formatDate";
import type { ReportEntity } from "../reports/types";
import { useState } from "react";
import UpdateReportModal from "../reports/components/UpdateReportModal";
import DeleteConfirmationModal from "../reports/components/DeleteConfirmationModal";
import { useLogout } from "../auth/hooks/useLogout";
import { Reports } from "../../shared/components/Reports";
import { Report } from "../../shared/components/ReportItem";
import ReportsPagination from "../../shared/components/ReportsPagination";
import { usePaginatedReports } from "../../shared/hooks/usePaginatedReports";
import Button from "../../shared/components/Button";

export const AdminPage = () => {
  const logout = useLogout();

  const [reportToUpdateId, setReportToUpdateId] = useState<number | null>(null);
  const [reportToDeleteId, setReportToDeleteId] = useState<number | null>(null);

  const { data, isLoading, isError } = usePaginatedReports();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reports</div>;

  return (
    <div>
      <Reports>
        <Reports.Header>
          <h1>Reports</h1>
          <p>
            As admin, you cannot create any report, you can only update them and
            delete them.
          </p>
          <Button handleClick={logout}>Logout</Button>
        </Reports.Header>
        <Reports.Content>
          <ReportsPagination />
          <ul>
            {data?.reports.map((report: ReportEntity) => (
              <Report key={report.id}>
                <Report.Title>{report.title}</Report.Title>
                <Report.Description>{report.description}</Report.Description>
                <div>
                  <Report.Status>{report.status}</Report.Status>
                  <Button onClick={() => setReportToUpdateId(report.id)}>
                    Edit
                  </Button>
                </div>
                <UpdateReportModal
                  showModal={reportToUpdateId === report.id}
                  openId={report.id}
                  setOpenId={setReportToUpdateId}
                  status={report.status}
                />
                <Report.Date>{formatDate(report.createdAt)}</Report.Date>
                <Button onClick={() => setReportToDeleteId(report.id)}>
                  Delete report
                </Button>
                <DeleteConfirmationModal
                  showModal={reportToDeleteId === report.id}
                  openId={report.id}
                  setOpenId={setReportToDeleteId}
                />
              </Report>
            ))}
          </ul>
        </Reports.Content>
      </Reports>
    </div>
  );
};
