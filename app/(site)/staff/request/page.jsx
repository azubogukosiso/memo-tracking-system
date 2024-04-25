import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import MemoRequestForm from "@/app/(components)/MemoRequestForm";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/attendant");
    }

    const sender = session.user.office;

    return (
        <>
            <Nav />
            <MemoRequestForm sender={sender} />
        </>
    )
}

export default page