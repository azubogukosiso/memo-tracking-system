"use client";

import RequestCard from "@/app/(components)/RequestCard";
import { useState, useEffect } from "react";

const RequestListComponent = ({ session }) => {
    const [requestList, setRequestList] = useState([]);
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
        const getRequests = async (session) => {
            try {
                const res = await fetch('/api/Requests/getRequests', {
                    method: "POST",
                    body: JSON.stringify(session),
                    "content-type": "application/json"
                });
                const requests = await res.json();
                setRequestList(requests.message);
                console.log(requests.message);
                setIsLoading(false);
            } catch (error) {
                console.log("Failed to get memos", error);
            }
        }

        getRequests(session);
    }, [session]);

    let requestListDisplay;

    if (requestList.length > 0) {
        requestListDisplay =
            requestList.map(request => (
                <RequestCard key={request._id} request_key={request._id} sender={request.sender} senderEmail={request.senderEmail} memoTrackingNum={request.memoTrackingNum} details={request.details} status={request.status} dateSent={formatTimestamp(request.dateSent)} session={session} />
            ))
    } else {
        requestListDisplay = <p>There are currently no requests</p>
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
                : requestListDisplay}
        </>
    )
}

export default RequestListComponent