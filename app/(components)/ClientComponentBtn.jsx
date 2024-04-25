"use client";

import { useState } from "react";

const ClientComponentBtn = ({ message, session }) => {
    const [formData, setFormData] = useState(message);
    const [memoStatus, setMemoStatus] = useState(message.status);
    const [resendMemoOpts, setResendMemoOpts] = useState(false);
    const [forwardMemoOpts, setForwardMemoOpts] = useState(false);

    const confirmReceipt = async (memo_id) => {
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

            return decRes;
        } catch (err) {
            console.log("error: ", err)
        }
    }

    const forwardMemo = async (e) => {
        e.preventDefault();
        formData.sender = session.user.office;
        let confirmMsg = '';
        if (memoStatus === 'sent') {
            confirmMsg = await confirmReceipt(formData._id)
        } else {
            confirmMsg = 'confirmed';
        }

        if (confirmMsg) {
            formData.resent = true;

            const res = await fetch("/api/Memos", {
                method: "POST",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            });

            const decRes = await res.json();
            console.log(decRes);
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <>
            {console.log(message)}
            <div className="mt-5 flex justify-between">
                {
                    formData.sender !== session.user.office
                        ? memoStatus === 'sent'
                            ? <button className="p-3 bg-gray-300 rounded" onClick={() => {
                                confirmReceipt(formData._id);
                            }} ><p>Confirm Receipt</p></button>
                            : <p className='font-bold'>Memo has been confirmed</p>
                        : <div></div>
                }

                {
                    formData.sender !== session.user.office
                        ? formData.resent || formData.originalMemo_id
                            ? <button className="p-3 bg-gray-300 rounded" onClick={() => {
                                setForwardMemoOpts(true);
                            }} ><p>Forward Memo</p></button>
                            :
                            <button className="p-3 bg-gray-300 rounded" onClick={() => {
                                setForwardMemoOpts(true);
                            }} ><p>Forward Memo</p></button>
                        : <button className="p-3 bg-gray-300 rounded" onClick={() => {
                            setResendMemoOpts(true);
                        }} ><p>Resend Memo</p></button>
                }
            </div>

            {
                resendMemoOpts
                    ? <form onSubmit={forwardMemo} className="mt-5">
                        <div>
                            <label htmlFor="receipient" className='font-bold'>Resend to:</label> <br />
                            <select name='receipient' onChange={handleChange} className="mb-3 bg-slate-300 p-2 rounded" value={formData.receipient}>
                                <option value=''></option>
                                <option value="office a">Office A</option>
                                <option value="office b">Office B</option>
                                <option value="office c">Office C</option>
                                <option value="office d">Office D</option>
                                <option value="office e">Office E</option>
                            </select>
                        </div>
                        <input className="p-3 bg-gray-300 rounded cursor-pointer" type="submit" value="Resend Memo" />
                    </form>
                    : <></>
            }

            {
                forwardMemoOpts
                    ? <form onSubmit={forwardMemo} className="mt-5">
                        <div>
                            <label htmlFor="receipient" className='font-bold'>Forward to:</label> <br />
                            <select name='receipient' onChange={handleChange} className="mb-3 bg-slate-300 p-2 rounded" value={formData.receipient}>
                                <option value=''></option>
                                <option value="office a">Office A</option>
                                <option value="office b">Office B</option>
                                <option value="office c">Office C</option>
                                <option value="office d">Office D</option>
                                <option value="office e">Office E</option>
                            </select>
                        </div>
                        <input className="p-3 bg-gray-300 rounded cursor-pointer" type="submit" value="Forward Memo" />
                    </form>
                    : <></>
            }
        </>
    )
}

export default ClientComponentBtn