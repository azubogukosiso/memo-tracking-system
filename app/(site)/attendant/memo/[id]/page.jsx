import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Nav from "@/app/(components)/Nav";
import ClientComponentBtn from '@/app/(components)/ClientComponentBtn';

const fetchMemoDetails = async (id) => {
    console.log("this is the: ", id);
    try {
        const res = await fetch(`http://localhost:3000/api/Memos/getMemos?id=${id}`);
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
        <>
            {console.log("right here: ", message)}
            <Nav />
            <div className='mt-5 w-10/12 mx-auto'>
                <h2 className="mb-5">Full Memo Details</h2>
                <p className='text-base'><span className='font-bold'>Memo Title:</span> {message._doc.title}</p>
                <p className='text-base'><span className='font-bold'>Memo Description:</span> {message._doc.description}</p>
                {
                    session.user.office === message._doc.receipient ?
                        <p className='text-base'><span className='font-bold'>Sender:</span> {message._doc.sender}</p>
                        : <p className='text-base'><span className='font-bold'>Receipient:</span> {message._doc.receipient}</p>
                }
                <p className='text-base'><span className='font-bold'>Memo Tracking Number:</span> {message._doc.memoTN}</p>

                {
                    session.user.office === message._doc.receipient ?
                        <p className='text-base'><span className='font-bold'>Memo Status:</span> {message._doc.status === 'sent' ? ('not confirmed yet') : ('confirmed')}</p>
                        :
                        <p className='text-base'><span className='font-bold'>Memo Status:</span> {message._doc.status === 'sent' ? ('not confirmed yet') : ('confirmed')}</p>
                }

                <p className='text-base'><span className='font-bold'>Date Sent:</span> {formatTimestamp(message._doc.dateSent)}</p>

                {
                    message._doc.dateConfirmed === null ? '' : <p className='text-base'><span className='font-bold'> Date Confirmed:</span> {formatTimestamp(message._doc.dateConfirmed)}</p>
                }

                <ClientComponentBtn message={message._doc} session={session} />
            </div>

            <div className='mt-5 w-10/12 mx-auto'>
                <h3 className="mb-5">Memo History</h3>

                {
                    Array.isArray(message.memoTransferHistory) ? message.memoTransferHistory.map((transfer, index) => (
                        <div key={index} className={`mb-3 p-3 rounded-lg ${transfer._id === id ? 'bg-gray-300' : ''}`}>
                            <>msg id: {message._doc._id}</> <br />
                            <>id: {transfer._id}</>
                            <p className='text-base'><span className='font-bold'>Sender:</span> {session.user.office === transfer.sender ? 'this office' : transfer.sender}</p>

                            <p className='text-base'><span className='font-bold'>Receipient:</span> {session.user.office === transfer.receipient ? 'this office' : transfer.receipient}</p>

                            <p className='text-base'><span className='font-bold'>Date Sent:</span> {formatTimestamp(transfer.dateSent)}</p>

                            <p className='text-base'><span className='font-bold'>Date Confirmed:</span> {transfer.dateConfirmed ? formatTimestamp(transfer.dateConfirmed) : 'not confirmed yet'}</p>
                        </div>
                    ))
                        : (
                            <div key={id} className={`mb-3 p-3 rounded-lg ${message.memoTransferHistory._id === id ? 'bg-gray-300' : ''}`}>
                                <p className='text-base'><span className='font-bold'>Sender:</span> {session.user.office === message.memoTransferHistory.sender ? 'this office' : message.memoTransferHistory.sender}</p>

                                <p className='text-base'><span className='font-bold'>Receipient:</span> {session.user.office === message.memoTransferHistory.receipient ? 'this office' : message.memoTransferHistory.receipient}</p>

                                <p className='text-base'><span className='font-bold'>Date Sent:</span> {formatTimestamp(message.memoTransferHistory.dateSent)}</p>

                                <p className='text-base'><span className='font-bold'>Date Confirmed:</span> {message.memoTransferHistory.dateConfirmed ? formatTimestamp(message.memoTransferHistory.dateConfirmed) : 'not yet confirmed'}</p>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default page