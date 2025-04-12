'use client';

import Sidebar from "@/components/dashboard/Sidebar";
import Nav from "@/components/dashboard/Nav";
import PlusButton from "@/components/PlusButton"; // ✅ Import the new PlusButton component

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-syncbee h-screen w-full flex flex-row overflow-hidden">
      <Sidebar />
      <div className="d-main flex flex-col gap-10 px-10 py-9 overflow-auto w-full relative">
        <Nav />
        <div className="content-bg shadow-none h-full w-full rounded-3xl p-2">
          {children}
        </div>

        {/* ✅ Use the centralized dynamic PlusButton here */}
        <PlusButton />
      </div>
    </div>
  );
}
