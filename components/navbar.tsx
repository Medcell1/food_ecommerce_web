// CustomNavbar.tsx
import { useSidebarContext } from '@/context/sidebarcontext';
import React from 'react';

const CustomNavbar: React.FC = () => {
  const { isOpen } = useSidebarContext();

  return (
    <nav className={`flex justify-between items-center p-4 bg-gray-800 text-white ${isOpen ? 'w-82vw' : 'w-93.5vw'}`}>
      <div className="flex items-center">
        <input type="text" placeholder="Search" className="p-2 mr-2 "/>
        <button className="p-2 px-4 bg-blue-500 text-white border-none cursor-pointer hover:bg-blue-700">Search</button>
      </div>
    </nav>
  );
};

export default CustomNavbar;
