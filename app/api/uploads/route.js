import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VCard from "@/models/VCard";

export async function POST(request) {
  try {
    await connectDB();

    const {
      name,
      image,
      number,
      email,
      url,
      company,
      street,
      city,
      zip,
      country,
    } = await request.json();

    if (!image || !image.startsWith("data:image/")) {
      throw new Error(
        "Invalid image format. Please provide a Base64 encoded image string."
      );
    }

    const newVCard = new VCard({
      name,
      image, 
      number,
      email,
      url,
      company,
      street,
      city,
      zip,
      country,
    });

    const savedVCard = await newVCard.save();

    return NextResponse.json({ id: savedVCard._id });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
