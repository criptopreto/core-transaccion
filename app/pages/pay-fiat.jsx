import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Destinatary from "../components/pay/Destinatary";
import { useRouter } from "next/router";
import { ImArrowLeft2 } from "react-icons/im";
import { BiHistory } from "react-icons/bi";
import Saldo from "../components/pay/Saldo";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { restartPaySteps, setDestinatary, setPayStep } from "../redux/appSlice";
import Amount from "../components/pay/Amount";
import Method from "../components/pay-fiat/Method";
import useUser from "../lib/useUser";

export default function PayFiat() {
  const router = useRouter();
  const dispatch = useDispatch();
  const payStep = useSelector((state) => state.app.pay.payStep);
  const { user } = useUser({ required: true, redirect: "/auth/signin" });
  let saldo = (user?.pay_accounts && user?.pay_accounts[0]?.balance) || 0;
  let currency_id =
    (user?.pay_accounts && user?.pay_accounts[0]?.currency_id) || "";
  let user_id = user?.id || "";

  const handleBack = () => {
    if (payStep === 0) {
      dispatch(restartPaySteps());
      return router.back();
    }
    dispatch(setPayStep(payStep - 1));
  };
  return (
    <Layout nonHeader className="h-full bg-white-styled bg-cover">
      <div className="h-full">
        <motion.header
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.2 }}
          className="min-h-[15%] bg-gradient-to-r from-purple-700 to-violet-800 flex flex-col p-2 mb-4 rounded-b-3xl shadow-sm"
        >
          <div className="flex">
            <div className="flex-1 items-center flex justify-between text-slate-300">
              <button onClick={handleBack}>
                <ImArrowLeft2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center text-slate-300">
              <BiHistory className="h-5 w-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <Saldo balance={saldo} />
          </div>
        </motion.header>
        {payStep === 0 ? (
          <AnimatePresence>
            <Method />
          </AnimatePresence>
        ) : null}
        {payStep === 1 ? (
          <Amount balance={saldo} currency_id={currency_id} user_id={user_id} />
        ) : null}
      </div>
    </Layout>
  );
}
