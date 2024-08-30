import { useSession } from "next-auth/react";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "../enum/UserType";
import { User } from "../types/User";

const withAdmin = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  return (props) => {
    const { data, status } = useSession();
    const router = useRouter();
    console.log((data?.user as User)?.userType);
    const isAdminUser = (data?.user as User)?.userType === UserType.ADMIN;

    useEffect(() => {
      if (status === "loading") return;
      if (!isAdminUser && data) {
        router.push("/unauthorized");
      }
    }, [data, status, isAdminUser]);

    if (isAdminUser) {
      return <WrappedComponent {...props} />;
    }
    return <div>Loading...</div>;
  };
};

export default withAdmin;
