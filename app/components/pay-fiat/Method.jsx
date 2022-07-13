import React from "react";
import Loader from "../Loader";

let payment_methods = [
  { name: "ACH" },
  { name: "Credit Card" },
  { name: "Venmo" },
  { name: "Pago Móvil" },
  { name: "Skrill" },
  { name: "Cash" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Method() {
  return (
    <div>
      <main className="max-w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold text-indigo-800 mb-2">
          Seleccione su método de Pago
        </h1>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 mt-3">
          {payment_methods.map((payment_method, index) => (
            <button
              type="button"
              className="flex flex-col"
              key={payment_method.name}
            >
              <div
                className={classNames(
                  index % 2 === 0 ? "bg-gradient-to-r" : "bg-gradient-to-l",
                  "p-4 w-full text-center  from-indigo-800/80 to-indigo-700/80 rounded-lg shadow-lg border-2 border-violet-800 shadow-indigo-600/20"
                )}
              >
                <span className="text-xl w-full text-indigo-50">
                  {payment_method.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
