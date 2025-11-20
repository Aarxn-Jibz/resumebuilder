import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Loader2 } from 'lucide-react';

export default function CreateResume() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // State to hold all the form data
  const [formData, setFormData] = useState({
    personal: { name: "", phone: "", email: "", github: "", linkedin: "" },
    experience: [
      { title: "", company: "", start: "", end: "", desc: "" },
      { title: "", company: "", start: "", end: "", desc: "" }
    ],
    education: [
      { school: "", degree: "", start: "", end: "" },
      { school: "", degree: "", start: "", end: "" }
    ],
    skills: "",
    projects: [
      { name: "", link: "", desc: "" },
      { name: "", link: "", desc: "" }
    ]
  });

  // Generic handler to update personal details
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  // Generic handler to update array items (Experience, Education, Projects)
  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      const newSection = [...prev[section]];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  };

  // The function that runs when you click "Create Resume"
  const handleCreateResume = async () => {
    setIsSaving(true);

    // 1. Simulate saving to database/local storage
    console.log("Saving Resume Data:", formData);
    localStorage.setItem('resumeData', JSON.stringify(formData)); // Saving to local storage for now

    // 2. Fake delay for visual effect (optional)
    setTimeout(() => {
      setIsSaving(false);
      // 3. Go to the download page
      navigate('/download');
    }, 1500);
  };

  return (
    <div className="font-display bg-background-dark min-h-screen w-full flex flex-col">
      <div className="flex flex-col flex-1 px-4 sm:px-8 md:px-20 lg:px-40 py-5">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-6 md:px-10 py-3 text-white">
          <div className="flex items-center gap-4">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-bold">ResuBuilder</h2>
          </div>
        </header>

        <main className="flex flex-col gap-8 mt-8 text-white">
          {/* HEADING */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-4xl font-black tracking-tight">Create Your Resume</p>
          </div>

          {/* PERSONAL DETAILS */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <div className="flex flex-col gap-4 px-4 py-3">
                <label className="flex flex-col">
                  <p className="text-base pb-2">Full Name</p>
                  <input name="name" onChange={handlePersonalChange} className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50" placeholder="Enter your full name" />
                </label>
              </div>
              <div className="flex flex-col gap-4 px-4 py-3">
                <label className="flex flex-col">
                  <p className="text-base pb-2">Phone Number</p>
                  <input name="phone" onChange={handlePersonalChange} className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50" placeholder="Enter your phone number" />
                </label>
              </div>
              <div className="flex flex-col gap-4 px-4 py-3">
                <label className="flex flex-col">
                  <p className="text-base pb-2">Email</p>
                  <input name="email" onChange={handlePersonalChange} className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50" placeholder="Enter your email" />
                </label>
              </div>
              <div className="flex flex-col gap-4 px-4 py-3">
                <label className="flex flex-col">
                  <p className="text-base pb-2">GitHub</p>
                  <input name="github" onChange={handlePersonalChange} className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50" placeholder="github.com/username" />
                </label>
              </div>
              <div className="flex flex-col gap-4 px-4 py-3 md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-base pb-2">LinkedIn</p>
                  <input name="linkedin" onChange={handlePersonalChange} className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50" placeholder="linkedin.com/in/username" />
                </label>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Work Experience</h2>
            <div className="flex flex-col gap-6 px-4">
              {formData.experience.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141F1F] p-5 rounded-xl border border-white/10">
                  <input onChange={(e) => handleArrayChange('experience', i, 'title', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Job Title" />
                  <input onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Company Name" />
                  <input onChange={(e) => handleArrayChange('experience', i, 'start', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Start Date" />
                  <input onChange={(e) => handleArrayChange('experience', i, 'end', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="End Date" />
                  <textarea onChange={(e) => handleArrayChange('experience', i, 'desc', e.target.value)} className="md:col-span-2 bg-[#193333] rounded-lg px-4 py-3 text-white" rows={3} placeholder="Describe your role and responsibilities"></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Education</h2>
            <div className="flex flex-col gap-6 px-4">
              {formData.education.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141F1F] p-5 rounded-xl border border-white/10">
                  <input onChange={(e) => handleArrayChange('education', i, 'school', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Institution" />
                  <input onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Degree" />
                  <input onChange={(e) => handleArrayChange('education', i, 'start', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Start Year" />
                  <input onChange={(e) => handleArrayChange('education', i, 'end', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="End Year" />
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Skills</h2>
            <div className="px-4">
              <textarea
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="bg-[#193333] w-full rounded-lg p-4 h-32 text-white"
                placeholder="List your skills separated by commas"
              ></textarea>
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Projects</h2>
            <div className="flex flex-col gap-6 px-4">
              {formData.projects.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141F1F] p-5 rounded-xl border border-white/10">
                  <input onChange={(e) => handleArrayChange('projects', i, 'name', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Project Name" />
                  <input onChange={(e) => handleArrayChange('projects', i, 'link', e.target.value)} className="bg-[#193333] h-12 rounded-lg px-4 text-white" placeholder="Link (Optional)" />
                  <textarea onChange={(e) => handleArrayChange('projects', i, 'desc', e.target.value)} className="md:col-span-2 bg-[#193333] rounded-lg px-4 py-3 text-white" rows={3} placeholder="Project Description"></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* DOWNLOAD BUTTON (Functional) */}
          <div className="px-4 pb-10">
            <button 
              onClick={handleCreateResume}
              disabled={isSaving}
              className="mt-6 w-full bg-primary text-black font-bold py-4 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : null}
              {isSaving ? "Creating Resume..." : "Create & Download Resume (PDF)"}
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}