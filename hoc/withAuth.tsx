import { useSession } from "next-auth/react";
import { ComponentType, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  return (props) => {
    const { data, status } = useSession();
    const isUser = !!data?.user;
    const router = useRouter();
    useEffect(() => {
      if (status === "loading") return;
      if (!isUser) {
        router.push("/unauthorized");
      }
    }, [status, isUser]);

    if (isUser) {
      return <WrappedComponent {...props} />;
    }
    return <div>Loading...</div>;
  };
};

export default withAuth;
