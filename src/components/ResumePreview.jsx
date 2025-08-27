import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import "remixicon/fonts/remixicon.css";

const ResumePreview = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const resumeRef = useRef(null);
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch resume data
  useEffect(() => {
    const loadResume = async () => {
      if (state) {
        setResumeData(state);
      } else if (id) {
        try {
          const response = await fetch(`http://localhost:3001/api/resumes/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error format" }));
            throw new Error(errorData.error || "Resume not found");
          }
          const data = await response.json();
          setResumeData(data);
        } catch (error) {
          console.error("Error fetching resume:", error);
          setMessage("Resume not found. Redirecting to form.");
          setTimeout(() => navigate("/resume-form"), 2000);
        }
      } else {
        setMessage("No resume data. Redirecting to form.");
        setTimeout(() => navigate("/resume-form"), 2000);
      }
    };
    loadResume();
  }, [state, id, navigate]);

  // Download PDF
  const handleDownloadPDF = async () => {
    try {
      setMessage("Generating PDF...");
      const dataUrl = await domtoimage.toPng(resumeRef.current, {
        quality: 1.0,
        bgcolor: "#ffffff",
        width: resumeRef.current.offsetWidth,
        height: resumeRef.current.offsetHeight,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData?.name || "resume"}.pdf`);

      setMessage("PDF downloaded successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("PDF generation error:", error);
      setMessage("Failed to download PDF. " + error.message);
    }
  };

  if (!resumeData) {
    return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading resume...</div>;
  }

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
      {/* Notification */}
      {message && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            zIndex: "50",
          }}
        >
          {message}
        </div>
      )}

      {/* Download Button */}
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
          }}
        >
          Download PDF
        </button>
      </div>

      {/* Resume Content */}
      <div
        ref={resumeRef}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "Georgia, serif",
          width: "794px", // A4 width at 96dpi
          height: "1123px", // A4 height at 96dpi
          padding: "40px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>{name}</h1>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", fontSize: "14px" }}>
          {phone && <span>📞 {phone}</span>}
          {email && (
            <span>
              <i className="ri-mail-fill"></i> {email}
            </span>
          )}
          {linkedin && (
            <span>
              <i className="ri-linkedin-box-fill" style={{ color: "#0077b5" }}></i>{" "}
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </span>
          )}
          {github && (
            <span>
              <i className="ri-github-fill"></i>{" "}
              <a href={github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </span>
          )}
        </div>
        <hr style={{ margin: "12px 0" }} />

        {/* Summary */}
        {summary && (
          <section>
            <p style={{ fontSize: "15px", lineHeight: 1.6, textAlign: "justify", marginBottom: "20px" }}>{summary}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h3><strong>Skills</strong></h3>
            <hr />
            <ul style={{ paddingLeft: "20px", marginTop: "8px", fontSize: "14px", listStyleType: "disc" }}>
              {skills.map((skill, i) => (
                <li key={i}>{typeof skill === "string" ? skill : skill.name}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 style={{ marginTop: "20px" }}><strong>Education</strong></h3>
            <hr />
            {education.map((edu, i) => (
              <div key={i} style={{ marginTop: "12px" }}>
                <p><strong>{edu.degree}</strong> - <em>{edu.school}</em></p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span><strong>CGPA:</strong> {edu.cgpa}</span>
                  <span>{edu.startYear || edu.start_year} – {edu.endYear || edu.end_year}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h3 style={{ marginTop: "20px" }}><strong>Projects</strong></h3>
            <hr />
            {projects.map((proj, i) => (
              <div key={i} style={{ marginTop: "12px" }}>
                <p>
                  <strong>{proj.name}</strong> {proj.techStack && <em>({proj.techStack})</em>}
                </p>
                <ul style={{ paddingLeft: "20px", fontSize: "13px", listStyleType: "disc" }}>
                  {Array.isArray(proj.descriptions) &&
                    proj.descriptions.map((desc, j) => (
                      <li key={j} style={{ textAlign: "justify" }}>{desc.trim()}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h3 style={{ marginTop: "20px" }}><strong>Certifications</strong></h3>
            <hr />
            <ul style={{ paddingLeft: "20px", marginTop: "8px", fontSize: "14px", listStyleType: "disc" }}>
              {certifications.map((cert, i) => (
                <li key={i}>
                  {cert.title}{" "}
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      (Link)
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h3 style={{ marginTop: "20px" }}><strong>Experience</strong></h3>
            <hr />
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginTop: "12px" }}>
                <p><strong>{exp.role}</strong> - {exp.company}</p>
                <p style={{ fontSize: "13px" }}>{exp.startYear} – {exp.isCurrent ? "Present" : exp.endYear}</p>
                <ul style={{ paddingLeft: "20px", fontSize: "13px", listStyleType: "disc" }}>
                  {Array.isArray(exp.responsibilities) &&
                    exp.responsibilities.map((res, j) => (
                      <li key={j} style={{ textAlign: "justify" }}>{res.trim()}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
