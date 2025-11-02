import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { MdEmail, MdLocationPin } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-[#101624] text-gray-300 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between">
        {/* Left Section */}
        <div className="mb-8 md:mb-0 flex-1">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 p-2 rounded-lg mr-2">
              {/* Logo SVG */}
              {/* <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <rect x="4" y="2" width="16" height="20" rx="4" stroke="white" strokeWidth="2" fill="none"/>
                <rect x="8" y="6" width="8" height="2" fill="white"/>
                <rect x="8" y="10" width="8" height="2" fill="white"/>
                <rect x="8" y="14" width="5" height="2" fill="white"/>
              </svg> */}
            </span>
            <span className="font-semibold text-lg text-white">LeaveMS</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="mr-2">
                <MdCall size={20} />
              </span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">
                <MdEmail size={20} />
              </span>
              <span>support@leavems.com</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">
                <MdLocationPin size={20} />
              </span>
              <span>ABC Company, XYZ City</span>
            </div>
          </div>
        </div>
        {/* Quick Links Section */}
        <div className="mb-8 md:mb-0 flex-1">
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Features</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Login</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>
        {/* Social Section */}
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 pt-1">
            <a href="#" className="hover:text-blue-400" aria-label="Facebook"><FaFacebookF size={22} /></a>
            <a href="#" className="hover:text-blue-400" aria-label="Twitter"><FaTwitter size={22} /></a>
            <a href="#" className="hover:text-blue-400" aria-label="LinkedIn"><FaLinkedinIn size={22} /></a>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-800 my-6 mx-auto max-w-6xl" />
      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm">
        © 2025 LeaveMS. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;