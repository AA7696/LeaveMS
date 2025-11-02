import React from "react";
import { FaClipboardList, FaCheckCircle, FaHistory, FaTachometerAlt } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaClipboardList className="w-11 h-11 text-blue-600 mx-auto mb-3" />,
      title: "Apply for Leave",
      desc: "Submit leave applications quickly and easily with our streamlined form.",
    },
    {
      icon: <FaCheckCircle className="w-11 h-11 text-blue-600 mx-auto mb-3" />,
      title: "Check Leave Status",
      desc: "Track your leave applications in real-time with our status checker.",
    },
    {
      icon: <FaHistory className="w-11 h-11 text-blue-600 mx-auto mb-3" />,
      title: "Leave History",
      desc: "Access your complete leave history and download reports.",
    },
    {
      icon: <FaTachometerAlt className="w-11 h-11 text-blue-600 mx-auto mb-3" />,
      title: "Admin Dashboard",
      desc: "Comprehensive dashboard for faculty to manage all leave requests.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Powerful Features</h2>
        <p className="mt-3 text-center text-lg text-gray-600">
          Everything you need to manage your leave applications efficiently
        </p>
        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* First row */}
          {features.map(({ icon, title, desc }) => (
            <div key={title}
              className="bg-white rounded-xl shadow-md p-8 text-center flex flex-col items-center justify-center border border-gray-100">
              {icon}
              <h3 className="font-bold text-xl text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-600 text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;