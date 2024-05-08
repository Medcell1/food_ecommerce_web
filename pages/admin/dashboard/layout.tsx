// components/Layout.js
import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

const Layout: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
