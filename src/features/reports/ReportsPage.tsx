import { useState } from "react";
import { formatDate } from "../../shared/utils/formatDate";
import { getPageFromUrl } from "../../shared/utils/pagination";
import { useGetReports } from "./hooks/useGetReports";
import { useSearchParams } from "react-router-dom";
import CreateReportModal from "./components/CreateReportModal";
import type { ReportEntity } from "./types";

export const ReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = getPageFromUrl(searchParams.get("page"));
  const limit = 10;
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      <button onClick={() => setShowCreateModal(!showCreateModal)}>
        Create new report
      </button>
      {showCreateModal && (
        <div>
          <CreateReportModal />
        </div>
      )}

      <small>
        <a href="/login">Are you an admin? Log in here.</a>
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
            <p>Status: {report.status}</p>
            <small>{formatDate(report.createdAt)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
