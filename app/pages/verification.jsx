import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ImArrowLeft2 } from "react-icons/im";
import Image from "next/image";

export default function Verification() {
  const router = useRouter();
  const query = router.query;
  const handleBack = () => {
    return router.push("/home");
  };
  return (
    <Layout nonHeader nonSidebar className="h-full">
      <div className="h-full grid grid-rows-12 gap-1">
        <div className="row-span-1">
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
                <p className="font-semibold text-xl">
                  Verificación de la Cuenta
                </p>
                <div></div>
              </div>
            </div>
          </motion.header>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <Image
              src="/assets/images/check_user.svg"
              alt="user"
              width="150px"
              height="150px"
            />
          </div>
          <div className="w-full h-full text-center text-2xl text-indigo-800">
            Se requiere la contratación de empresa para verificación de
            documentación y biometría.
          </div>
        </div>
      </div>
    </Layout>
  );
}
