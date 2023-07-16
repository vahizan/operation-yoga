import { FC } from "react";
import Layout from "../ui/Layout";
import SignupForm from "../ui/Form/SignupForm";

const Register: FC = () => {
  return (
    <Layout>
      <h1>Register</h1>
      <SignupForm />
    </Layout>
  );
};

export default Register;
