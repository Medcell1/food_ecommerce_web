import { signOut } from "next-auth/react";
import { ChatText, ForkKnife, List, SignOut, Timer, User } from "phosphor-react";
import React, { useState } from "react";

interface Props {
  text: string;
  widget?: any;
}

export const Nav: React.FC<Props> = ({ text, widget }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/auth/login" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white px-6 sm:px-10 md:px-20 py-6 sm:py-8 lg:py-10 flex justify-between ml-0 md:ml-12 lg:ml-10 shadow-lg">
      <div className="flex items-center text-lg md:text-xl lg:text-2xl">
        <List className="text-black ml-10 cursor-pointer" onClick={toggleDropdown} />
        <span className="text-black font-semibold ml-5">{text}</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8">
        {widget}
        <div className="relative">
          {isDropdownOpen && (
            <div className="z-10 absolute bg-white rounded-lg shadow top-full right-0 mt-2">
              <ul className="py-2 text-xs sm:text-sm md:text-base lg:text-lg text-gray-950 flex flex-col items-center">
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <a href="/admin/dashboard" className="flex items-center w-full text-black">
                    <List className="w-4 h-4 mr-2" />
                    Dashboard
                  </a>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <a href="/admin/dashboard/profile" className="flex items-center w-full text-black">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </a>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <a href="/admin/dashboard/menus" className="flex items-center w-full text-black">
                    <ForkKnife className="w-4 h-4 mr-2" />
                    Menus
                  </a>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <a href="/admin/dashboard/contact-us" className="flex items-center w-full text-black">
                    <ChatText className="w-4 h-4 mr-2" />
                    Contact Us
                  </a>
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <a href="/admin/dashboard/working-hours" className="flex items-center w-full text-black">
                    <Timer className="w-4 h-4 mr-2" />
                    Working Hours
                  </a>
                </li>
                <li onClick={handleLogout}  className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <a href="" className="flex items-center w-full text-black">
                    <SignOut className="w-4 h-4 mr-2" />
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
