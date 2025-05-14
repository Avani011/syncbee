'use client'

import Image from "next/image"
import Link from "next/link"
import LogoutModal from "../LogoutModal"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/services/user"
import { useState } from "react"

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className='flex flex-col justify-between items-center gap-20 w-40 py-8'>
 
      <div className="w-[100%] relative group flex justify-center">
        <Link href="/dashboard/profile">
          <Image
            src="/profile.svg"
            alt="profile-icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </Link>

        <span className="absolute left-24 top-[90%] -translate-y-1/2 bg-purple-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Profile
        </span>
      </div>

      <div className="w-[100%] relative group flex justify-center">
        <Link href="/dashboard/task">
          <Image
            src="/task.svg"
            alt="task-icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </Link>

        <span className="absolute left-24 top-[90%] -translate-y-1/2 bg-purple-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Task
        </span>
      </div>

      <div className="w-[100%] relative group flex justify-center">
        <Link href="/dashboard/calendar">
          <Image
            src="/calendar.svg"
            alt="calendar-icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </Link>

        <span className="absolute left-24 top-[90%] -translate-y-1/2 bg-purple-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Calendar
        </span>
      </div>

      <div className="w-[100%] relative group flex justify-center">
        <Link href="/dashboard/notes">
          <Image
            src="/notes.svg"
            alt="notes-icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </Link>

        <span className="absolute left-24 top-[90%] -translate-y-1/2 bg-purple-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Notes
        </span>
      </div>

      <div className="w-[100%] relative group flex justify-center">
        <Link href="/dashboard/focus">
          <Image
            src="/focus.svg"
            alt="focus-icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </Link>

        <span className="absolute left-24 top-[90%] -translate-y-1/2 bg-purple-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Focus
        </span>
      </div>

      <div onClick={() => setShowLogout(true)} className="w-[100%] relative group flex justify-center">
          <Image
            src="/logout.svg"
            alt="logout-icon"
            height={40}
            width={40}
            className="cursor-pointer"
          />

        <span className="absolute left-24 top-[90%] -translate-y-1/2 bg-purple-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Logout
        </span>
      </div>

      {showLogout && (
          <LogoutModal
            onConfirm={handleLogout}
            onCancel={() => setShowLogout(false)}
          />
      )}
    </div>
  )
}

export default Sidebar
