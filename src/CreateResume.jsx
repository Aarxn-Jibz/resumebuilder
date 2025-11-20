import React from "react";

export default function CreateResume() {
  return (
    <div className="font-display bg-black min-h-screen w-full flex flex-col">
      <div className="flex flex-col flex-1 px-4 sm:px-8 md:px-20 lg:px-40 py-5">
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

        <main className="flex flex-col gap-8 mt-8 text-white">
          {/* HEADING */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-4xl font-black tracking-tight">Create Your Resume</p>
          </div>

          {/* PERSONAL DETAILS */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {[
                { label: "Full Name", placeholder: "Enter your full name" },
                { label: "Phone Number", placeholder: "Enter your phone number", type: "tel" },
                { label: "Email", placeholder: "Enter your email address", type: "email" },
                { label: "GitHub", placeholder: "github.com/username", type: "url" }
              ].map((field, i) => (
                <div key={i} className="flex flex-col gap-4 px-4 py-3">
                  <label className="flex flex-col">
                    <p className="text-base pb-2">{field.label}</p>
                    <input
                      type={field.type || "text"}
                      className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50"
                      placeholder={field.placeholder}
                    />
                  </label>
                </div>
              ))}

              {/* LinkedIn */}
              <div className="flex flex-col gap-4 px-4 py-3 md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-base pb-2">LinkedIn</p>
                  <input type="url" className="form-input bg-[#193333] border border-white/20 rounded-lg h-14 p-[15px] text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary/50" placeholder="linkedin.com/in/username" />
                </label>
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Work Experience</h2>
            <div className="flex flex-col gap-6 px-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141F1F] p-5 rounded-xl border border-white/10">
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Job Title" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Company Name" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Start Date" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="End Date" />
                  <textarea className="md:col-span-2 bg-[#193333] rounded-lg px-4 py-3" rows={3} placeholder="Describe your role and responsibilities"></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Education</h2>
            <div className="flex flex-col gap-6 px-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141F1F] p-5 rounded-xl border border-white/10">
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Institution" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Degree" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Start Year" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="End Year" />
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Skills</h2>
            <div className="px-4">
              <textarea
                className="bg-[#193333] w-full rounded-lg p-4 h-32"
                placeholder="List your skills separated by commas"
              ></textarea>
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Projects</h2>
            <div className="flex flex-col gap-6 px-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#141F1F] p-5 rounded-xl border border-white/10">
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Project Name" />
                  <input className="bg-[#193333] h-12 rounded-lg px-4" placeholder="Link (Optional)" />
                  <textarea className="md:col-span-2 bg-[#193333] rounded-lg px-4 py-3" rows={3} placeholder="Project Description"></textarea>
                </div>
              ))}
            </div>
          </section>

          {/* DOWNLOAD BUTTON */}
          <div className="px-4 pb-10">
            <button className="mt-6 w-full bg-primary text-black font-bold py-4 rounded-xl hover:opacity-90 transition">
              Download Resume (PDF)
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}