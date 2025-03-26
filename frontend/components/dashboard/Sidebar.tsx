import Image from "next/image"
import Link from "next/link"

const Sidebar = () => {
  return (
    <div className='flex flex-col justify-between items-center w-44 py-8'>
 
      <div className="w-[100%] flex justify-center">
        <Link href="/dashboard/profile">
          <Image
            src="/profile.svg"
            alt="profile-icon"
            height={40}
            width={40}
          />
        </Link>
      </div>

      <div className="w-[100%] flex justify-center">
        <Link href="/dashboard/task">
          <Image
            src="/task.svg"
            alt="task-icon"
            height={40}
            width={40}
          />
        </Link>
      </div>

      <div className="w-[100%] flex justify-center">
        <Link href="/dashboard/calendar">
          <Image
            src="/calendar.svg"
            alt="calendar-icon"
            height={40}
            width={40}
          />
        </Link>
      </div>

      <div className="w-[100%] flex justify-center">
        <Link href="/dashboard/notes">
          <Image
            src="/notes.svg"
            alt="notes-icon"
            height={40}
            width={40}
          />
        </Link>
      </div>

      <div className="w-[100%] flex justify-center">
        <Link href="/dashboard/focus">
          <Image
            src="/focus.svg"
            alt="focus-icon"
            height={40}
            width={40}
          />
        </Link>
      </div>

      <div className="w-[100%] flex justify-center">
        <Link href="/">
          <Image
            src="/logout.svg"
            alt="logout-icon"
            height={40}
            width={40}
          />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
