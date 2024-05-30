"use client";
import Link from 'next/link'
import { useState } from "react";

const MemoCard = ({ memo_key, sender, receipient, memoTrackingNum, title, session, dateSent, dateConfirmed, type }) => {
    const [loadingDetails, setLoadingDetails] = useState(false);

    const linkToMemo = `/attendant/memo/${memo_key}`;
    const linkToMemoAdmin = `/admin/memo/${memo_key}`;
    const linkToMemoRequestForm = `/staff/request?memoId=${memo_key}`;

    return (
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-black mb-4 rounded'>
            <div>
                <span className='flex flex-col lg:flex-row'>
                    <h3 className='mr-2'>Memo Title: {title}</h3>

                    {
                        session.user.role !== 'admin' &&
                        <span className="flex my-2 md:my-0">
                            {type !== 'original' ? <span className='flex items-center p-1 rounded bg-yellow-300 border border-black mr-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className='mr-1'><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path></svg>{type === "forward" ? "fowarded" : "resent"}</span> : ''}

                            {dateConfirmed ?
                                <span className="flex items-center justify-between p-1 border border-black bg-green-400 rounded mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className='mr-1'><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path></svg>
                                    confirmed
                                </span> : ''
                            }

                            {
                                session.user.office !== sender ? (
                                    <span className="flex items-center justify-between p-1 border border-black bg-blue-500 rounded mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="mr-1"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM7 11V8L2 12L7 16V13H15V11H7Z"></path></svg>
                                        in
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-between p-1 border border-black bg-red-400 rounded mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="mr-1"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM17 16L22 12L17 8V11H9V13H17V16Z"></path></svg>
                                        out
                                    </span>
                                )
                            }
                        </span>
                    }
                </span>
                <div className="my-2"></div>
                {
                    session.user.office !== sender ? (
                        <p className="font-bold">From: {sender}</p>
                    ) : (
                        <p className="font-bold">To: {receipient}</p>
                    )
                }

                {
                    session.user.role === 'admin'
                        ? (
                            <p className="font-bold">Sent To: {receipient}</p>
                        )
                        : (
                            <></>
                        )
                }

                <p className='font-bold'>Date Sent: {dateSent}</p>

                {
                    session.user.role === 'admin' &&
                    <p className='font-bold'>Date Confirmed: {dateConfirmed ? dateConfirmed : 'not yet confirmed'}</p>
                }

                <p className="font-bold">Memo Tracking Number: {memoTrackingNum}</p>
            </div>

            {
                session.user.role === "attendant" || session.user.role === "admin"
                    ?
                    (
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
                                <Link href={session.user.role === 'admin' ? linkToMemoAdmin : linkToMemo} className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Full Details</Link>
                            )}
                        </div>
                    )
                    :
                    (
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
                                <Link href={linkToMemoRequestForm} className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Request Full Details</Link>
                            )}
                        </div>
                    )
            }
        </div >
    )
}

export default MemoCard
