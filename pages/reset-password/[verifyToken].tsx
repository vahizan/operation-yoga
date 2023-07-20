"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Layout from "../../ui/Layout";
import styles from "./resetPassword.module.scss";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      setResetStatus("Passwords can't be empty");
      return;
    }
    if (password !== confirmPassword) {
      setResetStatus("Passwords do not match");
      return;
    }
    axios
      .post("/api/auth/reset-password", {
        password,
        verifyToken: router.query?.verifyToken,
      })
      .then((res) => {
        setResetStatus(res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setResetStatus(
            "Password reset link expired. Redirecting you to forgot password page..."
          );
          setTimeout(() => {
            router.push("/forgot-password");
          }, 1500);
        }
      });
  };

  return (
    <Layout>
      <h1>Reset Password</h1>
      <div className={styles.resetPasswordContainer}>
        <div className={styles.formGroup}>
          <label htmlFor={"password"}>Password</label>
          <input
            required
            name={"password"}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={"confirmPassword"}>Confirm Password</label>
          <input
            required
            name={"confirmPassword"}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button onClick={handleResetPassword}>Reset Password</button>
        {resetStatus && <p>{resetStatus}</p>}
      </div>
    </Layout>
  );
};

export default ResetPassword;
