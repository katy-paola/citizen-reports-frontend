import { reportApi } from "../../../api/reportApi";

export const deleteReport = async (id: number) => {
  const { data } = await reportApi.deleteReport(id);
  return data;
};
