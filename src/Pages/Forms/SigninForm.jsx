import React, { useState } from "react";
import { BsPersonFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { RiLockPasswordFill, RiAdminLine } from 'react-icons/ri';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const { register, loading, error } = useContext(AuthContext);


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register({ name, email, password });
        if (success) {
            // Redirect or show success message
            console.log("Registration successful");
            toast.success('Registration Successful! Please Log In.');
            navigate("/login");
            setEmail("");
            setPassword("");
            setName("");
        } else {
            // Handle registration failure
            toast.error('Registration Failed. Please try again.');
            console.log("Registration failed");
        }
    }



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
            <div className="flex items-center">
                <span className="bg-blue-600 p-2 rounded-lg mr-2">
                    {/* Logo SVG */}
                    {/* <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                        <rect x="4" y="2" width="16" height="20" rx="4" stroke="white" strokeWidth="2" fill="none" />
                        <rect x="8" y="6" width="8" height="2" fill="white" />
                        <rect x="8" y="10" width="8" height="2" fill="white" />
                        <rect x="8" y="14" width="5" height="2" fill="white" />
                    </svg> */}
                </span>
                <span className="font-bold text-blue-600 text-3xl tracking-tight">LeaveMS</span>
            </div>
            <div>
                <button>
                    <NavLink to="/" className="text-black mt-4">Back to Home</NavLink>
                </button>
            </div>


            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mt-8">
                {/* Title and subtitle */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Sign up to access your dashboard
                </p>
                {/* Name Field */}
                <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">
                    Name
                </label>
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-400">
                        {/* Name Icon */}
                        <BsPersonFill size={20} />
                    </span>
                    <input
                        id="name"
                        type="text"
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
                        placeholder="ABCD"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoComplete="name"
                        required
                    />
                </div>

                {/* Email Field */}
                <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
                    Email Address
                </label>
                <div className="relative mb-4">
                    <span className="absolute left-3 top-3 text-gray-400">
                        {/* Email Icon */}
                        <HiMail size={20} />
                    </span>
                    <input
                        id="email"
                        type="email"
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black "
                        placeholder="abc@company.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>
                {/* Password Field */}
                <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
                    Password
                </label>
                <div className="relative mb-6">
                    <span className="absolute left-3 top-3 text-gray-400">
                        {/* Lock Icon */}
                        <RiLockPasswordFill size={20} />
                    </span>
                    <input
                        id="password"
                        type="password"
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>
                {/* Sign In Button */}
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition mb-4"
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="text-xs text-gray-400 text-center mt-2">
                    Already Have An Account ? {" "}
                    <NavLink to="/login" className=" text-blue-500">Log In</NavLink>
                </p>


            </div>
        </div>
    );
}
export default SigninForm;
