import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import styles from "./signupForm.module.scss";
import BouncingDotsLoader from "../Loader/BouncingDotsLoader";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSigningUp, setSigningUp] = useState<boolean>();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      setSigningUp(false);
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords don't match");
      setSigningUp(false);
      return;
    }

    try {
      setSigningUp(true);

      const response = await axios.post(
        "/api/auth/signup",
        JSON.stringify({ name, email, password, phone }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // SignupForm successful, redirect to the login page
        await router.push("/login?signup=success");
      } else {
        const data = await response.data.json();
        setError(data.message);
      }
    } catch (error) {
      const axiosErr = error as AxiosError;
      if (axiosErr.response?.data) {
        const data = axiosErr.response.data as unknown as { message: string };
        setError(data.message);
      } else {
        setError("An error occurred please try again later");
      }
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <div className={styles.signupFormContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor={"name"}>Name:</label>
          <input
            id={"name"}
            name={"name"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={"email"}>Email:</label>
          <input
            name={"email"}
            id={"email"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={"password"}>Password:</label>
          <input
            name={"password"}
            id={"password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={"confirmPassword"}>Confirm Password:</label>
          <input
            name={"confirmPassword"}
            id={"confirmPassword"}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={"phone"}>Phone Number (Optional):</label>
          <input
            name={"phone"}
            id={"phone"}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">
          {isSigningUp ? <BouncingDotsLoader /> : <span>Sign Up</span>}
        </button>
        {error && <div className={`${styles.errorMessage} error`}>{error}</div>}
      </form>
    </div>
  );
};

export default SignupForm;
