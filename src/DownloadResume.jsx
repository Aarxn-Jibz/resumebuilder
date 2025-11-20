import React from "react";

export default function DownloadResume() {
  return (
    <div className="font-display bg-black min-h-screen w-full flex flex-col">
      <div className="flex flex-1 justify-center px-4 sm:px-8 md:px-20 lg:px-40 py-5">
        <div className="w-full max-w-[960px] flex flex-col flex-1">
          {/* Header */}
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

          {/* Main */}
          <main className="flex flex-col flex-1 items-center justify-center gap-8 py-10 text-center text-white">
            {/* Text */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                Your Resume is Ready!
              </h1>
              <p className="text-white/60 text-lg max-w-md mx-auto">
                Congratulations! Your resume has been successfully generated and is now ready for download.
              </p>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button className="flex min-w-[200px] max-w-[480px] items-center justify-center gap-2 rounded-lg h-14 px-8 bg-primary text-background-dark text-lg font-bold tracking-[0.015em] hover:bg-teal-300 transition-colors">
                <span className="material-symbols-outlined">download</span>
                <span className="truncate">Download Resume</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
