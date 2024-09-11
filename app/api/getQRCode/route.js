// import connectDB from "@/lib/db";
// import QRCode from "@/models/QRCode";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET() {
//   try {
//     await connectDB();

//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const userId = session.user.id;

//     const qrCodes = await QRCode.find({ userId });

//     // Return the QR codes as a JSON response
//     return new Response(JSON.stringify(qrCodes), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching QR Codes:", error);
//     return new Response(
//       JSON.stringify({ message: "Error fetching QR Codes" }),
//       { status: 500 }
//     );
//   }
// }













// // app/api/getQRCode/route.js
// import  connectDB  from "@/lib/db"; // Ensure the path to your connectDB function is correct
// import QRCode from "@/models/QRCode"; // Ensure the path to your QRCode model is correct

// export async function GET(req) {
//   try {
//     // Connect to the database
//     await connectDB();

//     // Fetch all QR code data from the database
//     const qrCodes = await QRCode.find({}); // Adjust the query as needed if you want to filter results

//     // Return the fetched data as a JSON response
//     return new Response(JSON.stringify(qrCodes), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching QR Codes:", error);

//     // Handle any errors during the fetch process
//     return new Response(JSON.stringify({ message: "Error fetching QR Codes" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }



/////////////////////////////////////////////////////////////////////////////

// app/api/getQRCode/route.js
// app/api/getQRCode/route.js
// import connectDB from "@/lib/db";
// import QRCode from "@/models/QRCode";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(req, res) {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const userId = session.user.id;
//     console.log("Fetching QR codes for user ID:", userId); // Debug user ID during fetch

//     const qrCodes = await QRCode.find({ userId });
//     console.log("Fetched QR Codes:", qrCodes); // Debug fetched QR codes

//     return res.status(200).json(qrCodes);
//   } catch (error) {
//     console.error("Error fetching QR Codes:", error);
//     return res.status(500).json({ message: "Error fetching QR Codes" });
//   }
// }



























// import connectDB from "@/lib/db";
// import QRCode from "@/models/QRCode";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
//     }

//     const userId = session.user.id;

//     const qrCodes = await QRCode.find({ userId });


//     // Return the QR codes as a JSON response
//     return new Response(JSON.stringify(qrCodes), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching QR Codes:", error);
//     return new Response(JSON.stringify({ message: "Error fetching QR Codes" }), { status: 500 });
//   }
// }











// /api/getQRCode/route.js

// Mark the route as dynamic to prevent static rendering issues
export const dynamic = 'force-dynamic';

import connectDB from "@/lib/db";
import QRCode from "@/models/QRCode";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = session.user.id;
    const qrCodes = await QRCode.find({ userId });

    // Return the QR codes as a JSON response
    return new Response(JSON.stringify(qrCodes), { status: 200 });
  } catch (error) {
    console.error("Error fetching QR Codes:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching QR Codes" }),
      { status: 500 }
    );
  }
}
