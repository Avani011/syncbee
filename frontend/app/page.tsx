import Sidebar from "@/components/dashboard/Sidebar";
import Nav from "@/components/dashboard/Nav";
import Image from "next/image";
import Note from "./dashboard/notes/page";
// import DateScroller from "@/components/task/DateScroller";
// import Task from "@/components/task/Task"
// import CalendarView from "@/components/calendar/CalendarView";


export default function Home() {
  return (
    <div className="bg-syncbee h-screen w-full flex flex-row overflow-none">
      <Sidebar />
      <div className="d-main flex flex-col gap-10 px-10 py-9 overflow-auto">
          <Nav />

          <div className="content-bg shadow-none h-full rounded-3xl p-2">
            {/* <DateScroller />

            <Task /> */}

            {/* <CalendarView /> */}

            <Note />

            <button className="absolute bottom-6 right-6 h-14 w-14 plus-btn bg-opacity-70 rounded-full flex justify-center">
              <Image 
                src='/add.svg'
                alt="Add Button"
                height={22}
                width={22}
              />
            </button>
          </div>
      </div>
    </div>
  );
}
