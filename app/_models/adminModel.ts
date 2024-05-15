import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

export const adminModel =
  mongoose.models?.admins || mongoose.model("admins", adminSchema);

export const findAdminbyEmail = (email: string) =>
  adminModel.findOne({ email });
