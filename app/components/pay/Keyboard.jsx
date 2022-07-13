import React, { useState } from "react";
import { MdBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../../redux/appSlice";
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "delete"];

export default function Keyboard() {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.app.pay.amount);

  const handleSetAmount = (number) => {
    if (number === ".") return;
    // Add value to array
    if (number === "delete") {
      dispatch(setAmount(amount.slice(0, -1)));
    } else {
      dispatch(setAmount([...amount, number]));
    }
  };
  return (
    <div className="mt-5 w-full">
      <div className="grid grid-cols-3 gap-2">
        {numbers.map((number) => (
          <button
            className="bg-indigo-800/70 text-indigo-50 text-xl font-bold border-indigo-700 border-2 p-6 rounded-md shadow"
            key={number}
            onClick={() => {
              handleSetAmount(number);
            }}
          >
            {number == "." ? (
              ""
            ) : number == "delete" ? (
              <MdBackspace className="mx-auto" />
            ) : (
              number
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
