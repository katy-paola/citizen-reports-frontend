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
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [reportToDeleteId, setReportToDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { data, isLoading, isError } = usePaginatedReports();
  const reports = data?.reports ?? [];

  const handleUpdateModal = (report: ReportEntity) => {
    setReportToUpdateId(report.id);
    setShowUpdateModal(true);
  };

  const handleDeleteModal = (report: ReportEntity) => {
    setReportToDeleteId(report.id);
    setShowDeleteModal(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reports</div>;

  return (
    <Reports>
      <Reports.Header>
        <div className="reports-header-info">
          <h1>Reports</h1>
          <p>
            As admin, you cannot create any report, you can only update them and
            delete them.
          </p>
        </div>
        <Button className="button-secondary button-small" handleClick={logout}>
          Logout
        </Button>
      </Reports.Header>
      <Reports.Content>
        <ReportsPagination />
        <ul className="reports-list">
          {reports.map((report: ReportEntity) => (
            <Report key={report.id}>
              <Report.Header>
                <Report.Title>{report.title}</Report.Title>
                <Button
                  className="button-danger button-small"
                  onClick={() => handleDeleteModal(report)}
                >
                  Delete report
                </Button>
              </Report.Header>
              <Report.Description>{report.description}</Report.Description>
              <div className="status-container">
                <Report.Status statusValue={report.status}>
                  {report.status}
                </Report.Status>
                <Button
                  className="button-secondary button-small"
                  onClick={() => handleUpdateModal(report)}
                >
                  Edit status
                </Button>
              </div>

              <Report.Date>{formatDate(report.createdAt)}</Report.Date>
            </Report>
          ))}
        </ul>
        <UpdateReportModal
          reportId={reportToUpdateId}
          reports={reports}
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
        />
        <DeleteConfirmationModal
          reportId={reportToDeleteId}
          reports={reports}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
        />
      </Reports.Content>
    </Reports>
  );
};
