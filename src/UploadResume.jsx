import React from "react";
import { Link } from 'react-router-dom';
import NotImplementedImg from './NotImplemented.jpg'; // Import the image

export default function UploadResume() {
  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen relative selection:bg-primary/20">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-10 py-3 relative z-50 bg-background-dark/50 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-4 group transition-opacity">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4C25.7818 14.2173 33.7827 22.2182 44 24Z"
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
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden size-12 rounded-lg border border-border-dark flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main */}
        <main className="flex flex-col flex-1 items-center justify-center gap-8 py-10 text-center px-4 relative z-10">
          <div className="max-w-2xl w-full">
            <div className="flex flex-col gap-3 mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-white">Upload Your Resume</h1>
              <p className="text-subtext-dark text-lg">Let's get started by uploading your existing resume.</p>
            </div>

            {/* Feature Not Implemented Message */}
            <div className="bg-card-dark border border-border-dark rounded-xl p-8 mb-8">
              <div className="flex flex-col items-center">
                
                <div className="w-64 h-64 mb-6 flex items-center justify-center">
                  <img 
                    src={NotImplementedImg} 
                    alt="Feature not implemented" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">Feature Coming Soon!</h2>
                <p className="text-subtext-dark text-center mb-6">
                  Resume upload and parsing is not currently implemented. 
                  We're working on this feature and will have it available soon.
                </p>
              </div>
            </div>

            {/* Alternative Option */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-subtext-dark">Start creating your resume now</p>
              <Link 
                to="/create" 
                className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-background-dark text-base font-bold hover:bg-violet-400 transition-colors"
              >
                Create Resume From Scratch
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
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
              <Link to="/about" className="hover:text-primary py-2">About Us</Link>
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