import { adminModel } from "@/app/_models/adminModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bodyData = body;
    console.log(body);
    return NextResponse.json({msg:"YAH"}, {status:200})
  } catch (error) {
    return NextResponse.json({ message: "NAH" }, { status: 400 });
  }
}
