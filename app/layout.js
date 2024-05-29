import AuthProvider from "@/app/(components)/AuthProvider";
import ToasterContext from "./(components)/ToasterContext";
import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] })

export const metadata = {
  title: 'Memo Tracker',
  description: 'A memo tracker',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${bricolage_grotesque.className} max-h-screen h-screen p-3`}>
          <ToasterContext />
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
