"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserProfile({ vcardData }) {
  const [data, setData] = useState(vcardData);
  const [isLoading, setIsLoading] = useState(!vcardData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vcardData) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/users/${vcardData._id}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch user: ${res.statusText}`);
          }
          const user = await res.json();
          setData(user);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [vcardData]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center py-4">No user data found</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4 sm:space-y-6 md:space-y-8">
      <h1 className="text-center text-2xl font-bold text-gray-800">VCard Profile</h1>
      <div className="flex justify-center">
        {data.image ? (
          <Image
            src={data.image}
            alt="User Image"
            width={250}
            height={250}
            className="rounded-xl object-cover border border-gray-200 shadow-md"
          />
        ) : (
          <div className="w-60 h-60 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
        <p className="text-lg font-semibold text-gray-700">Name: {data.name}</p>
        <p className="text-md text-gray-600">Number: {data.number}</p>
        <p className="text-md text-gray-600">Email: {data.email}</p>
        <p className="text-md text-gray-600">URL: {data.url}</p>
        <p className="text-md text-gray-600">Company: {data.company}</p>
        <p className="text-md text-gray-600">Street: {data.street}</p>
        <p className="text-md text-gray-600">City: {data.city}</p>
        <p className="text-md text-gray-600">ZIP: {data.zip}</p>
        <p className="text-md text-gray-600">Country: {data.country}</p>
      </div>
    </div>
  );
}
