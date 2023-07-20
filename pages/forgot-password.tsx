import { FC, MouseEvent, useState } from "react";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import styles from "./forgotPassword.module.scss";
import Layout from "../ui/Layout";

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleForgotPassword = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!email) {
      setMessage("Please provide an email address");
      return;
    }
    axios
      .post("/api/auth/forgot-password", {
        email,
      })
      .then((res) => {
        setMessage(res.data?.message);
      })
      .catch(() => {
        setMessage("Error please try again later");
      });
  };

  return (
    <Layout>
      <h1>Forgot Password</h1>
      <div className={styles.forgotPasswordContainer}>
        {message && <div>{message}</div>}

        <div className={styles.formGroup}>
          <label htmlFor={"email"}>Email</label>
          <input
            name={"email"}
            id={"email"}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button onClick={handleForgotPassword}>Reset Password</button>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
