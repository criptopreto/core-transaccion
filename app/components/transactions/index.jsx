import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../redux/appSlice";
import {
  BsArrowUpRightSquareFill,
  BsArrowDownLeftSquareFill,
} from "react-icons/bs";

// Date to locale string
function dateToLocaleString(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Get last 8 digits
function getLast8Digits(value) {
  if (!value) {
    return "";
  }
  return value.substring(value.length - 8);
}

export default function Index() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.app.history);
  useEffect(() => {
    dispatch(fetchHistory());
  }, []);
  return (
    <div className="mb-2">
      {history.length > 0 ? (
        <div className="flex items-center flex-col gap-y-2">
          {history.map((his) => (
            <div
              key={his.id}
              className="w-full bg-gradient-to-r from-indigo-200/80 via-violet-200/80 to-purple-200/80 p-4 rounded-md shadow-md"
            >
              <div className="flex gap-x-2 justify-between items-center">
                <div className="flex-0 items-center">
                  {his.type === "Credit" ? (
                    <BsArrowDownLeftSquareFill className="h-6 w-6 text-indigo-600" />
                  ) : (
                    <BsArrowUpRightSquareFill className="h-6 w-6 text-violet-600" />
                  )}
                </div>
                <div className="w-full">
                  {his.type === "Debit" ? (
                    <div className="text-indigo-900 text-sm">
                      Pago enviado a {his?.destinatary_account?.user?.name}
                    </div>
                  ) : (
                    <div className="text-indigo-900 text-sm">
                      Transferencia Recibida #{getLast8Digits(his.id)}
                    </div>
                  )}
                  <div className="text-indigo-700/80 text-xs">
                    {dateToLocaleString(his.createdAt)}
                  </div>
                </div>
                <div className="text-indigo-900 font-semibold">
                  ${parseFloat(his?.amount || 0).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex gap-1 items-center text-blue-900 bg-gradient-to-br from-blue-300  to-blue-200 px-4 py-5 rounded-md shadow-sm text-center">
          <MdCancel className="ml-auto h-5 w-5" />
          <span className="mr-auto">No hay transacciones registradas</span>
        </div>
      )}
    </div>
  );
}
