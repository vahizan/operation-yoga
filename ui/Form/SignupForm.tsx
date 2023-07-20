import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import styles from "./signupForm.module.scss";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
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
        await router.push("/login");
      } else {
        const data = await response.data.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.signupFormContainer}>
      {error && <div className={`${styles.errorMessage} error`}>{error}</div>}
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
          <label htmlFor={"phone"}>Phone Number (Optional):</label>
          <input
            name={"phone"}
            id={"phone"}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
