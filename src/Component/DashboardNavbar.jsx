import React, { use, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from 'react-icons/io5';


function DashboardNavbar({ toggleSidebar, isOpen }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
        toast.success("Logged Out Successfully!");
    };

    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
                {/* LEFT: Logo + Sidebar Toggle */}
                <div className="flex items-center gap-3">
                    {/* Sidebar Toggle (visible on mobile only) */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition lg:hidden"
                    >
                        {
                            isOpen ? (
                                <IoClose
                                    size={22}
                                    className="text-gray-700"
                                    aria-label="Toggle sidebar"
                                />
                            ) : (
                                <GiHamburgerMenu
                                    size={22}
                                    className="text-gray-700"
                                    aria-label="Toggle sidebar"
                                />
                            )

                        }

                    </button>

                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="bg-blue-600 p-2 rounded-lg mr-2">
                            {/* <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <rect
                                    x="4"
                                    y="2"
                                    width="16"
                                    height="20"
                                    rx="4"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                />
                                <rect x="8" y="6" width="8" height="2" fill="white" />
                                <rect x="8" y="10" width="8" height="2" fill="white" />
                                <rect x="8" y="14" width="5" height="2" fill="white" />
                            </svg> */}
                        </span>
                        <span className="font-bold text-blue-600 text-2xl md:text-3xl tracking-tight">
                            LeaveMS
                        </span>
                    </div>
                </div>

                {/* RIGHT: User Info + Logout */}
                <div className="flex items-center gap-3 md:gap-5">
                    <span className="hidden sm:inline text-gray-700 font-medium">
                        Welcome, <span className="font-semibold">{user?.name}</span>
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-black text-white font-semibold rounded-lg px-4 py-2 md:px-6 md:py-3 hover:bg-gray-800 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default DashboardNavbar;
