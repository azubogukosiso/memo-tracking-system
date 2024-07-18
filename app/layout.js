import AuthProvider from "@/app/(components)/AuthProvider";
import ToasterContext from "./(components)/ToasterContext";
import './globals.css';
import { DM_Sans } from 'next/font/google';
import { Suspense } from "react";

const dm_sans = DM_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Memo Tracker',
  description: 'A memo tracker',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${dm_sans.className} max-h-screen h-screen p-3`}>
          <ToasterContext />
          <Suspense>
            {children}
          </Suspense>
        </body>
      </AuthProvider>
    </html>
  )
}
