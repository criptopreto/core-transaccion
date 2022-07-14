import { withIronSessionSsr } from "iron-session/next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ActionsMain from "../components/ActionsMain";
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
            <div className="h-full grid grid-rows-6 gap-1 overflow-hidden">
              <div>
                <SaldoMain />
              </div>
              <div className="row-start-2 row-end-6 overflow-y-auto border-t pt-2">
                <SaldoWallet />
              </div>
              <div className="row-start-6 row-end-7 flex items-center px-1">
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
