"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "@phosphor-icons/react";

const roles = ["AI Engineer", "Web Developer", "App Developer"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 50, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
          "-=0.5"
        )
        .fromTo(
          ".hero-spline",
          { opacity: 0, x: 80, filter: "blur(14px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.4, ease: "power2.out" },
          "-=1.2"
        );

      gsap.utils.toArray<HTMLElement>(".glow-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: -20 - i * 8,
          x: i % 2 ? 14 : -14,
          duration: 3 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden space-bg pt-28 pb-16"
    >
      <div className="beam pointer-events-none absolute left-1/2 top-0 h-2/3 w-[28rem] -translate-x-1/2" />
      <div className="glow-orb left-[-6rem] top-24 h-72 w-72 bg-sky-500/25" />
      <div className="glow-orb right-[-4rem] top-1/3 h-80 w-80 bg-purple-500/30" />
      <div className="glow-orb bottom-0 left-1/3 h-64 w-64 bg-violet-600/25" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="hero-eyebrow anim-hidden mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] tracking-[0.3em] text-muted-foreground uppercase border border-sky-400/20">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            AI & Full Stack Engineer
          </p>
          <h1 className="text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            <span className="hero-line anim-hidden block text-foreground/90 font-sans">Hi, I&apos;m Emon</span>
            {roles.map((r) => (
              <span key={r} className="hero-line anim-hidden block text-gradient font-semibold">
                {r}
              </span>
            ))}
          </h1>
          <p className="hero-sub anim-hidden mt-7 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            I build intelligent, high-performance products — from deep neural diagnostic systems to immersive Next.js web apps and AI assistants.
          </p>
          <div className="hero-cta anim-hidden mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
              style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow-strong)" }}
            >
              Hire Me
              <ArrowUpRight size={16} weight="light" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#projects"
              className="glass rounded-full px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-white hover:border-sky-400/40"
            >
              Explore Projects
            </a>
          </div>
        </div>

        <div className="hero-spline anim-hidden relative h-[45vh] min-h-[280px] w-full sm:h-[60vh] lg:h-[78vh] rounded-3xl overflow-hidden glass border border-white/10">
          <iframe
            src="https://my.spline.design/orb-HK46YgKcfB71Wy7eB6GKUqFr/"
            title="Interactive 3D orb"
            loading="lazy"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
