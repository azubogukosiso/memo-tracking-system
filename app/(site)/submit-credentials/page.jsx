import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/app/(components)/HeaderComponent";
import SubmitCredentials from "@/app/(components)/SubmitCredentialsComponent";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user.role === "admin") {
        redirect("/admin");
    } else if (session?.user.role === "attendant") {
        redirect("/attendant");
    }

    return (
        <>
            <Header />
            <div className="border border-black"></div>
            <SubmitCredentials />
        </>
    )
}

export default page