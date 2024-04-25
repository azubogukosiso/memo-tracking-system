"use client";

import { useState } from "react";
import { useParams } from 'next/navigation'


const MemoRequestForm = () => {
    const params = useParams();

    const responseInitDetails = {
        request_id: params.id, response: ''
    }

    const [formData, setFormData] = useState(responseInitDetails);

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
        const res = await fetch("/api/Response", {
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
                <h1 className="mb-10">Respond to request</h1>

                <div className='mx-5'>
                    <div>
                        <label htmlFor="response" className='font-bold'>Your response here:</label> <br />
                        <textarea rows="5" type="text" name="response" id="response" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.response} onChange={handleChange} />
                    </div>

                    <div className='my-6'></div>
                    <input type="submit" value="Submit Request" className='bg-black text-white w-full p-3 rounded cursor-pointer font-bold active:scale-95 transition-all' />
                </div>
            </form>
        </>
    )
}

export default MemoRequestForm
