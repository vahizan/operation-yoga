import { useEffect, useState } from "react";
import { IPackage } from "../../pages/api/interfaces";

export const usePackages = (
  page: number,
  perPage: number,
  dependencies?: Array<any>
) => {
  const [packages, setPackages] = useState<Array<IPackage>>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiErrorMessage, setApiErrorMessage] = useState();
  useEffect(() => {
    fetch("/api/schedule")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `Unable to retrieve packages! Status: ${response.status}`
        );
      })
      .then((data: IPackage[]) => setPackages(data))
      .catch((err) => setApiErrorMessage(err))
      .finally(() => setApiLoading(false));
  }, [dependencies]);

  return { packages, apiLoading, apiErrorMessage };
};
