import {
  ChartNoAxesColumnIncreasing,
  FileText,
  GraduationCap,
} from "lucide-react";
import React, { useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Features = () => {

  const featuresRef = useRef();



  return (
    <div className="mt-20 p-32">
      <h2 className="text-3xl font-bold text-center w-full font-serif mb-[20px] ">
        How We Help You Succeed
      </h2>
      <p className="text-gray-600 text-xl font-serif text-center w-full m-4">Our platform leverages cutting-edge technology to provide you with the best tools for career advancement.</p>
      <div ref={featuresRef} className="border-b-2 border-l-2 border-white w-full gap-[45px] p-[32px] flex justify-center items-center">
        <div className="bg-white text-center rounded-xl shadow flex flex-col items-center w-[450px] h-fit gap-4 duration-500 relative overflow-hidden transform transition hover:scale-105 hover:rotate-[1deg] hover:shadow-3xl">
          {/* Image Section */}
          <div className="w-full h-[200px] overflow-hidden rounded-t-xl">
            <img
              src="./personalized-career-guidance.avif"
              alt="Career guidance"
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>

          {/* Icon & Text Section */}
          <div className="flex flex-col gap-4 p-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <GraduationCap className="w-20 h-20 rounded-full p-4 bg-white hover:text-[#6C63FF] border-2 border-[#eee] shadow-md transition duration-300 hover:scale-110" />
            </div>

            <h2 className="text-black font-bold text-xl font-serif mt-12">
              Personalized Career Paths
            </h2>
            <p className="text-justify text-gray-400 text-base font-medium">
              Identify suitable career paths based on your academic background,
              skills, and goals.
            </p>
          </div>
        </div>

        <div className="bg-white text-center rounded-xl shadow flex flex-col items-center w-[450px] h-fit gap-4 duration-500 relative overflow-hidden transform transition hover:scale-105 hover:rotate-[1deg] hover:shadow-3xl">
          {/* Image Section */}
          <div className="w-full h-[200px] overflow-hidden rounded-t-xl">
            <img
              src="./resume-making.avif"
              alt="Career guidance"
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>

          {/* Icon & Text Section */}
          <div className="flex flex-col gap-4 p-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <FileText  className="w-20 h-20 rounded-full p-4 bg-white hover:text-[#6C63FF] border-2 border-[#eee] shadow-md transition duration-300 hover:scale-110" />
            </div>

            <h2 className="text-black font-bold text-xl font-serif mt-12">
               Smart Resume Builder
            </h2>
            <p className="text-justify text-gray-400 text-base font-medium">
              Identify suitable career paths based on your academic background,
            skills, and goals.
            </p>
          </div>
        </div>

        <div className="bg-white text-center rounded-xl shadow flex flex-col items-center w-[450px] h-fit gap-4 duration-500 relative overflow-hidden transform transition hover:scale-105 hover:rotate-[1deg] hover:shadow-3xl">
          {/* Image Section */}
          <div className="w-full h-[200px] overflow-hidden rounded-t-xl">
            <img
              src="./skills-gap.avif"
              alt="Career guidance"
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>

          {/* Icon & Text Section */}
          <div className="flex flex-col gap-4 p-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <ChartNoAxesColumnIncreasing className="w-20 h-20 rounded-full p-4 bg-white hover:text-[#6C63FF] border-2 border-[#eee] shadow-md transition duration-300 hover:scale-110" />
            </div>

            <h2 className="text-black font-bold text-xl font-serif mt-12">
              Skills Gap Analysis
            </h2>
            <p className="text-justify text-gray-400 text-base font-medium">
              Identify suitable career paths based on your academic background,
              skills, and goals.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Features;
