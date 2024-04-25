import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import CreateMemoForm from "@/app/(components)/CreateMemoForm";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/attendant");
    }

    const sender = session.user.office;

    return (
        <>
            <Nav />
            <CreateMemoForm sender={sender} />
        </>
    )
}

export default page
