import React from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";

export default function Singout() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location.href = "/auth/signin";
  }, []);
  return (
    <Layout nonHeader nonSidebar>
      <div className="h-full flex">
        <div className="mx-auto my-auto">
          <p className="font-semibold text-2xl text-indigo-100">
            Cerrando Sesión...
          </p>
        </div>
      </div>
    </Layout>
  );
}
