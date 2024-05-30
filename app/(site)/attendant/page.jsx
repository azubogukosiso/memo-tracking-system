import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import MemoCard from "@/app/(components)/MemoCard";

const getMemos = async (session) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/Memos/getMemos`, {
            method: "POST",
            body: JSON.stringify(session),
            "content-type": "application/json"
        });
        return res.json();
    } catch (error) {
        console.log("Failed to get memos", error);
    }
}

const formatTimestamp = (timestamp) => {
    console.log("timestamp here: ", timestamp);

    if (timestamp === null) {
        return timestamp;
    } else {
        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }

        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString("en-US", options);

        return formattedDate;
    }
}

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/attendant");
    }

    const { message } = await getMemos(session);

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <div className='w-full p-4'>
                    <h2 className='mb-5'>All Memos</h2>
                    {
                        message.length > 0 ? message.map(memo => (
                            <MemoCard key={memo.id} memo_key={memo.id} sender={memo.sender} receipient={memo.receipient} memoTrackingNum={memo.memoTrackingNum} type={memo.type} title={memo.title} dateConfirmed={formatTimestamp(memo.dateConfirmed)} dateSent={formatTimestamp(memo.dateSent)} session={session} />
                        )) : (
                            <h3>No memos at the moment.</h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default page
