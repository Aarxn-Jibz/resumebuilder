import React, { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom'; 
import { Loader2, Plus, Trash2, MinusCircle, RotateCcw, GripVertical } from 'lucide-react';

export default function CreateResume() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Refs for Drag and Drop
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragSection = useRef();
  const dragOverSection = useRef();

  // 1. State to control order of sections (Personal stays fixed at top)
  const [sectionOrder, setSectionOrder] = useState([
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ]);

  // State to control visibility
  const [visibleSections, setVisibleServices] = useState({
    experience: true,
    projects: true,
    education: true,
    skills: true
  });

  const [formData, setFormData] = useState({
    personal: { name: "", phone: "", email: "", github: "", linkedin: "" },
    experience: [
      { title: "", company: "", start: "", end: "", desc: "" }
    ],
    education: [
      { school: "", degree: "", start: "", end: "" }
    ],
    skills: "",
    projects: [
      { name: "", link: "", desc: "" }
    ]
  });

  const templates = {
    experience: { title: "", company: "", start: "", end: "", desc: "" },
    education: { school: "", degree: "", start: "", end: "" },
    projects: { name: "", link: "", desc: "" }
  };

  // --- HANDLERS ---

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      const newSection = [...prev[section]];
      newSection[index] = { ...newSection[index], [field]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addBlock = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], templates[section]]
    }));
  };

  const removeBlock = (section, index) => {
    setFormData(prev => {
      const newSection = [...prev[section]];
      newSection.splice(index, 1);
      return { ...prev, [section]: newSection };
    });
  };

  const toggleSection = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // --- DRAG AND DROP LOGIC ---

  // 1. Reorder Items (Internal)
  const handleSortItems = (section) => {
    let _items = [...formData[section]];
    // Remove item from old position
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    // Add to new position
    _items.splice(dragOverItem.current, 0, draggedItemContent);

    // Reset refs
    dragItem.current = null;
    dragOverItem.current = null;

    setFormData(prev => ({ ...prev, [section]: _items }));
  };

  // 2. Reorder Entire Sections
  const handleSortSections = () => {
    let _sections = [...sectionOrder];
    const draggedSectionContent = _sections.splice(dragSection.current, 1)[0];
    _sections.splice(dragOverSection.current, 0, draggedSectionContent);

    dragSection.current = null;
    dragOverSection.current = null;

    setSectionOrder(_sections);
  };

  const handleCreateResume = async () => {
    setIsSaving(true);
    const finalData = { ...formData };
    
    // Clean hidden data and store Order
    Object.keys(visibleSections).forEach(key => {
      if (!visibleSections[key]) {
        if (Array.isArray(finalData[key])) finalData[key] = [];
        else finalData[key] = "";
      }
    });

    // Save the Section Order too so we know how to print it later
    finalData.sectionOrder = sectionOrder.map(s => s.id);

    console.log("Saving:", finalData);
    localStorage.setItem('resumeData', JSON.stringify(finalData)); 

    setTimeout(() => {
      setIsSaving(false);
      navigate('/download');
    }, 1500);
  };

  // --- RENDER HELPERS ---

  // This function renders the specific inputs based on section type
  const renderSectionContent = (sectionId, item, index) => {
    const commonInputClass = "bg-background-dark border border-border-dark h-12 rounded-lg px-4 pr-10 text-white focus:ring-1 focus:ring-primary outline-none w-full"; // Added pr-10 for trash icon space
    
    if (sectionId === 'experience') {
      return (
        <>
          <input onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} value={item.title} className={commonInputClass} placeholder="Job Title" />
          <input onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} value={item.company} className={commonInputClass} placeholder="Company Name" />
          <input onChange={(e) => handleArrayChange('experience', index, 'start', e.target.value)} value={item.start} className={commonInputClass} placeholder="Start Date" />
          <input onChange={(e) => handleArrayChange('experience', index, 'end', e.target.value)} value={item.end} className={commonInputClass} placeholder="End Date" />
          <textarea onChange={(e) => handleArrayChange('experience', index, 'desc', e.target.value)} value={item.desc} className="md:col-span-2 bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none" rows={3} placeholder="Describe your role..."></textarea>
        </>
      );
    }
    if (sectionId === 'education') {
      return (
        <>
          <input onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} value={item.school} className={commonInputClass} placeholder="Institution" />
          <input onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} value={item.degree} className={commonInputClass} placeholder="Degree" />
          <input onChange={(e) => handleArrayChange('education', index, 'start', e.target.value)} value={item.start} className={commonInputClass} placeholder="Start Year" />
          <input onChange={(e) => handleArrayChange('education', index, 'end', e.target.value)} value={item.end} className={commonInputClass} placeholder="End Year" />
        </>
      );
    }
    if (sectionId === 'projects') {
      return (
        <>
          <input onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} value={item.name} className={commonInputClass} placeholder="Project Name" />
          <input onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)} value={item.link} className={commonInputClass} placeholder="Link (Optional)" />
          <textarea onChange={(e) => handleArrayChange('projects', index, 'desc', e.target.value)} value={item.desc} className="md:col-span-2 bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none" rows={3} placeholder="Project Description..."></textarea>
        </>
      );
    }
  };

  return (
    <div className="font-display bg-background-dark min-h-screen w-full flex flex-col text-text-dark">
      <div className="flex flex-col flex-1 px-4 sm:px-8 md:px-20 lg:px-40 py-5">
        
        {/* Header (From Homepage) */}
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-10 py-3">
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

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <div className="flex gap-9 text-sm font-medium">
              <a className="hover:text-primary transition-colors" href="#">Templates</a>
              <Link to="/aiscore" className="hover:text-primary transition-colors">AI Score</Link>
              <a className="hover:text-primary transition-colors" href="#">Blog</a>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-violet-400 transition-colors">
                Sign Up
              </button>
              <button className="rounded-lg h-10 px-4 bg-background-dark border border-border-dark hover:bg-primary/10 text-sm font-bold transition-colors">
                Login
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-8 mt-8">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-4xl font-black tracking-tight">Create Your Resume</p>
          </div>

          {/* 1. PERSONAL DETAILS (Fixed at top) */}
          <section className="animate-fadeIn">
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5 text-primary">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-subtext-dark">Full Name</label>
                <input name="name" onChange={handlePersonalChange} className="bg-card-dark border border-border-dark rounded-lg h-14 px-4 text-text-dark focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. John Doe" /> {/* Increased touch target */}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-subtext-dark">Phone Number</label>
                <input name="phone" onChange={handlePersonalChange} className="bg-card-dark border border-border-dark rounded-lg h-14 px-4 text-text-dark focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. +91 9800123454" /> {/* Increased touch target */}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-subtext-dark">Email</label>
                <input name="email" onChange={handlePersonalChange} className="bg-card-dark border border-border-dark rounded-lg h-14 px-4 text-text-dark focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. john@example.com" /> {/* Increased touch target */}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-subtext-dark">GitHub</label>
                <div className="flex items-center bg-card-dark border border-border-dark rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                  <span className="pl-4 pr-2 text-subtext-dark select-none">github.com/</span>
                  <input name="github" onChange={handlePersonalChange} className="bg-transparent border-none h-14 w-full text-text-dark focus:ring-0 outline-none" placeholder="username" /> {/* Increased touch target */}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-subtext-dark">LinkedIn</label>
                <div className="flex items-center bg-card-dark border border-border-dark rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                  <span className="pl-4 pr-2 text-subtext-dark select-none">linkedin.com/in/</span>
                  <input name="linkedin" onChange={handlePersonalChange} className="bg-transparent border-none h-14 w-full text-text-dark focus:ring-0 outline-none" placeholder="username" /> {/* Increased touch target */}
                </div>
              </div>
            </div>
          </section>

          {/* 2. DRAGGABLE SECTIONS */}
          {sectionOrder.map((section, sectionIndex) => (
            <div 
              key={section.id}
              draggable
              onDragStart={() => (dragSection.current = sectionIndex)}
              onDragEnter={() => (dragOverSection.current = sectionIndex)}
              onDragEnd={handleSortSections}
              onDragOver={(e) => e.preventDefault()}
              className="transition-all"
            >
              {/* SKILLS (Special Case: Textarea) */}
              {section.id === 'skills' ? (
                 <section className="relative group">
                 <div className="flex items-center justify-between px-4 pb-3 pt-5">
                   <div className="flex items-center gap-3">
                     {/* Section Handle */}
                     <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white/10 rounded text-subtext-dark"> {/* Increased touch target */}
                       <GripVertical size={20} />
                     </div>
                     <h2 className="text-[22px] font-bold text-primary">Skills</h2>
                   </div>
                   <button onClick={() => toggleSection('skills')} className="text-subtext-dark hover:text-red-400 transition-colors p-2"> {/* Increased touch target */}
                     {visibleSections.skills ? <MinusCircle size={24} /> : <RotateCcw size={24} />}
                   </button>
                 </div>
                 {visibleSections.skills && (
                   <div className="px-4">
                     <textarea
                       onChange={(e) => setFormData({...formData, skills: e.target.value})}
                       className="bg-card-dark border border-border-dark w-full rounded-lg p-4 h-32 text-white focus:ring-2 focus:ring-primary outline-none"
                       placeholder="List your skills separated by commas..."
                     ></textarea>
                   </div>
                 )}
               </section>
              ) : (
                /* GENERIC ARRAY SECTIONS (Experience, Education, Projects) */
                <section>
                  <div className="flex items-center justify-between px-4 pb-3 pt-5">
                    <div className="flex items-center gap-3">
                      {/* Section Handle */}
                      <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white/10 rounded text-subtext-dark"> {/* Increased touch target */}
                        <GripVertical size={20} />
                      </div>
                      <h2 className={`text-[22px] font-bold transition-colors ${visibleSections[section.id] ? 'text-primary' : 'text-subtext-dark'}`}>
                        {section.label}
                      </h2>
                    </div>
                    <button 
                      onClick={() => toggleSection(section.id)} 
                      className="text-subtext-dark hover:text-red-400 transition-colors p-2" // Increased touch target
                    >
                      {visibleSections[section.id] ? <MinusCircle size={24} /> : <RotateCcw size={24} />}
                    </button>
                  </div>

                  {visibleSections[section.id] && (
                    <div className="flex flex-col gap-6 px-4">
                      {formData[section.id].map((item, i) => (
                        <div 
                          key={i} 
                          draggable
                          onDragStart={() => (dragItem.current = i)}
                          onDragEnter={() => (dragOverItem.current = i)}
                          onDragEnd={() => handleSortItems(section.id)}
                          onDragOver={(e) => e.preventDefault()}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card-dark p-6 pt-10 rounded-xl border border-border-dark relative group transition-transform"
                        >
                          {/* Item Handle */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing text-subtext-dark hover:text-white p-2"> {/* Increased touch target */}
                             <GripVertical size={18} />
                          </div>

                          {/* Trash Icon - Fixed overlapping by using absolute positioning and ensuring input padding */}
                          <button 
                            onClick={() => removeBlock(section.id, i)}
                            className="absolute top-4 right-4 text-subtext-dark hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2" // Increased touch target
                          >
                            <Trash2 size={18} />
                          </button>

                          {renderSectionContent(section.id, item, i)}
                        </div>
                      ))}
                      <button 
                        onClick={() => addBlock(section.id)}
                        className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border-dark rounded-xl text-subtext-dark hover:text-primary hover:border-primary transition-all"
                      >
                        <Plus size={20} /> Add {section.label}
                      </button>
                    </div>
                  )}
                  {!visibleSections[section.id] && (
                    <div className="px-4 py-4 text-center border border-dashed border-border-dark rounded-xl text-subtext-dark italic">
                      {section.label} section hidden
                    </div>
                  )}
                </section>
              )}
            </div>
          ))}

          <div className="px-4 pb-10">
            <button 
              onClick={handleCreateResume}
              disabled={isSaving}
              className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-violet-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : null}
              {isSaving ? "Creating Resume..." : "Create Resume"}
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}