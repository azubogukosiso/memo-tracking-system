import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "admin") {
    redirect("/admin");
  } else if (session?.user.role === "attendant") {
    redirect("/attendant");
  } else if (session?.user.role === "staff") {
    redirect("/staff");
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Link href="attendant" className="underline underline-offset-4"><h4>Attendant Dashboard</h4></Link>
      <Link href="staff" className="underline underline-offset-4 mt-5"><h4>Staff Dashboard</h4></Link>
    </div>
  )
}
