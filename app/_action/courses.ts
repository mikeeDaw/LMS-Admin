"use server";

import { createCourse, findCourseByCode } from "../_models/courseModel";
import { connectToDb } from "../lib/mongoose";

export const addCourse = async (vals: any) => {
  await connectToDb();

  const existingCourse = await findCourseByCode(vals.code);

  if (existingCourse) {
    return { error: true, msg: "Meron na Same Code" };
  }

  try {
    const res = await createCourse(vals);
    console.log(res);
    return {
      error: false,
      msg: `The Course "${vals.title}" was successfully uploaded.`,
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
