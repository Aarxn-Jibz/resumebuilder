import React, { useState, useEffect } from "react";
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, Briefcase } from "lucide-react";

export default function AIScore() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [skillsDatabase, setSkillsDatabase] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false);

  // FIX: Load PDF.js from CDN to avoid "Could not resolve" build errors
  useEffect(() => {
    if (window.pdfjsLib) {
      setPdfLibLoaded(true);
      return;
    }

    const script = document.createElement("script");
    // Using a specific stable version to ensure worker compatibility
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      // Set worker source immediately after load
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      setPdfLibLoaded(true);
    };
    script.onerror = () => setError("Failed to load PDF processing library.");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        // Using a fallback list if file fetch fails (common in preview environments)
        const fallbackSkills = "Java\nPython\nC++\nJavaScript\nReact\nNode.js\nSQL\nData Analysis\nMachine Learning\nCommunication\nLeadership\nProject Management\nGit\nHTML\nCSS\nRedux\nTypeScript";
        
        let text = fallbackSkills;
        try {
          const response = await fetch("/linkedin_skills.txt");
          if (response.ok) {
            text = await response.text();
          } else {
            console.warn("Using fallback skills list (linkedin_skills.txt not found)");
          }
        } catch (e) {
          console.warn("Using fallback skills list due to fetch error");
        }

        const cleanList = text
          .split("\n")
          .map((line) => line.replace(/\//g, "").replace(/"/g, "").trim())
          .filter((line) => line.length > 0);

        setSkillsDatabase(cleanList);
        setDbLoading(false);
      } catch (err) {
        console.error("Error loading skills:", err);
        setError("Failed to initialize skills database.");
        setDbLoading(false);
      }
    };

    loadSkills();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError("");
    }
  };

  const extractTextFromPDF = async (file) => {
    if (!pdfLibLoaded || !window.pdfjsLib) {
      throw new Error("PDF Library not loaded yet.");
    }

    const arrayBuffer = await file.arrayBuffer();
    // Newer versions of PDF.js prefer receiving data in an object structure
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = (textContent.items || [])
        .map((item) => item.str || "")
        .join(" ");
      fullText += pageText + " ";
    }
    return fullText;
  };

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const calculateScore = async () => {
    if (!file || !jdText) {
      setError("Please upload a resume and paste the Job Description.");
      return;
    }

    if (!pdfLibLoaded) {
      setError("PDF processing library is still initializing. Please wait a moment.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let resumeText = "";
      if (file.type === "application/pdf") {
        resumeText = await extractTextFromPDF(file);
      } else {
        resumeText = await file.text();
      }

      console.log("Extracted Text Preview:", resumeText.substring(0, 100));

      const normResume = resumeText.toLowerCase();
      const normJD = jdText.toLowerCase();

      const requiredSkills = skillsDatabase.filter((skill) => {
        const escaped = escapeRegex(skill.toLowerCase());
        const regex = new RegExp(`\\b${escaped}\\b`, "i");
        return regex.test(normJD);
      });

      const matchedSkills = requiredSkills.filter((skill) => {
        const escaped = escapeRegex(skill.toLowerCase());
        const regex = new RegExp(`\\b${escaped}\\b`, "i");
        return regex.test(normResume);
      });

      const missingSkills = requiredSkills.filter(
        (skill) => !matchedSkills.includes(skill)
      );

      let score = 0;
      if (requiredSkills.length > 0) {
        score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
      } else {
        // Fallback: Keyword density matching if no specific skills found
        const jdWords = new Set(normJD.split(/[^a-z0-9]+/));
        const resumeWords = new Set(normResume.split(/[^a-z0-9]+/));
        const intersection = new Set(
          [...jdWords].filter((x) => resumeWords.has(x))
        );
        if (jdWords.size > 0) {
            score = Math.round((intersection.size / jdWords.size) * 100);
        }
      }

      setResult({
        score,
        requiredSkills,
        matchedSkills,
        missingSkills,
      });
    } catch (err) {
      console.error("Full error details:", err);
      setError("Error reading file. Please ensure it is a valid PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen w-full flex flex-col">
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
          <h2 className="text-lg font-bold">ResuBuilder AI Score</h2>
        </div>
        <div className="text-xs text-subtext-dark">
            {pdfLibLoaded ? (
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> PDF Engine Ready</span>
            ) : (
                <span className="text-yellow-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> Loading Engine...</span>
            )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-black text-center mb-2">Check Your ATS Score</h1>
          <p className="text-subtext-dark text-center mb-10">
            {dbLoading
              ? "Loading Skills Database..."
              : `Database Loaded: ${skillsDatabase.length} skills ready. Paste JD and upload resume.`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-4">
              <label className="font-bold text-lg flex items-center gap-2">
                <UploadCloud className="text-primary" size={20} /> 1. Upload Resume
              </label>
              <div className="border-2 border-dashed border-border-dark rounded-xl bg-card-dark p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors relative h-64">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud size={48} className="text-primary mb-4" />
                {file ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <FileText size={20} />
                    {file.name}
                  </div>
                ) : (
                  <>
                    <p className="font-bold">Click to Upload</p>
                    <p className="text-sm text-subtext-dark">PDF Only (Max 5MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-bold text-lg flex items-center gap-2">
                <Briefcase className="text-primary" size={20} /> 2. Job Description
              </label>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full h-64 bg-card-dark border border-border-dark rounded-xl p-4 text-sm focus:border-primary outline-none custom-scrollbar resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center mb-12">
            <button
              onClick={calculateScore}
              disabled={loading || dbLoading || !pdfLibLoaded}
              className="bg-primary text-black text-lg font-bold py-4 px-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? "Analyzing..." : "Calculate ATS Score"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8 text-center">
              {error}
            </div>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
              <div className="bg-card-dark border border-border-dark rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                <div className="relative size-40 flex items-center justify-center flex-shrink-0">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-background-dark"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className={result.score > 70 ? "text-primary" : "text-yellow-500"}
                      strokeDasharray={`${result.score}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black">{result.score}%</span>
                    <span className="text-xs text-subtext-dark uppercase font-bold">Match</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {result.score > 75 ? "Excellent Match! 🎉" : "Optimization Needed"}
                  </h3>
                  <p className="text-subtext-dark mb-4">
                    The Job Description contains{" "}
                    <span className="text-white font-bold">{result.requiredSkills.length}</span>{" "}
                    distinct skills found in our database. Your resume matches{" "}
                    <span className="text-primary font-bold">{result.matchedSkills.length}</span> of
                    them.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-400">
                    <CheckCircle size={20} /> Matching Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.length > 0 ? (
                      result.matchedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-subtext-dark italic">No matching skills found.</span>
                    )}
                  </div>
                </div>

                <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-red-400">
                    <AlertTriangle size={20} /> Missing / To Add
                  </h4>
                  <p className="text-xs text-subtext-dark mb-4">
                    The following skills were found in the Job Description but NOT in your resume. Consider adding them if you possess these skills.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.length > 0 ? (
                      result.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/20"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-subtext-dark italic">No missing skills! Good job.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}