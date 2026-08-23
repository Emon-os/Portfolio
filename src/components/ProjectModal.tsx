"use client";

import { useState } from "react";
import { X, CheckCircle, Sparkle, Play, ShieldCheck, Bus, FilmSlate, Pill, Robot, Heartbeat } from "@phosphor-icons/react";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  desc: string;
  longDesc: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  gradient: string;
  icon: any;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const IconComponent = project.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl glass border border-white/20 bg-[#0d1424]/95 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto">
        {/* Ambient Glow */}
        <div className={`absolute -right-20 -top-20 h-72 w-72 rounded-full ${project.gradient} blur-3xl opacity-30 pointer-events-none`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-6 top-6 glass grid h-10 w-10 place-items-center rounded-full text-white/80 hover:text-white hover:border-sky-400/50 transition-all z-10"
        >
          <X size={20} weight="light" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2">
          <div className="rounded-lg bg-sky-500/20 p-2 text-sky-400">
            <IconComponent size={20} weight="duotone" />
          </div>
          <span>{project.category}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
          {project.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {project.longDesc}
        </p>

        {/* Metrics Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass rounded-2xl p-4 border border-white/10 text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-gradient">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Interactive Feature Demo Box */}
        <div className="mt-8 rounded-2xl glass border border-sky-500/20 p-6 bg-[#090d16]/80">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkle size={16} className="text-sky-400 animate-spin" /> Interactive System Simulator
            </span>
            <span className="text-[10px] rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-emerald-400 border border-emerald-500/30">
              Live Prototype
            </span>
          </div>

          <InteractiveSimulator projectId={project.id} />
        </div>

        {/* Key Features List */}
        <div className="mt-8">
          <h3 className="text-base font-semibold text-white mb-3">Key Technical Architecture & Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feat) => (
              <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
                <CheckCircle size={18} className="text-sky-400 shrink-0 mt-0.5" weight="fill" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags & Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-300 font-medium"
              >
                {s}
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-medium text-white transition-all hover:scale-105"
            style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
          >
            Close Interactive Case Study
          </button>
        </div>
      </div>
    </div>
  );
}

function InteractiveSimulator({ projectId }: { projectId: string }) {
  if (projectId === "breast-cancer") return <BreastCancerSimulator />;
  if (projectId === "movie-recommender") return <MovieRecommenderSimulator />;
  if (projectId === "medicine-tracker") return <MedicineTrackerSimulator />;
  if (projectId === "bus-ticket") return <BusTicketSimulator />;
  if (projectId === "ai-chatbots") return <AIChatbotSimulator />;
  return null;
}

function BreastCancerSimulator() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { label: string; confidence: string; status: string }>(null);

  const handleRun = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        label: "Benign Tissue Sample (No Malignancy Detected)",
        confidence: "99.2%",
        status: "Low Risk",
      });
    }, 1200);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 font-mono text-[10px]">
            DCM/IMG
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Sample_Mammogram_Diagnostic_042.dcm</p>
            <p className="text-muted-foreground text-xs mt-0.5">High-resolution biopsy & tissue optical scan</p>
          </div>
        </div>
        <button
          onClick={handleRun}
          disabled={analyzing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
        >
          {analyzing ? <Heartbeat className="animate-spin" size={16} /> : <Play size={16} weight="fill" />}
          {analyzing ? "Running Deep CNN Model..." : "Run AI Diagnostics"}
        </button>
      </div>

      {result && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-300 animate-fade-in flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-emerald-400" />
            <div>
              <p className="font-bold text-sm text-white">{result.label}</p>
              <p className="text-xs text-emerald-200">Neural Network Confidence Score: {result.confidence}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold border border-emerald-400">
            {result.status}
          </span>
        </div>
      )}
    </div>
  );
}

function MovieRecommenderSimulator() {
  const [genre, setGenre] = useState("Sci-Fi");
  const recommendations: Record<string, string[]> = {
    "Sci-Fi": ["Interstellar (98% Match)", "Inception (96% Match)", "Blade Runner 2049 (94% Match)"],
    "Action": ["The Dark Knight (99% Match)", "Mad Max: Fury Road (95% Match)", "Matrix (93% Match)"],
    "Drama": ["Oppenheimer (97% Match)", "Whiplash (95% Match)", "The Social Network (92% Match)"],
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center gap-2 pb-2">
        <span className="text-muted-foreground">Select Taste Profile Genre:</span>
        {["Sci-Fi", "Action", "Drama"].map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              genre === g
                ? "bg-purple-600 text-white font-semibold shadow-md"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {recommendations[genre]?.map((movie, idx) => (
          <div key={idx} className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-300 font-semibold mb-2">
              <FilmSlate size={18} />
              <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-400/30">AI Choice</span>
            </div>
            <p className="text-white font-medium text-xs">{movie}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicineTrackerSimulator() {
  const [doses, setDoses] = useState([
    { name: "Amoxicillin 500mg", time: "08:00 AM", taken: true },
    { name: "Vitamin D3 2000IU", time: "01:00 PM", taken: false },
    { name: "Omega 3 Capsule", time: "08:00 PM", taken: false },
  ]);

  const toggleDose = (index: number) => {
    const updated = [...doses];
    if (updated[index]) {
      updated[index].taken = !updated[index].taken;
      setDoses(updated);
    }
  };

  return (
    <div className="space-y-3 text-xs">
      <p className="text-muted-foreground">Interactive Daily Medication Schedule (Click to mark taken):</p>
      <div className="space-y-2">
        {doses.map((d, i) => (
          <div
            key={i}
            onClick={() => toggleDose(i)}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              d.taken
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-white/5 border-white/10 text-white hover:border-sky-400/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <Pill size={20} className={d.taken ? "text-emerald-400" : "text-sky-400"} />
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-[11px] text-muted-foreground">Scheduled for {d.time}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
              d.taken ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-300"
            }`}>
              {d.taken ? "Completed" : "Pending Dose"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusTicketSimulator() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>("B3");
  const seats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between text-muted-foreground border-b border-white/5 pb-2">
        <span>Route: Dhaka Express → Chittagong (Seat Grid Preview)</span>
        <span className="text-sky-400 font-semibold">{selectedSeat ? `Seat Selected: ${selectedSeat}` : "Select a Seat"}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => setSelectedSeat(seat)}
            className={`p-3 rounded-xl border font-bold text-center transition-all ${
              selectedSeat === seat
                ? "bg-sky-500 border-sky-400 text-black shadow-lg scale-105"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>
    </div>
  );
}

function AIChatbotSimulator() {
  const [messages, setMessages] = useState([
    { role: "user", text: "How does your multi-agent AI system handle complex tasks?" },
    { role: "assistant", text: "I orchestrate specialized LLM agents with custom prompts, vector knowledge base context, and real-time tool calling!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `AI Agent Response: Analyzed query "${userMsg}". Executed sub-routine with 100% confidence!` },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="max-h-36 overflow-y-auto space-y-2 p-2 rounded-xl bg-black/50 border border-white/10">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2.5 rounded-xl max-w-[85%] ${
              m.role === "user"
                ? "ml-auto bg-sky-600 text-white"
                : "bg-white/10 text-gray-200 border border-white/10"
            }`}
          >
            <p className="font-semibold text-[10px] opacity-75 mb-0.5">{m.role === "user" ? "You" : "AI Agent"}</p>
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message to test the AI Assistant..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-sky-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-sky-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}
