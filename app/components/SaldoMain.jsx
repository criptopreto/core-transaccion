import Link from "next/link";
import React from "react";
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

export default function SaldoMain() {
  const { user } = useUser();
  const config = useSelector((state) => state.app.config);
  let saldo =
    useSelector((state) => state.app?.user?.pay_accounts[0]?.balance) || 0;
  return (
    <div className="mb-2 h-full">
      <div className="w-full h-full">
        <div className="bg-gradient-to-br from-purple-900/70 to-violet-700/70 rounded-lg px-5 py-2 shadow-lg h-full">
          <Link href="/detail-account">
            <a>
              <div className="w-full text-center text-zinc-100">
                Saldo Actual
              </div>
              <div className="w-full text-center text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-violet-200 drop-shadow-md">
                $
                {user &&
                  new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(saldo)}
              </div>
              <div className="text-center text-lg text-indigo-200/70">
                ~ {convertToBs(saldo, config?.c_currency_secondary.value || 0)}{" "}
                Bs
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
