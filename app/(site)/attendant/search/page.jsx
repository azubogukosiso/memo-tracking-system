import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import SearchBar from "@/app/(components)/SearchBar";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/attendant");
    }

    return (
        <>
            <Nav />
            <SearchBar session={session} />
            <pre>{JSON.stringify(session)}</pre>
        </>
    )
}

export default page
