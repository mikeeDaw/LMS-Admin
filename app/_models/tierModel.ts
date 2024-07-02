import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tierSchema = new Schema(
  {
    tierLabel: {
      type: String,
      enum: ["FREE", "PREMIUM", "ASTRO"],
      unique: true,
      required: true,
    },
    price: { type: Number },
    features: { type: [String] },
  },
  { timestamps: true }
);

const tierModel = mongoose.models?.tiers || mongoose.model("tiers", tierSchema);

export const findTierByLbl = (lbl: string) =>
  tierModel.findOne({ tierLabel: lbl });
export const getAllTier = () => tierModel.find();
export const updateTierByLbl = (label: string, values: Record<string, any>) =>
  tierModel.findOneAndUpdate({ tierLabel: label }, values);

export default tierModel;
