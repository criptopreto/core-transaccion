import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { ImArrowLeft2 } from "react-icons/im";
import Saldo from "../components/pay/Saldo";
import { useRouter } from "next/router";
import { BiHistory } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import TransactionsHistory from "../components/transactions/index";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/appSlice";

export default function Transactions() {
  const dispatch = useDispatch();
  const router = useRouter();
  let saldo =
    useSelector((state) => state.app?.user?.pay_accounts[0]?.balance) || 0;
  const handleBack = () => {
    return router.push("/home");
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <Layout nonHeader nonSidebar className="h-full bg-white-styled bg-cover">
      <div className="h-full grid grid-rows-12 gap-1">
        <div className="row-start-1 row-end-3">
          <motion.header
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 0.2 }}
            className=" w-full h-full bg-gradient-to-r from-purple-700 to-violet-800 flex flex-col p-2 rounded-b-3xl shadow-sm"
          >
            <div className="flex">
              <div className="flex-1 items-center flex justify-between text-slate-300">
                <button onClick={handleBack}>
                  <ImArrowLeft2 className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center text-slate-300"></div>
            </div>
            <div className="flex flex-col">
              <Saldo balance={saldo} />
            </div>
          </motion.header>
        </div>
        <div className="row-start-3 row-end-[13] overflow-auto h-full">
          <div className="max-w-[90%] mx-auto h-full">
            <div className="flex gap-2 items-center text-indigo-800">
              <BiHistory className="h-5 w-5" />
              Historial de Transacciones
            </div>
            <div className="mt-4">
              <TransactionsHistory />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
