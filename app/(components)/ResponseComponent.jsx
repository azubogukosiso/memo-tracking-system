"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';

const ResponseComponent = () => {
    const submitRequest = async (request_id) => {
        console.log(request_id);
        const res = await fetch("/api/Response/getResponse", {
            method: "POST",
            body: JSON.stringify(request_id),
            "content-type": "application/json"
        });

        const { message } = await res.json();

        console.log(message);

        setResponse(message?.response);
        setDateSent(message?.dateSent);
    }

    const formatTimestamp = (timestamp) => {
        // console.log("timestamp here: ", timestamp);

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

    const params = useParams();

    const [response, setResponse] = useState();
    const [dateSent, setDateSent] = useState();

    useEffect(() => {
        submitRequest(params.id);
    }, [params.id]);

    return (
        <div className='w-1/2 mx-auto mt-16'>
            <h4>Response:</h4>
            <p>{response}</p>
            <br />
            <h4>Date Sent:</h4>
            <p>{formatTimestamp(dateSent)}</p>
        </div>
    )
}

export default ResponseComponent