import React from "react";
import Layout from "../../ui/Layout";
import withAuth from "../../hoc/withAuth";

export const Lessons = () => {
  return (
    <Layout>
      <>
        <h1>Bookings</h1>
      </>
    </Layout>
  );
};

export default withAuth(Lessons);
