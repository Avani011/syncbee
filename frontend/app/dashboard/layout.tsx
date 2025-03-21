import Sidebar from "@/components/dashboard/Sidebar";
import Nav from "@/components/dashboard/Nav";
import { ReactNode } from "react";

// Define the props interface with proper typing
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-syncbee h-screen w-full flex overflow-hidden">
      <Sidebar />
      <div className="d-main flex flex-col gap-10 px-10 py-9 overflow-auto">
        <Nav />
        <div className="content-bg shadow-none h-full rounded-3xl p-4 relative">
          {children}
          
          {/* Plus button */}
          <button className="absolute bottom-6 right-6 h-14 w-14 bg-white bg-opacity-70 rounded-full flex items-center justify-center text-2xl text-purple-800 shadow-md">
            +
          </button>
        </div>
      </div>
    </div>
  );
}