import React from "react";
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen">
      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-10 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48">
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link to="/" className="text-lg font-bold hover:text-primary transition-colors">ResumeBuilder</Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex gap-9 items-center">
              <Link to="/" className="text-sm hover:text-primary">Home</Link>
              <Link to="/aiscore" className="text-sm hover:text-primary">AI Score</Link>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg h-10 px-4 bg-background-dark border border-border-dark hover:bg-primary/10 text-sm font-bold">
                Login
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden size-10 rounded-lg border border-border-dark flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow px-4 sm:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Page Title */}
            <div className="mb-12 border-b border-border-dark pb-8">
              <h1 className="text-3xl sm:text-4xl font-black mb-4">Privacy Policy</h1>
              <p className="text-subtext-dark">Last Updated: 20-11-2025</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10 text-subtext-dark">
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">1. Introduction</h2>
                <p>
                  Your privacy is important to us. This Privacy Policy explains how ResumeBuilder collects, uses, and protects your information when you use our website and AI services.
                </p>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">2. Information We Collect</h2>
                <p className="mb-2">We collect information that you voluntarily provide when creating a resume, including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and physical address.</li>
                  <li><strong>Professional Information:</strong> Employment history, education, skills, and certifications.</li>
                  <li><strong>Uploaded Files:</strong> PDF or text files uploaded for the AI Score analysis.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">3. How We Process Your Data (Local Storage)</h2>
                <div className="bg-card-dark border border-border-dark p-4 rounded-lg">
                  <p className="text-white mb-2"><strong>Client-Side Emphasis:</strong></p>
                  <p className="text-sm">
                    ResumeBuilder is designed with privacy in mind. The majority of data processing happens <strong>locally in your browser</strong>. When you use our AI scoring or ResumeBuilder, the data remains on your device unless you explicitly choose to save it to a cloud account (if available).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">4. Use of AI Technology</h2>
                <p>
                  Our AI scoring system analyzes the text of your resume against provided job descriptions. 
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>We do not use your resume data to train our AI models.</li>
                  <li>The analysis is performed to provide you with a score and suggestions for improvement.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">5. Cookies and Local Storage</h2>
                <p>
                  We use your browser's <strong>Local Storage</strong> to save your work-in-progress resumes so you don't lose data if you refresh the page. We may use essential cookies to ensure the website functions correctly.
                </p>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">6. Third-Party Services</h2>
                <p>
                  We do not sell your personal data to third parties. We may use third-party services for:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Hosting and infrastructure.</li>
                  <li>Anonymous analytics to improve website performance.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">7. Your Rights</h2>
                <p className="mb-2">Since most data is stored locally:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You can delete your data at any time by clearing your browser cache or using the "Reset" button within the app.</li>
                  <li>If you have created an account, you may request deletion of your account by contacting us.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at <span className="text-primary">support@resumebuilder.com</span>.
                </p>
              </section>

            </div>
          </div>
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
              <h2 className="text-lg font-bold">ResumeBuilder</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-subtext-dark">
              <a className="hover:text-primary" href="#">About Us</a>
              <a className="hover:text-primary" href="#">Contact</a>
              <Link to="/privacy" className="hover:text-primary text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            </div>

            <p className="text-sm text-subtext-dark">© 2024 ResumeBuilder. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}