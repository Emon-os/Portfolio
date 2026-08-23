"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".pre-name span",
        { opacity: 0, y: 28, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "power3.out" }
      )
        .fromTo(
          ".pre-count",
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          "-=0.4"
        )
        .to(
          ".progress-bar",
          {
            width: "100%",
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              const c = el.querySelector<HTMLElement>(".pre-count");
              if (c) c.textContent = `${Math.round(this.progress() * 100)}%`;
            },
          },
          "-=0.2"
        )
        .to(".progress-shell, .pre-count", { opacity: 0, duration: 0.4 })
        .to(el, {
          opacity: 0,
          scale: 0.94,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => done.current(),
        });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center space-bg bg-[#090d16]"
    >
      <div className="glow-orb h-72 w-72 bg-sky-500/30" />
      <div className="beam absolute left-1/2 top-0 h-1/2 w-40 -translate-x-1/2" />
      <p className="pre-name relative text-5xl font-light tracking-[0.3em] text-gradient sm:text-7xl">
        {"EMON".split("").map((c, i) => (
          <span key={i} className="inline-block">
            {c}
          </span>
        ))}
      </p>
      <p className="pre-count relative mt-6 text-xs tracking-[0.4em] text-muted-foreground font-mono">0%</p>
      <div className="progress-shell relative mt-6 h-px w-56 overflow-hidden bg-white/10 sm:w-80">
        <div
          className="progress-bar h-full w-0"
          style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
        />
      </div>
    </div>
  );
}
