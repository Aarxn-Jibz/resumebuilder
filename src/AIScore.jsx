import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, Briefcase, BrainCircuit, Search, ScanSearch } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { pipeline, env } from "@xenova/transformers";

// 1. Configure Environment
env.allowLocalModels = false;
env.useBrowserCache = true;
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function AIScore() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [initStatus, setInitStatus] = useState("Initializing...");
  const [isReady, setIsReady] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [skillsDB, setSkillsDB] = useState(new Set());
  const extractorRef = useRef(null);

  // --- 2. INITIALIZE: LOAD BOTH DATABASE AND AI MODEL ---
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // A. Load Text Database
        setInitStatus("Loading Skill Database...");
        const txtReq = await fetch("/linkedin_skills.txt");
        if (!txtReq.ok) throw new Error("Failed to load skills file");
        const txtData = await txtReq.text();
        
        const skillSet = new Set(
          txtData.split("\n")
            .map(s => s.replace(/\//g, "").trim().toLowerCase())
            .filter(s => s.length > 1)
        );
        setSkillsDB(skillSet);

        // B. Load Transformer Model
        setInitStatus("Loading Neural Network...");
        extractorRef.current = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        
        setIsReady(true);
        setInitStatus("");
      } catch (err) {
        console.error("Init Error:", err);
        setError("Failed to initialize system. " + err.message);
      }
    };

    initializeSystem();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  // --- 3. EXTRACTION UTILS ---
  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + " ";
    }
    return fullText;
  };

  const cosineSimilarity = (vecA, vecB) => {
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      magA += vecA[i] * vecA[i];
      magB += vecB[i] * vecB[i];
    }
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  };

  const extractSkillsFromText = (text, databaseSet) => {
    const found = new Set();
    const normalizedText = text.toLowerCase();
    databaseSet.forEach(skill => {
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, "i");
        if (regex.test(normalizedText)) {
            found.add(skill);
        }
    });
    return Array.from(found);
  };

  // --- 4. MAIN ADVANCED ALGORITHM ---
  const calculateScore = async () => {
    if (!file || !jdText) {
      setError("Please upload a resume and paste the Job Description.");
      return;
    }

    setLoading(true);
    setError("");
    setInitStatus("Reading PDF & Extracting Keywords...");

    try {
      let resumeText = "";
      if (file.type === "application/pdf") {
        resumeText = await extractTextFromPDF(file);
      } else {
        resumeText = await file.text();
      }

      // Filter: Extract Valid Skills
      const jdSkills = extractSkillsFromText(jdText, skillsDB);
      const resumeSkills = extractSkillsFromText(resumeText, skillsDB);

      // Prepare Context Chunks (Sentences) from Resume for deep scan
      // We break resume into chunks of ~20 words to give the AI context
      const resumeChunks = resumeText.match(/[^.?!]+[.?!]+[\])'"`”’]*|.+/g)
        ?.map(s => s.trim())
        .filter(s => s.length > 20)
        .slice(0, 100) || []; // Limit to 100 chunks for performance

      if (jdSkills.length === 0) {
        throw new Error("No standard skills found in JD. Try using standard terms like 'Project Management' or 'Python'.");
      }

      setInitStatus("Running Deep Semantic Analysis...");

      const exactMatches = [];
      const semanticMatches = [];
      const contextMatches = []; // NEW: Contextual matches
      const missingSkills = [];

      const resumeEmbeddings = {}; 

      for (const reqSkill of jdSkills) {
        
        if (resumeSkills.includes(reqSkill)) {
            exactMatches.push(reqSkill);
            continue;
        }

        let bestSim = -1;
        let bestMatchSkill = "";

        const reqOutput = await extractorRef.current(reqSkill, { pooling: 'mean', normalize: true });
        const reqVec = reqOutput.data;

        for (const candSkill of resumeSkills) {
            if (exactMatches.includes(candSkill)) continue;

            if (!resumeEmbeddings[candSkill]) {
                const out = await extractorRef.current(candSkill, { pooling: 'mean', normalize: true });
                resumeEmbeddings[candSkill] = out.data;
            }
            
            const sim = cosineSimilarity(reqVec, resumeEmbeddings[candSkill]);
            if (sim > bestSim) {
                bestSim = sim;
                bestMatchSkill = candSkill;
            }
        }

        if (bestSim > 0.55) { 
            semanticMatches.push({ required: reqSkill, matched: bestMatchSkill, score: bestSim });
            continue;
        }

        let bestContextScore = -1;
        let bestContextSnippet = "";

        for (const chunk of resumeChunks) {
             // We embed the chunk on the fly. 
             // Note: This is slower, so we only do it for missing skills.
             const chunkOutput = await extractorRef.current(chunk, { pooling: 'mean', normalize: true });
             const chunkVec = chunkOutput.data;
             const sim = cosineSimilarity(reqVec, chunkVec);

             if (sim > bestContextScore) {
                 bestContextScore = sim;
                 bestContextSnippet = chunk;
             }
        }

        // Context threshold (0.45 is usually sufficient for sentence-level matching)
        if (bestContextScore > 0.45) {
             contextMatches.push({ 
                 required: reqSkill, 
                 score: bestContextScore,
                 snippet: bestContextSnippet 
             });
        } else {
             missingSkills.push(reqSkill);
        }
      }

      const weightedScore = (exactMatches.length * 1) + (semanticMatches.length * 0.8) + (contextMatches.length * 0.5);
      const totalPossible = jdSkills.length;
      const finalScore = Math.min(Math.round((weightedScore / totalPossible) * 100), 100);

      setResult({
        score: finalScore,
        totalJDSkills: jdSkills.length,
        exactMatches,
        semanticMatches,
        contextMatches, // New Data Field
        missingSkills
      });

    } catch (err) {
      console.error(err);
      setError("Analysis Failed: " + err.message);
    } finally {
      setLoading(false);
      setInitStatus("");
    }
  };

  return (
    <div className="font-display bg-background-dark text-text-dark min-h-screen w-full flex flex-col">
      <header className="flex items-center justify-between border-b border-border-dark px-4 sm:px-10 py-3">
        <div className="flex items-center gap-4">
           <div className="size-6 text-primary">
             <svg fill="none" viewBox="0 0 48 48"><path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" /></svg>
           </div>
           <h2 className="text-lg font-bold">ResuBuilder</h2>
        </div>
        <div className="text-xs text-subtext-dark">
            {!isReady ? (
                <span className="text-yellow-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> {initStatus}</span>
            ) : (
                <span className="text-emerald-400 flex items-center gap-1"><BrainCircuit size={12} /> Neural Network Ready</span>
            )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-black text-center mb-2">ATS Analysis</h1>
          <p className="text-subtext-dark text-center mb-10">
             Analyzes exact skills, synonyms, and contextual experience from your resume.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-4">
              <label className="font-bold text-lg flex items-center gap-2">
                <UploadCloud className="text-primary" size={20}/> 1. Upload Resume
              </label>
              <div className="border-2 border-dashed border-border-dark rounded-xl bg-card-dark p-8 flex flex-col items-center justify-center text-center hover:border-primary transition-colors relative h-64">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <UploadCloud size={48} className="text-primary mb-4" />
                {file ? <div className="flex items-center gap-2 text-emerald-400 font-medium"><FileText size={20} />{file.name}</div> : <><p className="font-bold">Click to Upload</p><p className="text-sm text-subtext-dark">PDF Only</p></>}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-bold text-lg flex items-center gap-2">
                <Briefcase className="text-primary" size={20}/> 2. JD Requirements
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
              disabled={loading || !isReady}
              className="bg-primary text-black text-lg font-bold py-4 px-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : null}
              {loading ? initStatus : "Run Deep Analysis"}
            </button>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8 text-center">{error}</div>}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
              <div className="bg-card-dark border border-border-dark rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                <div className="relative size-40 flex items-center justify-center flex-shrink-0">
                   <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-background-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                      <path className={`${result.score > 70 ? 'text-primary' : 'text-yellow-500'}`} strokeDasharray={`${result.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                     <span className="text-4xl font-black">{result.score}%</span>
                     <span className="text-xs text-subtext-dark uppercase font-bold">Score</span>
                   </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Analysis Complete</h3>
                  <p className="text-subtext-dark mb-4">
                    Detected <span className="text-white font-bold">{result.totalJDSkills}</span> required skills. 
                    <br/>
                    Found: <span className="text-emerald-400 font-bold">{result.exactMatches.length} Exact</span>, 
                    <span className="text-blue-400 font-bold"> {result.semanticMatches.length} Synonyms</span>, and 
                    <span className="text-purple-400 font-bold"> {result.contextMatches.length} in Context</span>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-400"><CheckCircle size={20} /> Exact Matches (100%)</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.exactMatches.map((skill, i) => (
                        <span key={i} className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20">{skill}</span>
                    ))}
                  </div>

                  {result.semanticMatches.length > 0 && (
                    <>
                    <h4 className="font-bold mt-6 mb-4 flex items-center gap-2 text-blue-400"><Search size={20} /> Synonyms (80%)</h4>
                    <div className="space-y-2">
                        {result.semanticMatches.map((m, i) => (
                        <div key={i} className="bg-background-dark p-2 rounded border border-border-dark text-sm flex justify-between">
                            <span className="text-white font-bold">{m.required}</span>
                            <span className="text-blue-400 text-xs">Matches "{m.matched}"</span>
                        </div>
                        ))}
                    </div>
                    </>
                  )}

                  {result.contextMatches.length > 0 && (
                    <>
                    <h4 className="font-bold mt-6 mb-4 flex items-center gap-2 text-purple-400"><ScanSearch size={20} /> Contextual Finds (50%)</h4>
                    <div className="space-y-2">
                        {result.contextMatches.map((m, i) => (
                        <div key={i} className="bg-background-dark p-3 rounded border border-border-dark text-sm">
                            <div className="flex justify-between mb-1">
                                <span className="text-white font-bold">{m.required}</span>
                                <span className="text-purple-400 text-xs">{(m.score * 100).toFixed(0)}% probability</span>
                            </div>
                            <p className="text-subtext-dark italic text-xs opacity-70">"...{m.snippet.substring(0, 50)}..."</p>
                        </div>
                        ))}
                    </div>
                    </>
                  )}
                </div>

                <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                   <h4 className="font-bold mb-4 flex items-center gap-2 text-red-400"><AlertTriangle size={20} /> Critical Missing Skills</h4>
                   <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, i) => (
                        <span key={i} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/20">{skill}</span>
                    ))}
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