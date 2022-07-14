import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Keyboard from "./Keyboard";
import { XIcon } from "@heroicons/react/outline";
import { MdCheck } from "react-icons/md";
import {
  setLoadingPay,
  setPayAccountBalance,
  setPayStep,
  setResultPay,
} from "../../redux/appSlice";
import { useEffect } from "react";
import payServices from "../../services/user/pay.services";

function formatAmount(value) {
  if (!value) {
    return "0.00";
  }
  let number = parseFloat(value);
  number = number / 100;

  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(
    number
  );
}

function getAmount(value) {
  if (!value) {
    return 0.0;
  }
  let number = parseInt(value);
  number = number / 100;
  return number;
}

function convertToBs(value) {
  if (!value) {
    return "0.00";
  }
  let number = parseFloat(value);
  number = number / 100;
  number = number * 5.89;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export default function Amount({ balance = 0, currency_id, user_id }) {
  const [open, setOpen] = useState(false);
  const [amountValid, setAmountValid] = useState(false);
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.app.pay.amount);

  const destinatary = useSelector((state) => state.app.pay.destinatary);
  const user_destinatary = useSelector(
    (state) => state.app.pay.user_destinatary
  );

  let handlePagar = async () => {
    setOpen(false);
    dispatch(setLoadingPay(true));
    let payment_data = {
      amount: getAmount(amount.join("")),
      receiver_id: user_destinatary?.id || "",
      user_id,
      currency: currency_id,
    };
    let response = await payServices.send_pay(payment_data);
    console.log("Result Pay:", response);
    dispatch(setPayAccountBalance({ index: 0, balance: response.balance }));
    dispatch(setLoadingPay(false));
    dispatch(setResultPay(response));
    return dispatch(setPayStep(2));
  };

  const validateAmount = () => {
    if (!amount || amount.length === 0) {
      return setAmountValid(false);
    }
    let number = parseInt(amount.join(""));
    number = number / 100;

    if (parseFloat(number) > parseFloat(balance)) {
      return setAmountValid(false);
    }
    return setAmountValid(true);
  };
  useEffect(() => {
    validateAmount();
  }, [amount, balance]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-x-0 bottom-0 flex w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-y-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-full">
                    <div className="flex h-full flex-col overflow-hidden bg-white/10 backdrop-blur-sm shadow-xl rounded-t-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-gradient-to-r from-violet-900/50 to-violet-600/50 py-6 px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-indigo-100 text-center w-full">
                              {destinatary} recibirá:
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md text-slate-300 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <p className="w-full text-indigo-50/80 font-light italic text-center">
                            ({user_destinatary.username})
                          </p>
                        </div>
                        <div className="bg-white/70 py-8">
                          <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            {/* content */}
                            <div className="w-full p-2">
                              <h2 className="text-3xl text-center w-full font-semibold text-indigo-900">
                                $ {formatAmount(amount.join(""))}
                              </h2>
                              <h3 className="text-lg text-indigo-800/80 text-center">
                                ~ {convertToBs(amount.join(""))} Bs
                              </h3>
                            </div>
                            <div className="absolute inset-0 px-4 sm:px-6">
                              <div
                                className="h-full border-2 border-dashed border-gray-200"
                                aria-hidden="true"
                              />
                            </div>
                            {/* /End Content */}
                          </div>
                          <div className="p-4">
                            <div className="p-5 bg-indigo-200/40">
                              <div className="w-full flex justify-between">
                                <span className="text-indigo-800/70">
                                  Método de pago:
                                </span>
                                <span className="text-indigo-900">
                                  Billetera Principal Pay
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 sm:px-6 mb-10">
                            <button
                              className="w-full p-4 bg-gradient-to-r from-green-700 to-green-600/90 rounded-md mt-6 text-green-50 disabled:bg-gradient-to-r disabled:from-indigo-800/70 disabled:to-indigo-600/70 flex shadow-md shadow-green-700/40"
                              disabled={amount.length === 0}
                              onClick={handlePagar}
                            >
                              <span className="mx-auto flex items-center gap-2">
                                Pagar
                                <MdCheck className="h-5 w-5" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div>
        <main className="max-w-[90%] mx-auto h-full">
          <h1 className="text-2xl font-semibold text-indigo-800 mb-2">
            Ingresa el monto a pagar
          </h1>
          <div className="flex h-full flex-col items-center justify-between">
            {/* Display */}
            <div className="flex-1 w-full">
              <div className="p-4 w-full text-center bg-indigo-300/40 rounded-lg">
                <span className="text-2xl w-full text-indigo-900">
                  $ {formatAmount(amount.join(""))}
                </span>
                <div className="text-sm italic text-indigo-700/80">
                  ~ {convertToBs(amount.join(""))} Bs
                </div>
              </div>
            </div>

            <Keyboard />
            <button
              className="w-full p-4 bg-gradient-to-r from-indigo-800 to-indigo-700/90 rounded-md mt-6 text-indigo-100 disabled:bg-gradient-to-r disabled:from-indigo-800/70 disabled:to-indigo-600/70"
              disabled={!amountValid}
              onClick={() => {
                setOpen(true);
              }}
            >
              Continuar
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
