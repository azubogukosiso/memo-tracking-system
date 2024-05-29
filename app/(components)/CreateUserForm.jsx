"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', role: '', office: '',
    });
    const [loadingAction, setLoadingAction] = useState(false);

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

        if (res.ok) {
            setFormData({
                username: '', email: '', password: '', role: '', office: '',
            })

            toast.success(decRes.message, { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setLoadingAction(false);
        } else {
            toast.error('An error occured in creating the user. Check your internet connection and try again', { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setLoadingAction(false);
        }
    }

    return (
        <>
            <div className="border border-black"></div>
            <form onSubmit={registerUser} className="p-4">
                <h1 className='mb-5'>Create a User</h1>

                <div>
                    <div>
                        <label htmlFor="username" className='font-bold'>Username:</label> <br />
                        <input type="text" name="username" id="username" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={formData.username} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="email" className='font-bold'>Email:</label> <br />
                        <input type="text" name="email" id="email" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={formData.email} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="password" className='font-bold'>Password:</label> <br />
                        <input type="password" name="password" id="password" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={formData.password} onChange={handleChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="role" className='font-bold'>Role:</label> <br />
                        <select name='role' onChange={handleChange} className="mb-3 bg-slate-300 border border-black p-2 rounded" value={formData.role}>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="attendant">Attendant</option>
                        </select>
                    </div>

                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="office" className='font-bold'>Office:</label> <br />
                        <select name='office' onChange={handleChange} className="mb-3 bg-slate-300 border border-black p-2 rounded" value={formData.office}>
                            <option value=""></option>
                            <option value="office a">Office A</option>
                            <option value="office b">Office B</option>
                            <option value="office c">Office C</option>
                            <option value="office d">Office D</option>
                            <option value="office e">Office E</option>
                        </select>
                    </div>

                    <div className='my-6'></div>
                    <button type="submit" className='bg-orange-500 border border-black text-white w-full p-3 rounded cursor-pointer active:scale-95 transition-all' onClick={() => { setLoadingAction(true) }}>
                        {loadingAction ?
                            (
                                <span className='flex items-center text-center justify-center'>
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    Loading
                                </span>
                            ) : <>Create User</>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateUserForm
