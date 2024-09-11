
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQRCodes = async () => {
      if (status === "loading") return; // Wait until session status is determined
      if (!session) {
        setLoading(false);
        return; 
      }
      try {
        const response = await fetch("/api/getQRCode", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch QR Codes");
        }

        const data = await response.json();
        setQrCodes(data);
      } catch (err) {
        console.error("Error fetching QR Codes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQRCodes();
  }, [session, status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between shadow-lg p-5 space-y-4 md:space-y-0">
        <div>
          <Link href="/" className="text-2xl font-bold">
            Logo
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xl font-semibold">{session?.user?.name}</span>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" }); // Redirect to login page after sign out
            }}
            className="bg-red-500 hover:bg-red-700 rounded-md text-white px-3 py-2"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="m-6">
        <Link
          href="/vcard"
          className="bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded-lg block text-center md:inline-block"
        >
          Create VCard
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">QR Codes</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        {qrCodes.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {qrCodes.map((qrCode) => (
              <li
                key={qrCode._id}
                className="flex justify-center items-center border p-2 rounded-md shadow-md"
              >
                <img
                  src={qrCode.qrImage}
                  alt="QR Code"
                  className="w-full h-auto max-w-[200px] md:max-w-[250px] object-contain"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No QR codes found.</p>
        )}
      </div>
    </div>
  );
}
