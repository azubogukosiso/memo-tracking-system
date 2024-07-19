import AuthProvider from "@/app/(components)/AuthProvider";
import ToasterContext from "./(components)/ToasterContext";
import './globals.css';
import { Questrial } from 'next/font/google';
import { Suspense } from "react";
import Link from "next/link";

const dm_sans = Questrial({ subsets: ['latin'], display: "swap", weight: '400' });

export const metadata = {
  title: 'Memo Tracker',
  description: 'A memo tracker',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${dm_sans.className} max-h-screen h-screen p-3 min-h-screen flex flex-col`}>
          <ToasterContext />
          <Suspense>
            {children}
          </Suspense>

          <div className='mt-auto flex justify-end items-center pb-1'>
            {/* <Link href='/guide' className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">User Guide</Link> */}
            <span className="mx-3"></span>
            <Link href='mailto:azuboguko@gmail.com' target="_blank" className="py-1 hover:bg-gray-200 border-black border-b-2 border-dashed cursor-pointer transition-all">Drop Feedback</Link>
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
