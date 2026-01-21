import client from "./client";
import type {
  CreateReportDto,
  ReportEntity,
  ReportsResponse,
  UpdateReportDto,
} from "../features/reports/types";
import { getCsrfToken } from "../shared/utils/csrf";

export const reportApi = {
  getReports: (page: number = 1, limit: number = 10) =>
    client.get<ReportsResponse>("/reports", {
      params: { page, limit },
    }),

  getReportById: (id: number) => client.get<ReportEntity>(`/reports/${id}`),

  createReport: (payload: CreateReportDto) =>
    client.post<ReportEntity>("/reports", {
      title: payload.title,
      description: payload.description,
    }),

  updateReport: (id: number, payload: UpdateReportDto) =>
    client.put<ReportEntity>(
      `/reports/${id}`,
      {
        status: payload.status,
      },
      {
        headers: {
          "x-csrf-token": getCsrfToken() ?? "",
        },
      },
    ),

  deleteReport: (id: number) =>
    client.delete<ReportEntity>(`/reports/${id}`, {
      headers: {
        "x-csrf-token": getCsrfToken() ?? "",
      },
    }),
};
