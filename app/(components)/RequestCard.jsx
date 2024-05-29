"use client";
import Link from 'next/link'
import { useState } from "react";

const RequestCard = ({ request_key, sender, memoTrackingNum, description, title, status, dateSent, session }) => {
    const [loadingDetails, setLoadingDetails] = useState(false);

    const responseUrlAdmin = `/admin/response/${request_key}`;
    const responseUrl = `/staff/response/${request_key}`;

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-black mb-4 rounded'>
                <div>
                    <span className='flex flex-col lg:flex-row'>
                        <h3 className='mr-2'>Request Title: {title}</h3>

                        <span className="flex my-2 md:my-0">
                            {status === 'responded'
                                ? <span className='flex items-center p-1 rounded bg-green-400 border border-black mr-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className='mr-1'><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path></svg>{status}</span>

                                : <span className='flex items-center p-1 rounded bg-red-400 border border-black mr-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className='mr-1'><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path></svg>{status}</span>
                            }
                        </span>
                    </span>
                    <div className="my-2"></div>
                    <p className="font-bold">Request Description: {description}</p>
                    {
                        session.user.role === 'admin' ? <p className="font-bold">Sender: {sender}</p> : <></>
                    }
                    <p className="font-bold">Date sent: {dateSent}</p>
                    <p className="font-bold">Memo Tracking Number: {memoTrackingNum}</p>
                </div>

                {
                    session.user.role === "admin"
                        ?
                        status === 'no response'
                            ?
                            <div className="flex flex-col items-end text-center justify-between mt-2 md:mt-0" onClick={() => setLoadingDetails(!loadingDetails)}>
                                {loadingDetails ? (
                                    <span className='flex items-center text-center justify-between'>
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        Loading
                                    </span>
                                ) : (
                                    <Link href={responseUrlAdmin} className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Respond</Link>
                                )}
                            </div>
                            : <></>
                        :
                        status !== 'no response'
                            ? <div className="flex flex-col items-end text-center justify-between mt-2 md:mt-0" onClick={() => setLoadingDetails(!loadingDetails)}>
                                {loadingDetails ? (
                                    <span className='flex items-center text-center justify-between'>
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        Loading
                                    </span>
                                ) : (
                                    <Link href={responseUrl} className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">View Response</Link>
                                )}
                            </div>
                            : <></>
                }
            </div>
        </div>
    )
}

export default RequestCard
