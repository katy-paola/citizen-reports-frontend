import { useQuery } from "@tanstack/react-query";
import client from "../../../api/client";

const checkAdminSession = async () => {
  await client.get("auth/session");
  return true;
};

export const useAdminSession = () => {
  return useQuery({
    queryKey: ["admin-session"],
    queryFn: checkAdminSession,
    retry: false
  })
}
