import connectDB from "@/lib/db";
import QRCode from "@/models/QRCode";

export async function POST(req) {
  try {
    await connectDB();

    const { qrImage, userId } = await req.json();

    const newQRCode = new QRCode({
      qrImage,
      userId,
    });

    await newQRCode.save();

    return new Response(
      JSON.stringify({ message: "QR Code saved successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving QR Code:", error);
    return new Response(JSON.stringify({ message: "Error saving QR Code" }), {
      status: 500,
    });
  }
}
