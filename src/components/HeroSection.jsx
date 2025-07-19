import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const HeroSection = () => {

  const getStartedRef = useRef();

  useGSAP(()=>{
    gsap.from(getStartedRef.current,{
      y:-800,
      delay:1,
      duration:1
    })
  })

  const imageRef = useRef();

  useGSAP(()=>{
    gsap.from(imageRef.current,{
      opacity:0,
      duration:2
    })
  })


  return (
    <div className=" h-[600px] w-full mt-[120px] px-24 py-12  gap-5 font-serif overflow-x-hidden">
      <div  ref={imageRef} className="w-[55%] h-full rounded-2xl overflow-hidden relative">
        <img src="./hero-img.jpg" alt="" className="w-full h-full" />
      </div>
      <div ref={getStartedRef} className="flex flex-1  bg-white justify-center z-50 absolute top-62 h-fit right-10 flex-col space-y-3 w-[750px] py-12 px-8 border-b-4 border-b-gray-700 shadow-sm">
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
          className="cursor-pointer font-semibold text-md w-fit px-8 py-4  text-black rounded-3xl  duration-500 transition-all "
          style={{
            backgroundImage: "url('/mesh-gradient-1.png')", // Public folder path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
