'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

const Page = () => {
    const [data, setData] = useState({ email: '', password: '', role: 'admin' });

    const logInAdmin = async (e) => {
        e.preventDefault();
        console.log(data);
        const res = await signIn('credentials', { ...data, callbackUrl: 'http://localhost:3000/admin' });
        console.log(res);
    }

    return (
        <form className='w-1/2 mx-auto mt-32' onSubmit={logInAdmin}>
            <h1 className='mb-10'>Sign In - Admin</h1>

            <div className='mx-5'>
                <div>
                    <label htmlFor="email" className='font-bold'>Email:</label> <br />
                    <input type="text" name="email" id="email" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                </div>
                <div className='my-8'></div>
                <div>
                    <label htmlFor="password" className='font-bold'>Password:</label> <br />
                    <input type="password" name="password" id="password" className='border-b-black border-b-2 w-full focus:!outline-none bg-slate-300 rounded-t p-2' required={true} value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
                </div>
                <div className='my-6'></div>
                <input type="submit" value="Sign In" className='bg-black text-white w-full p-3 rounded cursor-pointer font-bold active:scale-95 transition-all' />
            </div>
        </form>
    )
}

export default Page