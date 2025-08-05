import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import 'remixicon/fonts/remixicon.css';

const ResumePreview = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const resumeRef = useRef(null);
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch resume by ID or use state from navigation
  useEffect(() => {
    const loadResume = async () => {
      if (state) {
        setResumeData(state);
      } else if (userId) {
        try {
         const response = await fetch(`http://localhost:3001/api/resumes/${userId}`);
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error format" }));
            throw new Error(errorData.error || "Resume not found");
          }
          const data = await response.json();
          setResumeData(data);
        } catch (error) {
          console.error("Error fetching resume:", error);
          setMessage("Resume not found or failed to load: " + error.message + ". Redirecting to form.");
          setTimeout(() => navigate("/resume-form"), 2000);
        }
      } else {
        setMessage("No resume data to preview. Please create a resume first. Redirecting to form.");
        setTimeout(() => navigate("/resume-form"), 2000);
      }
    };
    loadResume();
  }, [state, userId, navigate]);

  // Download PDF using dom-to-image
  const handleDownloadPDF = async () => {
    try {
      setMessage("Generating PDF...");
      
      // Hide the message during PDF generation
      const messageElement = document.querySelector('[data-message-box]');
      if (messageElement) {
        messageElement.style.display = 'none';
      }

      // Generate image from DOM
      const dataUrl = await domtoimage.toPng(resumeRef.current, {
        quality: 1.0,
        bgcolor: '#ffffff',
        width: resumeRef.current.offsetWidth,
        height: resumeRef.current.offsetHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit in PDF
      const img = new Image();
      img.onload = function() {
        const imgWidth = this.width;
        const imgHeight = this.height;
        const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
        const width = imgWidth * 0.264583 * ratio;
        const height = imgHeight * 0.264583 * ratio;
        const x = (pdfWidth - width) / 2;
        const y = 10;

        pdf.addImage(dataUrl, 'PNG', x, y, width, height);
        pdf.save(`${resumeData.name || "resume"}.pdf`);
        
        setMessage("PDF successfully generated and downloaded!");
        setTimeout(() => {
          setMessage("");
          navigate("/viewresumes");
        }, 2000);
      };
      img.src = dataUrl;

      // Restore message box
      if (messageElement) {
        messageElement.style.display = 'flex';
      }

    } catch (error) {
      console.error("PDF generation error:", error);
      setMessage("Failed to download PDF. Error: " + error.message);
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
        <div 
          data-message-box
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            zIndex: "50",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <span>{message}</span>
          <button 
            onClick={() => setMessage("")}
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            &times;
          </button>
        </div>
      )}

      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
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