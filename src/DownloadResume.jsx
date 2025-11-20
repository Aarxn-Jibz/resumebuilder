import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Loader2, Download, CheckCircle, ArrowRight } from 'lucide-react'; // Added ArrowRight

export default function DownloadResume() {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // --- HELPER: Generate the PDF Document Object ---
  const generatePDFDoc = (data) => {
    const doc = new jsPDF();
    let yPos = 20;
    const leftMargin = 20;

    // 1. HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(data.personal.name || "Your Name", leftMargin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    const contactInfo = [
      data.personal.email,
      data.personal.phone,
      data.personal.linkedin ? `linkedin.com/in/${data.personal.linkedin}` : null,
      data.personal.github ? `github.com/${data.personal.github}` : null
    ].filter(Boolean).join(" | ");
    
    doc.text(contactInfo, leftMargin, yPos);
    yPos += 15;

    const addSectionTitle = (title) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title.toUpperCase(), leftMargin, yPos);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, yPos + 2, 190, yPos + 2);
      yPos += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    };

    // 2. EXPERIENCE
    if (data.experience && data.experience.length > 0) {
      addSectionTitle("Work Experience");
      data.experience.forEach((exp) => {
        if (!exp.title && !exp.company) return;
        doc.setFont("helvetica", "bold");
        doc.text(`${exp.title}`, leftMargin, yPos);
        doc.setFont("helvetica", "italic");
        doc.text(`${exp.start} - ${exp.end}`, 190, yPos, { align: "right" });
        yPos += 5;
        doc.setFont("helvetica", "normal");
        doc.text(`${exp.company}`, leftMargin, yPos);
        yPos += 6;
        if (exp.desc) {
          const splitDesc = doc.splitTextToSize(exp.desc, 170);
          doc.text(splitDesc, leftMargin, yPos);
          yPos += (splitDesc.length * 5) + 5;
        } else {
          yPos += 5;
        }
      });
      yPos += 5;
    }

    // 3. EDUCATION
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

    // 4. SKILLS
    if (data.skills) {
      addSectionTitle("Skills");
      const splitSkills = doc.splitTextToSize(data.skills, 170);
      doc.text(splitSkills, leftMargin, yPos);
      yPos += (splitSkills.length * 5) + 10;
    }

    // 5. PROJECTS
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

    return doc;
  };

  // --- HANDLER: Download File ---
  const handleDownload = () => {
    setIsGenerating(true);
    const savedData = localStorage.getItem("resumeData");
    if (!savedData) { alert("No data found"); setIsGenerating(false); return; }
    
    const data = JSON.parse(savedData);
    const doc = generatePDFDoc(data);
    doc.save(`${data.personal.name.replace(/\s+/g, '_')}_Resume.pdf`);
    setIsGenerating(false);
  };

  // --- HANDLER: Transfer to AI Score ---
  const handleCheckScore = () => {
    const savedData = localStorage.getItem("resumeData");
    if (!savedData) { alert("No data found"); return; }
    
    const data = JSON.parse(savedData);
    const doc = generatePDFDoc(data);
    
    // Convert PDF to Blob
    const pdfBlob = doc.output('blob');
    
    // Create a File object
    const file = new File([pdfBlob], `${data.personal.name}_Resume.pdf`, { type: "application/pdf" });
    
    // Navigate with state
    navigate('/aiscore', { state: { file: file } });
  };

  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen w-full flex flex-col">
      <div className="flex flex-col flex-1 px-4 sm:px-8 md:px-20 lg:px-40 py-5">
        
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-6 md:px-10 py-3">
          <Link to="/" className="flex items-center gap-4 group transition-opacity">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold group-hover:text-primary transition-colors">ResumeBuilder</h2>
          </Link>
        </header>

        <main className="flex flex-col flex-1 items-center justify-center gap-8 py-10 text-center">
          
          <div className="flex flex-col items-center gap-6">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <CheckCircle size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Your Resume is Ready!
            </h1>
            <p className="text-subtext-dark text-lg max-w-md mx-auto">
              Congratulations! Your resume has been successfully generated.
            </p>
          </div>

          <div className="mt-8 w-full max-w-md flex flex-col gap-4">
            {/* Button 1: Download */}
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-3 rounded-xl h-16 bg-card-dark border border-border-dark text-text-dark text-xl font-bold hover:bg-primary/10 transition-all"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Download size={24} />}
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>

            {/* Button 2: Check Score (Primary Action) */}
            <button 
              onClick={handleCheckScore}
              className="w-full flex items-center justify-center gap-3 rounded-xl h-16 bg-primary text-white text-xl font-bold hover:bg-violet-400 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2">
                Check AI Score <ArrowRight size={24} />
              </div>
            </button>
          </div>
          
          <Link to="/create" className="text-subtext-dark hover:text-primary text-sm transition-colors">
            Go back to editor
          </Link>

        </main>
      </div>
    </div>
  );
}