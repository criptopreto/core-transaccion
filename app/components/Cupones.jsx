import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Cupones() {
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <span className="text-indigo-100 text-lg font-semibold">
          Mis cupones
        </span>
      </div>
      <div className="h-full w-full overflow-auto">
        <div className="w-full h-full">
          <Link href="/cupon-detail?cupon=2&code=45784">
            <Image
              className="rounded-lg shadow-lg"
              src={`/assets/images/cupones/banner2.png`}
              width={`500px`}
              height={`140px`}
              alt="Cupones"
            />
          </Link>
          <Link href="/cupon-detail?cupon=3&code=154487">
            <Image
              className="rounded-lg "
              src={`/assets/images/cupones/banner3.png`}
              width={`500px`}
              height={`140px`}
              alt="Cupones"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
