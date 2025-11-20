import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Added this import

export default function UploadResume() {
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (e) => {
    if (e.target.files?.length) {
      setProcessing(true);
      setTimeout(() => setProcessing(false), 3000); // mock processing
    }
  };

  return (
    <div className="font-display bg-black min-h-screen w-full flex flex-col">
      <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">

          {/* HEADER */}
          <header className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 md:px-10 py-3">
            <div className="flex items-center gap-4 text-white">
              <div className="size-4 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-lg font-bold">ResumeBuilder</h2>
            </div>
          </header>

          {/* MAIN */}
          <main className="flex flex-col flex-1 items-center justify-center gap-8 py-10 text-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight">Upload Your Resume</h1>
              <p className="text-white/60 text-lg">Let's get started by uploading your existing resume.</p>
            </div>

            {/* Upload Box */}
            <div className="w-full max-w-2xl mt-8">
              {!processing ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/30 rounded-xl cursor-pointer bg-[#193333] hover:bg-white/5 hover:border-primary transition" htmlFor="resume-upload-input">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-symbols-outlined text-primary text-5xl">upload_file</span>
                    <p className="mb-2 text-lg font-semibold text-white">Click to upload or drag and drop</p>
                    <p className="text-sm text-white/50">PDF, DOC, DOCX (max 5MB)</p>
                  </div>
                  <input id="resume-upload-input" type="file" className="hidden" onChange={handleFileUpload} />
                </label>
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center bg-[#193333] border-2 border-primary/50 rounded-xl">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-6 text-xl font-bold text-white">Making Resume...</p>
                  <p className="text-white/60 mt-1">Please wait while we process your file.</p>
                </div>
              )}
            </div>

            {/* ALTERNATIVE OPTION */}
            <div className="flex flex-col items-center gap-4 mt-8">
              <p className="text-white/60">or</p>
              {/* UPDATED: Used Link instead of <a> to prevent page reload */}
              <Link to="/create" className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-background-dark text-base font-bold">
                Create Resume From Scratch
              </Link>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}