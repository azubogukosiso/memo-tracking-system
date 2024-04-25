import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

const Nav = async () => {
    const session = await getServerSession(authOptions);
    let navDisplay;

    if (session?.user.role === "admin") {
        navDisplay = <>
            <div className='bg-black w-full h-px mb-4'></div>
            <div className='flex flex-row justify-between mx-auto bg-gray-300 py-5 px-1 rounded-md'>
                <span>
                    <Link href="/admin" className='rounded px-5 py-4 hover:bg-gray-400'>All Memos</Link>
                    <Link href="/admin/accounts" className='rounded px-5 py-4 hover:bg-gray-400'>All Accounts</Link>
                    <Link href="/admin/requests" className='rounded px-5 py-4 hover:bg-gray-400'>Memo Requests</Link>
                    <Link href="/admin/search" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Memo Search</Link>
                    <Link href="/admin/create" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Create Accounts</Link>
                    <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Log Out</Link>
                </span>
            </div>
        </>;
    } else if (session?.user.role === "attendant") {
        navDisplay = <>
            <div className='bg-black w-full h-px mb-4'></div>
            <div className='flex flex-row justify-between mx-auto bg-gray-300 py-5 px-1 rounded-md'>
                <span>
                    <Link href="/attendant" className='rounded px-5 py-4 hover:bg-gray-400'>All Memos</Link>
                    <Link href="/attendant/create" className='rounded px-5 py-4 hover:bg-gray-400'>Create Memos</Link>
                    <Link href="/attendant/search" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Memo Search</Link>
                    <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Log Out</Link>

                </span>
            </div>
        </>;
    } else if (session?.user.role === "staff") {
        navDisplay = <>
            <div className='bg-black w-full h-px mb-4'></div>
            <div className='flex flex-row justify-between mx-auto bg-gray-300 py-5 px-1 rounded-md'>
                <span>
                    <Link href="/staff" className='rounded px-5 py-4 hover:bg-gray-400'>All Memos</Link>
                    <Link href="/staff/request" className='rounded px-5 py-4 hover:bg-gray-400'>Request for Memos</Link>
                    <Link href="/staff/search" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Memo Search</Link>
                    <Link href="/staff/request-list" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Request List</Link>
                    <Link href="/api/auth/signout?callbackUrl=/" className='rounded px-5 py-4 hover:bg-gray-400 transition'>Log Out</Link>
                </span>
            </div>
        </>;
    }

    return (
        <nav className='flex flex-col px-5 py-3'>
            {navDisplay}
        </nav>
    )
}

export default Nav