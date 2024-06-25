"use server";

import {
  findStudents,
  removeCourse,
  removeCourseFromMany,
} from "../_models/adminModel";
import {
  createCourse,
  deleteCourseByCode,
  findCourseByCode,
  publishCourseByCode,
  removeStudent,
  updateCourseByCode,
} from "../_models/courseModel";
import { Course } from "../_types";
import { connectToDb } from "../lib/mongoose";

export const addCourse = async (vals: Course) => {
  await connectToDb();

  const existingCourse = await findCourseByCode(vals.code);

  if (existingCourse) {
    return { error: true, msg: "Course With the same course code exists." };
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
    return { error: true, msg: "Course with the same title already exists." };
  }
};

export const updateCourse = async (vals: any) => {
  await connectToDb();

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

export const publishCourse = async (code: string, toWhat: boolean) => {
  await connectToDb();

  try {
    const res = await publishCourseByCode(code.toUpperCase(), toWhat);
    console.log(res);
    return {
      error: false,
      msg: `Course was ${toWhat ? "Published" : "Unpublished"}.`,
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error) {
    console.log(error);
    return { errors: true, msg: "Error happended :(" };
  }
};

export const deleteCourse = async (code: string) => {
  await connectToDb();

  try {
    const rec = await findCourseByCode(code.toUpperCase());
    await removeCourseFromMany(rec.students, code);
    await deleteCourseByCode(code.toUpperCase());
    return {
      error: false,
      msg: `${code} was Successfully deleted.`,
    };
  } catch (error) {
    return { error: true, msg: "Error in Deleting :(" };
  }
};

export const getStudents = async (ids: string[]) => {
  await connectToDb();

  try {
    const res = await findStudents(ids);
    console.log(res);
    return {
      error: false,
      msg: "Got the Students",
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error) {
    return { error: true, msg: "Error in getting students :/" };
  }
};

export const unenrollStudent = async (uid: string, code: string) => {
  await connectToDb();

  try {
    const res = await removeStudent(uid, code);
    const rem = await removeCourse(code, uid);
    console.log(res);
    return {
      error: false,
      msg: "Unenrolling Success",
      data: JSON.parse(JSON.stringify(res)),
    };
  } catch (error) {
    return {
      error: true,
      msg: "Error Happened :/",
      data: JSON.parse(JSON.stringify(error)),
    };
  }
};
