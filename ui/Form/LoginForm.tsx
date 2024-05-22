"use client";

import { FC, FormEvent, useState } from "react";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import BouncingDotsLoader from "../Loader/BouncingDotsLoader";
import { signIn } from "next-auth/react";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setLoggingIn] = useState<boolean>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoggingIn(false);
      return;
    }

    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    })
      .catch((err) => {
        console.log("err", err);
        setError("Invalid username or password. Please try again");
      })
      .finally(() => {
        setLoggingIn(false);
      });
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.additionalLinks}>
        <Link className={styles.additionalLinks__signupLink} href={"/signup"}>
          Signup
        </Link>
        <Link
          className={styles.additionalLinks__forgotLink}
          href={"/forgot-password"}
        >
          Forgot?
        </Link>
      </div>

      <button disabled={isLoggingIn} type="submit">
        {isLoggingIn ? <BouncingDotsLoader /> : <span>Login</span>}
      </button>
      {error && <div className={"error"}>{error}</div>}
    </form>
  );
};

export default LoginForm;
