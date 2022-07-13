import React from "react";
import Layout from "../../components/Layout";
import Loginform from "../../components/Login-form";
import SignupForm from "../../components/Signup-form";

export default function Signin() {
  return (
    <Layout nonHeader nonSidebar>
      <SignupForm />
    </Layout>
  );
}
