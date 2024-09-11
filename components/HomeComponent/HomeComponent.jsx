"use client";

import QRSwitch from "../QRSwitch/QRSwitch";
import { useSession } from "next-auth/react";

export default function HomeComponent() {
  const { data: session, status } = useSession(); // Get session data and status

  if (status === "loading") {
    return <p>Loading...</p> // Show a loading message or spinner while session is loading
  }

  return (
    <>
   <QRSwitch/>
    </>
  );
}
