import { reportApi } from "../../../api/reportApi";

export const getReports = async (page: number, limit: number) => {
  const { data } = await reportApi.getReports(page, limit);
  return data;
};
