import { reportApi } from "../../../api/reportApi";

export const getReportById = async (id: number) => {
  const { data } = await reportApi.getReportById(id);
  return data;
};
