// app/r/[shortId]/page.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Url from "@/models/Url";
export async function GET(request, { params }) {
  await connectDB();

  try {
    const { shortId } = params;
    const entry = await Url.findOne({ shortId });

    if (entry) {
      return NextResponse.redirect(entry.originalUrl);
    } else {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error retrieving URL:", error);
    return NextResponse.json(
      { error: "Failed to retrieve URL" },
      { status: 500 }
    );
  }
}
