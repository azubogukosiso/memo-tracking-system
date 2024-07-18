"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const SubmitCredentialsComponent = () => {
    const [formData, setFormData] = useState({
        fullname: '', email: '', role: '', office: '', staffID: ''
    });
    const [loadingAction, setLoadingAction] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitCredentials = async (e) => {
        e.preventDefault();

        setLoadingAction(true);
        setIsDisabled(true);

        const formDataToSend = new FormData();
        formDataToSend.append('fullname', formData.fullname);
        formDataToSend.append('email', formData.email.toLowerCase());
        formDataToSend.append('role', formData.role);
        formDataToSend.append('office', formData.office);
        formDataToSend.append('staffID', formData.staffID);

        try {
            const response = await fetch('/api/Users', {
                method: 'POST',
                body: formDataToSend,
            });

            const decRes = await response.json();

            if (response.ok) {
                setFormData({
                    fullname: '', email: '', role: '', office: '', staffID: ''
                })
                toast.success(decRes.message, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
                setLoadingAction(false);
                setIsDisabled(false);
            } else {
                toast.error(decRes.message, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
                setLoadingAction(false);
                setIsDisabled(false);
            }
        } catch (error) {
            toast.error('An error occured in submitting your credentials. Check your internet connection and try again', { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setLoadingAction(false);
            setIsDisabled(false);
        }
    }

    return (
        <>
            <form onSubmit={submitCredentials} className="p-4">
                <h2 className='mb-5'>Submit Credentials</h2>

                <div>
                    <div>
                        <label htmlFor="fullname" className='font-bold'>Full Name:</label> <br />
                        <input type="text" name="fullname" id="fullname" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={formData.fullname} onChange={handleInputChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="email" className='font-bold'>Email (Must be your school email):</label> <br />
                        <input type="email" name="email" id="email" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="role" className='font-bold'>Role:</label> <br />
                        <select name='role' onChange={handleInputChange} className="border border-black mb-3 bg-slate-300 p-2 rounded" value={formData.role}>
                            <option value=''>Click to Select</option>
                            <option value="attendant">Attendant</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="office" className='font-bold'>Office (Leave empty for admin accounts):</label> <br />
                        <select name='office' onChange={handleInputChange} className="border border-black mb-3 bg-slate-300 p-2 rounded" value={formData.office}>
                            <option value=''>Click to Select</option>
                            <option value="office a">Office A</option>
                            <option value="office b">Office B</option>
                            <option value="office c">Office C</option>
                            <option value="office d">Office D</option>
                            <option value="office e">Office E</option>
                        </select>
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="staffID" className='font-bold'>Staff ID:</label> <br />
                        <input type="text" name="staffID" id="staffID" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={formData.staffID} onChange={handleInputChange} />
                    </div>
                    <div className='my-6'></div>

                    <button type="submit" disabled={isDisabled} className={`bg-orange-500 border border-black text-white w-full p-3 rounded active:scale-95 transition-all ${isDisabled && 'opacity-75 cursor-not-allowed'}`}>
                        {loadingAction ?
                            (
                                <span className='flex items-center text-center justify-center'>
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    Submitting Credentials
                                </span>
                            ) : <>Submit Credentials</>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default SubmitCredentialsComponent