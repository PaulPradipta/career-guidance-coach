// import React from 'react'
// import { Link } from "react-router-dom";
// import "remixicon/fonts/remixicon.css";
// import 'animate.css';

// const Signin = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100 px-4 animate__animated animate__fadeIn">
//       {/* Signup Form */}
//       <div className=" w-[420px] h-[450px] rounded-[15px] shadow-lg px-8 py-8 flex flex-col justify-center ">
//         <h2 className="text-3xl font-bold mb-6 text-center text-black">
//           Login in to Your Account
//         </h2>
//         <form className="flex flex-col gap-4">
          
//           {/* Email Field */}
//           <div className="relative bg-[#edecec] rounded-[15px]">
//             <input
//               type="email"
//               placeholder="Email"
//               required
//               className="p-4 text-gray-600 w-full outline-none rounded-[15px]"
//             />
//             <i className="ri-mail-fill absolute top-4 right-5 text-gray-500"></i>
//           </div>

//           {/* Password Field */}
//           <div className="relative bg-[#edecec] rounded-[15px]">
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               className="p-4 text-gray-600 w-full outline-none rounded-[15px]"
//             />
//             <i className="ri-eye-off-fill absolute top-4 right-5 text-gray-500"></i>
//           </div>

//           {/* Submit Button */}
//           <button className="px-6 py-4 text-white font-semibold bg-[#6C63FF] rounded-[22px] hover:cursor-pointer transition">
//             Login
//           </button>
//         </form>
//         <Link
//           to="/signup"
//           className="text-gray-400 text-center font-medium mt-4"
//         >
//           Don't Have an Account ? 
//           <span className="text-[#6C63FF] font-semibold"> Create Account</span>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Signin

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "remixicon/fonts/remixicon.css";
import 'animate.css';

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // navigate("/dashboard"); 
      navigate("/");

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4 animate__animated animate__fadeIn">
      <div className="w-[420px] h-[450px] rounded-[15px] shadow-lg px-8 py-8 flex flex-col justify-center bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Login to Your Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative bg-[#edecec] rounded-[15px]">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-4 text-gray-600 w-full outline-none rounded-[15px]"
            />
            <i className="ri-mail-fill absolute top-4 right-5 text-gray-500"></i>
          </div>

          <div className="relative bg-[#edecec] rounded-[15px]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="p-4 text-gray-600 w-full outline-none rounded-[15px]"
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={`ri-${showPassword ? "eye-fill" : "eye-off-fill"} absolute top-4 right-5 text-gray-500 cursor-pointer`}
            >
            </i>
          </div>


          <button type="submit" className="px-6 py-4 text-white font-semibold bg-[#6C63FF] rounded-[22px] hover:cursor-pointer transition">
            Login
          </button>
        </form>

        {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}

        <Link to="/signup" className="text-gray-400 text-center font-medium mt-4">
          Don't Have an Account? <span className="text-[#6C63FF] font-semibold">Create Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
