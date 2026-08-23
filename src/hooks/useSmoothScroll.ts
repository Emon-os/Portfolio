"use client";

import { useEffect } from "react";

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let cancelled = false;

    (async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled) return;
        
        const onScroll = () => ScrollTrigger.update();
        window.addEventListener("scroll", onScroll, { passive: true });
        ScrollTrigger.refresh();

        return () => {
          window.removeEventListener("scroll", onScroll);
        };
      } catch (e) {
        console.error("ScrollTrigger init error:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled]);
}
