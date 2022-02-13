import { useRouter } from "next/router";
import React from "react";
const imageStr =
  "https://superteam.fun/_next/image?url=https%3A%2F%2Fsuper-static-assets.s3.amazonaws.com%2F75e99297-73de-4946-ba6b-0ac603638793%2Fimages%2F1b3b7fef-bdd1-4b92-993e-c9f0676a995d.png&w=1920&q=80";
const BountyCard = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/bounty/ooop--llm")}
      className="cursor-pointer w-full p-1.5 rounded-md min-h-60 border border-secondary-600"
    >
      <img
        alt="demo"
        className="object-contain w-full rounded-md"
        src={imageStr}
      />
      <p className="font-semibold text-dark-500">NFTs for the next bounty</p>
      <div className="flex">
        <span className="m-0.5 px-1 bg-rose-200 text-rose-700 text-xs font-bold rounded-xl">
          Open
        </span>
        <span className="m-0.5 px-1 bg-green-200 text-green-700 text-xs font-bold rounded-xl">
          Nft
        </span>
        <span className="m-0.5 px-1 bg-indigo-200 text-indigo-700 text-xs font-bold rounded-xl">
          Usdc
        </span>
      </div>
      <p className="text-xs text-dark-500">$100,000</p>
    </div>
  );
};

export default BountyCard;
