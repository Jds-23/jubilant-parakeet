import React from "react";
import BountyCard from "../components/BountyCard";

const Bounties = () => {
  return (
    <div className="mx-4 mt-16 sm:mt-32 sm:mx-10 md:mx-20">
      <div className="flex flex-col">
        <h1 className={"text-2xl font-bold text-primary-500 mb"}>Bounties</h1>
        <p className={"text-xs text-black-500"}>
          Apply to this bounty and win assured cash rerwards and Nfts.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-3 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 mt-7">
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
        <BountyCard />
      </div>
    </div>
  );
};

export default Bounties;
