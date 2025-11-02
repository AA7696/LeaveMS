import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Hero() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <section className="w-full min-h-[40vh] flex flex-col items-center justify-center  bg-blue-200">
      {/* Headline */}
      <h1 className="mt-20 text-center text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
        Simplify Leave Management
      </h1>

      {/* Subtext */}
      <p className="mt-6 max-w-2xl text-center text-lg md:text-xl text-gray-600 mx-auto">
        Streamline your leave application process with our comprehensive management system. You can apply, track, and manage their leave requests while Admin can efficiently approve and monitor all applications.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center mb-2">
        <button
          onClick={() => {
            navigate(user ? '/leave' : '/login')
          }}
         className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow">
          {user ? 'Go to Dashboard' : 'Get Started'}
        </button>
      </div>
    </section>
  );
}
export default Hero;
