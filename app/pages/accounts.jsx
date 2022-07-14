import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { setLoading } from "../redux/appSlice";

export default function Accounts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return <Layout>Accounts</Layout>;
}
