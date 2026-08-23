"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { List, X } from "@phosphor-icons/react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const tray = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tray.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      gsap.fromTo(
        el.querySelectorAll("a"),
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    } else {
      gsap.to(el, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#090d16]/70 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#home" className="min-w-0 truncate text-sm font-semibold tracking-[0.35em] text-foreground/90 hover:text-primary transition-colors">
          EMON<span className="text-primary">.AI</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="glass rounded-full px-5 py-2 text-sm text-foreground transition-all hover:glow-ring hover:scale-105"
          >
            Hire Me
          </a>
        </nav>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full md:hidden text-white"
        >
          <List size={20} weight="light" />
        </button>
      </div>

      <div
        ref={tray}
        className="fixed inset-0 z-50 hidden flex-col items-center justify-center gap-8 space-bg bg-[#090d16]"
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="glass absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-white"
        >
          <X size={20} weight="light" />
        </button>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-3xl font-light tracking-tight text-gradient hover:scale-110 transition-transform"
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
