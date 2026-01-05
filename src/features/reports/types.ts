export type Status = "pending" | "process" | "resolved";

export interface ReportEntity {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
}

export interface ReportsResponse {
  reports: ReportEntity[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface CreateReportDto {
  title: string;
  description: string;
}

export interface UpdateReportDto {
  status: Status;
}

export type UpdateReportVariables = {
  id: number;
  status: Status;
};
