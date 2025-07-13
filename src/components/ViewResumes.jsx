import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FileText, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'

const ViewResumes = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="w-full min-h-screen flex font-serif bg-white p-4">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 px-2 pb-4 pt-1 h-full  ${
          isSidebarExpanded ? 'ml-[270px]' : 'ml-[150px]'
        } w-full`}
      >
        <h2 className="text-xl font-medium text-black text-left px-6">
          All Your Resumes
        </h2>

        <div className="flex items-center justify-start gap-x-[25px] gap-y-[20px] mt-2 px-6 flex-wrap">
          {/* Resume Cards */}
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
        <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-yellow-700 text-xs bg-yellow-200 font-semibold p-2 rounded-[30px]'>Under Review</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>
          <div className="w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md">
            
            <h2 className="text-xl text-black font-semibold">Frontend Developer</h2>
            <p className="text-slate-600 text-left text-xs">
              Tailored for a Senior Software Engineer role at TechCorp, highlighting full-stack expertise.
            </p>
            <div className='flex items-center justify-between w-full'>
                <span className='text-slate-600 text-[15px]'>Status :</span>
                <span className='text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]'>Finalized</span>
            </div>
            <div className='flex items-center justify-start w-full gap-3'>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                </Link>
                <Link className='flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                </Link>
                <Link className='flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]'>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewResumes;
