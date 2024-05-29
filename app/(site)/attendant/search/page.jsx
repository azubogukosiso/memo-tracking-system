import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import SearchBar from "@/app/(components)/SearchBar";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/attendant");
    }

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <SearchBar session={session} />
            </div>
        </div>
    )
}

export default page
