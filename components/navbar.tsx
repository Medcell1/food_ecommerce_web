import { Bell, ChatText, ForkKnife, List, SignOut, Timer, User } from "phosphor-react";
import React, { useState } from "react";
import CircleAvatar from "./circleavatar";

interface Props {
  image: string;
  userName: string;
}

export const TopNavbar: React.FC<Props> = ({ image, userName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white px-6 sm:px-10 md:px-20 py-6 sm:py-8 lg:py-10 flex justify-between ml-1 md:ml-12 lg:ml-20 shadow-lg">
      <div className="flex items-center text-lg md:text-xl lg:text-2xl">
        <List className="text-black me-4 cursor-pointer" onClick={toggleDropdown} />
        <span className="text-black font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8">
        <div className="text-black">
          <Bell size={24} />
        </div>
        <CircleAvatar src={image} alt="userImage" />
        <div className="flex flex-col">
          <h2 className="text-[#DD2F6E] text-sm sm:text-base md:text-lg lg:text-xl">Welcome back,</h2>
          <h3 className="text-black absolute top-16 text-xs sm:text-sm md:text-base lg:text-lg">{userName}</h3>
        </div>
        <div className="relative">
          {isDropdownOpen && (
            <div className="z-10 absolute bg-white rounded-lg shadow top-full right-0 mt-2">
              <ul className="py-2 text-xs sm:text-sm md:text-base lg:text-lg text-gray-950 flex flex-col items-center">
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <List className="w-4 h-4 mr-2" />
                  Dashboard
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <ForkKnife className="w-4 h-4 mr-2" />
                  Menus
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <ChatText className="w-4 h-4 mr-2" />
                  Contact Us
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <Timer className="w-4 h-4 mr-2" />
                  Working Hours
                </li>
                <li className="flex items-center px-4 py-2 hover:bg-gray-200 w-full transition duration-300">
                  <SignOut className="w-4 h-4 mr-2" />
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};