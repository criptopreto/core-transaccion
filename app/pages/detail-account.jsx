import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { ImArrowLeft2 } from "react-icons/im";
import { BiHistory } from "react-icons/bi";
import Saldo from "../components/pay/Saldo";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useQRCode } from "next-qrcode";

export default function DetailAccount() {
  let pay_account = useSelector((state) => state.app?.user?.pay_accounts[0]);

  const router = useRouter();
  const handleBack = () => {
    return router.push("/home");
  };
  const { Canvas } = useQRCode();

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
            <Saldo balance={pay_account?.balance ?? 0} />
          </div>
        </motion.header>
        <div>
          <main className="max-w-[90%] mx-auto">
            <h1 className="text-2xl text-center font-semibold text-indigo-800 mb-2">
              ¡Reciba pagos a través del QR!
            </h1>
            <div className="flex w-full">
              <div className="mx-auto">
                <Canvas
                  text={`1;${pay_account?.pay_id}`}
                  options={{
                    type: "image/jpeg",
                    quality: 0.3,
                    level: "M",
                    margin: 3,
                    scale: 4,
                    width: 300,
                    color: {
                      dark: "#000000FF",
                      light: "#FFFFFF00",
                    },
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
