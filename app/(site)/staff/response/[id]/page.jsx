import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";

const MemoRequestForm = async ({ params }) => {
    const getResponse = async (request_id) => {
        console.log(request_id);
        const res = await fetch("http://localhost:3000/api/Response/getResponse", {
            method: "POST",
            body: JSON.stringify(request_id),
            "content-type": "application/json"
        });

        return res.json();
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

    const session = await getServerSession(authOptions);
    const { id } = params;

    if (!session) {
        redirect("/login/staff");
    }

    const { message } = await getResponse(id);

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <div className="p-4">
                    <h3>Response:</h3>
                    <p className="text-base">{message.response}</p>
                    <br />
                    <h3>Date Sent:</h3>
                    <p className="text-base">{formatTimestamp(message.dateSent)}</p>
                </div>
            </div>
        </div>
    )
}

export default MemoRequestForm
