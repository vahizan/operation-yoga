import { FC, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./loginForm.module.scss";
import Link from "next/link";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    });

    if (!result) {
      setError("Unable to login right now");
    }

    if (result?.error) {
      setError("Invalid username or password. Please try again");
    } else {
      setError("");
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {error && <div className={"error"}>{error}</div>}
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
      <Link className={styles.forgotLink} href={"/forgot-password"}>
        Forgot?
      </Link>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
