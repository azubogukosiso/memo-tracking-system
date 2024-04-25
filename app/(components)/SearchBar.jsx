'use client';

import { useState } from 'react';
import MemoCard from "@/app/(components)/MemoCard";

const formatTimestamp = (timestamp) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
}

const SearchBar = ({ session }) => {
    const [memoResults, setMemoResults] = useState([]);

    const fetchMemo = async (value) => {
        try {
            const res = await fetch("/api/Memos/getMemos", {
                method: "POST",
                body: JSON.stringify(session),
                "content-type": "application/json"
            })
            const decRes = await res.json();
            console.log(decRes);

            const results = decRes.message.filter(memo => {
                if (value && memo.memoTN.startsWith(value)) {
                    return memo;
                }
            })

            console.log("way to go: ", results);
            setMemoResults(results);
        } catch (error) {
            console.log("Failed to get memos", error);
        }
    }

    return (
        <div className="mt-10">
            <div className="flex justify-center items-center">
                <label className="mr-3">Memo search: </label>
                <input type="text" className='bg-slate-200 rounded p-1' onChange={(e) => fetchMemo(e.target.value)} />
            </div>

            <div className="mt-5 w-10/12 mx-auto ">
                {
                    memoResults.length > 0 ? memoResults.map(memoResult => (
                        <MemoCard key={memoResult._id} memo_key={memoResult._id} original={memoResult.originalMemo_id} sender={memoResult.sender} receipient={memoResult.receipient} memoTN={memoResult.memoTN} description={memoResult.description} title={memoResult.title} status={memoResult.status} dateSent={formatTimestamp(memoResult.dateSent)} dateReceived={formatTimestamp(memoResult.dateReceived)} session={session} />
                    )) : (
                        <h4 className='text-center'>No memos matched</h4>
                    )
                }
            </div>
        </div>
    )
}

export default SearchBar