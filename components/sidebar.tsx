import React, { ReactNode } from "react";
import {
  House,
  Person,
  ForkKnife,
  ChatText,
  Timer,
  SignOut,
} from "phosphor-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, signOut, useSession } from "next-auth/react";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const Sidebar: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleLogout = async () => {

    try {
      await signOut({callbackUrl: "/auth/login"});
    } catch (error) {
      console.error(error);
    }
  };

  const menuItem: MenuItem[] = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <House size={30} />,
    },
    {
      path: "/admin/dashboard/menus",
      name: "Menus",
      icon: <ForkKnife size={30} />,
    },
    {
      path: "/admin/dashboard/working-hours",
      name: "Working Hours",
      icon: <Timer size={30} />,
    },
    {
      path: "/admin/dashboard/contact-us",
      name: "Contact Us",
      icon: <ChatText size={30} />,
    },

    {
      path: "/admin/dashboard/profile",
      name: "Profile",
      icon: <Person size={30} />,
    },
    {
      path: "",
      name: "LogOut",
      icon: <SignOut size={30} />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div
        className={`hidden md:flex sidebar  text-white flex-col items-center fixed top-0 left-0 h-full z-50 transition-all`}
      >
        <div className="top_section py-4"></div>
        {menuItem.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              onClick={item.onClick}
              className={`link py-4 relative ${
                router.pathname === item.path ? "active" : ""
              }`}
            >
              <div className="icon">{item.icon}</div>
              <span className="tooltip opacity-0">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main content */}
      <main className={`md:ml-16 flex-1 transition-all`}>{children}</main>
    </>
  );
};

export default Sidebar;
