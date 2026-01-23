import { useGetReports } from "../../features/reports/hooks/useGetReports";
import { usePagination } from "./usePagination";

export const usePaginatedReports = () => {
  const { page, limit, handlePageChange } = usePagination();
  const { data, isLoading, isError, refetch } = useGetReports(page, limit);

  console.log("data inside of usePaginatedReports hook:", data)
  const totalPages = data?.meta.totalPages ?? 1;
  console.log("totalPages inside of usePaginatedReports hook:", totalPages)

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
