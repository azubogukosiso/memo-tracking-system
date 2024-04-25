import AuthProvider from "@/app/(components)/AuthProvider";
import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';
import Link from 'next/link'

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] })

export const metadata = {
  title: 'Memo TS',
  description: 'A memo tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={bricolage_grotesque.className}>
          <div className='flex flex-col h-screen max-h-screen'>
            <h1 className='mx-4 p-0'><Link href='/'>memo tracker</Link></h1>
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
