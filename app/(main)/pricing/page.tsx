import React from "react";
import { Bebas_Neue, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import TierPricing from "@/app/_components/pricing/tierPricing";
import { getAllTier } from "@/app/_models/tierModel";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });

const PricingPage = async () => {
  const tiers = await getAllTier();
  console.log("tiers", tiers);

  return (
    <div className="h-screen grow bg-green-200 flex flex-col items-center py-8 gap-6 relative">
      <div className="absolute">
        <Toaster />
      </div>
      {/* Title Header */}
      <div className="flex flex-col items-center w-1/2">
        <span className={`${bebas.className} text-[45px] text-black`}>
          LearnFLIX Pricing Tiers
        </span>
        <span className="text-center px-24 text-[#474747] text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis leo
          sit amet odio condimentum facilisis a vel nisi.
        </span>
      </div>
      {/* Tiers */}
      <div className="flex flex-col items-center w-3/4 gap-5">
        <div className="flex w-full gap-5">
          <TierPricing
            tierLbl={tiers[0].tierLabel}
            price={tiers[0].price}
            features={tiers[0].features}
            key={"FreeTier"}
          />
          <TierPricing
            tierLbl={tiers[1].tierLabel}
            price={tiers[1].price}
            features={tiers[1].features}
            key={"PremiumTier"}
          />
        </div>
        <div className="w-full flex justify-center">
          <TierPricing
            tierLbl={tiers[2].tierLabel}
            price={tiers[2].price}
            features={tiers[2].features}
            key={"AstroTier"}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
