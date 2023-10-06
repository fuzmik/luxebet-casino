import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { removePick } from "../../../store/features/sportsbook/betSlipSlice";

import CloseIcon from "../../../icons/CloseIcon";
import { calculatePayout } from "./utils/calculatePayout";

interface PickProps {
  team: string;
  price: number;
  point?: number;
  betType: string;
  onChange: (amount: number) => void;
}

export default function Pick({
  team,
  price,
  point,
  betType,
  onChange,
}: PickProps) {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<number>(0);
  const [payout, setPayout] = useState(0);

  const handleRemovePick = () => {
    dispatch(removePick({ team, price, point, betType }));
  };

  useEffect(() => {
    const payout = calculatePayout(price, inputValue);
    setPayout(payout);
  }, [inputValue, price]);

  return (
    <div className="flex justify-start items-start w-full gap-2 border-b">
      <div
        className="h-full pt-3 cursor-pointer active:scale-95"
        onClick={handleRemovePick}
      >
        <CloseIcon color="black" />
      </div>
      <div className="flex flex-col py-3 w-3/5">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <p className="font-bold text-xs">{team}</p>{" "}
          </div>
          <p className="text-xs">{price}</p>
        </div>
        <p className="text-xs">
          {betType} {point ? (point > 0 ? `+${point}` : point) : ""}
        </p>
      </div>
      <div className="flex flex-col w-[30%] items-center">
        <input
          className="rounded border mt-2 p-1 text-xs w-4/5 text-end"
          placeholder="$0.00"
          value={inputValue || ""}
          onChange={(e) => {
            setInputValue(Number(e.target.value));
          }}
        ></input>
        {payout > 0 && (
          <p className="text-[10px] text-center w-full">Payout: ${payout} </p>
        )}
      </div>
    </div>
  );
}
