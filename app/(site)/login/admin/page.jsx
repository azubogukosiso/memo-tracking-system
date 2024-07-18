'use client';

import { useState, useLayoutEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from "next/link";
import toast from 'react-hot-toast';
import Header from "@/app/(components)/HeaderComponent";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    useLayoutEffect(() => {
        setLoginErrMsg(error);
    }, [error]);

    const [data, setData] = useState({ email: '', password: '', role: 'admin' });
    const [loadingActionSignIn, setLoadingActionSignIn] = useState(false);
    const [loadingActionGoogle, setLoadingActionGoogle] = useState(false);
    const [loginErrMsg, setLoginErrMsg] = useState(null);
    const [isDisabledSignIn, setIsDisabledSignIn] = useState(false);
    const [isDisabledGoogle, setIsDisabledGoogle] = useState(false);

    const logInAdmin = async (e) => {
        e.preventDefault();

        setIsDisabledSignIn(true);
        setLoadingActionSignIn(true);

        const res = await signIn('credentials', { ...data, redirect: false });
        if (res?.error) {
            toast.error(res.error, { duration: 4000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
            setIsDisabledSignIn(false);
            setLoadingActionSignIn(false);
        } else if (res?.ok) {
            router.push("/admin");
        }
    }

    const googleLogin = async (e) => {
        e.preventDefault();
        setLoadingActionGoogle(true);
        setIsDisabledGoogle(true);
        const res = await signIn('googleAdmin', { callbackUrl: '/admin', redirect: false })
        if (res) {
            setLoadingActionGoogle(false);
            setIsDisabledGoogle(false);
        }
    }

    return (
        <Suspense>
            <Header />
            <div className="border border-black"></div>
            <form className='w-full md:w-1/2 mx-auto mt-32' onSubmit={logInAdmin}>
                <div className='mx-5'>
                    <h1 className='mb-10'>Sign In - Admin</h1>
                    <div>
                        <label htmlFor="email" className='font-bold'>Email:</label> <br />
                        <input type="text" name="email" id="email" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className='my-8'></div>
                    <div>
                        <label htmlFor="password" className='font-bold'>Password:</label> <br />
                        <input type="password" name="password" id="password" className='border border-black w-full focus:!outline-none bg-slate-300 rounded p-2' required={true} value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
                    </div>
                    <div className='my-6'></div>
                    <button disabled={isDisabledSignIn} type="submit" className={`bg-orange-500 border border-black text-white w-full p-3 rounded transition-all active:scale-95 ${isDisabledSignIn && 'opacity-70 cursor-not-allowed'}`}>
                        {loadingActionSignIn ?
                            (
                                <span className='flex items-center text-center justify-center'>
                                    <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    Signing In...
                                </span>
                            ) : <>Sign In</>}
                    </button>
                </div>
            </form>
            <p className='mt-6 text-center text-lg'>or</p>
            <div className='w-full md:w-1/2 mx-auto mt-6 mb-32'>
                <div className='mx-5'>
                    <button disabled={isDisabledGoogle} className={`border border-black rounded p-3 w-full active:scale-95 transition-all ${isDisabledGoogle && "opacity-75 cursor-not-allowed"}`} onClick={googleLogin}>
                        {
                            loadingActionGoogle ?
                                (
                                    <span className='flex items-center text-center justify-center py-2'>
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        Signing in with Google...
                                    </span>
                                ) : <span className='flex items-center text-center justify-center'>
                                    <svg width="40" height="40" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M120 76.1C120 73 119.7 69.8 119.2 66.8H75.8999V84.5H100.7C99.6999 90.2 96.3999 95.2 91.4999 98.4L106.3 109.9C115 101.8 120 90 120 76.1Z" fill="#4280EF" />
                                        <path d="M75.8999 120.9C88.2999 120.9 98.6999 116.8 106.3 109.8L91.4999 98.4C87.3999 101.2 82.0999 102.8 75.8999 102.8C63.8999 102.8 53.7999 94.7 50.0999 83.9L34.8999 95.6C42.6999 111.1 58.4999 120.9 75.8999 120.9Z" fill="#34A353" />
                                        <path d="M50.0999 83.8C48.1999 78.1 48.1999 71.9 50.0999 66.2L34.8999 54.4C28.3999 67.4 28.3999 82.7 34.8999 95.6L50.0999 83.8Z" fill="#F6B704" />
                                        <path d="M75.8999 47.3C82.3999 47.2 88.7999 49.7 93.4999 54.2L106.6 41C98.2999 33.2 87.2999 29 75.8999 29.1C58.4999 29.1 42.6999 38.9 34.8999 54.4L50.0999 66.2C53.7999 55.3 63.8999 47.3 75.8999 47.3Z" fill="#E54335" />
                                    </svg>
                                    Sign in with Google
                                </span>
                        }
                    </button>
                    {loginErrMsg && <p className="mt-3 text-lg">{loginErrMsg}</p>}
                </div>
            </div>

            <div className='pb-3 md:mb-0 mt-[75px] flex justify-end items-center'>
                <Link href='/guide' className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">User Guide</Link>
                <span className="mx-3"></span>
                <Link href='mailto:azuboguko@gmail.com' target="_blank" className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Feedback</Link>
            </div>
        </Suspense>
    )
}

export default Page