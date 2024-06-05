import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import RequestCard from "@/app/(components)/RequestCard";
import RequestList from "@/app/(components)/RequestListComponent";

const getRequests = async (session) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/Requests/getRequests`, {
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
                <div className="p-4 w-full">
                    <h2 className='mb-5'>All Requests</h2>
                    <RequestList session={session} />
                </div>
            </div>
        </div>
    )
}

export default page
