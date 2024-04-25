import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import MemoResponseForm from "@/app/(components)/MemoResponseForm";


const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/attendant");
    }

    return (
        <>
            <Nav />
            <MemoResponseForm />
            {JSON.stringify(session.user.role)}
        </>
    )
}

export default page