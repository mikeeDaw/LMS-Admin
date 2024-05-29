import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: { type: String, require: true },
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

export const getAllCourses = () => courseModel.find();
