import Nav from "@/app/(components)/Nav";
import Header from "@/app/(components)/HeaderComponent";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const fetchMemoDetails = async (id) => {
    console.log("this is the: ", id);
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/Memos/getMemos?id=${id}`);
        return res.json();
    } catch (error) {
        console.log("Failed to get memo details", error)
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

const page = async ({ params }) => {
    const session = await getServerSession(authOptions);
    const { id } = params;

    if (!session) {
        redirect("/login/attendant");
    }

    const { message } = await fetchMemoDetails(id);

    return (
        <div className="flex w-full justify-between">
            <div className="w-0 lg:w-[20%]">
                <Nav />
            </div>
            <div className="w-full lg:w-[78%]">
                <Header />
                <div className="border border-black"></div>
                <div className="p-4">
                    <h2 className="mb-5">Full Memo Details</h2>
                    <div>
                        <p className='text-base mb-3'><span className='font-bold'>Memo Title:</span> {message.title}</p>
                        <p className='text-base mb-3'><span className='font-bold'>Memo Description:</span> {message.description}</p>

                        <p className='text-base mb-3'><span className='font-bold'>Sender:</span> {session.user.office === message.sender ? 'this office' : message.sender}</p>

                        <p className='text-base mb-3'><span className='font-bold'>Receipient:</span> {session.user.office === message.receipient ? 'this office' : message.receipient}</p>

                        <p className='text-base mb-3'><span className='font-bold'>Memo Tracking Number:</span> {message.memoTrackingNum}</p>

                        {
                            session.user.office === message.receipient ?
                                <p className='text-base mb-3'><span className='font-bold'>Date Confirmed:</span> {message.dateConfirmed ? formatTimestamp(message.dateConfirmed) : 'not confirmed yet'}</p>
                                :
                                <p className='text-base mb-3'><span className='font-bold'>Date Confirmed:</span> {message.dateConfirmed ? formatTimestamp(message.dateConfirmed) : 'not confirmed yet'}</p>
                        }

                        <p className='text-base'><span className='font-bold'>Date Sent:</span> {formatTimestamp(message.dateSent)}</p>

                        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                            {
                                message.image ?
                                    message.image.map((image, index) => (
                                        <Link key={index} href={image} target="_blank" className="relative inline-block mt-4 rounded h-[100px] border-black border overflow-hidden">
                                            <Image alt="" src={image} style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} />
                                        </Link>
                                    ))
                                    :
                                    message.image ?
                                        message.image.map((image, index) => (
                                            <Link key={index} href={image} target="_blank" className="relative inline-block mt-4 rounded h-[100px] border-black border overflow-hidden">
                                                <Image alt="" src={image} style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} />
                                            </Link>
                                        ))
                                        :
                                        ''
                            }
                        </div>
                    </div>
                </div>

                <div className='mt-5 p-4'>
                    <h2 className="mb-5">Memo History</h2>

                    {
                        message.memoTransferHistory.map((transfer, index) => (
                            <div key={index} className={`mb-3 p-3 rounded ${transfer._id === id ? 'bg-gray-300 border border-black' : ''}`}>
                                <p className='text-base'><span className='font-bold'>Sender:</span> {session.user.office === transfer.sender ? 'this office' : transfer.sender}</p>

                                <p className='text-base'><span className='font-bold'>Receipient:</span> {session.user.office === transfer.receipient ? 'this office' : transfer.receipient}</p>

                                <p className='text-base'><span className='font-bold'>Date Sent:</span> {formatTimestamp(transfer.dateSent)}</p>

                                <p className='text-base'><span className='font-bold'>Date Confirmed:</span> {transfer.dateConfirmed ? formatTimestamp(transfer.dateConfirmed) : 'not confirmed yet'}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page