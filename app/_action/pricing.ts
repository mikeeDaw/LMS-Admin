"use server";
import { connectToDb } from "../lib/mongoose";
import { updateTierByLbl } from "../_models/tierModel";
import { error } from "console";

export const updatePricing = async (label: string, newPrice: number) => {
  await connectToDb();

  try {
    const res = await updateTierByLbl(label, { price: newPrice });
    return {
      error: false,
      msg: "Updating of price was successful!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      msg: error.message,
    };
  }
};
