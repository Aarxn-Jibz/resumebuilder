import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'; 
import { useUser, UserButton, useClerk } from '@clerk/clerk-react';
import { supabase } from "./supabaseClient"; 

export default function Profile() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  // --- 1. NEW: State for Data ---
  const [savedResumes, setSavedResumes] = useState([]);
  const [savedScores, setSavedScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // --- 2. NEW: Fetch Data from Supabase ---
  useEffect(() => {
    const fetchData = async () => {
      if (isSignedIn && user) {
        setIsLoading(true);
        try {
          // Fetch Resumes (Note: table name is 'resume' based on your SQL)
          const { data: resumeData, error: resumeError } = await supabase
            .from('resume')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          // Fetch AI Scores
          const { data: scoreData, error: scoreError } = await supabase
            .from('ai_scores')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (resumeData) setSavedResumes(resumeData);
          if (scoreData) setSavedScores(scoreData);
          
          if (resumeError) console.error("Error fetching resumes:", resumeError);
          if (scoreError) console.error("Error fetching scores:", scoreError);

        } catch (err) {
          console.error("Unexpected error:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [isSignedIn, user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
  };

  // Protect the route
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-white">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

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
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
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
            <div className="flex gap-2">
               <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden size-12 rounded-lg border border-border-dark flex items-center justify-center" onClick={toggleMobileMenu}>
            <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden">
            <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-background-dark p-6 shadow-xl">
              <div className="flex justify-end">
                <button className="size-10 rounded-lg border border-border-dark flex items-center justify-center" onClick={toggleMobileMenu}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="pt-10 flex flex-col gap-6">
                <a className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-border-dark" href="#">Templates</a>
                <Link to="/aiscore" className="text-xl font-medium hover:text-primary transition-colors py-3 border-b border-border-dark">AI Score</Link>
                <div className="pt-6 flex flex-col gap-4">
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex flex-col gap-6 px-4 sm:px-8 relative z-10 py-12">

          {/* 1. User Info Card */}
          <section className="text-center pt-12 pb-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8">Your Profile</h1>
              
              <div className="bg-card-dark rounded-2xl border border-border-dark p-8">
                <div className="flex flex-col items-center gap-6">
                  <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary p-1">
                    <img src={user?.imageUrl} alt="Profile" className="rounded-full w-full h-full object-cover" />
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{user?.fullName}</h2>
                    <p className="text-subtext-dark mt-2">{user?.primaryEmailAddress?.emailAddress}</p>
                    <p className="text-subtext-dark mt-1 text-sm">
                      Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>

                  <button onClick={handleSignOut} className="mt-2 px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-bold">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Dynamic Data Sections */}
          <section className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">

            {/* Left Column: Resumes */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-dark pb-4">
                <h2 className="text-2xl font-bold text-white">My Resumes</h2>
                <Link to="/create" className="text-primary hover:underline text-sm font-bold">+ Create New</Link>
              </div>

              {isLoading ? (
                <div className="text-subtext-dark text-center py-10 animate-pulse">Loading resumes...</div>
              ) : savedResumes.length === 0 ? (
                <div className="border border-dashed border-border-dark rounded-xl p-10 text-center text-subtext-dark">
                  <p>You haven't created any resumes yet.</p>
                  <Link to="/create" className="mt-4 inline-block text-primary font-bold hover:underline">Create one now</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {savedResumes.map((resume) => (
                    <div key={resume.id} className="bg-card-dark p-5 rounded-xl border border-border-dark flex justify-between items-center hover:border-primary/50 transition-all group">
                      <div>
                        <h3 className="font-bold text-white text-lg">{resume.title || 'Untitled Resume'}</h3>
                        <p className="text-xs text-subtext-dark mt-1">Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="material-symbols-outlined text-subtext-dark group-hover:text-primary transition-colors">edit</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: AI Scores */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-dark pb-4">
                <h2 className="text-2xl font-bold text-white">AI Analysis History</h2>
                <Link to="/aiscore" className="text-primary hover:underline text-sm font-bold">+ New Analysis</Link>
              </div>

              {isLoading ? (
                <div className="text-subtext-dark text-center py-10 animate-pulse">Loading history...</div>
              ) : savedScores.length === 0 ? (
                <div className="border border-dashed border-border-dark rounded-xl p-10 text-center text-subtext-dark">
                  <p>No AI analysis history found.</p>
                  <Link to="/aiscore" className="mt-4 inline-block text-primary font-bold hover:underline">Check your resume score</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {savedScores.map((item) => (
                    <div key={item.id} className="bg-card-dark p-5 rounded-xl border border-border-dark flex flex-col gap-3 hover:border-primary/50 transition-all">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white text-sm">JD Match Score</h3>
                        <span className={`text-xl font-black ${item.score >= 70 ? 'text-emerald-400' : item.score >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {item.score}%
                        </span>
                      </div>
                      <div className="bg-background-dark p-3 rounded border border-border-dark">
                         <p className="text-xs text-subtext-dark italic line-clamp-2">
                           "{item.job_description}"
                         </p>
                      </div>
                      <div className="flex justify-between items-center text-xs text-subtext-dark">
                         <span>{new Date(item.created_at).toLocaleDateString()}</span>
                         <span>{item.missing_skills?.length || 0} missing skills</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}