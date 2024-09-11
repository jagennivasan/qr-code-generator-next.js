// import  connectDB  from "@/lib/db";
// import User from "@/models/User";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         try {
//           await connectDB();
//           const user = await User.findOne({ email });
//           if (!user) {
//             return null;
//           }
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             return null;
//           }
//           return user;
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
  
// };
// const handelar = NextAuth(authOptions);
// export { handelar as GET, handelar as POST };
















import connectDB from "@/lib/db";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null; // User not found
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null; // Password does not match
          }

          // Return user object with id, email, and other necessary fields
          return { id: user._id, email: user.email, name: user.name }; // Ensure id is included
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Custom sign-in page route
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is returned on the first login or registration
      if (user) {
        token.id = user.id; // Set user id in the JWT token
      }
      return token; // Return the updated token
    },
    async session({ session, token }) {
      // Add user id from the token to the session object
      if (token) {
        session.user.id = token.id;
      }
      return session; // Return the updated session
    },
  },
};

// Export handlers for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
