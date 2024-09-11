import SignUpComponent from "@/components/auth/SignUpComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function SignUP(){
    const session = await getServerSession(authOptions);
    if(session) redirect("/dashboard")
    return(
        <SignUpComponent/>
    )
}