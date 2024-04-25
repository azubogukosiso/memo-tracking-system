"use client";

import { useState } from "react";

const MemoRequestForm = ({ sender }) => {
    const requestInitDetails = {
        title: '', description: '', sender, memoTN: '',
    }

    const [formData, setFormData] = useState(requestInitDetails);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitRequest = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(JSON.stringify({ formData }));
        const res = await fetch("/api/Requests", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type": "application/json"
        });

        const decRes = await res.json();
        console.log(decRes);
    }

    return (
        <>
            <form className='w-1/2 mx-auto mt-16' onSubmit={submitRequest}>
                <h1 className="mb-10">Make a Request</h1>

                <div className='mx-5'>
                    <div>
                        <label htmlFor="title" className='font-bold'>Title:</label> <br />
                        <input type="text" name="title" id="title" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.title} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="description" className='font-bold'>Description:</label> <br />
                        <textarea rows="5" type="text" name="description" id="description" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.description} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="memoTN" className='font-bold'>MTN (optional):</label> <br />
                        <input type="text" name="memoTN" id="memoTN" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' value={formData.memoTN} onChange={handleChange} />
                    </div>

                    <div className='my-6'></div>
                    <input type="submit" value="Submit Request" className='bg-black text-white w-full p-3 rounded cursor-pointer font-bold active:scale-95 transition-all' />
                </div>
            </form>
        </>
    )
}

export default MemoRequestForm
