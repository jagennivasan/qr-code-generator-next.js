"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 border border-gray-400">
        <h1 className="font-bold text-xl text-center">
          Login into your account
        </h1>

        {/* Login form */}
        <form onSubmit={handelSubmit} className="flex flex-col gap-5 mt-5">
          <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"

            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" mt-3 font-bold  text-white bg-green-500 rounded-lg px-1 py-1 hover:bg-green-800 transition duration-200 ease-in-out">
            Login
          </button>
        </form>
        {error && (
          <div className="px-3 py-1 bg-red-700 w-fit text-white mt-3 rounded-md">
            {error}
          </div>
        )}
        {/* Register link */}
        <div className="text-center mt-5">
          Dont't have an account ?{" "}
          <span className="text-blue-500 font-bold">
            <Link href={"/sign-up"}>Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
