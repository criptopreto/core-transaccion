import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../config/useSocket";
import {
  fetchConfig,
  fetchUser,
  setConfigBalance,
  setPayAccountBalance,
} from "../redux/appSlice";
import Header from "./Header";
import Loader from "./Loader";
import LoaderPay from "./LoaderPay";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";

export default function Layout({
  children,
  nonHeader = false,
  nonSidebar = false,
  className = null,
}) {
  const socket = useSocket();
  const loading = useSelector((state) => state.app.loading);
  const loading_pay = useSelector((state) => state.app.loading_pay);
  const notify = (username, amount) =>
    toast(`🔔 ${username} le ha enviado $${amount}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const dispatch = useDispatch();

  let playCashIn = () => {
    let audio = new Audio("/assets/audio/cashin.mp3");
    audio.play();
  };

  useEffect(() => {
    dispatch(fetchConfig());
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    listenEvents();
  }, [socket]);

  const listenEvents = () => {
    if (socket) {
      socket.on("pay:payment_incoming", (data) => {
        if (data.type === 2) {
          dispatch(setPayAccountBalance({ index: 0, balance: data.balance }));
          notify(data.from, parseFloat(data.amount).toFixed(2));
        }
        playCashIn();
      });
    }
  };

  return (
    <>
      <Head>
        <title>Pay</title>
      </Head>
      <ToastContainer />
      <div className={className ? className : "h-full bg-alpha-dark bg-cover"}>
        {loading ? <Loader /> : loading_pay ? <LoaderPay /> : null}
        {nonSidebar ? "" : <Sidebar />}
        <div className="md:pl-64 flex flex-col flex-1 h-full">
          {nonHeader ? "" : <Header />}

          <main className="h-[91%]">
            <div className="h-full">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
