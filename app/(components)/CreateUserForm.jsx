"use client";

import { useState } from "react";

const CreateUserForm = () => {
    const userInitDetails = {
        username: '', email: '', password: '', role: '', office: '',
    }

    const [formData, setFormData] = useState(userInitDetails);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const registerUser = async (e) => {
        e.preventDefault();
        console.log(formData);

        const res = await fetch("/api/Users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            "content-type": "application/json"
        });

        const decRes = await res.json();
        console.log(decRes);
    }

    return (
        <>
            <form className='w-1/2 mx-auto mt-16' onSubmit={registerUser}>
                <h1 className='mb-10'>Create a User</h1>

                <div className='mx-5'>
                    <div>
                        <label htmlFor="username" className='font-bold'>Username:</label> <br />
                        <input type="text" name="username" id="username" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.username} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="email" className='font-bold'>Email:</label> <br />
                        <input type="text" name="email" id="email" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.email} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="password" className='font-bold'>Password:</label> <br />
                        <input type="password" name="password" id="password" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={formData.password} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="role" className='font-bold'>Role:</label> <br />
                        <select name='role' onChange={handleChange} className="mb-3 bg-slate-300 p-2 rounded" value={formData.role}>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="attendant">Attendant</option>
                        </select>
                    </div>

                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="office" className='font-bold'>Office:</label> <br />
                        <select name='office' onChange={handleChange} className="mb-3 bg-slate-300 p-2 rounded" value={formData.office}>
                            <option value=""></option>
                            <option value="office a">Office A</option>
                            <option value="office b">Office B</option>
                            <option value="office c">Office C</option>
                            <option value="office d">Office D</option>
                            <option value="office e">Office E</option>
                        </select>
                    </div>

                    <div className='my-6'></div>
                    <input type="submit" value="Create User" className='bg-black text-white w-full p-3 rounded cursor-pointer font-bold active:scale-95 transition-all' />
                </div>
            </form>
        </>
    )
}

export default CreateUserForm
