import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { motion, MotionConfig } from "framer-motion";

export default function PayDestination() {
  return (
    <Layout>
      <div className="h-full flex flex-col justify-between">
        <Link href="/pay">
          <motion.div className="w-full h-full items-center flex bg-gradient-to-r from-indigo-500/25 via-purple-500/25 to-violet-500/25">
            <span className="w-full text-center text-indigo-100 text-4xl select-none">
              <a>Usuario Pay</a>
            </span>
          </motion.div>
        </Link>
        <Link href="/pay-fiat">
          <div className="w-full h-full  flex items-center bg-gradient-to-r from-red-500/25 via-pink-600/30 to-purple-600/25">
            <span className="w-full text-center text-indigo-100 text-4xl select-none ">
              Fiat
            </span>
          </div>
        </Link>
        <Link href="/pay-cripto">
          <div className="w-full h-full items-center flex bg-gradient-to-r from-blue-500/25 via-indigo-600/30 to-violet-800/25">
            <span className="w-full text-center text-indigo-100 text-4xl select-none">
              Ciptomonedas
            </span>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
