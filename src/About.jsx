// About.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function About() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const team = [
    { name: "Aaron Jibin", github: "https://github.com/Aarxn-Jibz" },
    { name: "Anadhika Goswami",  github: "https://github.com/anadhikag" },
    { name: "Anna Isson",  github: "https://github.com/AnnaIsson" },
    { name: "Joel D'Silva",  github: "https://github.com/joel-dsilva" },
  ];

  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen relative selection:bg-primary/20">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* === Header (identical to homepage) === */}
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-10 py-3 relative z-50 bg-background-dark/50 backdrop-blur-md">
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

          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <div className="flex gap-9 text-sm font-medium">
              <a className="hover:text-primary transition-colors" href="#">Templates</a>
              <Link to="/aiscore" className="hover:text-primary transition-colors">AI Score</Link>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-violet-400 transition-colors">
                Sign Up
              </button>
            </div>
          </div>

          <button 
            className="md:hidden size-12 rounded-lg border border-border-dark flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden">
            <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-background-dark p-6 shadow-xl">
              <div className="flex flex-col gap-6">
                <div className="flex justify-end">
                  <button 
                    className="size-10 rounded-lg border border-border-dark flex items-center justify-center"
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="pt-10 flex flex-col gap-6">
                  <a className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-border-dark" href="#" onClick={() => setIsMobileMenuOpen(false)}>Templates</a>
                  <Link to="/aiscore" className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-border-dark" onClick={() => setIsMobileMenuOpen(false)}>AI Score</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === Main Content === */}
        <main className="flex flex-col gap-10 px-4 sm:px-8 pb-16 relative z-10">

          {/* Hero */}
          <section className="text-center pt-12 pb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black">
              Built by Students, for Job Seekers
            </h1>
            <p className="text-subtext-dark mt-6 text-lg max-w-3xl mx-auto">
              ResumeBuilder was created in 7 hours at the Nexus Crew AI Hackathon at Christ University, Bangalore — 
              a project to deliver high quality resumes for both students and professionals.
            </p>
          </section>

          {/* Team */}
          <section className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black">Meet the Team</h2>
              <p className="text-subtext-dark mt-4 max-w-2xl mx-auto">
                Four students united by a shared vision: make job hunting less stressful, more effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div 
                  key={i}
                  className="rounded-2xl border border-border-dark bg-card-dark p-6 flex flex-col items-center gap-4 hover:border-primary/50 transition-colors"
                >
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      account_circle
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-subtext-dark mt-1">{member.role}</p>
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-primary hover:underline text-sm"
                    >
                      GitHub Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features (Web-Optimized) */}
          <section className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black">Why Students & Professionals Love It</h2>
              <p className="text-subtext-dark mt-4 max-w-2xl mx-auto">
                No more guesswork. Just smart, actionable tools — all in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "auto_awesome",
                  title: "AI-Powered Resume Scoring",
                  desc: "Paste a job description — our model analyzes keyword alignment, structure, and impact to give a real-time score and improvement tips.",
                },
                {
                  icon: "description",
                  title: "Professional Templates",
                  desc: "Choose from 8+ ATS-friendly templates designed for tech, finance, design, and more — all fully customizable.",
                },
                {
                  icon: "file_download",
                  title: "One-Click PDF Export",
                  desc: "Export crisp, print-ready PDFs in seconds — no formatting issues, ever.",
                },
                {
                  icon: "lightbulb",
                  title: "Smart Suggestions",
                  desc: "Get AI recommendations on action verbs, quantifiable achievements, and section improvements as you type."
                }
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border border-border-dark bg-card-dark p-6 flex gap-4 hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl flex-shrink-0 mt-1">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{f.title}</h3>
                    <p className="text-subtext-dark mt-2 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Demo Gallery */}
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-black">See It in Action</h2>
              <p className="text-subtext-dark mt-4">
                A clean, intuitive interface that gets out of your way.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                "https://github.com/user-attachments/assets/be3846a7-c97b-46cb-ae63-a93e5c46811a",
                "https://github.com/user-attachments/assets/c49758ec-7f56-4107-9e77-a8f222bbfc9b",
                "https://github.com/user-attachments/assets/5de6c46e-7342-4b37-b440-1a4c40bc8abb"
              ].map((src, i) => (
                <figure key={i} className="rounded-2xl overflow-hidden border border-border-dark bg-card-dark">
                  <img 
                    src={src} 
                    alt={`ResumeBuilder interface screenshot ${i + 1}`} 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-black">Powered By</h2>
              <p className="text-subtext-dark mt-4">
                Built with modern, open-source tools — and a lot of KFC Wings
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "React", icon: "code" },
                { name: "Vite", icon: "bolt" },
                { name: "Tailwind CSS", icon: "palette" },
                { name: "@xenova/transformers", icon: "robot" },
                { name: "jsPDF", icon: "description" },
                { name: "PDF.js", icon: "picture_as_pdf" },
                { name: "Cloudflare Pages", icon: "cloud" },
                { name: "GitHub", icon: "github" }
              ].map((tech, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-border-dark bg-card-dark hover:border-primary/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary text-3xl mb-2">
                    {tech.icon}
                  </span>
                  <span className="text-sm font-medium text-white">{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Try It CTA */}
          <section className="py-8">
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border-dark bg-card-dark/50">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center py-16 px-6 gap-8">
                <h2 className="text-3xl sm:text-4xl font-black max-w-lg">
                  Try ResumeBuilder Today — It’s Free.
                </h2>
                <p className="text-subtext-dark text-lg max-w-xl">
                  No signup required. Create, optimize, and download your resume in under 5 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/create" 
                    className="h-14 px-8 flex items-center justify-center bg-primary text-white font-bold text-lg rounded-xl hover:bg-violet-400 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                  >
                    Create Resume
                  </Link>
                  <a 
                    href="https://github.com/Aarxn-Jibz/resumebuilder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-8 flex items-center justify-center bg-card-dark border border-border-dark text-text-dark font-bold text-lg rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <span className="material-symbols-outlined mr-2">code</span>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* === Footer (identical) === */}
        <footer className="mt-20 border-t border-border-dark py-10 px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-4 md:flex-1 md:justify-start">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48">
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold">ResumeBuilder</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-subtext-dark">
              <a className="hover:text-primary py-2" href="#">About Us</a>
              <a className="hover:text-primary py-2" href="#">Contact</a>
              <Link to="/privacy" className="hover:text-primary py-2">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary py-2">Terms of Service</Link>
            </div>
            <p className="text-sm text-subtext-dark md:flex-1 md:text-right">
              © 2025 ResumeBuilder. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}