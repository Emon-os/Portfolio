"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
}));

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-inner > *",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        }
      );
      gsap.to(".footer-particle", {
        y: -18,
        opacity: 0.9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 0.15, from: "random" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-white/10 py-14 bg-[#090d16]">
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="footer-particle absolute rounded-full bg-sky-400/60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.3,
              boxShadow: "0 0 12px var(--glow)",
            }}
          />
        ))}
      </div>
      <div className="footer-inner relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <p className="anim-hidden text-sm font-semibold tracking-[0.35em] text-foreground/80 font-mono">
          EMON<span className="text-sky-400">.AI</span>
        </p>
        <nav className="anim-hidden flex flex-wrap justify-center gap-6">
          {["Home", "About", "Projects", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs text-muted-foreground transition-colors hover:text-sky-400"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="anim-hidden flex gap-3">
          {[GithubLogo, LinkedinLogo].map((Icon, i) => (
            <a
              key={i}
              href={i === 0 ? "https://github.com" : "https://linkedin.com"}
              target="_blank"
              rel="noreferrer"
              aria-label={i === 0 ? "GitHub" : "LinkedIn"}
              className="glass grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-all duration-300 hover:text-sky-400 hover:glow-ring"
            >
              <Icon size={18} weight="light" />
            </a>
          ))}
        </div>
        <p className="anim-hidden text-xs text-muted-foreground">
          © {new Date().getFullYear()} Emon — AI Engineer & Next.js Developer. Built with Next.js 15.
        </p>
      </div>
    </footer>
  );
}
