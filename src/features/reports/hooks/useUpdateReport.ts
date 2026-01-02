import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReport } from "../useCases/updateReport";
import type { UpdateReportDto, ReportEntity } from "../types";

export const useUpdateReport = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<ReportEntity, Error, UpdateReportDto>({
    mutationFn: (dto) => updateReport(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
        exact: false,
      });
    },
  });
};
