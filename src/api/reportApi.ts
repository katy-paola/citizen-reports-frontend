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

  updateReport: (id: number, payload: UpdateReportDto) => {
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      throw new Error("CSRF token missing to update");
    }

    return client.put<ReportEntity>(
      `/reports/${id}`,
      {
        status: payload.status,
      },
      {
        headers: {
          "x-csrf-token": csrfToken,
        },
      },
    );
  },

  deleteReport: (id: number) => {
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      throw new Error("CSRF token missing to delete");
    }
    return client.delete<ReportEntity>(`/reports/${id}`, {
      headers: {
        "x-csrf-token": csrfToken,
      },
    });
  },
};
