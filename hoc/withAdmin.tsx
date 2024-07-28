import { useSession } from "next-auth/react";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "../enum/UserType";

export interface User {
  scope: string;
  userType: UserType;
  name: string;
  id: string;
  email: string;
}

const withAdmin = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  return (props) => {
    const { data, status } = useSession();
    const router = useRouter();
    const isAdminUser = (data?.user as User)?.userType === UserType.ADMIN;

    useEffect(() => {
      if (status === "loading") return;
      if (!isAdminUser) {
        router.push("/unauthorized");
      }
    }, [status, isAdminUser]);

    if (isAdminUser) {
      return <WrappedComponent {...props} />;
    }
    return <div>Loading...</div>;
  };
};

export default withAdmin;
