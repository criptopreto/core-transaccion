import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { ImArrowLeft2 } from "react-icons/im";
import icoDash from "../public/assets/images/ico_dash.svg";
import icoETH from "../public/assets/images/ico_eth.svg";
import icoBTC from "../public/assets/images/ico_btc.svg";
import Image from "next/image";

const icon_list = { dash: icoDash, ethereum: icoETH, bitcoin: icoBTC };

export default function detailwallet() {
  const router = useRouter();
  const query = router.query;
  const handleBack = () => {
    return router.push("/home");
  };
  return (
    query && (
      <Layout nonHeader nonSidebar className="h-full bg-white-styled bg-cover">
        <motion.header
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.2 }}
          className="min-h-[5%] bg-gradient-to-r from-purple-700 via-violet-600 to-violet-800 flex flex-col p-2 mb-4 rounded-b-md shadow-sm"
        >
          <div className="flex">
            <div className="flex-1 items-center flex justify-between text-slate-300">
              <button onClick={handleBack}>
                <ImArrowLeft2 className="h-5 w-5" />
              </button>
              <p className="font-semibold flex items-center gap-2 text-xl">
                <Image
                  src={icon_list[query.icon] || icoDash}
                  alt="ico"
                  width="20px"
                  height="20px"
                  objectFit="cover"
                />
                {query.symbol}
              </p>
              <div></div>
            </div>
          </div>
        </motion.header>
        <div className="mt-5 w-full bg-indigo-300/20 backdrop-blur-sm py-6">
          <div className="w-full">
            <p className="text-center text-indigo-800">Total</p>
            <p className="text-center text-3xl font-semibold text-indigo-900">
              {query.balance}
            </p>
            <div className="flex justify-between px-20 mt-6">
              <div className="flex flex-col items-center">
                <span>Disponible</span>
                <span className="font-semibold">{query.balance}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Bloqueado</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-3xl text-center font-semibold">
            Conectar CORE CRIPTO
          </p>
        </div>
      </Layout>
    )
  );
}
