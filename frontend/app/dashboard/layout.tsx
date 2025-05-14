'use client';

import Sidebar from "@/components/dashboard/Sidebar";
import Nav from "@/components/dashboard/Nav";
import PlusButton from "@/components/PlusButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-syncbee h-screen w-full flex flex-row overflow-hidden">
  <Sidebar />

  <div className="d-main flex flex-col flex-1 min-w-0 h-full p-8 relative gap-8 overflow-hidden">
    <Nav />

    <div className="flex-grow overflow-y-auto">
      <div className="content-bg shadow-none h-full w-full rounded-3xl p-4">
        {children}
      </div>
    </div>

    <PlusButton />
  </div>
</div>
  );
}
