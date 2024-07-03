"use client";

import { FC, FormEvent, useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import BouncingDotsLoader from "../Loader/BouncingDotsLoader";
import { signIn, SignInResponse } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();

  const [error, setError] = useState<string>();
  const [isLoggingIn, setLoggingIn] = useState<boolean>();
  const [message, setMessage] = useState<string>();
  const SIGNUP_SUCCESS = "success";
  useEffect(() => {
    if (params?.get("error")) {
      setError("Invalid username or password. Please try again later");
    }
    if (params?.get("signup") === SIGNUP_SUCCESS) {
      setMessage("You've successfully signed up. Please login");
    }
  }, [params]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoggingIn(false);
      return;
    }

    await signIn("UserAndPassword", {
      email,
      password,
    })
      .then((response: SignInResponse | undefined) => {
        if (!response || response?.error) {
          window.location.href = "/login?error=invalid-credentials";
        } else {
          setLoggingIn(false);
        }
      })
      .finally(() => {
        setLoggingIn(false);
      });
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <div data-testid="login-error" className={"error"}>
          {error}
        </div>
      )}
      {message && (
        <div data-testid="login-message" className={"message"}>
          {message}
        </div>
      )}
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
        <Link
          data-testid="signup"
          className={styles.additionalLinks__signupLink}
          href={"/signup"}
        >
          Signup
        </Link>
        <Link
          className={styles.additionalLinks__forgotLink}
          href={"/forgot-password"}
        >
          Forgot?
        </Link>
      </div>

      <button disabled={isLoggingIn} onClick={handleSubmit} type="submit">
        {isLoggingIn ? <BouncingDotsLoader /> : <span>Login</span>}
      </button>
    </div>
  );
};

export default LoginForm;
