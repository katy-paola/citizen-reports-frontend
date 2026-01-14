import { usePaginatedReports } from "../hooks/usePaginatedReports";
import Button from "./Button";

export default function ReportsPagination() {
  const { pagination } = usePaginatedReports();
  const { page, totalPages, reportsToShow, totalReports, handlePageChange } =
    pagination;

  return (
    <>
      <small>
        Showing {reportsToShow} of {totalReports} reports
      </small>
      {totalPages > 1 && (
        <div>
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
    </>
  );
}
