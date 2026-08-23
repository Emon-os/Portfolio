"use client";

import { useState } from "react";
import { Preloader } from "@/src/components/Preloader";
import { Nav } from "@/src/components/Nav";
import { Hero } from "@/src/components/Hero";
import { About } from "@/src/components/About";
import { Projects } from "@/src/components/Projects";
import { Contact } from "@/src/components/Contact";
import { Footer } from "@/src/components/Footer";
import { useSmoothScroll } from "@/src/hooks/useSmoothScroll";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll(loaded);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090d16]">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      {loaded && (
        <div className="animate-fade-in">
          <Nav />
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </main>
  );
}
