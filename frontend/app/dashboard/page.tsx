"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Nav from "@/components/dashboard/Nav";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Import pages
import CalendarView from "./calendar/page";
import NotesPage from "./notes/page";
import FocusPage from "./focus/page";
import ProfilePage from "./profile/page";
import SettingsPage from "./settings/page";

export default function Dashboard() {
  const pathname = usePathname(); // Get current route

  // Function to load the correct page based on the route
  const renderContent = () => {
    switch (pathname) {
      case "/dashboard/calendar":
        return <CalendarView />;
      case "/dashboard/notes":
        return <NotesPage />;
      case "/dashboard/focus":
        return <FocusPage />;
      case "/dashboard/profile":
        return <ProfilePage />;
      case "/dashboard/settings":
        return <SettingsPage />;
      default:
        return <h2 className="text-center text-xl">Select an option from the sidebar</h2>;
    }
  };

  return (
    <div className="bg-syncbee h-screen w-full flex flex-row overflow-hidden">
      <Sidebar />
      <div className="d-main flex flex-col gap-10 px-10 py-9 overflow-auto w-full">
        <Nav />
        <div className="content-bg shadow-none h-full w-full rounded-3xl p-2">
          {renderContent()}
        </div>
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
  );
}
