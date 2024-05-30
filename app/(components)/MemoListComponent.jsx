"use client";

import MemoCard from "@/app/(components)/MemoCard";
import { useState, useEffect } from "react";

const MemoListComponent = ({ session }) => {
    const [memoList, setMemoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const getMemos = async (session) => {
            try {
                const res = await fetch('/api/Memos/getMemos', {
                    method: "POST",
                    body: JSON.stringify(session),
                    "content-type": "application/json"
                });
                const memos = await res.json();
                setMemoList(memos.message);
                setIsLoading(false);
            } catch (error) {
                console.log("Failed to get memos", error);
            }
        }

        getMemos(session);
    }, [session]);

    let memoListDisplay;

    if (memoList.length > 0) {
        memoListDisplay =
            memoList.map(memo => (
                <MemoCard key={memo.id} memo_key={memo.id} sender={memo.sender} receipient={memo.receipient} memoTrackingNum={memo.memoTrackingNum} type={memo.type} title={memo.title} dateConfirmed={formatTimestamp(memo.dateConfirmed)} dateSent={formatTimestamp(memo.dateSent)} session={session} />
            ))
    } else {
        memoListDisplay = <p>There are currently no memos</p>
    }

    return (
        <>
            {isLoading
                ?
                <>
                    <div className="bg-gray-200 h-40 animate-pulse rounded mb-4"></div>
                    <div className="bg-gray-200 h-40 animate-pulse rounded mb-4"></div>
                    <div className="bg-gray-200 h-40 animate-pulse rounded"></div>
                </>
                : memoListDisplay}
        </>
    )
}

export default MemoListComponent