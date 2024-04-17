"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiUserSmileLine } from "react-icons/ri";
import { FaChessBoard } from "react-icons/fa";
import { GiArrowDunk } from "react-icons/gi";
import { GiAbstract069 } from "react-icons/gi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import "./../app/globals.css";

const sidebarItems = [
  {
    name: "AVATAR",
    href: "/",
    icon: RiUserSmileLine,
  },
  {
    name: "TABULEIRO",
    href: "/board",
    icon: FaChessBoard,
  },
  {
    name: "FINALIZAÇÃO",
    href: "/mails",
    icon: GiArrowDunk,
  },
  {
    name: "fichas",
    href: "/contact",
    icon: GiAbstract069,
  },
];

export default function Sidebar() {

  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false);

  const toggleSidebarCollapseHandler = () =>{
      setIsCollapsedSidebar((prev) => !prev);
  }

  return (
    <div className="sidebar-wrapper">
      <button className="btn" onClick={toggleSidebarCollapseHandler}><MdOutlineKeyboardArrowLeft/></button>
      <aside className="sidebar" data-collapse={isCollapsedSidebar}>
        <div className="sidebar-top">
          <Image
            src="/logo.png"
            alt="Vercel Logo"
            className="dark:invert"
            width={60}
            height={60}
            priority
          />
          <p className="sidebar-logo-name">Connect4Master</p>
        </div>
        <ul className="sidebar-list">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li className="sidebar-item" key={name}>
              <Link href={href} className="sidebar-link">
                <span className="sidebar-icon">
                  <Icon/>
                </span>
                <span className="sidebar-name">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

