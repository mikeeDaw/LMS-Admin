import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    code: { type: String, require: true, unique: true },
    desc: { type: String, require: true },
    tags: { type: [String], require: true },
    tier: { type: String, require: true },
    diff: { type: String, require: true },
    publisherEmail: { type: String, require: true },
    publisherName: { type: String, require: true },
    students: { type: [String], require: true },
    published: { type: Boolean, require: true },
  },
  { timestamps: true }
);

export const courseModel =
  mongoose.models?.courses || mongoose.model("courses", courseSchema);

export const createCourse = (values: Record<string, any>) =>
  new courseModel(values).save().then((data: any) => data.toObject());

export const findCourseByCode = (code: string) => courseModel.findOne({ code });

export const updateCourseByCode = (code: string, values: Record<string, any>) =>
  courseModel.findOneAndUpdate({ code: code }, values, { new: true });

export const getAllCourses = () => courseModel.find();

export const publishCourseByCode = (code: string, toStat: boolean) =>
  courseModel.findOneAndUpdate(
    { code: code },
    { published: toStat },
    { new: true }
  );

export const deleteCourseByCode = (code: string) =>
  courseModel.findOneAndDelete({ code: code });

export const removeStudent = (uid: string, code: string) =>
  courseModel.findOneAndUpdate(
    { code },
    { $pullAll: { students: [uid] } },
    { new: true }
  );
