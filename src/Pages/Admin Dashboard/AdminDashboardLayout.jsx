import React, { useState, useContext, useEffect, use } from 'react';
import DashboardNavbar from '../../Component/DashboardNavbar.jsx';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../Component/AdminSidebar.jsx';
import { LeaveContext } from "../../context/LeaveContext";

function AdminDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {fetchAllLeaves} = useContext(LeaveContext)


    useEffect(() => {
      fetchAllLeaves();
    }, [fetchAllLeaves]);
  

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      {/* Pass toggle state and handler */}
      <DashboardNavbar toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <div className="flex flex-1 ">
             <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 p-4 sm:p-10 overflow-auto bg-gray-50 lg:ml-60">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
