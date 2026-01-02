import { reportApi } from "../../../api/reportApi";
import type { CreateReportDto } from "../types";

export const createReport = async (payload: CreateReportDto) => {
  const { data } = await reportApi.createReport(payload);
  return data;
};
