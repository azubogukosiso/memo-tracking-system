import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MemoResponseForm from "@/app/(components)/MemoResponseForm";

const getRequestDetails = async (id, email, role) => {
    console.log("this is the: ", id);
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/Requests/getRequests?id=${id}&email=${email}&role=${role}`);
        return res.json();
    } catch (error) {
        console.log("Failed to get memo details", error)
    }
}

const formatTimestamp = (timestamp) => {
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

const page = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);
    const { id } = searchParams;

    if (!session) {
        redirect("/login/admin");
    }

    const { message } = await getRequestDetails(id, session.user.email, session.user.role);
    console.log("on the way: ", message);

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>

            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <div className="p-4">
                    {session.user.role === "admin" && <p className="text-base">This user <span className="rounded font-mono bg-gray-200 p-1">{message.senderEmail}, {message.sender}</span> requests to see the memo with the number <span className="rounded font-mono bg-gray-200 p-1">{message.memoTrackingNum}</span></p>}
                    <div className="my-6"></div>
                    <span>
                        <p className="font-bold text-lg">Request Details: </p>
                        {message.details ? message.details : "--"}
                    </span>
                    <div className="my-6"></div>
                    <span>
                        <p className="font-bold text-lg">Date Sent: </p>
                        {formatTimestamp(message.dateSent)}
                    </span>
                    <div className="my-6"></div>
                    {
                        message.status === "no response" // IF THERE IS NO RESPONSE YET
                            ? session.user.role === "admin"
                                ? <MemoResponseForm receipient={message.sender} receipientEmail={message.senderEmail} memoTrackingNum={message.memoTrackingNum} request_id={id} />
                                : <>
                                    <p className="font-bold text-lg">{message.status[0].toUpperCase() + message.status.slice(1)}</p>
                                    <p>You granted this request. This user <span className="rounded font-mono bg-gray-200 p-1">{message.senderEmail}, {message.sender}</span> now has access to the full details of this memo <span className="rounded font-mono bg-gray-200 p-1">{message.memoTrackingNum}</span>.</p>
                                </>
                            :
                            message.status === "responded"
                                ? <>
                                    <p className="font-bold text-lg">{message.status[0].toUpperCase() + message.status.slice(1)}</p>
                                    <p>You granted this request. This user <span className="rounded font-mono bg-gray-200 p-1">{message.senderEmail}, {message.sender}</span> now has access to the full details of this memo <span className="rounded font-mono bg-gray-200 p-1">{message.memoTrackingNum}</span>.</p>
                                </>
                                : <>
                                    <p className="font-bold text-lg">{message.status[0].toUpperCase() + message.status.slice(1)}</p>
                                    <p>You denied this request. This user <span className="rounded font-mono bg-gray-200 p-1">{message.senderEmail}, {message.sender}</span> does not have access to the full details of this memo <span className="rounded font-mono bg-gray-200 p-1">{message.memoTrackingNum}</span>.</p>
                                </>
                    }
                </div>
            </div>
        </div>
    )
}

export default page;