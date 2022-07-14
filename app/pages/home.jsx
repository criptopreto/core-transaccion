import { withIronSessionSsr } from "iron-session/next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActionsMain from "../components/ActionsMain";
import Cupones from "../components/Cupones";
import Layout from "../components/Layout";
import SaldoMain from "../components/SaldoMain";
import SaldoWallet from "../components/SaldoWallet";
import { sessionOptions } from "../lib/session";
import { setLoading } from "../redux/appSlice";

export default function Home({ user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <>
      {user && (
        <Layout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full">
            <div className="h-full grid grid-rows-10 gap-1 overflow-hidden">
              <div className="row-span-3">
                <SaldoMain />
              </div>
              <div className="row-start-4 row-span-2 overflow-y-auto border-t pt-2">
                <SaldoWallet />
              </div>
              <div className="row-span-4">
                <Cupones />
              </div>
              <div className="row-start-[10] row-end-[11] flex items-center px-1">
                <ActionsMain />
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req?.session?.user;

  if (!user || user === undefined) {
    res.setHeader("location", "/auth/signin");
    res.statusCode = 302;
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
},
sessionOptions);
