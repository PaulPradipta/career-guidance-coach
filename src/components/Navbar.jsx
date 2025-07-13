import React from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import "./Navbar.css"
import 'animate.css';

const Navbar = () => {
  

  return (
    <div className='fixed z-9999 left-20 w-[90%] h-[80px] mx-auto mt-4 rounded-[32px] bg-white px-6 flex items-center justify-between shadow-[0_4px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] perspective-1000 font-serif'>
      
      {/* Logo */}
      <div className='flex items-center gap-x-3'>
        <img
          src="./logo.png"
          alt="logo"
          className='w-12 h-12 drop-shadow-md'
        />
        <h2 className='text-xl font-semibold text-black'>Career Path AI</h2>
      </div>

      

      {/* Sign In */}
      <div className='flex items-center gap-3'>
        <Link
          className='py-2.5 px-6 text-white rounded-[32px] shadow-[inset_0_0_5px_rgba(255,255,255,0.2)] transition-all duration-300 hover:brightness-110'
          style={{
            background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)"
          }}
          to="/signin"
        >
          Sign In
        </Link>
       
      </div>
    </div>
  )
}

export default Navbar
