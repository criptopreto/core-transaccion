import React from "react";
import Layout from "../../components/Layout";
import Loginform from "../../components/Login-form";

export default function Signin() {
  return (
    <Layout nonHeader nonSidebar>
      <Loginform />
    </Layout>
  );
}
