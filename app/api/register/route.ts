"use server";

import { adminModel, createAdmin } from "@/app/_models/adminModel";
import { connectToDb } from "@/app/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  await connectToDb();

  const { fName, lName, email, password } = await req.json();

  if (fName && lName && email && password) {
    console.log(fName, lName, email, password);
    try {
      const existingUser = await adminModel.findOne({ email });
      if (existingUser) {
        return NextResponse.json("MERON NA ACCOUNT");
      }
      const hashedpass = await bcrypt.hash(password, 10);

      const adminis = await createAdmin({
        fName,
        lName,
        email,
        password: hashedpass,
        userRole: "ADMIN",
      });

      return NextResponse.json(adminis);
    } catch (error) {
      return NextResponse.json("Internal Error...");
    }
  } else {
    console.log("kulang");
    return NextResponse.json("KULANG");
  }
}
