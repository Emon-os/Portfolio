import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emon — AI Engineer & Full Stack Developer Portfolio",
  description: "Futuristic portfolio of Emon: AI engineer, web and app developer building intelligent digital products, machine learning models, and dynamic interfaces.",
  keywords: ["AI Engineer", "Web Developer", "App Developer", "Next.js", "Machine Learning", "Breast Cancer Detection", "AI Chatbot", "Movie Recommender", "Medicine Tracker", "Bus Ticket App"],
  authors: [{ name: "Emon" }],
  openGraph: {
    title: "Emon — AI Engineer & Full Stack Developer Portfolio",
    description: "Building intelligent, motion-driven products for web, mobile, and AI systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emon — AI Engineer & Full Stack Developer Portfolio",
    description: "Building intelligent, motion-driven products for web, mobile, and AI systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.className}`}>
      <body className="antialiased bg-[#090d16] text-[#f0f4f8] selection:bg-purple-600/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
