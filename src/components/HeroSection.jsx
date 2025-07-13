import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className=" h-[600px] w-full mt-[120px] px-24 py-12  gap-5 font-serif">
      <div className="w-[55%] h-full rounded-2xl overflow-hidden relative">
        <img src="./hero-img.jpg" alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-1  bg-white justify-center z-50 absolute top-70 h-fit right-15 flex-col space-y-3.5 w-[800px] py-12 px-8 border-b-4 border-b-gray-700 shadow-sm">
        <h2 className="text-4xl font-bold text-left w-full ">
          Craft Resumes. Create Careers.
        </h2>
        <p className="text-xl text-justify text-gray-600">
          An AI-powered web app guiding students and professionals toward ideal
          career paths. Get personalized recommendations based on your skills,
          education, and goals. Explore tailored career options backed by
          machine learning and expert insights. Build smart, role-specific
          resumes that highlight what matters most.
        </p>
        <Link
            to="/dashboard"
            className="cursor-pointer font-semibold text-md w-fit px-8 py-4 border-2 border-white bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black duration-500 transition-all "
        >
            Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
