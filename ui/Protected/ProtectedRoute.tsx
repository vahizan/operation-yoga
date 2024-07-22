"use server";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { FC } from "preact/compat";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

const ProtectedRoute: ({
  children,
}: {
  children: any;
  session?: Session;
}) => JSX.Element = ({ children, session }) => {
  if (!session) {
    return <div>Access Denied</div>;
  }
  if (!session?.user) {
    redirect("/login");
  }
  return children;
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const session = await auth(ctx);
  return {
    props: {
      session,
    },
  };
}

export default ProtectedRoute;
