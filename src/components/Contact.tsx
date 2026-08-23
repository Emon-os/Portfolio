"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo, PaperPlaneRight, EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top 75%" };
      gsap.fromTo(
        ".contact-head > *",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: st }
      );
      gsap.fromTo(
        ".contact-field",
        { opacity: 0, x: -50, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: st,
        }
      );
      gsap.to(".contact-submit", {
        boxShadow: "var(--shadow-glow-strong)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const targetEmail = "ek369542@gmail.com";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Emon,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent via Portfolio Website.`
    );
    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    try {
      // Send data to Next.js API endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("API send error:", err);
    }

    // Launch native email client with prefilled details
    window.location.href = mailtoUrl;

    setSending(false);
    setSent(true);

    gsap.fromTo(
      ".contact-submit",
      { scale: 1 },
      { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden py-24 sm:py-32">
      <div className="glow-orb right-[-4rem] bottom-10 h-72 w-72 bg-violet-600/25" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="contact-head min-w-0">
          <p className="anim-hidden text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-mono">
            Contact & Hire Me
          </p>
          <h2 className="anim-hidden mt-4 text-3xl font-light tracking-tight text-gradient sm:text-5xl">
            Let&apos;s Build Together
          </h2>
          <p className="anim-hidden mt-4 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
            Whether you want to build an AI medical diagnostic system, custom LLM agent, high-conversion Next.js app, or real-time platform — fill out the form or email me directly.
          </p>
          
          <div className="anim-hidden mt-6 p-4 rounded-2xl glass border border-sky-500/20 max-w-md">
            <p className="text-xs text-sky-400 font-mono font-semibold mb-1">Direct Email Address:</p>
            <a
              href="mailto:ek369542@gmail.com"
              className="text-sm font-bold text-white hover:text-sky-300 transition-colors underline flex items-center gap-2"
            >
              <EnvelopeSimple size={18} className="text-sky-400" />
              ek369542@gmail.com
            </a>
          </div>

          <div className="anim-hidden mt-8 flex gap-4">
            {[
              { Icon: GithubLogo, label: "GitHub", href: "https://github.com" },
              { Icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com" },
              { Icon: EnvelopeSimple, label: "Email Direct", href: "mailto:ek369542@gmail.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass grid h-12 w-12 place-items-center rounded-2xl text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:text-sky-400 hover:glow-ring border border-white/10"
              >
                <Icon size={22} weight="light" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="space-y-4">
            <input
              required
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="contact-field anim-hidden w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 transition-all"
            />
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Your Email Address"
              className="contact-field anim-hidden w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 transition-all"
            />
            <textarea
              required
              name="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your Project Details or Inquiry..."
              className="contact-field anim-hidden w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="contact-submit mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{ background: "var(--gradient-cta)" }}
          >
            {sending ? "Preparing Mail..." : sent ? "Email Sent & Opened in Mail App!" : "Send Email Message"}
            {sent ? <CheckCircle size={18} weight="fill" className="text-emerald-400" /> : <PaperPlaneRight size={18} weight="bold" />}
          </button>

          {sent && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 text-center animate-fade-in">
              <p className="font-semibold">Your email app has been opened with your message!</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">If your email client didn&apos;t open automatically, send directly to <a href="mailto:ek369542@gmail.com" className="underline font-mono text-sky-300">ek369542@gmail.com</a></p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
