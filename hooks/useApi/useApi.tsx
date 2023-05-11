import { DependencyList, useEffect, useState } from "react";
import { AxiosError } from "axios";

type AsyncCall<T, K> = (body?: T) => Promise<K>;

type HookOptions = {
  ignoreLoader?: boolean;
};

const useApi = <T, K>(
  func: AsyncCall<T, K>,
  dependencies: DependencyList,
  body?: T,
  options: HookOptions = { ignoreLoader: false }
) => {
  const [apiData, setApiData] = useState<K | undefined>();
  const [apiLoading, setApiLoading] = useState(false);
  const [apiCallErrorMessage, setApiCallErrorMessage] = useState<
    string | undefined
  >();

  const fetchData = async () => {
    try {
      if (!options.ignoreLoader) {
        setApiLoading(true);
      }
      const data = await func(body);
      setApiCallErrorMessage(undefined);
      setApiData(data);
      setApiLoading(false);
    } catch (err) {
      setApiLoading(false);
      const error = err as AxiosError;
      const code = error.response?.status;
      let message = error.response?.data.message;

      if (message && message.match(/timeout/)) {
        message = "Something went wrong. Please refresh and try again.";
      }
      setApiData(undefined);
      setApiCallErrorMessage(message);
    }
  };
  useEffect(() => {
    fetchData().catch();
  }, dependencies);

  return { data: apiData, apiLoading, apiCallErrorMessage };
};

export default useApi;
