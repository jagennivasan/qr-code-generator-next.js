import LoginComponent from "@/components/auth/LoginComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Login(){
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
    return(
      <LoginComponent/>
    )
}