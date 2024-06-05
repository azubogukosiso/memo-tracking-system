import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import MemoRequestForm from "@/app/(components)/MemoRequestForm";

const fetchMemoDetails = async (id) => {
    console.log("this is the: ", id);
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/Memos/getMemos?id=${id}`);
        return res.json();
    } catch (error) {
        console.log("Failed to get memo details", error)
    }
}

const page = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);
    const { transactionId } = searchParams;

    const { message } = await fetchMemoDetails(transactionId);

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
                <MemoRequestForm sender={session.user.office} senderEmail={session.user.email} memoTrackingNum={message.memoTrackingNum} transactionId={transactionId} />
            </div>
        </div>
    )
}

export default page