import React, { useState, useContext, useEffect } from 'react';
import DashboardNavbar from '../../Component/DashboardNavbar.jsx';
import Sidebar from '../../Component/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { LeaveContext } from "../../context/LeaveContext";


function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {fetchLeaves} = useContext(LeaveContext)

  useContext(() =>{
    fetchLeaves()
  },[fetchLeaves])

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      {/* Pass toggle state and handler */}
      <DashboardNavbar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <div className="flex flex-1 ">
     <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 p-4 sm:p-10 overflow-auto bg-gray-50 lg:ml-60">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
