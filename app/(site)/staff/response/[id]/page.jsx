import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import ResponseComponent from '@/app/(components)/ResponseComponent';

const MemoRequestForm = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/staff");
    }

    return (
        <>
            <Nav />
            <ResponseComponent />
        </>
    )
}

export default MemoRequestForm
