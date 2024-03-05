import React, { useState, ReactNode } from "react";
import {
  ChatText,
  ForkKnife,
  House,
  List,
  Person,
  SignOut,
  Timer,
} from "phosphor-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import createAxiosInstance from "../axiosConfig";
import styles from "../styles/sidebar.module.css";
import { signOut } from "next-auth/react";

interface SidebarProps {
  children?: ReactNode;
}

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const router = useRouter();
  const axiosInstance = createAxiosInstance(router);
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
        // Sign out the user
        await signOut();
        // Redirect to the login page or any other page
        router.push('/login');
    } catch (error) {
      console.error(error);
      // Handle any errors or show a message to the user
    }
  };

  const toggle = () => setIsOpen(!isOpen);

  const menuItem: MenuItem[] = [
    {
      path: "/admin-dashboard",
      name: "Dashboard",
      icon: <House />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <Person />,
    },
    {
      path: "/menus",
      name: "Menus",
      icon: <ForkKnife />,
    },
    {
      path: "/contact-us",
      name: "Contact Us",
      icon: <ChatText />,
    },
    {
      path: "/working-hours",
      name: "Working Hours",
      icon: <Timer />,
    },
    {
      path: "",
      name: "LogOut",
      icon: <SignOut />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <List onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              onClick={item.onClick}
              className={`link ${
                router.pathname === item.path ? "active" : ""
              }`}
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;