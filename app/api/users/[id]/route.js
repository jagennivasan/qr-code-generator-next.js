// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   const { id } = params; // Correctly extracting params
//   await connectDB();

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Failed to fetch user:", error); // Log the error
//     return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
//   }
// }
// mport coninectDB from "@/lib/mongodb";
// import User from "@/models/User";

// export async function GET(request, { params }) {
//   const { id } = params;

//   await connectDB();

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return new Response(JSON.stringify({ error: "User not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
    
//     // Redirect to a route that handles user profile display
//     return Response.redirect(`/user-profile/${id}`);
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
import connectDB from "@/lib/db";
import VCard from "@/models/VCard";

export async function GET(request, { params }) {
  const { id } = params;

  await connectDB();

  try {
    const vcard = await VCard.findById(id);
    if (!vcard) {
      return new Response(JSON.stringify({ error: "vcard not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(vcard), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

