import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import RequestCard from "@/app/(components)/RequestCard";

const getRequests = async (session) => {
    try {
        const res = await fetch(`${LIVE_URL}api/Requests/getRequests`, {
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

    const { message } = await getRequests(session);

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <div className="p-4">
                    {
                        message.length > 0 ? message.map(request => (
                            <RequestCard key={request._id} request_key={request._id} sender={request.sender} senderEmail={request.senderEmail} memoTrackingNum={request.memoTrackingNum} addInfo={request.addInfo} status={request.status} dateSent={formatTimestamp(request.dateSent)} session={session} />
                        )) : (
                            <h3>No requests made yet.</h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default page
