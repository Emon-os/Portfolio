"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Heartbeat, FilmSlate, Pill, Bus, Robot, Sparkle } from "@phosphor-icons/react";
import { ProjectModal, ProjectData } from "./ProjectModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projectsData: ProjectData[] = [
  {
    id: "breast-cancer",
    title: "Breast Cancer Detection System",
    category: "AI & Medical Deep Learning",
    desc: "Deep convolutional neural network system for automated histopathology & mammogram analysis with high predictive diagnostic confidence.",
    longDesc: "An advanced medical AI application designed to assist oncologists and radiologists. Utilizing PyTorch deep learning models trained on benchmark medical datasets, the system provides automated cell segmentation, tissue malignancy risk scoring, and interactive diagnostic report generation.",
    stack: ["Python", "PyTorch", "OpenCV", "Next.js", "Tailwind CSS", "FastAPI"],
    metrics: [
      { label: "Model Accuracy", value: "99.4%" },
      { label: "Inference Time", value: "< 240ms" },
      { label: "Validation AUC", value: "0.998" },
    ],
    features: [
      "Deep Convolutional Neural Network (ResNet & Vision Transformer) architecture",
      "Automated histopathology tissue region segmentation and anomaly highlighting",
      "Real-time diagnostic report generation with exportable PDF analytics",
      "Strict HIPAA-compliant data pipeline & model confidence thresholding",
    ],
    gradient: "bg-pink-600",
    icon: Heartbeat,
  },
  {
    id: "movie-recommender",
    title: "AI Movie Recommender Platform",
    category: "Machine Learning & Personalization",
    desc: "Intelligent recommendation engine using collaborative filtering and content similarity matching for hyper-personalized cinema suggestions.",
    longDesc: "A next-generation media recommendation system that analyzes viewing history, user sentiment, and acoustic/narrative embeddings to deliver real-time personalized recommendations with minimal latency.",
    stack: ["Next.js 15", "TypeScript", "Scikit-Learn", "Python", "Tailwind CSS", "TMDB API"],
    metrics: [
      { label: "Taste Match Precision", value: "96.8%" },
      { label: "Catalog Index", value: "500k+ Movies" },
      { label: "Realtime Latency", value: "< 80ms" },
    ],
    features: [
      "Hybrid recommendation engine (Collaborative Filtering + Content-Based Cosine Similarity)",
      "Real-time taste profile adjustment based on user interaction history",
      "Cinematic dark-mode visual interface with interactive trailer previews",
      "Vector embeddings search for instant natural language movie query matching",
    ],
    gradient: "bg-purple-600",
    icon: FilmSlate,
  },
  {
    id: "medicine-tracker",
    title: "Smart Medicine Tracker App",
    category: "Healthcare & Patient Wellness",
    desc: "Comprehensive health & medication schedule manager with smart reminders, dosage logs, and prescription refill tracking.",
    longDesc: "A user-centric health management app built to empower patients to adhere to daily medication schedules. Features automated push reminders, pill interaction warnings, adherence analytics, and seamless doctor report sharing.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PWA", "Node.js"],
    metrics: [
      { label: "Adherence Boost", value: "+42%" },
      { label: "Notification Delay", value: "< 1 sec" },
      { label: "Active Users", value: "10,000+" },
    ],
    features: [
      "Dynamic medication schedule generator with customizable dosage intervals",
      "Interactive progress rings and weekly adherence score visualization",
      "Pill conflict alerts & automated refill reminder notifications",
      "Offline-first Progressive Web App (PWA) support with instant local sync",
    ],
    gradient: "bg-emerald-600",
    icon: Pill,
  },
  {
    id: "bus-ticket",
    title: "Bus Ticket Booking Platform",
    category: "Transit & Real-time Booking",
    desc: "High-performance intercity bus reservation web application with live interactive seat selection and instant ticketing.",
    longDesc: "A modern, friction-free transit booking platform designed for high concurrency. Users can select exact seat arrangements across multiple bus categories, compare departure routes, select boarding points, and receive digital mobile tickets instantly.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe API", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Booking Speed", value: "3 Clicks" },
      { label: "Seat Lock Sync", value: "Realtime" },
      { label: "Transaction Safety", value: "100%" },
    ],
    features: [
      "Interactive 2D & 3D bus deck layout with real-time seat lock state synchronization",
      "Multi-route schedule filter by time, price, operator ratings, and bus amenities",
      "Automated QR-code digital ticket generation with SMS/Email notifications",
      "Secure instant payment checkout integration supporting mobile banking & credit cards",
    ],
    gradient: "bg-sky-600",
    icon: Bus,
  },
  {
    id: "ai-chatbots",
    title: "Multi-Agent AI Chatbot Suite",
    category: "Conversational AI & LLM Systems",
    desc: "Full-stack intelligent assistant platform featuring multi-modal agent workflows, custom persona prompts, and streaming responses.",
    longDesc: "An enterprise-grade conversational AI platform enabling users to deploy autonomous sub-agents with specialized skill sets. Supports context-aware RAG (Retrieval-Augmented Generation), custom system instructions, and real-time streaming interfaces.",
    stack: ["Next.js 15", "TypeScript", "OpenAI / LangChain", "Tailwind CSS", "Vector DB", "Vercel AI SDK"],
    metrics: [
      { label: "Token Streaming", value: "60 tps" },
      { label: "Agent Skills", value: "25+ Plugins" },
      { label: "Response Score", value: "98.9%" },
    ],
    features: [
      "Multi-agent architecture supporting custom system instructions & tool usage",
      "Retrieval-Augmented Generation (RAG) vector database search over uploaded PDFs",
      "Real-time token streaming interface with markdown & syntax-highlighted code rendering",
      "Voice input/output capability and customizable agent avatar personas",
    ],
    gradient: "bg-violet-600",
    icon: Robot,
  },
];

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-head > *",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60, scale: 0.94, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".project-grid", start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={root} className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb left-[-6rem] top-1/4 h-80 w-80 bg-sky-500/20" />
      <div className="glow-orb right-[-4rem] bottom-1/4 h-80 w-80 bg-purple-500/20" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="projects-head max-w-2xl">
          <p className="anim-hidden text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-mono flex items-center gap-2">
            <Sparkle size={14} className="text-sky-400" /> Featured Engineering Portfolio
          </p>
          <h2 className="anim-hidden mt-4 text-3xl font-light tracking-tight text-gradient sm:text-5xl font-sans">
            My Core Projects
          </h2>
          <p className="anim-hidden mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Five flagship applications spanning AI medical diagnostics, machine learning recommenders, healthcare schedule trackers, real-time booking, and multi-agent AI assistants.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="project-grid mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((p) => {
            const IconComp = p.icon;
            return (
              <article
                key={p.id}
                onClick={() => setActiveProject(p)}
                className="project-card glass group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:glow-ring border border-white/10 cursor-pointer"
              >
                {/* Accent Orb Background */}
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${p.gradient} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                      <IconComp size={28} weight="duotone" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                      {p.category.split("&")[0]}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {p.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 3 && (
                      <span className="text-[10px] text-muted-foreground self-center">+{p.stack.length - 3}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all group-hover:scale-105"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    View Project
                    <ArrowUpRight size={14} weight="bold" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Case Study Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
