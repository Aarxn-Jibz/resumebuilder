import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, Briefcase, BrainCircuit, Search } from "lucide-react";
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
        
        // Clean and create a Set for O(1) lookup
        const skillSet = new Set(
          txtData.split("\n")
            .map(s => s.replace(/\//g, "").trim().toLowerCase())
            .filter(s => s.length > 1)
        );
        setSkillsDB(skillSet);

        // B. Load Transformer Model
        setInitStatus("Loading AI Neural Network (30MB)...");
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

  // --- 4. SKILL EXTRACTION LOGIC ---
  // Instead of fuzzy regex, we scan text against our massive Set
  const extractSkillsFromText = (text, databaseSet) => {
    const found = new Set();
    const normalizedText = text.toLowerCase();
    
    // Naive approach: Check if every DB skill exists in text. 
    // Optimization: For huge DBs, usually we tokenize text, but checking substrings is more accurate for multi-word skills.
    // To keep it fast for 50k skills, we iterate the Skills list.
    databaseSet.forEach(skill => {
        // Create boundary regex to avoid "Java" matching "Javascript"
        // Escape regex chars
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, "i");
        if (regex.test(normalizedText)) {
            found.add(skill);
        }
    });
    return Array.from(found);
  };

  // --- 5. MAIN HYBRID ALGORITHM ---
  const calculateScore = async () => {
    if (!file || !jdText) {
      setError("Please upload a resume and paste the Job Description.");
      return;
    }

    setLoading(true);
    setError("");
    setInitStatus("Reading PDF & Extracting Keywords...");

    try {
      // A. Get Text
      let resumeText = "";
      if (file.type === "application/pdf") {
        resumeText = await extractTextFromPDF(file);
      } else {
        resumeText = await file.text();
      }

      // B. Filter: Extract ONLY Valid Skills from JD and Resume using Database
      // This removes all the "irrelevant noise"
      const jdSkills = extractSkillsFromText(jdText, skillsDB);
      const resumeSkills = extractSkillsFromText(resumeText, skillsDB);

      if (jdSkills.length === 0) {
        throw new Error("No standard skills found in JD. Try using standard terms like 'Project Management' or 'Python'.");
      }

      setInitStatus("Running Semantic Comparison...");

      // C. Categorize Matches
      const exactMatches = [];
      const semanticMatches = [];
      const missingSkills = [];

      // Cache embeddings for resume skills to avoid re-calculating
      const resumeEmbeddings = {}; 

      // D. Compare Loop
      for (const reqSkill of jdSkills) {
        
        // 1. Check Exact Match
        if (resumeSkills.includes(reqSkill)) {
            exactMatches.push(reqSkill);
            continue;
        }

        // 2. Check Semantic Match (AI)
        // We only compare against the Validated Resume Skills, not the whole text
        let bestSim = -1;
        let bestMatchSkill = "";

        // Generate/Get Embedding for Requirement
        const reqOutput = await extractorRef.current(reqSkill, { pooling: 'mean', normalize: true });
        const reqVec = reqOutput.data;

        for (const candSkill of resumeSkills) {
            // Skip if we already know it's an exact match for something else to save time
            if (exactMatches.includes(candSkill)) continue;

            // Lazy load embedding for candidate skill
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

        // Threshold: 0.6 is usually good for direct skill-to-skill comparison
        if (bestSim > 0.65) { 
            semanticMatches.push({ 
                required: reqSkill, 
                matched: bestMatchSkill, 
                score: bestSim 
            });
        } else {
            missingSkills.push(reqSkill);
        }
      }

      // E. Final Score
      // Weighted: Exact = 100%, Semantic = 80%
      const weightedScore = (exactMatches.length * 1) + (semanticMatches.length * 0.8);
      const totalPossible = jdSkills.length;
      const finalScore = Math.min(Math.round((weightedScore / totalPossible) * 100), 100);

      setResult({
        score: finalScore,
        totalJDSkills: jdSkills.length,
        exactMatches,
        semanticMatches,
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
           <h2 className="text-lg font-bold">ResuBuilder AI (Hybrid)</h2>
        </div>
        <div className="text-xs text-subtext-dark">
            {!isReady ? (
                <span className="text-yellow-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> {initStatus}</span>
            ) : (
                <span className="text-emerald-400 flex items-center gap-1"><BrainCircuit size={12} /> System Ready</span>
            )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-black text-center mb-2">Smart ATS Scoring</h1>
          <p className="text-subtext-dark text-center mb-10">
             Combines dictionary validation with AI context. Only analyzes real skills.
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
              {loading ? initStatus : "Calculate Score"}
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
                     <span className="text-xs text-subtext-dark uppercase font-bold">Match</span>
                   </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Analysis Complete</h3>
                  <p className="text-subtext-dark mb-4">
                    We identified <span className="text-white font-bold">{result.totalJDSkills}</span> required skills. 
                    <span className="text-emerald-400 font-bold"> {result.exactMatches.length}</span> were exact matches, and 
                    <span className="text-blue-400 font-bold"> {result.semanticMatches.length}</span> were inferred by AI.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-400"><CheckCircle size={20} /> Exact Matches</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.exactMatches.map((skill, i) => (
                        <span key={i} className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20">{skill}</span>
                    ))}
                  </div>

                  {result.semanticMatches.length > 0 && (
                    <>
                    <h4 className="font-bold mt-6 mb-4 flex items-center gap-2 text-blue-400"><Search size={20} /> AI Context Matches</h4>
                    <div className="space-y-3">
                        {result.semanticMatches.map((m, i) => (
                        <div key={i} className="bg-background-dark p-3 rounded border border-border-dark text-sm">
                            <div className="flex justify-between">
                                <span className="text-white font-bold">{m.required}</span>
                                <span className="text-subtext-dark text-xs">{(m.score * 100).toFixed(0)}% sim</span>
                            </div>
                            <p className="text-blue-400 italic text-xs mt-1">Matched with: "{m.matched}"</p>
                        </div>
                        ))}
                    </div>
                    </>
                  )}
                </div>

                <div className="bg-card-dark border border-border-dark rounded-xl p-6">
                   <h4 className="font-bold mb-4 flex items-center gap-2 text-red-400"><AlertTriangle size={20} /> Missing Skills</h4>
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