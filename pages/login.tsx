import LoginForm from "../ui/Form/LoginForm";
import { FC } from "react";
import Layout from "../ui/Layout";

const Login: FC = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <LoginForm />
    </Layout>
  );
};

export default Login;
