import React from "react";
import Layout from "@/ui/Layout";
import { useSession } from "next-auth/react";
import { UserType } from "../enum/UserType";
import { useRouter } from "next/navigation";
import { User } from "../hoc/withAdmin";

export default function unauthorized() {
  const router = useRouter();
  const session = useSession();
  const isAdminUser = (session.data?.user as User)?.userType !== UserType.ADMIN;

  return (
    <Layout>
      {session.data?.user && !isAdminUser && (
        <div>You don't have correct permissions to access this page</div>
      )}
      {session.status === "unauthenticated" && (
        <>
          <div>You are not logged in</div>
          <button onClick={() => router.push("/login")}>Login</button>
        </>
      )}
    </Layout>
  );
}
