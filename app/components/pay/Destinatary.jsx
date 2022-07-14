import { AnimatePresence, motion } from "framer-motion";
import { Html5Qrcode } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import { MdQrCodeScanner, MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import {
  setDestinatary,
  setLoading,
  setPayStep,
  setUserDestinatary,
} from "../../redux/appSlice";
import { findUserByPaymentMethod } from "../../services/pay.services";

let html5QrCode;
const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Destinatary() {
  const [destinatary_fetched, setDestinataryFetched] = useState(false);
  const dispatch = useDispatch();
  const destinatary = useSelector((state) => state.app.pay.destinatary);
  const user = useSelector((state) => state.app.user);
  const user_destinatary = useSelector(
    (state) => state.app.pay.user_destinatary
  );
  const [result, setResult] = useState("");
  const [onQr, setOnQr] = useState(false);

  const [inputType, setInputType] = useState({
    type: "email",
    id: "email",
    placeholder: "people@example.com",
  });

  const setType = (data) => {
    switch (data.type) {
      case 1:
        setInputType({
          type: "number",
          id: "payid",
          placeholder: "Ej.: 123456789",
        });
        dispatch(setDestinatary(data.user.pay_id));
        break;
      case 2:
        setInputType({
          type: "email",
          id: "email",
          placeholder: "people@example.com",
        });
        dispatch(setDestinatary(data.user.email));
        break;
    }
  };

  const handleContinue = async () => {
    if (!user_destinatary || !destinatary_fetched) {
      dispatch(setLoading(true));
      let data = await findUserByPaymentMethod({
        type: inputType.type,
        data: destinatary,
      });
      dispatch(setLoading(false));
      let dest = data?.user || null;
      console.log(dest);
      if (dest && dest.email === user.email) {
        dest = false;
      }
      setDestinataryFetched(true);
      dispatch(setUserDestinatary(dest));
    } else {
      dispatch(setPayStep(1));
    }
  };

  const handleStopQr = () => {
    try {
      html5QrCode.stop();
    } catch {}
    setOnQr(false);
    document.getElementById("reader").style.display = "none";
  };

  const handleSetType = (type) => {
    dispatch(setDestinatary(""));
    dispatch(setUserDestinatary(""));
    setInputType(type);
  };

  const handleScan = async () => {
    if (onQr) return handleStopQr();
    await setOnQr(true);

    html5QrCode = new Html5Qrcode("reader");
    setResult("");
    const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
      dispatch(setLoading(true));
      let result_fetch = await findUserByPaymentMethod({
        type: "qr",
        data: decodedText,
      });
      dispatch(setLoading(false));
      if (result_fetch) {
        let dest = result_fetch?.user || null;
        if (dest.email === user.email) {
          dest = false;
        }
        dispatch(setUserDestinatary(dest));
        setType(result_fetch);
      } else {
        dispatch(setUserDestinatary(null));
      }
      handleStopQr();
    };

    setTimeout(() => {
      html5QrCode.start(
        { facingMode: "environment" },
        qrConfig,
        qrCodeSuccessCallback
      );
    }, 100);

    document.getElementById("reader").style.display = "block";
  };

  useEffect(() => {
    try {
      html5QrCode = new Html5Qrcode("reader");
    } catch (e) {}
  }, []);

  return (
    <div>
      <main className="max-w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold text-indigo-800 mb-2">
          Enviar a usuario Pay
        </h1>
        <AnimatePresence>
          (
          {onQr && (
            <>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, ease: "easeOut", duration: 2 }}
                className="hidden mx-auto shadow-xl shadow-indigo-700/30 w-[300px] border-indigo-800 border-2 rounded"
                id="reader"
              ></motion.div>
            </>
          )}
          )
        </AnimatePresence>
        <p className="text-indigo-800 font-bold text-center">{result}</p>
        {/* <p className="text-sm italic text-indigo-700/80 mt-4">
          Set Email, Phone, Pay ID or scan qr
        </p> */}
        <div className="flex gap-3 justify-start mt-4">
          <button
            className={classNames(
              inputType.id === "email"
                ? "bg-indigo-200/50 border-indigo-700 border-2 rounded-md shadow"
                : "",
              "px-2 py-1 text-indigo-900"
            )}
            onClick={() => {
              handleSetType({
                type: "email",
                id: "email",
                placeholder: "people@example.com",
              });
            }}
          >
            Email
          </button>
          <button
            className={classNames(
              inputType.id === "phone"
                ? "bg-indigo-200/50 border-indigo-700 border-2 rounded-md shadow"
                : "",
              "px-2 py-1 text-indigo-900"
            )}
            onClick={() => {
              handleSetType({
                type: "number",
                id: "phone",
                placeholder: "Ej.: 584125521234",
              });
            }}
          >
            Phone
          </button>
          <button
            className={classNames(
              inputType.id === "payid"
                ? "bg-indigo-200/50 border-indigo-700 border-2 rounded-md shadow"
                : "",
              "px-2 py-1 text-indigo-900"
            )}
            onClick={() => {
              handleSetType({
                type: "number",
                id: "payid",
                placeholder: "Ej.: 12345678",
              });
            }}
          >
            Pay ID
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type={inputType.type}
            name={inputType.id}
            placeholder={inputType.placeholder}
            className="p-3 rounded-md w-full outline-indigo-700 bg-slate-300/80 placeholder:text-slate-500"
            value={destinatary}
            onChange={(e) => {
              console.log(e.target.value);
              setDestinataryFetched(false);
              dispatch(setDestinatary(e.target.value));
            }}
          />
          <button className="flex-shrink-0" onClick={handleScan}>
            {!onQr ? (
              <MdQrCodeScanner className="h-10 w-10 text-indigo-700 hover:text-indigo-500" />
            ) : (
              <MdOutlineCancel className="h-10 w-10 text-indigo-700 hover:text-indigo-500" />
            )}
          </button>
        </div>
        {user_destinatary ? (
          <div className="mt-2">
            <p className="text-lg text-indigo-800 flex gap-2 items-center">
              <GiCheckMark /> {user_destinatary.name} (
              <span className="italic text-indigo-700/70">
                {user_destinatary.username}
              </span>
              )
            </p>
          </div>
        ) : user_destinatary === null ? (
          <div className="mt-2">
            <p className="text-md text-red-800/90 italic flex gap-2 items-center">
              <GiCancel />
              Usuario no existe en el sistema
            </p>
          </div>
        ) : user_destinatary === false ? (
          <div className="mt-2">
            <p className="text-md text-red-800/90 italic">
              No puedes trasferirte a ti mismo
            </p>
          </div>
        ) : null}
        <div>
          <button
            className="w-full p-4 bg-gradient-to-r from-indigo-800 to-indigo-700/90 rounded-md mt-6 text-indigo-100 disabled:bg-gradient-to-r disabled:from-indigo-800/70 disabled:to-indigo-600/70"
            onClick={handleContinue}
            disabled={!destinatary}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}
