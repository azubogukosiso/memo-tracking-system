import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/admin");
    }

    return (
        <>
            <Nav />
            <div>accounts page</div>
            <pre>{JSON.stringify(session)}</pre>
        </>
    )
}

export default page
