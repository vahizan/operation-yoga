import LoginForm from "../ui/Form/LoginForm";
import { FC } from "react";
import Layout from "../ui/Layout";
import { signOut } from "next-auth/react";

const Login: FC = () => {
  signOut({ callbackUrl: "/signOut", redirect: true });
  return (
    <Layout>
      <h1>Signed</h1>
      <div>You've successfully signed out</div>
    </Layout>
  );
};

export default Login;
