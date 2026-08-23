"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileHtml,
  FileCss,
  FileJs,
  Atom,
  Lightning,
  Brain,
  Cpu,
  Code,
  DeviceMobile,
} from "@phosphor-icons/react";

import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  { icon: Brain, label: "AI / ML & PyTorch", desc: "Computer Vision & Diagnostics" },
  { icon: Atom, label: "Next.js & React", desc: "App Router & Server Components" },
  { icon: FileJs, label: "TypeScript / JS", desc: "Strict type safety & algorithms" },
  { icon: Lightning, label: "GSAP & Motion", desc: "Immersive web animations" },
  { icon: Cpu, label: "LLM & AI Chatbots", desc: "RAG & Custom Agent pipelines" },
  { icon: DeviceMobile, label: "Full Stack Apps", desc: "Scalable backend & REST API" },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top 75%" };
      gsap.fromTo(
        ".about-photo",
        { opacity: 0, x: -70, filter: "blur(12px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out", scrollTrigger: st }
      );
      gsap.fromTo(
        ".about-copy > *",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: st,
        }
      );
      gsap.fromTo(
        ".skill-chip",
        { opacity: 0, y: 24, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".skill-grid", start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb right-[-5rem] top-10 h-72 w-72 bg-sky-500/20" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="about-photo anim-hidden mx-auto">
          <div
            className="group relative h-80 w-80 rounded-3xl p-[2px] transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 sm:h-[420px] sm:w-[340px] glass overflow-hidden shadow-2xl"
            style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow-strong)" }}
          >
            <div className="h-full w-full rounded-3xl bg-[#0d1424] p-3 flex flex-col justify-between overflow-hidden relative">
              <div className="relative h-full w-full rounded-2xl overflow-hidden group">
                <Image
                  src="/profile.jpg"
                  alt="Emon Khan - AI Engineer & Full Stack Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-sky-400 font-mono font-bold bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-500/30">
                    Emon Khan
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">AI Engineer & Developer</h3>
                  <p className="text-[11px] text-gray-300">PyTorch • Next.js 15 • LLM Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-copy min-w-0">
          <p className="anim-hidden text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            About Me
          </p>
          <h2 className="anim-hidden mt-4 text-3xl font-light tracking-tight sm:text-5xl">
            <span className="text-gradient">Engineering AI Intelligence</span>
            <br />
            <span className="text-foreground/80">with Next.js precision.</span>
          </h2>
          <p className="anim-hidden mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            I&apos;m Emon — an AI engineer and full-stack Next.js developer. I design and train machine learning models (from medical diagnostic systems to recommendation engines and intelligent AI chatbots), then build high-performance, motion-driven web applications to bring them to life.
          </p>

          <div className="skill-grid mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="skill-chip glass flex min-w-0 items-start gap-3 rounded-2xl p-4 transition-all duration-300 hover:glow-ring hover:-translate-y-1 hover:border-sky-400/30"
              >
                <div className="rounded-xl bg-sky-500/10 p-2.5 text-sky-400 shrink-0 border border-sky-500/20">
                  <Icon size={22} weight="light" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground/90">{label}</span>
                  <span className="block truncate text-xs text-muted-foreground mt-0.5">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
