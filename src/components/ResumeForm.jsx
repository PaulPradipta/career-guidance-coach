// components/ResumeForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'; // For icons

const ResumeForm = () => {
  const navigate = useNavigate();

  // State for main form data
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    summary: "",
    hasExperience: true, // Default to true for experience section visibility
  });

  // States for dynamic array fields
  const [experiences, setExperiences] = useState([
    { company: "", role: "", responsibilities: ["", "", ""], startYear: "", endYear: "", isCurrent: false },
  ]);
  const [education, setEducation] = useState([
    { school: "", degree: "", startYear: "", endYear: "", cgpa: "" },
  ]);
  const [skills, setSkills] = useState([{ name: "", proficiency: 80 }]);
  const [projects, setProjects] = useState([
    { name: "", techStack: "", descriptions: ["", ""], liveLink: "" },
  ]);
  const [certifications, setCertifications] = useState([
    { title: "", link: "" },
  ]);

  // UI states for feedback and loading
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handler for general input changes (e.g., name, email, summary)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for the "hasExperience" checkbox
  const handleCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, hasExperience: e.target.checked }));
  };

  // Generic handler for changes in array items (e.g., company in experiences, school in education)
  const handleArrayChange = (setter, index, key, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  // Generic handler for changes in nested array items (e.g., responsibilities, descriptions)
  const handleNestedArrayChange = (setter, i, j, value, key = "responsibilities") => {
    setter((prev) => {
      const updated = [...prev];
      if (!updated[i][key]) updated[i][key] = []; // Ensure nested array exists
      updated[i][key][j] = value;
      return updated;
    });
  };

  // Generic function to add a new item to an array section
  const addField = (setter, defaultItem) => {
    setter((prev) => [...prev, defaultItem]);
  };

  // Generic function to remove an item from an array section
  const removeField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // Handles the form submission to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true

    // Assemble all resume data, conditionally including experiences
    const resumeData = {
      ...formData,
      experiences: formData.hasExperience ? experiences : [],
      education,
      skills,
      projects,
      certifications,
    };

    try {
      // Send the resume data to your backend API
      const response = await fetch("http://localhost:3001/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json(); // Parse the JSON response from the backend

      if (response.ok) { // Check if the response status is successful (2xx)
        setMessage("Resume successfully saved!");
        // Use the actual userId returned by your backend for navigation
        const resumeId = result.userId; 
        // Navigate to the preview page, passing the full resume data via state
        navigate(`/resume/preview/${resumeId}`, { state: resumeData });
      } else {
        // Handle backend errors and display a message
        setMessage("Failed to save resume: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error("Error submitting form:", error);
      setMessage("Server error. Please check the console for details.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans">
      {/* Custom Message Alert Component */}
      {message && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-lg z-50 shadow-md flex justify-between items-center gap-4">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="font-bold text-lg">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* PERSONAL INFORMATION SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {["name", "role", "phone", "email", "linkedin", "github"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Capitalize and add space for readability
                className="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required={field !== "github"} // GitHub is optional
              />
            ))}
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Professional Summary (e.g., A highly motivated software engineer with 5 years of experience...)"
              rows="4"
              className="col-span-full bg-gray-100 p-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
        </section>

        {/* EXPERIENCE TOGGLE SECTION */}
        <section>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasExperience}
              onChange={handleCheckbox}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 transition-all duration-200"
            />
            <span className="text-gray-700 font-medium">I have prior work experience</span>
          </label>
        </section>

        {/* EXPERIENCE SECTION (Conditionally rendered) */}
        {formData.hasExperience && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Experience</h2>
            {experiences.map((exp, i) => (
              <div key={i} className="bg-white p-4 my-3 rounded-xl shadow-md border border-gray-200 space-y-3">
                <div className="flex justify-end">
                  <i
                    className="ri-delete-bin-line text-red-500 cursor-pointer text-lg hover:text-red-700 transition-colors duration-200"
                    onClick={() => removeField(setExperiences, i)}
                    title="Remove Experience"
                  />
                </div>
                <input placeholder="Company Name" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, i, "company", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
                <input placeholder="Your Role/Title" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, i, "role", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
                <label className="block text-sm text-gray-600 mb-1">Key Responsibilities (3 bullet points):</label>
                {exp.responsibilities.map((resp, j) => (
                  <input key={j} placeholder={`Responsibility ${j + 1}`} value={resp} onChange={(e) => handleNestedArrayChange(setExperiences, i, j, e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Start Year" value={exp.startYear} onChange={(e) => handleArrayChange(setExperiences, i, "startYear", e.target.value)} className="p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
                  <input type="number" placeholder="End Year" value={exp.endYear} onChange={(e) => handleArrayChange(setExperiences, i, "endYear", e.target.value)} className="p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
                </div>
                <label className="text-sm text-gray-600 flex items-center mt-2 cursor-pointer">
                  <input type="checkbox" checked={exp.isCurrent} onChange={(e) => handleArrayChange(setExperiences, i, "isCurrent", e.target.checked)} className="mr-2 text-blue-600 rounded focus:ring-blue-500" />
                  Currently Working Here
                </label>
              </div>
            ))}
            <button type="button" onClick={() => addField(setExperiences, { company: "", role: "", responsibilities: ["", "", ""], startYear: "", endYear: "", isCurrent: false })} className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800 transition-colors duration-200 shadow-md">
              + Add Experience
            </button>
          </section>
        )}

        {/* EDUCATION SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="bg-white p-4 my-3 rounded-xl shadow-md border border-gray-200 space-y-3">
              <div className="flex justify-end">
                <i className="ri-delete-bin-line text-red-500 cursor-pointer text-lg hover:text-red-700 transition-colors duration-200" onClick={() => removeField(setEducation, i)} title="Remove Education" />
              </div>
              <input placeholder="School/University Name" value={edu.school} onChange={(e) => handleArrayChange(setEducation, i, "school", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <input placeholder="Degree (e.g., B.Tech, M.Sc.)" value={edu.degree} onChange={(e) => handleArrayChange(setEducation, i, "degree", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <input placeholder="CGPA/Percentage (e.g., 8.5/10 or 90%)" value={edu.cgpa} onChange={(e) => handleArrayChange(setEducation, i, "cgpa", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleArrayChange(setEducation, i, "startYear", e.target.value)} className="p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
                <input type="number" placeholder="End Year" value={edu.endYear} onChange={(e) => handleArrayChange(setEducation, i, "endYear", e.target.value)} className="p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addField(setEducation, { school: "", degree: "", startYear: "", endYear: "", cgpa: "" })} className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800 transition-colors duration-200 shadow-md">
            + Add Education
          </button>
        </section>

        {/* SKILLS SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Skills</h2>
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center bg-white p-3 my-2 rounded-xl shadow-md border border-gray-200">
              <input placeholder="Skill Name (e.g., JavaScript, React, SQL)" value={skill.name} onChange={(e) => handleArrayChange(setSkills, i, "name", e.target.value)} className="flex-1 p-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <i className="ri-delete-bin-line ml-4 text-red-500 cursor-pointer text-lg hover:text-red-700 transition-colors duration-200" onClick={() => removeField(setSkills, i)} title="Remove Skill" />
            </div>
          ))}
          <button type="button" onClick={() => addField(setSkills, { name: "", proficiency: 80 })} className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800 transition-colors duration-200 shadow-md">
            + Add Skill
          </button>
        </section>

        {/* PROJECTS SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="bg-white p-4 my-3 rounded-xl shadow-md border border-gray-200 space-y-3">
              <div className="flex justify-end">
                <i className="ri-delete-bin-line text-red-500 cursor-pointer text-lg hover:text-red-700 transition-colors duration-200" onClick={() => removeField(setProjects, i)} title="Remove Project" />
              </div>
              <input placeholder="Project Name" value={proj.name} onChange={(e) => handleArrayChange(setProjects, i, "name", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <input placeholder="Technologies Used (e.g., React, Node.js, MongoDB)" value={proj.techStack} onChange={(e) => handleArrayChange(setProjects, i, "techStack", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <input type="url" placeholder="Live Demo Link (Optional)" value={proj.liveLink} onChange={(e) => handleArrayChange(setProjects, i, "liveLink", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <label className="block text-sm text-gray-600 mb-1">Project Descriptions (2 bullet points):</label>
              {proj.descriptions.map((desc, j) => (
                <input key={j} placeholder={`Description ${j + 1}`} value={desc} onChange={(e) => handleNestedArrayChange(setProjects, i, j, e.target.value, "descriptions")} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              ))}
            </div>
          ))}
          <button type="button" onClick={() => addField(setProjects, { name: "", techStack: "", descriptions: ["", ""], liveLink: "" })} className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800 transition-colors duration-200 shadow-md">
            + Add Project
          </button>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white p-4 my-3 rounded-xl shadow-md border border-gray-200 space-y-3">
              <div className="flex justify-end">
                <i className="ri-delete-bin-line text-red-500 cursor-pointer text-lg hover:text-red-700 transition-colors duration-200" onClick={() => removeField(setCertifications, i)} title="Remove Certification" />
              </div>
              <input placeholder="Certification Title" value={cert.title} onChange={(e) => handleArrayChange(setCertifications, i, "title", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
              <input type="url" placeholder="Certification Link" value={cert.link} onChange={(e) => handleArrayChange(setCertifications, i, "link", e.target.value)} className="w-full p-2 my-1 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            </div>
          ))}
          <button type="button" onClick={() => addField(setCertifications, { title: "", link: "" })} className="bg-black text-white px-4 py-2 rounded-lg mt-3 hover:bg-gray-800 transition-colors duration-200 shadow-md">
            + Add Certification
          </button>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {isLoading ? "Creating Resume..." : "Create Resume"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
