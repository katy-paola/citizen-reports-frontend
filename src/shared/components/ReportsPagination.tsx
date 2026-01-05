import { usePaginatedReports } from "../hooks/usePaginatedReports";

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
          <button
            onClick={() => handlePageChange(page === 1 ? totalPages : page - 1)}
          >
            Prev
          </button>
          <span> Page {page} </span>
          <button
            onClick={() => handlePageChange(page === totalPages ? 1 : page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
