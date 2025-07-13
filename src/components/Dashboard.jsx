import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FileText, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    // Make the main container fill the viewport height
    <div className="w-full flex font-serif  min-h-screen p-8"
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
      <div
        className={`w-fit bg-white transition-all duration-300 p-2 py-8 rounded-2xl h-full mt-25 ${ // Removed mt-25, not needed for vertical centering
          isSidebarExpanded ? 'ml-[350px]' : 'ml-[180px]'
        }  flex flex-col justify-center items-start`} // Added flex-col, justify-center, items-start
      >
        <p className="text-md font-medium text-gray-600 text-left mb-6 ml-4"> {/* Added mb-6 and ml-4 for spacing */}
          Start building your future. Choose an action below to begin your journey.
        </p>

        <div className="flex items-center justify-start gap-6 w-full px-4"> {/* Added w-full and px-4 for responsiveness */}
          {/* Resume Card */}
          <div className="flex-1 max-w-[450px] min-h-[300px] shadow-md flex flex-col items-center justify-center p-6 space-y-4 border-2 border-slate-200 rounded-md bg-white"> {/* Added flex-1, max-w, min-h, and bg-white */}
            <FileText className="w-15 h-15" />
            <h2 className="text-xl text-black">Create Your Resume</h2>
            <p className="text-slate-600 text-center">
              Craft a job-winning resume that showcases your strengths and goals
            </p>
            <Link to="/create-resume" className="button-54 px-6 py-3 border-2 border-black hover:bg-white hover:text-black bg-black text-white rounded-full text-base duration-300 inline-flex items-center justify-center">
              Build My Resume
            </Link>
          </div>

          {/* Right Block (Career Map Card) */}
          <div className="flex-1 max-w-[450px] min-h-[300px] shadow-md flex flex-col items-center justify-center p-6 space-y-4 border-2 border-slate-200 rounded-md bg-white"> {/* Added flex-1, max-w, min-h, and bg-white */}
            <Map className="w-15 h-15" />
            <h2 className="text-xl text-black">Map Your Career Path</h2>
            <p className="text-slate-600 text-center">
              Define your future. Gain a personalized roadmap with steps and skills for your dream role.
            </p>
            <Link to="/map-career-path" className="button-54 px-6 py-3 border-2 border-black hover:bg-white hover:text-black bg-black text-white rounded-full text-base duration-300 inline-flex items-center justify-center">
              Build My Roadmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;