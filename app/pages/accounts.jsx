import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { setLoading } from "../redux/appSlice";

export default function Accounts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <Layout>
      <div className="px-4">
        <div className="w-full flex gap-1 items-center text-blue-900 bg-gradient-to-br from-blue-300  to-blue-200 px-4 py-5 rounded-md shadow-sm text-center">
          <MdCancel className="ml-auto h-5 w-5" />
          <span className="mr-auto">No hay cuentas registradas</span>
        </div>
      </div>
    </Layout>
  );
}
