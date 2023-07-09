import { useEffect, useState } from "react";
import { IPackage } from "../../pages/api/interfaces";
import axios from "axios";

export const usePackages = (
  page: number,
  perPage: number,
  dependencies?: Array<any>
) => {
  const [packages, setPackages] = useState<Array<IPackage>>([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiErrorMessage, setApiErrorMessage] = useState();
  useEffect(() => {
    axios
      .get("/api/schedule")
      .then((data) => setPackages(data as unknown as IPackage[]))
      .catch((err) => setApiErrorMessage(err))
      .finally(() => setApiLoading(false));
  }, [dependencies]);

  return { packages, apiLoading, apiErrorMessage };
};
