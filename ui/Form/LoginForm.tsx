import { FC, FormEvent, useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import BouncingDotsLoader from "../Loader/BouncingDotsLoader";
import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AUTHENTICATED, SIGNUP_SUCCESS } from "@/ui/constants";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();

  const [error, setError] = useState<string>();
  const [isLoggingIn, setLoggingIn] = useState<boolean>();
  const [message, setMessage] = useState<string>();
  const { status, data } = useSession();

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

    if (status === AUTHENTICATED) {
      setMessage("You're already signed in");
      setLoggingIn(false);
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoggingIn(false);
      return;
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    })
      .then(({ error, url }: any) => {
        if (url) {
          window.location.href = url;
        }
        if (error) {
          window.location.href = "/login?error=invalid-credentials";
        }
      })
      .finally(() => {
        setLoggingIn(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
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

      <button disabled={isLoggingIn} type="submit">
        {isLoggingIn ? <BouncingDotsLoader /> : <span>Login</span>}
      </button>
    </form>
  );
};

export default LoginForm;
