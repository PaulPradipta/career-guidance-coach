import React from "react";

const Footer = () => {
  return (
    <div className="max-w-100vw px-32 py-15  flex flex-col justify-center items-center bg-[#111827] font-serif ">
      <div className=" w-full gap-[15px]  flex justify-center ">
        <div className="w-[24%] h-full px-4 py-3 text-white space-y-4.5">
          <h2 className="font-bold text-2xl ">Career Path AI</h2>
          <p className="text-justify">
            Your trusted partner in navigating career paths and building
            impactful resumes with AI-powered insights.
          </p>
          <div className="flex items-center mt-3 gap-2.5">
            <button className="border-white rounded-full border-2 w-10 h-10 hover:border-[#6C63FF] duration-500 hover:text-[#6C63FF]">
              <i className="ri-facebook-fill flex justify-center items-center text-xl"></i>
            </button>
            <button className="border-white rounded-full border-2 w-10 h-10 hover:border-[#6C63FF] duration-500 hover:text-[#6C63FF]">
              <i className="ri-twitter-fill flex justify-center items-center text-xl"></i>
            </button>
            <button className="border-white rounded-full border-2 w-10 h-10 hover:border-[#6C63FF] duration-500 hover:text-[#6C63FF]">
              <i className="ri-github-fill flex justify-center items-center text-xl"></i>
            </button>
            <button className="border-white rounded-full border-2 w-10 h-10 hover:border-[#6C63FF] duration-500 hover:text-[#6C63FF]">
              <i className="ri-instagram-fill flex justify-center items-center text-xl"></i>
            </button>
          </div>
        </div>
        <div className="w-[24%] h-full px-4 py-3 text-white space-y-4.5">
          <h2 className="font-bold text-2xl ">Product</h2>
          <ul className="flex flex-col gap-y-4">
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              Features
            </li>
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              Testimonials
            </li>
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              Pricing
            </li>
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              How It Works
            </li>
          </ul>
        </div>

        <div className="w-[24%] h-full px-4 py-3 text-white space-y-4.5">
          <h2 className="font-bold text-2xl ">Company</h2>
          <ul className="flex flex-col gap-y-4">
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              About Us
            </li>
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              Careers
            </li>
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              Press
            </li>
            <li className="hover:translate-x-[8px] duration-500 transition-all">
              Contact
            </li>
          </ul>
        </div>

        <div className="w-[24%] h-full px-4 py-3 text-white space-y-4.5">
          <h2 className="font-bold text-2xl ">Subscribe Newsletter</h2>
          <p className="text-justify">
            Combined With a Handy Platform & Top Notch Customer Support from Our
            Support Team
          </p>
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-[75%] px-4 py-3 rounded-[20px] outline-none bg-white text-gray-600"
            />
            <h2
              className="px-4 py-3 rounded-[20px] outline-none  text-white absolute top-0 right-22"
              style={{
                background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
              }}
            >
              Subscribe
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
