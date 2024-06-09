"use client";
import { FC } from "react";
import Layout from "../ui/Layout";
import styles from "./signup.module.scss";
import SignupForm from "../ui/Form/SignupForm";

const Signup: FC = () => {
  return (
    <Layout>
      <h1>Sign Up</h1>
      <div className={styles.signupFormContainer}>
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
