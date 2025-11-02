import React, { useState } from "react";
import {GiHamburgerMenu} from 'react-icons/gi';
import {IoClose} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);


  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="bg-blue-600 p-2 rounded-lg mr-2">
              {/* Logo SVG */}
              {/* <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <rect x="4" y="2" width="16" height="20" rx="4" stroke="white" strokeWidth="2" fill="none"/>
                <rect x="8" y="6" width="8" height="2" fill="white"/>
                <rect x="8" y="10" width="8" height="2" fill="white"/>
                <rect x="8" y="14" width="5" height="2" fill="white"/>
              </svg> */}
            </span>
            <span className="font-bold text-blue-600 text-lg tracking-tight">LeaveMS</span>
          </div>
          {/*  Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
            <a href="#footer" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          </div>
          {/* Right: Login Button */}
          <div className="hidden md:block">
            <button 
            onClick={() =>{
              navigate(user ? '/leave' : '/login')
            }}
            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition font-medium">
              {user ? 'Dashboard' : 'Login'}
            </button>
          </div>
          {/* Hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Toggle Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className=" focus:outline-none"
            >
              {/* Hamburger/close icon */}
              {menuOpen ? (
                // Close icon
                <IoClose size={24} color="black" />
              ) : (
                // Hamburger icon
                <GiHamburgerMenu size={24} color="black" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="pt-4 pb-3 space-y-2 flex flex-col items-center">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium w-full text-center">Home</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium w-full text-center">Features</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium w-full text-center">Contact</a>
              <button
              onClick={() =>{
                navigate(user ? '/leave' : '/login')
              }}
               className="w-32 mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                {user ? 'Dashboard' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;