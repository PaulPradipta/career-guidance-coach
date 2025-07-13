import React from 'react'
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import 'animate.css';

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4 animate__animated animate__fadeIn">
      {/* Signup Form */}
      <div className=" w-[420px] h-[450px] rounded-[15px] shadow-lg px-8 py-8 flex flex-col justify-center ">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Login in to Your Account
        </h2>
        <form className="flex flex-col gap-4">
          
          {/* Email Field */}
          <div className="relative bg-[#edecec] rounded-[15px]">
            <input
              type="email"
              placeholder="Email"
              required
              className="p-4 text-gray-600 w-full outline-none rounded-[15px]"
            />
            <i className="ri-mail-fill absolute top-4 right-5 text-gray-500"></i>
          </div>

          {/* Password Field */}
          <div className="relative bg-[#edecec] rounded-[15px]">
            <input
              type="password"
              placeholder="Password"
              required
              className="p-4 text-gray-600 w-full outline-none rounded-[15px]"
            />
            <i className="ri-eye-off-fill absolute top-4 right-5 text-gray-500"></i>
          </div>

          {/* Submit Button */}
          <button className="px-6 py-4 text-white font-semibold bg-[#6C63FF] rounded-[22px] hover:cursor-pointer transition">
            Login
          </button>
        </form>
        <Link
          to="/signup"
          className="text-gray-400 text-center font-medium mt-4"
        >
          Don't Have an Account ? 
          <span className="text-[#6C63FF] font-semibold"> Create Account</span>
        </Link>
      </div>
    </div>
  )
}

export default Signin