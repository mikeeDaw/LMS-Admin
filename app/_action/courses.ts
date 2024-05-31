"use server";

import {
  createCourse,
  findCourseByCode,
  updateCourseByCode,
} from "../_models/courseModel";
import { Course } from "../_types";
import { connectToDb } from "../lib/mongoose";

export const addCourse = async (vals: Course) => {
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

export const updateCourse = async (vals: any) => {
  await connectToDb();

  console.log("updacor");
  try {
    const res = await updateCourseByCode(vals.code, vals);
    console.log(res);
    return {
      error: false,
      msg: "Update Was Successful",
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error) {
    console.log(error);
    return { errors: true, msg: "Error happended :(" };
  }
};
