"use client";

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useState } from "react";

const Nav = () => {
    const { data: session } = useSession();

    const [isNavOpen, setIsNavOpen] = useState(false);

    let navDisplay;
    if (!session) { // WIREFRAME LOADING ANIMATION
        navDisplay =
            <>
                <div className="hidden lg:flex fixed w-1/5 h-[96vh] translate-x-4 translate-y-4 top-0 left-0 flex-col text-white bg-orange-500 p-3 rounded-md border border-black z-20">
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                </div>

                <div className={`fixed lg:hidden w-[97%] h-[96vh] -translate-x-1/2 lg:translate-x-4 -translate-y-1/2 lg:translate-y-4 top-1/2 lg:top-0 left-1/2 lg:left-0 ${isNavOpen ? 'flex' : 'hidden'} flex-col text-white bg-orange-500 p-3 rounded-md border border-black z-20`}>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                    <span className="px-5 py-4 flex items-center animate-pulse">
                        <div className="bg-orange-600 w-5 h-5 rounded-full mr-2"></div>
                        <div className="bg-orange-600 w-32 h-5 rounded-full"></div>
                    </span>
                </div>

                <button className={`fixed ${isNavOpen ? 'hidden' : 'flex'} lg:hidden items-center justify-center right-[10px] bottom-[10px] bg-orange-500 rounded z-20 p-3 hover:bg-orange-600 text-white border border-black`} onClick={() => setIsNavOpen(!isNavOpen)}>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </button>
            </>
    }

    if (session?.user.role === "admin") {
        navDisplay = <>
            {/* FOR DESKTOPS */}
            <div className='hidden lg:flex fixed w-1/5 h-[96vh] translate-x-4 translate-y-4 top-0 left-0 flex-col text-white bg-orange-500 p-3 rounded-md border border-black z-20'>
                <Link href='/admin' className='rounded px-5 py-4 hover:bg-orange-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path></svg>
                    All Memos
                </Link>
                <Link href='/admin/search' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z"></path></svg>
                    Memo Search
                </Link>
                <Link href='/admin/accounts' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" /></svg>
                    View Accounts
                </Link>
                {/* <Link href='/guide' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M13 8V16C13 17.6569 11.6569 19 10 19H7.82929C7.41746 20.1652 6.30622 21 5 21C3.34315 21 2 19.6569 2 18C2 16.3431 3.34315 15 5 15C6.30622 15 7.41746 15.8348 7.82929 17H10C10.5523 17 11 16.5523 11 16V8C11 6.34315 12.3431 5 14 5H17V2L22 6L17 10V7H14C13.4477 7 13 7.44772 13 8ZM5 19C5.55228 19 6 18.5523 6 18C6 17.4477 5.55228 17 5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19Z" /></svg>
                    User Guide
                </Link> */}
                <Link href='/password' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM12 7C13.1046 7 14 7.89543 14 9C14 9.73984 13.5983 10.3858 13.0011 10.7318L13 15H11L10.9999 10.7324C10.4022 10.3866 10 9.74025 10 9C10 7.89543 10.8954 7 12 7Z" /></svg>
                    Change Password
                </Link>
                <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                    Log Out
                </Link>
            </div>

            {/* FOR MOBILES */}
            <div className={`fixed lg:hidden w-[97%] h-[96vh] -translate-x-1/2 lg:translate-x-4 -translate-y-1/2 lg:translate-y-4 top-1/2 lg:top-0 left-1/2 lg:left-0 ${isNavOpen ? 'flex' : 'hidden'} flex-col text-white bg-orange-500 p-3 rounded-md border border-black z-20`}>

                <div className='flex justify-between items-center'>
                    <div></div>
                    <button className="flex items-center hover:bg-orange-600 rounded px-5 py-4" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                        Close
                    </button>
                </div>

                <Link href={session.user.role === 'admin' ? '/admin' : '/staff'} className='rounded px-5 py-4 hover:bg-orange-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path></svg>
                    All Memos
                </Link>
                <Link href={session.user.role === 'admin' ? '/admin/search' : '/staff/search'} className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z"></path></svg>
                    Memo Search
                </Link>
                <Link href='/admin/accounts' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" /></svg>
                    View Accounts
                </Link>
                {/* <Link href='/guide' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M13 8V16C13 17.6569 11.6569 19 10 19H7.82929C7.41746 20.1652 6.30622 21 5 21C3.34315 21 2 19.6569 2 18C2 16.3431 3.34315 15 5 15C6.30622 15 7.41746 15.8348 7.82929 17H10C10.5523 17 11 16.5523 11 16V8C11 6.34315 12.3431 5 14 5H17V2L22 6L17 10V7H14C13.4477 7 13 7.44772 13 8ZM5 19C5.55228 19 6 18.5523 6 18C6 17.4477 5.55228 17 5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19Z" /></svg>
                    User Guide
                </Link> */}
                <Link href='/password' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM12 7C13.1046 7 14 7.89543 14 9C14 9.73984 13.5983 10.3858 13.0011 10.7318L13 15H11L10.9999 10.7324C10.4022 10.3866 10 9.74025 10 9C10 7.89543 10.8954 7 12 7Z" /></svg>
                    Change Password
                </Link>
                <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                    Log Out
                </Link>
            </div>

            <button className={`fixed ${isNavOpen ? 'hidden' : 'flex'} lg:hidden items-center justify-center right-[10px] bottom-[10px] bg-orange-500 rounded z-20 p-3 hover:bg-orange-600 text-white border border-black`} onClick={() => setIsNavOpen(!isNavOpen)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1"><path d="M9.41421 8L18.0208 16.6066L16.6066 18.0208L8 9.41421V17H6V6H17V8H9.41421Z" /></svg>
                Menu
            </button>
        </>
    } else if (session?.user.role === "attendant") {
        navDisplay = <>
            {/* FOR DESKTOPS */}
            <div className='hidden lg:flex fixed w-1/5 h-[96vh] translate-x-4 translate-y-4 top-0 left-0 flex-col text-white bg-orange-500 p-3 rounded-md border border-black z-20'>
                <Link href="/attendant" className='rounded px-5 py-4 hover:bg-orange-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path></svg>
                    All Memos
                </Link>
                <Link href="/attendant/create" className='rounded px-5 py-4 hover:bg-orange-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 15L17.999 18H21V20H17.999L18 23H16L15.999 20H13V18H15.999L16 15H18ZM11 18V20H3V18H11ZM21 11V13H3V11H21ZM21 4V6H3V4H21Z"></path></svg>
                    Create Memos
                </Link>
                <Link href="/attendant/search" className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z"></path></svg>
                    Memo Search
                </Link>
                {/* <Link href='/guide' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M13 8V16C13 17.6569 11.6569 19 10 19H7.82929C7.41746 20.1652 6.30622 21 5 21C3.34315 21 2 19.6569 2 18C2 16.3431 3.34315 15 5 15C6.30622 15 7.41746 15.8348 7.82929 17H10C10.5523 17 11 16.5523 11 16V8C11 6.34315 12.3431 5 14 5H17V2L22 6L17 10V7H14C13.4477 7 13 7.44772 13 8ZM5 19C5.55228 19 6 18.5523 6 18C6 17.4477 5.55228 17 5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19Z" /></svg>
                    User Guide
                </Link> */}
                <Link href='/password' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM12 7C13.1046 7 14 7.89543 14 9C14 9.73984 13.5983 10.3858 13.0011 10.7318L13 15H11L10.9999 10.7324C10.4022 10.3866 10 9.74025 10 9C10 7.89543 10.8954 7 12 7Z" /></svg>
                    Change Password
                </Link>
                <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                    Log Out
                </Link>
            </div>

            {/* FOR MOBILES */}
            <div className={`fixed lg:hidden w-[97%] h-[96vh] -translate-x-1/2 lg:translate-x-4 -translate-y-1/2 lg:translate-y-4 top-1/2 lg:top-0 left-1/2 lg:left-0 ${isNavOpen ? 'flex' : 'hidden'} flex-col text-white bg-orange-500 p-3 rounded-md border border-black z-20`}>

                <div className='flex justify-between items-center'>
                    <div></div>
                    <button className="flex items-center hover:bg-orange-600 rounded px-5 py-4" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                        Close
                    </button>
                </div>

                <Link href="/attendant" className='rounded px-5 py-4 hover:bg-orange-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path></svg>
                    All Memos
                </Link>
                <Link href="/attendant/create" className='rounded px-5 py-4 hover:bg-orange-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 15L17.999 18H21V20H17.999L18 23H16L15.999 20H13V18H15.999L16 15H18ZM11 18V20H3V18H11ZM21 11V13H3V11H21ZM21 4V6H3V4H21Z"></path></svg>
                    Create Memos
                </Link>
                <Link href="/attendant/search" className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5ZM10 8.5C10 5.46243 12.4624 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 9.6575 20.6424 10.7315 20.0317 11.6175L22.7071 14.2929L21.2929 15.7071L18.6175 13.0317C17.7315 13.6424 16.6575 14 15.5 14C12.4624 14 10 11.5376 10 8.5ZM3 4H8V6H3V4ZM3 11H8V13H3V11ZM21 18V20H3V18H21Z"></path></svg>
                    Memo Search
                </Link>
                {/* <Link href='/guide' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M13 8V16C13 17.6569 11.6569 19 10 19H7.82929C7.41746 20.1652 6.30622 21 5 21C3.34315 21 2 19.6569 2 18C2 16.3431 3.34315 15 5 15C6.30622 15 7.41746 15.8348 7.82929 17H10C10.5523 17 11 16.5523 11 16V8C11 6.34315 12.3431 5 14 5H17V2L22 6L17 10V7H14C13.4477 7 13 7.44772 13 8ZM5 19C5.55228 19 6 18.5523 6 18C6 17.4477 5.55228 17 5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19Z" /></svg>
                    User Guide
                </Link> */}
                <Link href='/password' className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM12 7C13.1046 7 14 7.89543 14 9C14 9.73984 13.5983 10.3858 13.0011 10.7318L13 15H11L10.9999 10.7324C10.4022 10.3866 10 9.74025 10 9C10 7.89543 10.8954 7 12 7Z" /></svg>
                    Change Password
                </Link>
                <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-orange-600 transition flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mr-2'><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                    Log Out
                </Link>
            </div>

            <button className={`fixed ${isNavOpen ? 'hidden' : 'flex'} lg:hidden items-center justify-center right-[10px] bottom-[10px] bg-orange-500 rounded z-20 p-3 hover:bg-orange-600 text-white border border-black`} onClick={() => setIsNavOpen(!isNavOpen)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1"><path d="M9.41421 8L18.0208 16.6066L16.6066 18.0208L8 9.41421V17H6V6H17V8H9.41421Z" /></svg>
                Menu
            </button>
        </>
    }

    return (
        <>
            {navDisplay}
        </>
    )
}

export default Nav
