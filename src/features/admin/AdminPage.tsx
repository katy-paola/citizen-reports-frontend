import { formatDate } from "../../shared/utils/formatDate";
import { getPageFromUrl } from "../../shared/utils/pagination";
import { useGetReports } from "../reports/hooks/useGetReports";
import { useSearchParams } from "react-router-dom";
import type { ReportEntity } from "../reports/types";
import { useState } from "react";
import UpdateReportModal from "../reports/components/UpdateReportModal";
import DeleteConfirmationModal from "../reports/components/DeleteConfirmationModal";
import { useLogout } from "../auth/hooks/useLogout";

export const AdminPage = () => {
  const logout = useLogout();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = getPageFromUrl(searchParams.get("page"));
  const limit = 10;
  const [reportToUpdateId, setReportToUpdateId] = useState<number | null>(null);
  const [reportToDeleteId, setReportToDeleteId] = useState<number | null>(null);

  const { data, isLoading, error } = useGetReports(page, limit);

  const totalPages = data?.meta.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reports</div>;

  return (
    <div>
      <h1>Reports</h1>
      <p>
        As admin, you cannot create any report, you can only update them and
        delete them.
      </p>
      <button onClick={logout}>Logout</button>
      <small>
        Showing {data?.reports.length} of {data?.meta.total} reports
      </small>
      {data?.meta.totalPages !== undefined && data?.meta.totalPages > 1 && (
        <div>
          <button
            onClick={() => handlePageChange(page === 1 ? totalPages : page - 1)}
          >
            Prev
          </button>
          <span> Page {page} </span>
          <button
            onClick={() =>
              handlePageChange(page === data?.meta.totalPages ? 1 : page + 1)
            }
          >
            Next
          </button>
        </div>
      )}

      <ul>
        {data?.reports.map((report: ReportEntity) => (
          <li key={report.id}>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <div>
              <p>Status: {report.status}</p>
              <button onClick={() => setReportToUpdateId(report.id)}>
                Edit
              </button>
            </div>

            <UpdateReportModal
              showModal={reportToUpdateId === report.id}
              openId={report.id}
              setOpenId={setReportToUpdateId}
              status={report.status}
            />

            <small>{formatDate(report.createdAt)}</small>
            <button onClick={() => setReportToDeleteId(report.id)}>
              Delete report
            </button>
            <DeleteConfirmationModal
              showModal={reportToDeleteId === report.id}
              openId={report.id}
              setOpenId={setReportToDeleteId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
