import { useQuery } from "@tanstack/react-query";
import { getReportById } from "../useCases/getReportById";

export const useGetReportById = (id: number) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportById(id),
  });
};
