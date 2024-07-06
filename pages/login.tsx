import LoginForm from "../ui/Form/LoginForm";
import { FC } from "react";
import Layout from "../ui/Layout";
import styles from "./login.module.scss";
const Login: FC = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <div className={styles.loginFormContainer}>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
