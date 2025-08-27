// components/ResumeForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const ResumeForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    summary: "",
    hasExperience: true,
  });

  // Dynamic sections
  const [experiences, setExperiences] = useState([
    { company: "", role: "", responsibilities: [""], startYear: "", endYear: "", isCurrent: false },
  ]);
  const [education, setEducation] = useState([{ school: "", degree: "", startYear: "", endYear: "", cgpa: "" }]);
  const [skills, setSkills] = useState([{ name: "", proficiency: 80 }]);
  const [projects, setProjects] = useState([{ name: "", techStack: "", descriptions: [""], liveLink: "" }]);
  const [certifications, setCertifications] = useState([{ title: "", link: "" }]);

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // General input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Checkbox toggle
  const handleCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, hasExperience: e.target.checked }));
  };

  // Helpers for nested states
  const handleArrayChange = (setter, index, key, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const handleNestedArrayChange = (setter, i, j, value, key = "responsibilities") => {
    setter((prev) => {
      const updated = [...prev];
      if (!updated[i][key]) updated[i][key] = [];
      updated[i][key][j] = value;
      return updated;
    });
  };

  const addField = (setter, defaultItem) => setter((prev) => [...prev, defaultItem]);
  const removeField = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const resumeData = {
      ...formData,
      experiences: formData.hasExperience ? experiences : [],
      education,
      skills,
      projects,
      certifications,
    };

    try {
      const response = await fetch("http://localhost:3001/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Resume successfully saved!");
        const resumeId = result.id;
        navigate(`/dashboard`);
      } else {
        setMessage("Failed to save resume: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Server error. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans">
      {message && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-lg z-50 shadow-md flex justify-between items-center gap-4">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="font-bold text-lg">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ================== PERSONAL INFO ================== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" required />
          <input type="text" name="role" placeholder="Role (e.g., Software Engineer)" value={formData.role} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" />
          <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" />
          <input type="text" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" />
          <textarea name="summary" placeholder="Professional Summary" value={formData.summary} onChange={handleChange} className="block w-full mb-3 border p-2 rounded" rows="3" />
        </div>

        {/* ================== EXPERIENCE ================== */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            Work Experience
            <input type="checkbox" checked={formData.hasExperience} onChange={handleCheckbox} className="ml-4" />
            <span className="ml-2 text-sm">Include Experience?</span>
          </h2>
          {formData.hasExperience &&
            experiences.map((exp, i) => (
              <div key={i} className="border rounded p-4 mb-4">
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, i, "company", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
                <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, i, "role", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
                <div className="mb-2">
                  <label className="block font-medium">Responsibilities:</label>
                  {exp.responsibilities.map((resp, j) => (
                    <input key={j} type="text" placeholder={`Responsibility ${j + 1}`} value={resp} onChange={(e) => handleNestedArrayChange(setExperiences, i, j, e.target.value)} className="block w-full mb-2 border p-2 rounded" />
                  ))}
                  <button type="button" className="text-sm text-blue-600" onClick={() => handleNestedArrayChange(setExperiences, i, exp.responsibilities.length, "")}>
                    + Add Responsibility
                  </button>
                </div>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="Start Year" value={exp.startYear} onChange={(e) => handleArrayChange(setExperiences, i, "startYear", e.target.value)} className="border p-2 rounded w-1/2" />
                  <input type="text" placeholder="End Year" value={exp.endYear} onChange={(e) => handleArrayChange(setExperiences, i, "endYear", e.target.value)} disabled={exp.isCurrent} className="border p-2 rounded w-1/2" />
                </div>
                <label className="flex items-center text-sm">
                  <input type="checkbox" checked={exp.isCurrent} onChange={(e) => handleArrayChange(setExperiences, i, "isCurrent", e.target.checked)} />
                  <span className="ml-2">Currently working here</span>
                </label>
                <button type="button" className="mt-2 text-red-600 text-sm" onClick={() => removeField(setExperiences, i)}>
                  Remove Experience
                </button>
              </div>
            ))}
          <button type="button" className="text-blue-600 text-sm" onClick={() => addField(setExperiences, { company: "", role: "", responsibilities: [""], startYear: "", endYear: "", isCurrent: false })}>
            + Add Experience
          </button>
        </div>

        {/* ================== EDUCATION ================== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="border rounded p-4 mb-4">
              <input type="text" placeholder="School / College" value={edu.school} onChange={(e) => handleArrayChange(setEducation, i, "school", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(setEducation, i, "degree", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleArrayChange(setEducation, i, "startYear", e.target.value)} className="border p-2 rounded w-1/2" />
                <input type="text" placeholder="End Year" value={edu.endYear} onChange={(e) => handleArrayChange(setEducation, i, "endYear", e.target.value)} className="border p-2 rounded w-1/2" />
              </div>
              <input type="text" placeholder="CGPA / Percentage" value={edu.cgpa} onChange={(e) => handleArrayChange(setEducation, i, "cgpa", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
              <button type="button" className="mt-2 text-red-600 text-sm" onClick={() => removeField(setEducation, i)}>Remove Education</button>
            </div>
          ))}
          <button type="button" className="text-blue-600 text-sm" onClick={() => addField(setEducation, { school: "", degree: "", startYear: "", endYear: "", cgpa: "" })}>+ Add Education</button>
        </div>

        {/* ================== SKILLS ================== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input type="text" placeholder="Skill Name" value={skill.name} onChange={(e) => handleArrayChange(setSkills, i, "name", e.target.value)} className="border p-2 rounded w-2/3" />
              <input type="number" placeholder="Proficiency %" value={skill.proficiency} onChange={(e) => handleArrayChange(setSkills, i, "proficiency", e.target.value)} className="border p-2 rounded w-1/3" min="0" max="100" />
              <button type="button" className="text-red-600 text-sm" onClick={() => removeField(setSkills, i)}>Remove</button>
            </div>
          ))}
          <button type="button" className="text-blue-600 text-sm" onClick={() => addField(setSkills, { name: "", proficiency: 80 })}>+ Add Skill</button>
        </div>

        {/* ================== PROJECTS ================== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="border rounded p-4 mb-4">
              <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => handleArrayChange(setProjects, i, "name", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
              <input type="text" placeholder="Tech Stack" value={proj.techStack} onChange={(e) => handleArrayChange(setProjects, i, "techStack", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
              <div>
                <label className="block font-medium">Descriptions:</label>
                {proj.descriptions.map((desc, j) => (
                  <input key={j} type="text" placeholder={`Description ${j + 1}`} value={desc} onChange={(e) => handleNestedArrayChange(setProjects, i, j, e.target.value, "descriptions")} className="block w-full mb-2 border p-2 rounded" />
                ))}
                <button type="button" className="text-sm text-blue-600" onClick={() => handleNestedArrayChange(setProjects, i, proj.descriptions.length, "", "descriptions")}>+ Add Description</button>
              </div>
              <input type="text" placeholder="Live Link" value={proj.liveLink} onChange={(e) => handleArrayChange(setProjects, i, "liveLink", e.target.value)} className="block w-full mb-2 border p-2 rounded" />
              <button type="button" className="mt-2 text-red-600 text-sm" onClick={() => removeField(setProjects, i)}>Remove Project</button>
            </div>
          ))}
          <button type="button" className="text-blue-600 text-sm" onClick={() => addField(setProjects, { name: "", techStack: "", descriptions: [""], liveLink: "" })}>+ Add Project</button>
        </div>

        {/* ================== CERTIFICATIONS ================== */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Certification Title" value={cert.title} onChange={(e) => handleArrayChange(setCertifications, i, "title", e.target.value)} className="border p-2 rounded w-2/3" />
              <input type="text" placeholder="Link" value={cert.link} onChange={(e) => handleArrayChange(setCertifications, i, "link", e.target.value)} className="border p-2 rounded w-1/3" />
              <button type="button" className="text-red-600 text-sm" onClick={() => removeField(setCertifications, i)}>Remove</button>
            </div>
          ))}
          <button type="button" className="text-blue-600 text-sm" onClick={() => addField(setCertifications, { title: "", link: "" })}>+ Add Certification</button>
        </div>

        {/* ================== SUBMIT ================== */}
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
