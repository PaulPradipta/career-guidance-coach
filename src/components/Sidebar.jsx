import React, { useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const menus = [
    {
      label: "Home",
      icon: <i className="ri-home-2-line text-xl"></i>,
      path: "/"
    },
    {
      label: "Dashboard",
      icon: <i className="ri-dashboard-line text-xl"></i>,
      path: "/dashboard"
    },
    {
      label: "History",
      icon: <i className="ri-time-line text-xl"></i>,
      path: "/"
    },
    
  ];

  return (
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col h-full p-2 rounded-2xl">
      <nav
        className={`h-full flex flex-col  border-r shadow-sm transition-all duration-300 bg-[#1E1E1E] rounded-2xl ${
          isExpanded ? "w-[270px]" : "w-16"
        }`}
      >
        {/* Logo and Toggle Button */}
        <div className="p-4 pb-2 flex justify-between items-center">
          {isExpanded && <img src="./logo.png" alt="Logo" className="w-12 h-12" />}
          <button
            onClick={toggleSidebar}
            className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-transform ${
              !isExpanded ? "rotate-180" : ""
            }`}
          >
            <i className="ri-skip-left-line text-xl"></i>
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 px-3 space-y-1 text-gray-300">
          {menus.map((item, index) => (
            <li
              key={index}
              className="relative group flex items-center justify-start gap-3 p-2 font-medium rounded-md hover:bg-white hover:text-black cursor-pointer transition-colors"
            >
              <div className="flex justify-center items-center w-6 ">{item.icon}</div>
              <Link
                to={item.path}
                className={`whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? "opacity-100 ml-2" : "opacity-0 w-0 "
                }`}
              >
                {item.label}
              </Link>

              {/* Tooltip on hover */}
              {!isExpanded && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-5 px-3 py-1 rounded bg-indigo-100 text-indigo-800 text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="p-3">
          <button className="group relative flex items-center justify-start gap-3 w-full p-2 font-medium rounded-md text-gray-300 hover:bg-white hover:text-black transition-all">
            <i className="ri-logout-box-line text-lg flex items-center justify-center"></i>
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                isExpanded
                  ? "opacity-100 ml-2"
                  : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              Logout
            </span>
            {!isExpanded && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-5 px-3 py-1 rounded bg-indigo-100 text-indigo-800 text-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  Logout
                </div>
              )}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
