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
      .get(fetchUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        const axiosError = e as AxiosError;
        if (axiosError?.response) {
          //setErrorMessage(axiosError?.response?.data?.message);
        }
      });
  });

  const previous = () => {};

  const next = () => {};

  const updatePage = (page: number) => {};

  return {
    data,
    previous,
    currentPage,
    next,
    updatePage,
  };
}
