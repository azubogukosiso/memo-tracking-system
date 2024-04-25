"use client";
import Link from 'next/link'

const RequestCard = ({ request_key, sender, memoTN, description, title, status, dateSent, session }) => {

    const responseUrlAdmin = `/admin/response/${request_key}`;
    const responseUrl = `/staff/response/${request_key}`;

    return (
        <div>
            <div className='flex justify-between items-center p-4 border border-gray-100 shadow-md mb-4 rounded'>
                <div>
                    <h3>Request Title: {title}</h3>
                    <div className="my-2"></div>
                    <p className="font-bold">Request Description: {description}</p>
                    {
                        session.user.role === 'admin' ? <p className="font-bold">Sender: {sender}</p> : <></>
                    }
                    <p className="font-bold">Status: {status === 'no response' ? 'no response given' : status}</p>
                    <p className="font-bold">Date sent: {dateSent}</p>
                    <p className="font-bold">MTN: {memoTN}</p>
                </div>

                {
                    session.user.role === "admin"
                        ?
                        status === 'no response'
                            ? <Link href={responseUrlAdmin} className="p-3 bg-gray-300 rounded">Respond</Link>
                            : <></>
                        :
                        status !== 'no response'
                            ? <Link href={responseUrl} className="p-3 bg-gray-300 rounded">View Response</Link>
                            : <p className="p-3 bg-gray-300 rounded">No Response Yet</p>
                }
            </div>
        </div>
    )
}

export default RequestCard
