import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";
import React from "react";
import useSocket from "../config/useSocket";

export default function ActionsMain() {
  const socket = useSocket();
  return (
    <>
      <div className="flex gap-x-4 w-full">
        <Link href="/pay-destination">
          <a
            className="inline-flex items-center text-center px-6 gap-2 py-3 border border-transparent shadow-sm text-base font-medium rounded-md w-full text-white bg-gradient-to-br from-indigo-900 to-indigo-800 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
            onClick={() => {
              socket.emit("user:action:pay", { action: "pay" });
            }}
          >
            <GiPayMoney className="h-5 w-5 ml-auto" aria-hidden="true" />
            <span className="mr-auto">Pagar</span>
          </a>
        </Link>
        <Link href="/deposit-from">
          <a className="inline-flex items-center px-6 gap-2 py-3 border border-transparent shadow-sm text-base font-medium rounded-md w-full text-white bg-gradient-to-bl from-indigo-900 to-indigo-800 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700">
            <GiReceiveMoney className="h-5 w-5 ml-auto" aria-hidden="true" />
            <span className="mr-auto">Depositar</span>
          </a>
        </Link>
      </div>
    </>
  );
}
