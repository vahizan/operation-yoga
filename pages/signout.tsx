import { FC } from "react";
import Layout from "../ui/Layout";
import { signOut } from "next-auth/react";

const Signout: FC = () => {
  signOut({ callbackUrl: "/signOut", redirect: true });
  return (
    <Layout>
      <div>You've successfully signed out.</div>
    </Layout>
  );
};

export default Signout;
