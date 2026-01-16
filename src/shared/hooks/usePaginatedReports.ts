import { useGetReports } from "../../features/reports/hooks/useGetReports";
import { usePagination } from "./usePagination";

export const usePaginatedReports = () => {
  const { page, limit, handlePageChange } = usePagination();
  const { data, isLoading, isError, refetch } = useGetReports(page, limit);

  const totalPages = data?.meta.totalPages ?? 1;

  return {
    data,
    isLoading,
    isError,
    refetch,
    pagination: {
      page,
      totalPages,
      reportsToShow: data?.reports.length,
      totalReports: data?.meta.total,
      handlePageChange,
    },
  };
};
