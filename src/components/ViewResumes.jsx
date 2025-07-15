import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import toast, { Toaster } from 'react-hot-toast';

const ViewResumes = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notify = () => toast.success('Resume Created Successfully');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/resumes/all-resumes');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch resumes');
        }
        const data = await response.json();
        setResumes(data);
      } catch (err) {
        console.error('Failed to fetch resumes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleDeleteResume = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/resumes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete resume');
      }
      // Remove the deleted resume from state
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch (err) {
      console.error(`Failed to delete resume with ID ${id}:`, err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        Loading resumes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
        Error: {error}. Please ensure your backend is running.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex font-serif bg-white p-4"
     style={{
        backgroundImage: "url('/mesh-gradient-1.png')", // Public folder path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 px-2 pb-4 pt-1 h-full ${isSidebarExpanded ? 'ml-[270px]' : 'ml-[150px]'} w-full`}>
        <h2 className="text-xl font-medium text-black text-left px-6 mb-6">
          All Your Resumes
        </h2>

        <div className="flex items-center justify-start gap-x-[25px] gap-y-[20px] mt-2 px-6 flex-wrap">
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <div key={resume.id} className="bg-white w-[340px] h-[200px] shadow-md flex flex-col items-start justify-center px-4 py-2 space-y-4 border-2 border-slate-200 rounded-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl text-black font-semibold">{resume.role}</h2>
                <p className="text-slate-600 text-left text-xs">
                  Resume of {resume.name} — For {resume.role}.
                </p>
                <div className="flex items-center justify-between w-full">
                  <span className="text-slate-600 text-[15px]">Status :</span>
                  <span className="text-green-700 text-xs bg-green-200 font-semibold p-2 rounded-[30px]">
                    Finalized
                  </span>
                </div>
                <div className="flex items-center justify-start w-full gap-3">
                  {/* View Resume with dynamic ID */}
                  <Link to={`/resume/preview/${resume.id}`} onClick={notify} className="flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px] text-gray-700">
                    <i className="ri-eye-line"></i>
                    <span>View</span>
                  </Link>

                  {/* Edit Resume with dynamic ID */}
                  <Link to={`/resume/edit/${resume.id}`} className="flex justify-center items-center hover:bg-gray-200 duration-300 transition-all border-gray-300 border-1 px-3 py-1 gap-x-2.5 rounded-[10px] text-gray-700">
                    <i className="ri-edit-box-line"></i>
                    <span>Edit</span>
                  </Link>

                  {/* Delete Button (add actual delete logic) */}
                  <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white duration-300 transition-all border-red-500 border-1 px-3 py-1 gap-x-2.5 rounded-[10px]" onClick={() => handleDeleteResume(resume.id)}>
                    <i className="ri-delete-bin-line"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No resumes found. Please create one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResumes;
