import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from "next/link";

const getRequestDetails = async (id, email) => {
    console.log("this is the: ", id);
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/Requests/getRequests?id=${id}&email=${email}`);
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
        redirect("/login/staff");
    }

    const { message } = await getRequestDetails(id, session.user.email);
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
                        message.status === "no response"
                            ? <span>
                                <p className="font-bold text-lg">{message.status[0].toUpperCase() + message.status.slice(1)}</p>
                                <p className="text-lg">Your request is yet to be granted. Please do exercise some patience.</p>
                            </span>
                            : message.status === "request denied"
                                ? <span>
                                    <p className="font-bold text-lg">{message.status[0].toUpperCase() + message.status.slice(1)}</p>
                                    <p className="text-lg">Your request has been denied. Feel free to make another request.</p>
                                </span>
                                : <>
                                    <p className="font-bold text-lg">{message.status[0].toUpperCase() + message.status.slice(1)}</p>
                                    <p className="text-lg">You&apos;ve been granted access to the full details of this memo. <Link className="underline" href={`/staff/requests/details/memo?transactionId=${message.transactionId}`}>View here</Link></p>
                                </>
                    }
                </div>
            </div>
        </div>
    )
}

export default page;