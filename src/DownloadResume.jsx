import React, { useState } from "react";
import { jsPDF } from "jspdf";

export default function DownloadResume() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);

    // 1. Retrieve data from local storage
    const savedData = localStorage.getItem("resumeData");
    
    if (!savedData) {
      alert("No resume data found! Please create a resume first.");
      setIsGenerating(false);
      return;
    }

    const data = JSON.parse(savedData);
    const doc = new jsPDF();

    // --- PDF GENERATION LOGIC ---
    
    let yPos = 20; // Current Vertical Position
    const leftMargin = 20;
    const lineHeight = 7;

    // 1. HEADER (Name & Contact)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(data.personal.name || "Your Name", leftMargin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const contactInfo = [
      data.personal.email,
      data.personal.phone,
      data.personal.linkedin,
      data.personal.github
    ].filter(Boolean).join(" | "); // Join only existing fields
    
    doc.text(contactInfo, leftMargin, yPos);
    yPos += 15;

    // Helper function to add Section Titles
    const addSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title.toUpperCase(), leftMargin, yPos);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, yPos + 2, 190, yPos + 2); // Horizontal line
      yPos += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    };

    // 2. EXPERIENCE SECTION
    if (data.experience && data.experience.length > 0) {
      addSectionTitle("Work Experience");
      
      data.experience.forEach((exp) => {
        if (!exp.title && !exp.company) return;
        
        // Job Title & Date
        doc.setFont("helvetica", "bold");
        doc.text(`${exp.title}`, leftMargin, yPos);
        
        doc.setFont("helvetica", "italic");
        doc.text(`${exp.start} - ${exp.end}`, 190, yPos, { align: "right" });
        yPos += 5;

        // Company
        doc.setFont("helvetica", "normal");
        doc.text(`${exp.company}`, leftMargin, yPos);
        yPos += 6;

        // Description (Multi-line handling)
        if (exp.desc) {
          const splitDesc = doc.splitTextToSize(exp.desc, 170);
          doc.text(splitDesc, leftMargin, yPos);
          yPos += (splitDesc.length * 5) + 5; // Dynamic spacing based on lines
        } else {
          yPos += 5;
        }
      });
      yPos += 5; // Extra space after section
    }

    // 3. EDUCATION SECTION
    if (data.education && data.education.length > 0) {
      addSectionTitle("Education");
      
      data.education.forEach((edu) => {
        if (!edu.school) return;

        doc.setFont("helvetica", "bold");
        doc.text(edu.school, leftMargin, yPos);
        
        doc.setFont("helvetica", "italic");
        doc.text(`${edu.start} - ${edu.end}`, 190, yPos, { align: "right" });
        yPos += 5;

        doc.setFont("helvetica", "normal");
        doc.text(edu.degree, leftMargin, yPos);
        yPos += 10;
      });
      yPos += 5;
    }

    // 4. SKILLS SECTION
    if (data.skills) {
      addSectionTitle("Skills");
      const splitSkills = doc.splitTextToSize(data.skills, 170);
      doc.text(splitSkills, leftMargin, yPos);
      yPos += (splitSkills.length * 5) + 10;
    }

    // 5. PROJECTS SECTION
    if (data.projects && data.projects.length > 0) {
      addSectionTitle("Projects");
      
      data.projects.forEach((proj) => {
        if (!proj.name) return;

        doc.setFont("helvetica", "bold");
        doc.text(proj.name, leftMargin, yPos);
        
        if (proj.link) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.text(proj.link, 190, yPos, { align: "right" });
            doc.setFontSize(10);
        }
        yPos += 5;

        doc.setFont("helvetica", "normal");
        if (proj.desc) {
            const splitDesc = doc.splitTextToSize(proj.desc, 170);
            doc.text(splitDesc, leftMargin, yPos);
            yPos += (splitDesc.length * 5) + 5;
        } else {
            yPos += 5;
        }
      });
    }

    // Save the PDF
    doc.save(`${data.personal.name.replace(/\s+/g, '_')}_Resume.pdf`);
    setIsGenerating(false);
  };

  return (
    <div className="font-display bg-black min-h-screen w-full flex flex-col">
      <div className="flex flex-1 justify-center px-4 sm:px-8 md:px-20 lg:px-40 py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 md:px-10 py-3 text-white">
            <div className="flex items-center gap-4">
              <div className="size-4 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-lg font-bold">ResumeBuilder</h2>
            </div>
          </header>

          {/* Main */}
          <main className="flex flex-col flex-1 items-center justify-center gap-8 py-10 text-center text-white">
            {/* Text */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                Your Resume is Ready!
              </h1>
              <p className="text-white/60 text-lg max-w-md mx-auto">
                Congratulations! Your resume has been successfully generated and is now ready for download.
              </p>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex min-w-[200px] max-w-[480px] items-center justify-center gap-2 rounded-lg h-14 px-8 bg-primary text-background-dark text-lg font-bold tracking-[0.015em] hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">
                    {isGenerating ? 'hourglass_top' : 'download'}
                </span>
                <span className="truncate">
                    {isGenerating ? 'Generating PDF...' : 'Download Resume'}
                </span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}