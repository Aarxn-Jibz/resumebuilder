import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'; 

export default function Home() {
  // 1. Scroll-to-Top Logic
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen relative selection:bg-primary/20">
      
      {/* 2. Background Gradient (Ambient Glow) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* Header */}
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

          {/* Mobile Menu */}
          <button className="md:hidden size-10 rounded-lg border border-border-dark flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main */}
        <main className="flex flex-col gap-6 px-4 sm:px-8 relative z-10">

          {/* Hero Section */}
          <section className="text-center pt-12 pb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black">
              Build a resume that gets you hired.
            </h1>
            
            <p className="text-subtext-dark mt-12 text-lg max-w-2xl mx-auto">
              Our AI-powered tools help you create a professional resume in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                to="/create" 
                className="flex items-center gap-2 h-12 px-5 bg-primary text-white font-bold rounded-lg hover:bg-violet-400 transition-colors"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Create New Resume
              </Link>

              <Link 
                to="/upload" 
                className="flex items-center gap-2 h-12 px-5 bg-card-dark border border-border-dark text-text-dark hover:bg-primary/10 font-bold rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">upload_file</span>
                Upload & Optimize
              </Link>
            </div>
          </section>

          {/* Features */}
          <section className="flex flex-col gap-10 pt-0 pb-4">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-black max-w-2xl mx-auto leading-relaxed">
                Everything you need to create the perfect resume
              </h1>
              <p className="text-subtext-dark max-w-2xl mx-auto mt-4 text-lg">
                Our platform is packed with features to help you stand out.
              </p>
            </div>

            <div className="max-w-5xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: "dashboard",
                    title: "Dozens of Templates",
                    desc: "Choose from professionally designed templates to match your industry."
                  },
                  {
                    icon: "download",
                    title: "Instant Download",
                    desc: "Download your resume in PDF format in one click, ready to send."
                  },
                  {
                    icon: "leaderboard",
                    title: "Real-time Scoring",
                    desc: "See your resume score update live and get AI suggestions."
                  }
                ].map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border-dark bg-card-dark p-6 flex flex-col sm:flex-row items-start gap-4 hover:border-primary/50 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-primary text-5xl shrink-0">
                      {f.icon}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-bold text-white">{f.title}</h2>
                      <p className="text-subtext-dark text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Steps */}
          <section className="flex flex-col gap-10 pt-0 pb-10">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-black">Get Started in 3 Simple Steps</h1>
              <p className="text-subtext-dark max-w-2xl mx-auto mt-6 text-lg">
                Creating a professional resume has never been this easy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto w-full">
              
              <div className="hidden md:block absolute top-12 left-0 w-full h-px">
                <svg className="text-border-dark" height="2" width="100%">
                  <line
                    stroke="currentColor"
                    strokeDasharray="8, 8"
                    strokeWidth="2"
                    x1="0"
                    x2="100%"
                    y1="1"
                    y2="1"
                  ></line>
                </svg>
              </div>

              {[
                {
                  num: "1",
                  title: "Choose a Template",
                  desc: "Select from our library of templates."
                },
                {
                  num: "2",
                  title: "Fill in Your Details",
                  desc: "Use our guided editor and AI suggestions."
                },
                {
                  num: "3",
                  title: "Download & Apply",
                  desc: "Download your resume as a PDF."
                }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-4 text-center z-10 bg-background-dark md:bg-transparent">
                  <div className="size-16 rounded-full bg-background-dark border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold relative z-10">
                    {s.num}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="text-subtext-dark text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- NEW: Bottom Call to Action --- */}
          <section className="py-8">
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border-dark bg-card-dark/50">
              
              {/* CTA Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center py-16 px-6 gap-8">
                <h2 className="text-3xl sm:text-4xl font-black max-w-lg">
                  Ready to land your dream job?
                </h2>
                <p className="text-subtext-dark text-lg max-w-xl">
                  Join thousands of job seekers who have successfully landed offers at top companies using our builder.
                </p>
                <Link 
                  to="/create" 
                  className="h-14 px-8 flex items-center justify-center bg-primary text-white font-bold text-lg rounded-xl hover:bg-violet-400 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                >
                  Build My Resume Now
                </Link>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-border-dark py-10 px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Left Section (Logo) */}
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

            {/* Center Section (Links) */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-subtext-dark">
              <a className="hover:text-primary" href="#">About Us</a>
              <a className="hover:text-primary" href="#">Contact</a>
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            </div>

            {/* Right Section (Copyright) */}
            <p className="text-sm text-subtext-dark md:flex-1 md:text-right">
              © 2025 ResumeBuilder. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}