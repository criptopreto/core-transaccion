import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../lib/useUser";
import { MdCheckCircleOutline } from "react-icons/md";
import { restartPaySteps } from "../../redux/appSlice";

function formatAmount(value) {
  if (!value) {
    return "0.00";
  }

  return new Intl.NumberFormat("es-VE", { minimumFractionDigits: 2 }).format(
    value
  );
}

// Get last 8 digits
function getLast8Digits(value) {
  if (!value) {
    return "";
  }
  return value.substring(value.length - 8);
}

// Date to locale string
function dateToLocaleString(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Result() {
  const dispatch = useDispatch();
  const { user } = useUser();
  let pay_account = user?.pay_accounts && user?.pay_accounts[0].pay_id;
  const resultPay = useSelector((state) => state.app.pay.result_pay);
  const user_destinatary = useSelector(
    (state) => state.app.pay.user_destinatary
  );
  const destinatary = useSelector((state) => state.app.pay.destinatary);

  const handleFinish = () => {
    dispatch(restartPaySteps());
  };
  return (
    <div>
      <main className="max-w-[90%] mx-auto">
        <h1 className="text-2xl text-center font-semibold text-indigo-800 mb-2">
          Resultado de la operación
        </h1>
        <MdCheckCircleOutline className="mx-auto h-16 w-16 text-green-500" />
        <div className="px-3 py-4 bg-gradient-to-br from-indigo-300 to-indigo-200 rounded-lg mt-2 text-indigo-900">
          <p className="text-2xl text-center font-semibold">
            $ {formatAmount(resultPay.amount)}
          </p>
        </div>
        <div className="mt-2 px-6 grid gap-y-2 grid-cols-2 text-lg">
          <span>Fecha:</span>
          <span className="flex justify-end">
            {dateToLocaleString(resultPay.createdAt)}
          </span>
          <span>Referencia:</span>
          <span className="flex justify-end">
            {getLast8Digits(resultPay.id)}
          </span>
          <span>Origen:</span>
          <span className="flex justify-end">{pay_account}</span>
          <span>Destino:</span>
          <span className="flex justify-end">{destinatary}</span>
          <span>Usuario:</span>
          <span className="flex justify-end">{user_destinatary.username}</span>
        </div>
        <button
          className="w-full p-4 bg-gradient-to-r from-sky-800 to-sky-700/90 rounded-md mt-6 text-sky-100 disabled:bg-gradient-to-r disabled:from-green-800/70 disabled:to-green-600/70"
          onClick={handleFinish}
        >
          Finalizar
        </button>
      </main>
    </div>
  );
}
