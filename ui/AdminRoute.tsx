import { FC, PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

const AdminRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data, status } = useSession();
  return null;
};

export default AdminRoute;
