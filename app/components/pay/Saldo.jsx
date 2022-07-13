import React from "react";
import { useSelector } from "react-redux";

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

export default function Saldo({ balance }) {
  const config = useSelector((state) => state.app.config);

  return (
    <div>
      <div className="w-full text-center text-zinc-100">Saldo Actual</div>
      <div className="w-full text-center text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-violet-200 drop-shadow-md select-none">
        {"$ " +
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
          }).format(balance)}
      </div>
      <div className="text-center text-lg text-indigo-200/70">
        ~ {convertToBs(balance, config?.c_currency_secondary.value || 0)} Bs
      </div>
    </div>
  );
}
