import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import useUser from "../lib/useUser";

function convertToBs(value, secondary) {
  if (!value) {
    return "0.00";
  }
  let number = parseFloat(value);
  number = number * secondary;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export default function SaldoMain({ user }) {
  const [saludo, setSaludo] = React.useState("Hola");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setSaludo("Buenos días");
    } else if (hour < 18) {
      setSaludo("Buenas tardes");
    } else {
      setSaludo("Buenas noches");
    }
  }, []);
  const config = useSelector((state) => state.app.config);
  let pay_account = useSelector(
    (state) => state.app?.user?.pay_accounts[0]
  ) || { saldo: 0 };
  return (
    <div className="mb-2 h-full">
      <div className="w-full h-full px-2">
        <div className="mb-2">
          <span className="text-lg transition-all duration-500 ease-in-out text-transparent bg-gradient-to-r from-blue-300 to-indigo-300 font-bold  bg-clip-text hover:text-xl select-none">
            {saludo}, {user.name} 👋
          </span>
        </div>
        <div className="relative bg-gradient-to-br h-3/4 grid grid-rows-4 from-blue-900/70 to-blue-700/70 rounded-lg px-5 py-2 shadow-xl shadow-blue-900/70">
          <div className="absolute bg-[url('/assets/images/global.svg')] bg-fixed bg-cover inset-0 h-full rounded-lg"></div>
          <div className="row-span-1 w-full">
            <span className="text-indigo-100 font-semibold">
              Billetera Pricipal
            </span>
          </div>
          <Link href="/detail-account">
            <a className="flex flex-col gap-1 row-span-2">
              <div className="w-full text-zinc-100">Saldo Actual</div>
              <div className="w-full text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-violet-200 drop-shadow-md">
                $
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                }).format(pay_account.balance)}
              </div>
              <div className="text-lg font-semibold text-indigo-200/70">
                ~{" "}
                {convertToBs(
                  pay_account.balance,
                  config?.c_currency_secondary.value || 0
                )}{" "}
                Bs
              </div>
            </a>
          </Link>
          <div className="flex items-center text-sm justify-end w-full text-violet-200 gap-2 z-10">
            {`Pay ID: ${pay_account.pay_id}`}{" "}
            <FaRegCopy className="transition-all duration-500 ease-in-out cursor-pointer hover:text-lg hover:text-violet-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
