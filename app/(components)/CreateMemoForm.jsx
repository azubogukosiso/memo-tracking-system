"use client";

import { useState } from "react";

const CreateMemoForm = ({ sender }) => {
    let memoInitDetails = {
        title: '', description: '', sender, receipient: '', resent: false,
    }

    const [formData, setFormData] = useState(memoInitDetails);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const registerMemo = async (e) => {
        e.preventDefault();
        console.log(formData);

        console.log(JSON.stringify({ formData }));
        const res = await fetch("/api/Memos", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type": "application/json"
        });

        const decRes = await res.json();
        console.log(decRes);

        if (decRes) {
            memoInitDetails = { title: '', description: '', sender, receipient: '', resent: false };
            setFormData(memoInitDetails);
        }
    }


    return (
        <>
            <form className='w-1/2 mx-auto mt-16' onSubmit={registerMemo}>
                <h1 className='mb-10'>Create a Memo</h1>

                <div className='mx-5'>
                    <div>
                        <label htmlFor="title" className='font-bold'>Memo Title:</label> <br />
                        <input type="text" name="title" id="title" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.title} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="description" className='font-bold'>Memo Description:</label> <br />
                        <input type="text" name="description" id="description" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.description} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="receipient" className='font-bold'>Receipient:</label> <br />
                        <select name='receipient' onChange={handleChange} className="mb-3 bg-slate-300 p-2 rounded" value={formData.receipient}>
                            <option value=''></option>
                            <option value="office a">Office A</option>
                            <option value="office b">Office B</option>
                            <option value="office c">Office C</option>
                            <option value="office d">Office D</option>
                            <option value="office e">Office E</option>
                        </select>
                    </div>
                    <div className='my-6'></div>
                    <input type="submit" value="Create Memo" className='bg-black text-white w-full p-3 rounded cursor-pointer font-bold active:scale-95 transition-all' />
                </div>
            </form>
        </>
    )
}

export default CreateMemoForm
