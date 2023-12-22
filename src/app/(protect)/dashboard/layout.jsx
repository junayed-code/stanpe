"use client";

import Image from "next/image";
import Sidebar from "@/components/dashboard/sidebar";
import useAuth from "@/hooks/useAuth";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useCycle } from "framer-motion";
import avatar from "@/assets/images/avatar.jpg";

const DashboardLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const [sidebarOpen, toggleSidebar] = useCycle(true, false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center border-b min-h-[65px]">
          <div className="flex items-center p-4 justify-between w-full">
            <button
              className="text-gray-800 focus:outline-none"
              onClick={toggleSidebar}
            >
              {/* Sidebar toggle button */}
              <AiOutlineMenuUnfold className="text-2xl" />
            </button>
            {/* Navbar content */}

            {/* User Profile */}
            {currentUser && (
              <div
                className="relative cursor-pointer after:duration-200 after:absolute after:min-w-max after:opacity-0 after:select-none after:top-full after:right-0 hover:after:opacity-100 after:content-[attr(data-toltip)]"
                data-toltip={`Hi, ${currentUser?.displayName}`}
              >
                <Image
                  width={32}
                  height={32}
                  src={currentUser?.photoURL || avatar}
                  alt={`${currentUser?.displayName}'s profile image`}
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </header>

        {/* Main Content Section */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
