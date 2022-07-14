import Image from "next/image";
import Link from "next/link";
import React from "react";

import icoDash from "../public/assets/images/ico_dash.svg";
import icoETH from "../public/assets/images/ico_eth.svg";
import icoBTC from "../public/assets/images/ico_btc.svg";
import useSWR from "swr";
import { useEffect } from "react";
import { TbArrowNarrowUp } from "react-icons/tb";
import { TbArrowNarrowDown } from "react-icons/tb";
import { TbEqual } from "react-icons/tb";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaBitcoin, FaSpinner } from "react-icons/fa";

const icon_list = { dash: icoDash, ethereum: icoETH, bitcoin: icoBTC };

const wallets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.04313",
    usd: "$852.90",
    icon: "bitcoin",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "0.5454",
    usd: "$581.79",
    icon: "ethereum",
  },
  {
    name: "Dash",
    symbol: "DASH",
    balance: "65,00",
    usd: "$2,668.65",
    icon: "dash",
  },
];

export default function SaldoWallet() {
  const { data: precio } = useSWR("/api/crypto/get?symbols=BTC,ETH,DASH");

  const calculatePriceUSD = (symbol, balance) => {
    if (precio) {
      const price = precio[symbol].price;
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(parseFloat(balance) * parseFloat(price));
    }
  };

  const getChange = (symbol) => {
    if (precio) {
      const price = precio[symbol].price;
      const change = precio[symbol].change;
      return {
        change: `$${new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price)} • ${change.toFixed(2)}%`,
        color:
          change > 0
            ? "text-green-500"
            : change === 0
            ? "text-blue-400"
            : "text-red-400",
        intention:
          change > 0 ? (
            <TbArrowNarrowUp />
          ) : change === 0 ? (
            <TbEqual />
          ) : (
            <TbArrowNarrowDown />
          ),
      };
    }
  };

  useEffect(() => {
    if (!precio) return;
  }, [precio]);
  return (
    <>
      <span className="text-indigo-100 text-lg font-semibold flex items-center gap-2">
        <FaBitcoin />
        Mis Criptoactivos
      </span>
      {precio ? (
        <div className="overflow-y-auto">
          <div className="flex gap-y-2 flex-col">
            {wallets.map((wallet) => (
              <Link href="/detail-wallet" key={wallet.name}>
                <a className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 relative">
                      <Image
                        src={icon_list[wallet.icon]}
                        alt="ico"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col ml-2 text-xs">
                      <div className="font-semibold text-slate-100">
                        {wallet.symbol}
                      </div>
                      <div className="text-slate-300">{wallet.balance}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col ml-2 text-xs text-right">
                      <div className="font-semibold text-slate-100">
                        ${" "}
                        {calculatePriceUSD(
                          wallet.symbol.toUpperCase(),
                          wallet.balance
                        )}
                      </div>
                      <div
                        className={`
                        ${
                          getChange(wallet.symbol.toUpperCase()).color
                        } flex items-center
                      `}
                      >
                        {getChange(wallet.symbol.toUpperCase()).intention}
                        <div>
                          {getChange(wallet.symbol.toUpperCase()).change}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-2/4 w-full">
          <div className="mx-auto my-auto">
            <span className="flex mx-auto items-center gap-2 text-indigo-300 text-xl">
              <FaSpinner className="animate-spin" />
              Cargando...
            </span>
          </div>
        </div>
      )}
    </>
  );
}
