import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import RequestList from "@/app/(components)/RequestListComponent";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/staff");
    }

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <div className='w-full p-4'>
                    <h2 className='mb-5'>All Requests</h2>
                    <RequestList session={session} />
                </div>
            </div>
        </div>
    )
}

export default page
