import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getReports } from "../useCases/getReports";

export const useGetReports = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["reports", page, limit],
    queryFn: () => getReports(page, limit),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};
