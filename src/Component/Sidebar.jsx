import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {LuNotebook} from 'react-icons/lu';
import{MdDashboard} from 'react-icons/md';
import{AiOutlineHistory} from 'react-icons/ai';

function Sidebar({isOpen}) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/leave', icon: <MdDashboard size={24}  /> },
    { name: 'Apply Leave', path: '/leave/apply', icon: <LuNotebook size={24}  /> },
    { name: 'Leave History', path: '/leave/history', icon: <AiOutlineHistory size={24}  /> },
  ];

  return (
    <aside className={`
      transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0 w-60" : "-translate-x-full w-60"}
     bg-white shadow-md  flex-col items-center p-6 fixed h-full lg:w-60 z-40`}>

      {/* Navigation */}
      <nav className="space-y-2 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 text-lg font-normal ${
                isActive
                  ? 'bg-blue-400 text-white shadow'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
