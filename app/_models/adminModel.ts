import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  userRole: { type: String, require: true },
  courses: { type: [String], require: true },
});

export const adminModel =
  mongoose.models?.users || mongoose.model("users", userSchema);

export const createAdmin = (values: Record<string, any>) =>
  new adminModel(values).save().then((data: any) => data.toObject());
export const findAdminbyEmail = (email: string) =>
  adminModel.findOne({ email });

export const findStudents = (ids: string[]) =>
  adminModel.find({ _id: { $in: ids } });

export const removeCourse = (code: string, uid: string) =>
  adminModel.updateOne({ _id: uid }, { $pullAll: { courses: [code] } });

export const removeCourseFromMany = (uids: string[], code: string) =>
  adminModel.updateMany(
    { _id: { $in: uids } },
    { $pullAll: { courses: [code] } }
  );

export const countStudents = () =>
  adminModel.where({ userRole: { $ne: "ADMIN" } }).countDocuments();

export const countAdmin = () =>
  adminModel.where({ userRole: "ADMIN" }).countDocuments();
