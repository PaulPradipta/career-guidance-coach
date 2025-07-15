import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'remixicon/fonts/remixicon.css';


const ResumePreview = () => {
  const { userId } = useParams(); // Get ID from URL parameters (e.g., from /resume/preview/123)
  const { state } = useLocation(); // Get state passed from navigation (e.g., from ResumeForm)
  const resumeRef = useRef(null);
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [message, setMessage] = useState(""); // State for custom message box

  // Fetch resume by ID or use state from navigation
  useEffect(() => {
    const loadResume = async () => {
      if (state) {
        // If data is passed via navigation state (from ResumeForm after submission)
        setResumeData(state);
        
        // setMessage("Resume data loaded from form.");
      } else if (userId) {
        // If no state (e.g., direct URL access or page refresh), try fetching from backend
        try {
          const response = await fetch(`http://localhost:3001/api/resumes/${userId}`);
          if (!response.ok) {
            // If response is not OK (e.g., 404, 500), throw an error with more details
            const errorData = await response.json().catch(() => ({ error: "Unknown error format" })); // Safely parse JSON
            throw new Error(errorData.error || "Resume not found");
          }
          const data = await response.json();
          setResumeData(data);
          // setMessage("Resume data fetched successfully from backend.");
        } catch (error) {
          console.error("Error fetching resume:", error);
          setMessage("Resume not found or failed to load: " + error.message + ". Redirecting to form.");
          // Redirect to the form if data cannot be fetched
          setTimeout(() => navigate("/resume-form"), 2000);
        }
      } else {
        // If neither state nor userId is available, prompt user to create a resume
        setMessage("No resume data to preview. Please create a resume first. Redirecting to form.");
        setTimeout(() => navigate("/resume-form"), 2000);
      }
    };
    loadResume();
  }, [state, userId, navigate]); // Dependencies: re-run if state, userId, or navigate changes

  // Download PDF
  const handleDownloadPDF = async () => {
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;
      const imgHeight = canvas.height * pdfWidth / canvas.width;

      // Add image to PDF, handling multiple pages if content is long
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      position -= pdfHeight;

      while (position > -imgHeight) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      }

      pdf.save(`${resumeData.name || "resume"}.pdf`);
      // setMessage("PDF successfully generated and downloaded!");
      setTimeout(() => navigate("/viewresumes"), 2000); // Redirect to view resumes page
    } catch (error) {
      console.error("PDF generation error:", error);
      setMessage("Failed to download PDF. Please try again.");
    }
  };

  // Handle loading state
  if (!resumeData) {
    return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading resume...</div>;
  }

  // Destructure and sanitize
  const {
    name = "",
    role = "",
    phone = "",
    email = "",
    linkedin = "",
    github = "",
    summary = "",
    skills = [],
    education = [],
    projects = [],
    certifications = [],
    experiences = [],
  } = resumeData;

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "30px" }}>
      {/* Custom Message Alert */}
      {message && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-lg z-50 shadow-md flex justify-between items-center gap-4">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="font-bold text-lg">&times;</button>
        </div>
      )}

      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={handleDownloadPDF}
          className="hover:transform-scale-105 transition-all duration-300"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Download PDF
        </button>
      </div>

      <div
        ref={resumeRef}
        style={{
          backgroundColor: "#ffffff",
          color: "#000",
          fontFamily: "Georgia, serif",
          width: "794px",
          padding: "40px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>{name}</h1>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", fontSize: "14px" }}>
          <span>📞 {phone}</span>
          <span><i className="ri-mail-fill"></i> {email}</span>
          <span>
            <i className="ri-linkedin-box-fill" style={{ color: "#0077b5" }}></i>{" "}
            <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
          {github && (
            <span>
              <i className="ri-github-fill"></i>{" "}
              <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
          )}
        </div>

        <hr style={{ margin: "12px 0" }} />

        {/* Summary */}
        <p style={{ fontSize: "15px", lineHeight: 1.6, textAlign: "justify", marginBottom: "24px" }}>{summary}</p>

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <h3><strong>Skills</strong></h3>
            <hr />
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingLeft: "0" }}>
              {skills.map((skill, index) => (
                <li key={index}>• {typeof skill === "string" ? skill : skill.name}</li>
              ))}
            </ul>
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <h3 style={{ marginTop: "30px" }}><strong>Education</strong></h3>
            <hr />
            {education.map((edu, index) => (
              <div key={index} style={{ marginTop: "12px" }}>
                <p><strong>{edu.degree}</strong></p>
                <p><em>{edu.school}</em></p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p><strong>CGPA:</strong> {edu.cgpa}</p>
                  <p>{edu.startYear || edu.start_year} – {edu.endYear || edu.end_year}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <h3 style={{ marginTop: "30px" }}><strong>Projects</strong></h3>
            <hr />
            {projects.map((proj, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <p>
                  <strong>{proj.name}</strong> || <em>{proj.techStack || proj.tech_stack}</em> || {" "}
                  {(proj.liveLink || proj.live_link) && (
                    <a href={proj.liveLink || proj.live_link} target="_blank" rel="noopener noreferrer"><strong>[Live Demo]</strong></a>
                  )}
                </p>
                <ul style={{ paddingLeft: "18px", marginTop: "6px" }}>
                  {Array.isArray(proj.descriptions) &&
                    proj.descriptions.map((desc, i) => (
                      <li key={i} style={{ textAlign: "justify" }}>
                        &#9830; {desc.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <h3 style={{ marginTop: "30px" }}><strong>Certifications</strong></h3>
            <hr />
            <ul style={{ paddingLeft: "18px" }}>
              {certifications.map((cert, i) => (
                <li key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{cert.title}</span>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"><strong>Link</strong></a>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <>
            <h3 style={{ marginTop: "30px" }}><strong>Experience</strong></h3>
            <hr />
            {experiences.map((exp, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <p><strong>{exp.role}</strong> at <strong>{exp.company}</strong></p>
                <p>{exp.startYear} – {exp.isCurrent ? "Present" : exp.endYear}</p>
                <ul style={{ paddingLeft: "18px", marginTop: "6px" }}>
                  {Array.isArray(exp.responsibilities) &&
                    exp.responsibilities.map((item, i) => (
                      <li key={i} style={{ textAlign: "justify" }}>
                        <i className="ri-arrow-right-s-fill"></i> {item.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
