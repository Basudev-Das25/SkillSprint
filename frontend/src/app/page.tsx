"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  Map,
  FileText,
  Star,
  ChevronRight,
  Loader2,
  Github,
  Award,
  Target,
  Rocket,
  Lightbulb
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const RoadmapPhase = ({ title, content, phase }: { title: string, content: any, phase: number }) => {
  if (!content) return null;

  // Handle both string and structured object
  const data = typeof content === 'string' ? { description: content } : content;

  return (
    <div className="glass p-8 rounded-3xl border-t-4 border-indigo-500 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Phase {phase}</span>
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </div>
      <h4 className="text-2xl font-bold mb-6">{title}</h4>

      <div className="space-y-6 flex-grow">
        {data.learning_goals && (
          <div>
            <h5 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" /> Learning Goals
            </h5>
            <ul className="space-y-2">
              {Array.isArray(data.learning_goals) ? data.learning_goals.map((goal: string, i: number) => (
                <li key={i} className="text-sm text-slate-400 flex gap-2">
                  <span className="text-indigo-500 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                  {goal}
                </li>
              )) : <li className="text-sm text-slate-400">{data.learning_goals}</li>}
            </ul>
          </div>
        )}

        {data.project_focus && (
          <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
            <h5 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-indigo-400" /> Project Focus
            </h5>
            <p className="font-bold text-indigo-300 text-sm mb-1">{data.project_focus.title}</p>
            <p className="text-xs text-slate-400 mb-3">{data.project_focus.description}</p>
            {data.project_focus.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {data.project_focus.technologies.map((tech: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-800 rounded-md text-[10px] text-slate-400 border border-slate-700">{tech}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {(data.expected_resume_bullets || data.resume_suggestions) && (
          <div>
            <h5 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" /> Resume Highlights
            </h5>
            <ul className="space-y-2">
              {(Array.isArray(data.expected_resume_bullets) ? data.expected_resume_bullets :
                Array.isArray(data.resume_suggestions) ? data.resume_suggestions :
                  [data.expected_resume_bullets || data.resume_suggestions]).map((bullet: string, i: number) => (
                    <li key={i} className="text-xs text-emerald-400/70 italic flex gap-2">
                      <span className="mt-1 flex-shrink-0">+</span>
                      {bullet}
                    </li>
                  ))}
            </ul>
          </div>
        )}

        {data.description && !data.learning_goals && (
          <p className="text-sm text-slate-400 leading-relaxed">{data.description}</p>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file || !jd) return alert("Please upload a resume and provide a job description.");
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Analysis failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      alert(error.message || "Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <nav className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">AI</div>
          <span className="text-xl font-bold tracking-tight">Resume Intelligence</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
        </div>
      </nav>

      {/* Hero Section */}
      {!result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Get Hired with <span className="gradient-text">Precision</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Analyze your resume against any job description, find skill gaps,
            and follow an AI-generated roadmap to land your dream role.
          </p>
        </motion.div>
      )}

      {/* Input Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          layout
          className={`glass p-8 rounded-3xl ${result ? 'lg:col-span-1' : 'lg:col-span-2 max-w-4xl mx-auto w-full'}`}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" /> 1. Upload your Resume (PDF)
              </label>
              <div
                onClick={() => document.getElementById('fileInput')?.click()}
                className="border-2 border-dashed border-slate-700 bg-slate-800/30 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors group"
              >
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-slate-500 mb-4 group-hover:text-indigo-400 group-hover:animate-bounce" />
                  <p className="font-semibold text-slate-300">{file ? file.name : "Drage & drop or click to upload"}</p>
                  <p className="text-xs text-slate-500 mt-2">Max file size 5MB (PDF only)</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" /> 2. Paste Job Description
              </label>
              <textarea
                rows={8}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full bg-slate-800/30 border border-slate-700 rounded-2xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={loading || !file || !jd}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Skill Gaps...
                </>
              ) : (
                <>
                  <Award className="w-5 h-5" />
                  Analyze My Resume
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Loading State Skeleton Placeholder (Optional) */}
        {loading && (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analyzing your skills...</h3>
              <p className="text-slate-400">Comparing keywords, experience level, and tech stack.</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Score Card */}
              <div className="glass p-8 rounded-3xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <Star className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-slate-400 text-sm font-medium">Resume Match Score</h3>
                    <p className="text-4xl font-black">{result.match_score}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.match_score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-indigo-400" /> Skills Intelligence
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                      Matching Skills ({result.skills_analysis?.matching?.length || 0})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.skills_analysis?.matching?.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300 capitalize">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                      Skill Gaps Found ({result.skills_analysis?.missing?.length || 0})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.skills_analysis?.missing?.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-300 capitalize">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruitment Feedback */}
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="text-red-400" /> Recruiter Feedback
                </h3>
                <div className="text-sm text-slate-300 leading-relaxed prose prose-invert max-w-none 
                  prose-headings:text-white prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-6
                  prose-p:mb-4 prose-strong:text-indigo-300 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-2">
                  <ReactMarkdown>{result.recruiter_feedback}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Roadmap Section (Full Width) */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
                <Map className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Your Personalized Upskilling Roadmap</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <RoadmapPhase phase={1} title="30 Days: Foundation" content={result.roadmap?.thirty_day} />
              <RoadmapPhase phase={2} title="60 Days: Build" content={result.roadmap?.sixty_day} />
              <RoadmapPhase phase={3} title="90 Days: Specialized" content={result.roadmap?.ninety_day} />
            </div>

            {/* Project Ideas */}
            <div className="mt-8 glass p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950/30">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Github className="w-5 h-5 text-indigo-400" /> GitHub-Style Project Ideas
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Array.isArray(result.roadmap?.project_ideas) ? result.roadmap.project_ideas.map((project: any, i: number) => (
                  <div key={i} className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
                    <h4 className="font-bold text-indigo-300 mb-2">{project.name || `Project ${i + 1}`}</h4>
                    <p className="text-sm text-slate-400">{project.description || project}</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 whitespace-pre-wrap">{result.roadmap?.project_ideas}</p>
                )}
              </div>
            </div>

            {/* General Resume Suggestions */}
            {(result.roadmap?.resume_suggestions || result.resume_suggestions) && (
              <div className="mt-8 glass p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.02]">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> General Resume & ATS Advice
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(Array.isArray(result.roadmap?.resume_suggestions) ? result.roadmap.resume_suggestions :
                    Array.isArray(result.resume_suggestions) ? result.resume_suggestions :
                      [result.roadmap?.resume_suggestions || result.resume_suggestions]).map((tip: string, i: number) => (
                        <div key={i} className="flex gap-3 text-sm text-slate-300">
                          <span className="text-emerald-500 font-bold">✓</span>
                          {tip}
                        </div>
                      ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-24 pt-12 border-t border-slate-800 text-center text-slate-500 text-sm pb-12">
        <p>© 2026 AI Resume Intelligence. Built with Next.js, FastAPI & Gemini.</p>
      </footer>
    </main>
  );
}
