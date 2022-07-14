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
import jwt from "jsonwebtoken";

export default function Home({ user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <>
      {user && (
        <Layout height="h-[92%]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full">
            <div className="h-full grid grid-rows-14 gap-1 overflow-hidden">
              <div className="row-start-1 row-span-4">
                <SaldoMain user={user} />
              </div>
              <div className="row-span-4 overflow-y-auto border-t pt-2">
                <SaldoWallet />
              </div>
              <div className="row-span-4">
                <Cupones />
              </div>
              <div className="row-start-[14] row-end-[15] flex items-center pb-4">
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
  let user = req?.session?.user;

  if (!user || user === undefined) {
    res.setHeader("location", "/auth/signin");
    res.statusCode = 302;
    return {
      props: {
        user: null,
      },
    };
  }
  user = user && jwt.decode(user.token);
  return {
    props: {
      user: user.user,
    },
  };
},
sessionOptions);
