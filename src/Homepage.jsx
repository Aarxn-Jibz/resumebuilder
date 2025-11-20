import React from "react";
import { Link } from 'react-router-dom'; // <--- 1. Added Import

export default function Home() {
  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen">
      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-10 py-3">
          <div className="flex items-center gap-4">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">ResuBuilder</h2>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex gap-9">
              <a className="text-sm hover:text-primary" href="#">Templates</a>
              <Link to="/aiscore" className="text-sm hover:text-primary">AI Score</Link>
              <a className="text-sm hover:text-primary" href="#">Blog</a>
            </div>

            <div className="flex gap-2">
              <button className="rounded-lg h-10 px-4 bg-primary text-black text-sm font-bold">
                Sign Up
              </button>
              <button className="rounded-lg h-10 px-4 bg-background-dark border border-border-dark hover:bg-primary/10 text-sm font-bold">
                Login
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden size-10 rounded-lg border border-border-dark">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main */}
        <main className="flex flex-col gap-16 px-4 sm:px-8">

          {/* Hero Section */}
          <section className="text-center py-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black">
              Build a resume that gets you hired.
            </h1>
            <p className="text-subtext-dark mt-4 text-lg max-w-2xl mx-auto">
              Our AI-powered tools help you create a professional resume in minutes.
            </p>

            {/* --- 2. UPDATED BUTTONS TO LINKS --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                to="/create" 
                className="flex items-center gap-2 h-12 px-5 bg-primary text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
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
            {/* ----------------------------------- */}
            
          </section>

          {/* Features */}
          <section className="flex flex-col gap-10 py-10">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-black max-w-2xl mx-auto">
                Everything you need to create the perfect resume
              </h1>
              <p className="text-subtext-dark max-w-2xl mx-auto">
                Our platform is packed with features to help you stand out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "dashboard",
                  title: "Dozens of Templates",
                  desc: "Choose from professionally designed templates."
                },
                {
                  icon: "download",
                  title: "Instant Download",
                  desc: "Download your resume in one click."
                },
                {
                  icon: "leaderboard",
                  title: "Real-time Scoring",
                  desc: "See your resume score and get suggestions."
                }
              ].map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border-dark bg-card-dark p-6 flex flex-col gap-4"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {f.icon}
                  </span>
                  <div>
                    <h2 className="text-base font-bold">{f.title}</h2>
                    <p className="text-subtext-dark text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="flex flex-col gap-10 py-10">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-black">Get Started in 3 Simple Steps</h1>
              <p className="text-subtext-dark max-w-2xl mx-auto">
                Creating a professional resume has never been this easy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
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
                <div key={i} className="flex flex-col items-center gap-4 p-4 text-center">
                  <div className="size-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold">
                    {s.num}
                  </div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="text-subtext-dark text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-border-dark py-10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48">
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold">ResuBuilder</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-subtext-dark">
              <a className="hover:text-primary" href="#">About Us</a>
              <a className="hover:text-primary" href="#">Contact</a>
              <a className="hover:text-primary" href="#">Privacy Policy</a>
              <a className="hover:text-primary" href="#">Terms of Service</a>
            </div>

            <p className="text-sm text-subtext-dark">© 2024 ResuBuilder. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}