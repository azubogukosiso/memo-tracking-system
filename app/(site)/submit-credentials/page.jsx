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
            <div className='pb-3 md:mb-0 mt-[75px] flex justify-end items-center'>
                <Link href='/guide' className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">User Guide</Link>
                <span className="mx-3"></span>
                <Link href='mailto:azuboguko@gmail.com' target="_blank" className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Feedback</Link>
            </div>
        </>
    )
}

export default page