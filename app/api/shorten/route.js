
import { NextResponse } from 'next/server';
import Url from "@/models/Url";
import connectDB from "@/lib/db"; 

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 
export async function POST(request) {
  await connectDB(); 

  try {
    const { originalUrl } = await request.json(); 

    let url = await Url.findOne({ originalUrl });
    if (!url) {
      url = new Url({ originalUrl });
      await url.save();
    }

    const shortUrl = `${BASE_URL}/api/r/${url.shortId}`;
    return NextResponse.json({ shortUrl }); 
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
  }
}
