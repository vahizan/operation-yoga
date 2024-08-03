import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface Pagination<T> {
  data: T | undefined;
  next: () => void;
  previous: () => void;
  updatePage: (page: number) => void;
  currentPage: number;
  errorMessage?: string;
}
export function usePagination<T>({
  fetchUrl,
  page,
  limit,
}: {
  fetchUrl: string;
  page: number;
  limit: number;
}): Pagination<T> {
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [currentPage, setCurrentPage] = useState(page);
  const [data, setData] = useState<T>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    axios
      .get(`${fetchUrl}?page=${currentPage}&limit=${currentLimit}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        const axiosError = e as AxiosError;
        if (axiosError?.response?.data) {
          setErrorMessage(
            (axiosError.response.data as { message: string }).message as string
          );
        }
      });
  }, [currentPage, currentLimit]);

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const updatePage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    previous,
    currentPage,
    next,
    updatePage,
  };
}
