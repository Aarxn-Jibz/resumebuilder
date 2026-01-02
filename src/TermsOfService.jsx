import React from "react";
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen">
      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">

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
              <Link to="/aiscore" className="text-sm hover:text-primary">AI Score</Link>
            </div>

          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden size-10 rounded-lg border border-border-dark flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Main Content - Terms of Service */}
        <main className="flex-grow px-4 sm:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Page Title */}
            <div className="mb-12 border-b border-border-dark pb-8">
              <h1 className="text-3xl sm:text-4xl font-black mb-4">Terms of Service</h1>
              <p className="text-subtext-dark">Last Updated: 20-11-2025</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10 text-subtext-dark">
              
              <section>
                <h2 className="text-xl text-white font-bold mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using ResumeBuilder, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">2. Description of Service</h2>
                <p className="mb-3">
                  ResumeBuilder provides tools for creating, editing, and analyzing resumes. We offer features such as PDF generation and AI-powered Applicant Tracking System (ATS) scoring.
                </p>
                <div className="bg-card-dark border border-border-dark p-4 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-primary">AI Analysis:</strong> The "AI Score" feature uses client-side technology to analyze your resume against a job description. We do not guarantee that a high score on our platform guarantees a job interview or employment.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">3. User Data & Privacy</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-white">Local Processing:</strong> Much of our processing (including the AI scoring) happens locally in your browser.</li>
                  <li><strong className="text-white">Storage:</strong> If you choose to save your resume, data may be stored in your browser's local storage. You are responsible for maintaining the security of your own device.</li>
                  <li><strong className="text-white">Uploads:</strong> When you upload a PDF for analysis, you grant us permission to process that file solely for the purpose of providing the analysis. We do not claim ownership of your resume content.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">4. Usage Restrictions</h2>
                <p className="mb-2">You agree not to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Upload resumes or data that you do not have the right to use.</li>
                  <li>Upload content that is illegal, offensive, or contains malware.</li>
                  <li>Attempt to reverse engineer the AI models or scraping logic used in the application.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">5. No Guarantee of Employment</h2>
                <p className="mb-2">ResumeBuilder is a tool to assist in the job search process. We do not guarantee:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Placement in any job.</li>
                  <li>Accuracy of the AI score compared to real-world corporate ATS systems.</li>
                  <li>That your resume will be error-free (you are responsible for proofreading).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">6. Intellectual Property</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-white">Your Content:</strong> You retain all rights to the personal data and resume content you enter.</li>
                  <li><strong className="text-white">Our Content:</strong> The design, code, algorithms, and "ResumeBuilder" brand belong to us.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">7. Disclaimer of Warranties</h2>
                <p>
                  The service is provided "as is" and "as available" without any warranties of any kind, including the implied warranties of merchantability or fitness for a particular purpose. We do not guarantee the site will be available 100% of the time.
                </p>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">8. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, ResumeBuilder shall not be liable for any indirect, incidental, or consequential damages (including lost opportunities or data) resulting from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl text-white font-bold mb-3">9. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

            </div>
          </div>
        </main>

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
              <Link to="/privacy" className="hover:text-primary ">Privacy Policy</Link>
              <Link className="hover:text-primary text-primary" to="/terms">Terms of Service</Link>
            </div>

            <p className="text-sm text-subtext-dark">© 2026 ResumeBuilder. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}