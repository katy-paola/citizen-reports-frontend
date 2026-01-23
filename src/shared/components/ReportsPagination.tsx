import { usePaginatedReports } from "../hooks/usePaginatedReports";
import Button from "./Button";

export default function ReportsPagination() {
  const { pagination } = usePaginatedReports();
  const {
    page = 1,
    totalPages = 1,
    reportsToShow = 0,
    totalReports = 0,
    handlePageChange,
  } = pagination || {};

  return (
    <div className="pagination">
      <small>
        Showing {reportsToShow ? reportsToShow : 0} of{" "}
        {totalReports ? totalReports : 0} reports
      </small>
      {totalPages > 1 && (
        <div className="pagination-buttons">
          <Button
            className="button-secondary button-small"
            onClick={() => handlePageChange(page === 1 ? totalPages : page - 1)}
          >
            Previous
          </Button>
          <span> Page {page} </span>
          <Button
            className="button-secondary button-small"
            onClick={() => handlePageChange(page === totalPages ? 1 : page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
