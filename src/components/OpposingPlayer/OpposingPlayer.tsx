import React from "react";
import OpposingHand from "./OpposingHand";

interface OpposingPlayerProps {
  side?: "left" | "right";
  image?: string;
  name?: string;
  cards?: {
    suit: string;
    value: string;
  }[];
}

export default function OpposingPlayer({
  side,
  image,
  name,
  cards,
}: OpposingPlayerProps) {
  return (
    <div className="w-fit h-fit flex flex-col justify-center items-center shadow-xl">
      <div className="relative w-48 flex bg-[#23325c] px-2 py-1 items-center justify-center rounded-lg border-2 border-[#f3cb16]">
        <img
          src={image}
          alt="profile"
          className={`absolute ${
            side === "left" ? "-left-7" : "-right-7"
          } h-20 w-20 flex rounded-full bg-gray-200 border-2 border-[#f3cb16]`}
        />
        <OpposingHand
          side={side}
          cards={[
            { suit: "spades", value: "A" },
            { suit: "clubs", value: "K" },
          ]}
        />
        <div
          className={`flex flex-col justify-center items-center w-full ${
            side === "left" ? "ml-6" : "mr-6"
          }`}
        >
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-white">$2,345</p>
        </div>
      </div>
    </div>
  );
}
