import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { ImArrowLeft2 } from "react-icons/im";
import { useQRCode } from "next-qrcode";
import Image from "next/image";

export default function CuponDetail() {
  const router = useRouter();
  const query = router.query;
  const handleBack = () => {
    return router.push("/home");
  };
  const { Canvas } = useQRCode();
  return (
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
            <p className="font-semibold text-xl">Mis Cupones</p>
            <div></div>
          </div>
        </div>
      </motion.header>
      <div className="w-full h-full">
        <div className="w-full px-6 flex flex-col gap-3">
          <p className="text-indigo-800 font-semibold text-lg text-center">
            Presenta este código en el Comercio
          </p>
          <div className="w-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-indigo-200 flex flex-col gap-1 rounded-md">
            <div className="mx-auto">
              <Canvas
                text={`1;${query.code}`}
                options={{
                  type: "image/jpeg",
                  quality: 0.3,
                  level: "M",
                  margin: 3,
                  scale: 4,
                  width: 300,
                  color: {
                    dark: "#160450FF",
                    light: "#FFFFFF00",
                  },
                }}
              />
            </div>
          </div>
          <p className="text-center bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-200 text-lg font-semibold py-2 shadow-sm rounded-md">
            {query.code}
          </p>
          <div className="w-full">
            <Image
              className="rounded-lg "
              src={`/assets/images/cupones/banner${query.cupon}.png`}
              width={`500px`}
              height={`140px`}
              alt="Cupones"
            />
          </div>
          <div>
            <p className="text-sm text-indigo-500/80 italic">
              Las condiciones de uso del presente cupón son impuestas por la
              compañía patrocinadora
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
