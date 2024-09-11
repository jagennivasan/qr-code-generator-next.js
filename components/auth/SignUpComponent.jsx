"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
export default function SignUpComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("all fields are necessary");
      return;
    }
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError("User already exists");
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 border border-gray-400 rounded-md ">
        <h1 className="font-bold text-xl text-center">Register your account</h1>

        {/* Register form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            type="text"
            placeholder="Full name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button className=" mt-3 font-bold  text-white bg-blue-500 rounded-lg px-1 py-1 hover:bg-blue-800 transition duration-200 ease-in-out">
            Register
          </button>
        </form>
        {error && (
          <div className="px-3 py-1 bg-red-700 w-fit text-white mt-3 rounded-md">
            {error}
          </div>
        )}

        {/* Login link */}
        <div className="place-content-end mt-5 text-center">
          Have an account ?{" "}
          <span className="text-blue-500 font-bold">
            <Link href={"/login"}>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
