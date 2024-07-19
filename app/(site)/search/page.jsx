import { getServerSession } from 'next-auth';
import Link from "next/link";

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Header from "@/app/(components)/HeaderComponent";
import SearchBar from "@/app/(components)/SearchBar";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user.role === "attendant") {
        redirect("/attendant");
    } else if (session?.user.role === "admin") {
        redirect("/admin");
    }

    return (
        <>
            <Header />
            <div className="border border-black"></div>
            <SearchBar session={session} />
        </>
    )
}

export default page
