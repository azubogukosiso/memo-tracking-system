import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import MemoCard from "@/app/(components)/MemoCard";

const getMemos = async (session) => {
    try {
        const res = await fetch("http://localhost:3000/api/Memos/getMemos", {
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
        redirect("/login/admin");
    }

    const { message } = await getMemos(session);

    return (
        <>
            <Nav />
            <div className='mt-5 w-10/12 mx-auto'>
                {
                    message.length > 0 ? message.map(memo => (
                        <MemoCard key={memo._id} memo_key={memo._id} sender={memo.sender} receipient={memo.receipient} memoTN={memo.memoTN} description={memo.description} title={memo.title} status={memo.status} dateSent={formatTimestamp(memo.dateSent)} dateReceived={formatTimestamp(memo.dateReceived)} session={session} />
                    )) : (
                        <h3>No memos at the moment.</h3>
                    )
                }
            </div>
            <pre>{JSON.stringify(session)}</pre>
        </>
    )
}

export default page
