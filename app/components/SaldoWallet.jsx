import Image from "next/image";
import Link from "next/link";
import React from "react";

import icoDash from "../public/assets/images/ico_dash.svg";
import icoETH from "../public/assets/images/ico_eth.svg";
import icoBTC from "../public/assets/images/ico_btc.svg";

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
  return (
    <>
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
                    <div className="text-slate-300">{wallet.name}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col ml-2 text-xs text-right">
                    <div className="font-semibold text-slate-100">
                      {wallet.balance}
                    </div>
                    <div className="text-slate-300">{wallet.usd}</div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
