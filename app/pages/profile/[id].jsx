import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import { ImArrowLeft2 } from "react-icons/im";
import { useRouter } from "next/router";
import { BiHistory } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { BsFillShieldSlashFill } from "react-icons/bs";
import useUser from "../../lib/useUser";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();

  const handleBack = () => {
    return router.push("/home");
  };

  return (
    <Layout nonHeader nonSidebar className="h-full bg-white-styled bg-cover">
      <div className="h-full grid grid-rows-12 gap-1">
        <div className="row-start-1 row-end-2">
          <motion.header
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 0.2 }}
            className="min-h-[150px] bg-gradient-to-r from-purple-700 via-violet-600 to-violet-800 flex flex-col p-2 mb-4 rounded-b-3xl shadow-sm"
          >
            <div className="flex flex-col text-slate-300">
              <div className="flex-1 items-center flex justify-between">
                <button onClick={handleBack}>
                  <ImArrowLeft2 className="h-5 w-5" />
                </button>
              </div>
              <p className="w-full text-center font-semibold text-2xl">
                Mi Perfil
              </p>
            </div>
          </motion.header>
        </div>
        <div className="row-start-2 row-end-[11] overflow-auto h-full">
          <div className="max-w-[95%] flex flex-col mx-auto h-full">
            <div className="flex">
              <div className="mx-auto rounded-full border-4 border-spacing-2 z-20 border-indigo-700 w-[150px] h-[150px]">
                <Image
                  src="/assets/images/profile.svg"
                  alt="Profile"
                  width="150px"
                  height="150px"
                />
              </div>
            </div>
            <div className="text-center flex flex-col">
              <span className="text-indigo-800 text-3xl font-semibold">
                {user.name}
              </span>
              <span className="text-indigo-900/80 -mt-1">@{user.username}</span>
            </div>
            <div className="text-center flex flex-col gap-2 mt-2">
              <p className="text-lg">{user.id_card}</p>
            </div>
            <div className="mt-5 flex flex-col gap-y-3 px-8">
              <div>
                <span className="text-indigo-600/90">Correo Electrónico</span>
                <p className="py-4 border-b-2 border-indigo-500 bg-gradient-to-r backdrop-blur-md from-indigo-200/20 via-indigo-100/20 to-indigo-200/20 px-2 rounded-md">
                  {user.email}
                </p>
              </div>
              <div>
                <span className="text-indigo-600/90">Teléfono</span>
                <p className="py-4 border-b-2 border-indigo-500 bg-gradient-to-r backdrop-blur-md from-indigo-200/20 via-indigo-100/20 to-indigo-200/20 px-2 rounded-md">
                  {user.phone}
                </p>
              </div>
              <div>
                <span className="text-indigo-600/90">Fecha de Nacimiento</span>
                <p className="py-4 border-b-2 border-indigo-500 bg-gradient-to-r backdrop-blur-md from-indigo-200/20 via-indigo-100/20 to-indigo-200/20 px-2 rounded-md">
                  05/02/1965
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-2">
          <div className="w-full bg-red-200 px-10 py-4">
            <p className="text-red-900">Nivel de Verificación</p>
            <div className="flex items-center mt-2 gap-3">
              <BsFillShieldSlashFill
                className="mr-4 flex-shrink-0 h-12 w-12 text-red-600"
                aria-hidden="true"
              />
              <div className="text-lg text-red-700 font-semibold">
                No Verificado
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
