import { useRouter } from "next/router";
import { FC } from "react";
import Layout from "../ui/Layout";
import { signOut } from "next-auth/react";

const Signout: FC = () => {
  return (
    <Layout>
      <div>You've successfully signed out.</div>
    </Layout>
  );
};

export default Signout;
