'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";

const HeaderComponent = () => {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-3">
            <h1><Link href='/'>Memo Tracker</Link></h1>

            {
                session ?
                    <p><span className='font-bold'>User ({session.user.role}):</span> {session.user.email} {session.user.role !== 'admin' && `- ${session.user.office}`}
                    </p>
                    :
                    (
                        session ?
                            <span className="flex animate-pulse">
                                <div className="bg-gray-300 w-10 h-3 rounded-full mr-2"></div>
                                <div className="bg-gray-300 w-32 h-3 rounded-full"></div>
                            </span>
                            :
                            <></>
                    )
            }
        </div>
    )
}

export default HeaderComponent