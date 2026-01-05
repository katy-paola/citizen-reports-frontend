import { useSearchParams } from "react-router-dom";
import { getPageFromUrl } from "../utils/pagination";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = getPageFromUrl(searchParams.get("page"));
  const limit = 10;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return {
    page,
    limit,
    handlePageChange,
  };
};
