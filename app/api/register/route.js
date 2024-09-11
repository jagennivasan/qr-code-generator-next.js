import  connectDB  from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user Register" }, { status: 200 });
  } catch (error) {}
  return NextResponse.json(
    { message: "an error occured while regestring" },
    { status: 500 }
  );
}
