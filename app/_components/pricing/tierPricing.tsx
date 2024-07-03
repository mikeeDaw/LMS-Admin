"use client";
import React, { ReactNode, useRef, useState } from "react";
import { Bebas_Neue, Poppins } from "next/font/google";
import { Toaster, toast } from "sonner";
import { CircleCheck, CircleCheckBig, CircleX } from "lucide-react";
import { motion } from "framer-motion";
import { updatePricing } from "@/app/_action/pricing";
import { useRouter } from "next/navigation";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const popp = Poppins({ weight: "400", subsets: ["latin"] });
const poppSemi = Poppins({ weight: "600", subsets: ["latin"] });
const poppBold = Poppins({ weight: "700", subsets: ["latin"] });

interface Props {
  tierLbl: string;
  price: string;
  features: string[];
}

const TierPricing: React.FC<Props> = ({ tierLbl, price, features }) => {
  const [tierPrice, setPrice] = useState(price);
  const [editing, setEdit] = useState(false);
  const inpElem = useRef<any>(null);

  const changePrice = (e: any) => {
    const re = /^[0-9.]+$/;
    const value = e.target.value;
    if (value === "" || re.test(value)) {
      setPrice(value);
    }
  };
  const router = useRouter();

  const resetVal = () => {
    setPrice(price);
    setEdit(false);
  };

  const savePrice = async () => {
    const valstr =
      Number(tierPrice) % 1 == 0 ? tierPrice : Number(tierPrice).toFixed(2);
    const toNum = Number(valstr);

    if (isNaN(toNum) || tierPrice === "" || toNum == 0) {
      toast.error("ERROR!", {
        description: "Invalid Input.",
        position: "top-center",
        duration: 2500,
        icon: (
          <span className="text-[#ffffff]">
            <CircleX />
          </span>
        ),
        classNames: {
          toast: "bg-red-400 border-none",
          title: "ms-2 text-white",
          description: "ms-2 text-white",
        },
      });
    } else if (toNum > 1000) {
      toast.error("Invalid Input.", {
        description: "Amount is too large!",
        position: "top-center",
        duration: 2500,
        icon: (
          <span className="text-[#ffffff]">
            <CircleX />
          </span>
        ),
        classNames: {
          toast: "bg-red-400 border-none",
          title: "ms-2 text-white",
          description: "ms-2 text-white",
        },
      });
    } else {
      console.log("not NAN");
      setPrice(valstr);
      const res = await updatePricing(tierLbl, Number(toNum));
      if (!res.error) {
        setEdit(false);
        toast("Price Update Success!", {
          position: "top-center",
          duration: 3000,
          description: `New Price has been saved!`,
          icon: (
            <span className="text-[#ffffff]">
              <CircleCheckBig />
            </span>
          ),
          classNames: {
            toast: "bg-emerald-400 border-none",
            title: "ms-4 text-white text-sm",
            description: "ms-4 text-white",
          },
        });
        router.refresh();
      } else {
        console.log(res.msg);
        resetVal();
        toast.error("Something Went Wrong...", {
          position: "top-center",
          duration: 2500,
          icon: (
            <span className="text-[#ffffff]">
              <CircleX />
            </span>
          ),
          classNames: {
            toast: "bg-red-400 border-none",
            title: "ms-2 text-white",
          },
        });
      }
    }
  };

  return (
    <div className="flex flex-col bg-[#7cf262] w-1/2 rounded-xl px-5 py-5 gap-6">
      {/* Tier Info */}
      <div className="flex">
        {/* Left Side */}
        <div className="w-[50%] flex flex-col items-start gap-2.5">
          <span
            className={`border-2 border-black ${poppSemi.className} px-3 py-0.5 text-lg rounded-md `}
          >
            {tierLbl}
          </span>
          <span
            className={`${
              poppBold.className
            } pe-3 py-0.5 text-5xl flex items-center ${
              editing ? "text-[#23870d] " : "text-black"
            }`}
          >
            $
            <input
              type="text"
              value={tierPrice}
              className={`w-full bg-transparent outline-none ${
                editing ? "text-[#23870d]" : "text-black"
              }`}
              onChange={changePrice}
              disabled={!editing}
              ref={inpElem}
            />
          </span>
          <span className={`${popp.className} text-sm`}>
            Per member, One time
          </span>
        </div>
        <span className="bg-[#8b8b8b] h-full w-[1px]" />
        {/* Right Side */}
        <div className="w-[50%] flex flex-col items-start gap-3 justify-center ps-5">
          {features.map((item, idx) => (
            <div
              className="flex items-center gap-2 mb-1"
              key={`${tierLbl}${idx}`}
            >
              <span className="rounded-full text-black">
                <CircleCheck size={21} fill="transparent" />
              </span>
              <span className={`text-xs ${popp.className}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      {editing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, type: "spring" },
          }}
          className="flex w-full gap-3"
        >
          <button
            className="w-1/2 bg-[#b93838] text-white py-2 text-sm rounded-lg border-2 border-transparent transition-all duration-300 hover:bg-[#7cf262] hover:border-[#b93838] hover:text-[#b93838]"
            onClick={resetVal}
          >
            Cancel
          </button>
          <button
            className="w-1/2 bg-black text-white py-2.5 text-sm rounded-lg border-2 border-transparent transition-all duration-300 hover:bg-[#7cf262] hover:border-[#000] hover:text-[#000]"
            onClick={savePrice}
          >
            Save
          </button>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: tierLbl === "FREE" ? 0.5 : 1,
            transition: { duration: 1, type: "spring" },
          }}
          className={`bg-black text-white border-2 border-transparent text-center py-2 rounded-lg text-sm ${
            popp.className
          } hover:bg-[#7cf262] hover:border-[#111111] hover:text-black transition-all duration-300 ${
            tierLbl === "FREE" ? "pointer-events-none" : ""
          }`}
          onClick={() => {
            setEdit(true);
            console.log(inpElem.current);
            inpElem.current.focus();
          }}
          disabled={tierLbl === "FREE"}
        >
          Update Pricing
        </motion.button>
      )}
    </div>
  );
};

export default TierPricing;
