"use client";
import Link from 'next/link'

import { useState } from "react";

const MemoCard = ({ memo_key, original, sender, receipient, memoTN, description, title, status, dateSent, dateReceived, session }) => {

    const [memoStatus, setMemoStatus] = useState(status);

    const confirmReceipt = async (memo_id) => {
        console.log(memo_id);
        try {
            const res = await fetch("http://localhost:3000/api/Memos/confirmMemos", {
                method: "POST",
                body: JSON.stringify({ memo_id }),
                "content-type": "application/json"
            });

            console.log(res);

            const decRes = await res.json();

            if (res.ok) {
                console.log(decRes.message);
                setMemoStatus(decRes.message);
            }
        } catch (err) {
            console.log("error: ", err)
        }
    }

    const linkToMemo = `/attendant/memo/${memo_key}`;

    return (
        <div>
            <div className='flex justify-between items-center p-4 border border-gray-100 shadow-md mb-4 rounded'>
                <div>
                    <h3>Memo Title: {title}</h3>
                    <div className="my-2"></div>
                    {
                        session.user.office !== sender ? (
                            <p className="font-bold">Sender: {sender}</p>
                        ) : (
                            <p className="font-bold">Sent To: {receipient}</p>
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

                    <p className="font-bold">MTN: {memoTN}</p>

                    {
                        session.user.role === "attendant"
                            ? session.user.office === sender
                                ? (
                                    <p className="font-bold">Status: {memoStatus}</p>
                                )
                                : (
                                    <></>
                                )
                            : (
                                <></>
                            )
                    }

                </div>

                {
                    session.user.role === "attendant"
                        ? session.user.office !== sender
                            ? memoStatus !== "confirmed"
                                ? (
                                    <div className="flex flex-col text-center justify-between">
                                        <Link href={linkToMemo} className="p-3 bg-gray-300 rounded">full details</Link>
                                        <div className="my-3"></div>
                                        <button className="p-3 bg-gray-300 rounded" onClick={() => {
                                            confirmReceipt(memo_key);
                                        }} ><p>Confirm Receipt</p></button>
                                        {original && <i>resent</i>}
                                    </div>
                                )
                                : (
                                    <div className="flex flex-col text-center justify-between">
                                        <Link href={linkToMemo} className="p-3 bg-gray-300 rounded">full details</Link>
                                        {original && <i>resent</i>}
                                    </div>
                                )
                            : (
                                <div className="flex flex-col text-center justify-between">
                                    <Link href={linkToMemo} className="p-3 bg-gray-300 rounded">full details</Link>
                                    {original && <i>resent</i>}
                                </div>
                            )
                        : (
                            <></>
                        )
                }
            </div>
        </div>
    )
}

export default MemoCard
