import { findAdminbyEmail } from "@/app/_models/adminModel";
import { connectToDb } from "@/app/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  await connectToDb();
  const { email } = await req.json();
  console.log("NASA API", email);

  const user = await findAdminbyEmail(email);

  return NextResponse.json(user);
}
