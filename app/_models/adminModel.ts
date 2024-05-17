import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fName: { type: String, require: true },
  lName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  userRole: { type: String, require: true },
});

export const adminModel =
  mongoose.models?.users || mongoose.model("users", userSchema);

export const createAdmin = (values: Record<string, any>) =>
  new adminModel(values).save().then((data: any) => data.toObject());
export const findAdminbyEmail = (email: string) =>
  adminModel.findOne({ email });
