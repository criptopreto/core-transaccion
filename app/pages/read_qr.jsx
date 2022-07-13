import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Read_qr() {
  const [data, setData] = useState("No result");
  return (
    <>
      <QrReader
        onResult={(res, err) => {
          if (!!res) {
            setData(res?.text);
          }

          if (!!err) {
            console.error(err);
          }
          constraints = {
            facingMode: "environment",
          };
        }}
        style={{ width: "40%", height: "40%" }}
      />
      <p>{data}</p>
    </>
  );
}
