"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import WhatMattersToMe from "@/components/WhatMattersToMe";
import { Linkedin} from "lucide-react";
import { FaInstagram } from "react-icons/fa"; 
import FunFactsGrid from "@/components/FunFactsGrid";

// Animated count-up for metrics
function useCountUp(target: number) {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setValue((v) => {
        if (v < target) {
          frame = requestAnimationFrame(animate);
          return Math.min(v + Math.ceil((target - v) / 8), target);
        }
        return v;
      });
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

const FUN_FACTS = [
  {
    text: "Recently rode the California Zephyr. SF→Chicago. Fell for the American landscape.",
    emoji: "🚄",
    image: "/images/California_Zephyr.jpg",
  },
  {
    text: "Big GSW and Steph Curry Fan, but respect every GOAT.",
    emoji: "🏆",
    image: "/images/Basketball.jpg",
  },
  {
    text: "Love playing sports.",
    emoji: "🏀",
    image: "/images/Sports.jpg",
  },
  {
    text: "Budding Cook: Love hosting dinners.",
    emoji: "🍳",
    image: "/images/Dinner.jpg",
  },
];


const CASE_STUDIES = [
  {
    title: "AI Agent Onboarding",
    summary: "Reduced onboarding lag by 65%, recovering $500K/month.",
    metric: "-65% Lag",
    emoji: "🤖",
    slug: "ai-onboarding",
    bg: "from-[#fcae5a] to-[#7cc6fe]",
  },
  {
    title: "Gig Marketplace",
    summary: "Cut churn by 70%, launching new revenue streams.",
    metric: "-70% Churn",
    emoji: "🛒",
    slug: "gig-marketplace",
    bg: "from-[#7cc6fe] to-[#85e89d]",
  },
  {
    title: "Rider Experience: Payments & Retention",
    summary: "Scaled to 75K users, payout errors down 42%, engagement soars.",
    metric: "75K MAUs",
    emoji: "💸",
    slug: "rider-experience", // NEW: this matches /app/case-studies/rider-experience/page.tsx
    bg: "from-[#85e89d] to-[#fcae5a]",
  },
  {
    title: "Feed Fairness Algorithm",
    summary: "Improved diversity and engagement (+430K daily users).",
    metric: "+1% DAU",
    emoji: "🎨",
    slug: "feed-diversity",
    bg: "from-[#cabffd] to-[#fcae5a]",
  },
];



export default function Home() {
  const arrValue = useCountUp(100);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#fff1e0] via-[#f8fafc] to-[#b5e7fb] px-4 py-12 overflow-hidden relative">
      {/* Decorative blobs */}
      <span className="absolute -top-20 -left-20 w-72 h-72 bg-[#ffe5ec] opacity-40 blur-2xl rounded-full z-0" />
      <span className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#e0f7fa] opacity-30 blur-2xl rounded-full z-0" />

      {/* HERO SECTION */}
      <section className="relative flex flex-col md:flex-row items-center max-w-5xl w-full mb-14 z-10">
        {/* Big geometric circle */}
        <div className="absolute -top-20 left-0 md:left-[-100px] w-72 h-72 bg-[#fcae5a] opacity-40 rounded-full z-0"></div>
        {/* Triangle accent */}
        <svg
          className="absolute top-4 right-8 w-20 h-20 z-0"
          viewBox="0 0 80 80"
          fill="#7cc6fe"
          opacity={0.4}
          style={{ transform: "rotate(16deg)" }}
        >
          <polygon points="0,80 80,80 40,0" />
        </svg>
        {/* Profile image */}
        <div className="relative z-10 md:mr-10 mb-8 md:mb-0 flex items-center justify-center">
          {/* Static Purple Halo */}
          <div className="absolute -top-3 -left-3 w-64 h-64 rounded-full border-8 border-[#cabffd] z-0" />
          {/* 3D Arc */}
          {/* <div
            className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
            style={{
              width: '264px',
              height: '264px',
              transform: 'translate(-50%, -50%)',
              perspective: 700,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                animation: 'rotate-halo-3d 3.5s linear infinite',
                transformOrigin: '50% 50%',
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 264 264"
                fill="none"
                style={{
                  display: 'block',
                  filter: 'drop-shadow(0 0 12px #cabffd99)',
                }}
              >
                <defs>
                  <linearGradient id="halo-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#cabffd" />
                    <stop offset="100%" stopColor="#7cc6fe" />
                  </linearGradient>
                </defs>
                <path
                  d="M 44 132 A 88 88 0 0 1 220 132"
                  stroke="url(#halo-gradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.85"
                  fill="none"
                  style={{
                    filter: 'blur(1.5px) drop-shadow(0 0 12px #cabffd99)',
                  }}
                />
              </svg>
            </div>
          </div> */}


          {/* Your Dp */}
          <img
            src="/images/Ritwik.jpg"
            alt="Ritwik Chakradhar"
            className="w-56 h-56 rounded-full object-cover border-8 border-white shadow-2xl bg-white relative z-10"
          />
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#7cc6fe] opacity-40 rounded-xl z-0"></div>
        </div>
        {/* Headline and intro */}
        <div className="flex-1 text-center md:text-left z-10 grid gap-3">
          <span className="inline-block mb-1 bg-[#fcae5a] text-white font-bold px-5 py-2 rounded-lg shadow">Product Manager & Builder</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#23272f] leading-tight mb-2 drop-shadow">
            Hi, I’m Ritwik! <span className="inline-block align-middle text-3xl">👋</span>
          </h1>
          <p className="text-xl text-[#4d5875] font-medium mb-3 max-w-xl">
            I believe in the power of clarity, bold design, and joyful products. My work is all about turning messy problems into beautiful, useful experiences—while delivering real, measurable growth.
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <a
              href="https://www.linkedin.com/in/ritwik-chakradhar-047a53ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(100deg, #0e76a8 65%,rgb(0, 66, 157) 100%)",
                color: "#fff",
                border: "1.5px solidrgb(105, 167, 239)",
                boxShadow: "0 2px 16px 0 rgba(10,102,194,0.09), 0 1.5px 8pxrgb(219, 206, 182)"
              }}
            >
              <Linkedin className="w-5 h-5" />
              <span style={{
                background: "linear-gradient(90deg,#ffffff 0%,#e1e9f2 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                letterSpacing: ".01em"
              }}>LinkedIn</span>
            </a>
          <a
            href="https://www.instagram.com/ritwik.chakradhar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all"
            style={{
              background: "linear-gradient(45deg, #fd1d1d, #fcb045 50%, #833ab4 100%)",
              color: "#fff",
            }}
          >
            <FaInstagram className="w-5 h-5" />
            Instagram
          </a>
          <a
            href="mailto:ritwik.chakradhar1994@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all border border-gray-200 bg-white"
            style={{
              color: "#EA4335", // Gmail red
              boxShadow: "0 2px 12px 0 rgba(234,67,53,0.07)"
            }}
          >
            {/* Gmail SVG logo */}
            <span className="w-5 h-5 inline-block">
              <svg viewBox="0 0 512 512" fill="none">
                <rect width="512" height="512" rx="110" fill="#fff"/>
                <path d="M92 158.2l164 120.8 164-120.8V380c0 13.3-10.7 24-24 24H116c-13.3 0-24-10.7-24-24V158.2z" fill="#EA4335"/>
                <path d="M92 158.2l164 120.8 164-120.8" stroke="#34A853" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M92 158.2V132c0-13.3 10.7-24 24-24h280c13.3 0 24 10.7 24 24v26.2" stroke="#4285F4" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="font-semibold text-[#222]">Mail Me</span>
          </a>
          </div>
        </div>
      </section>

      {/* WHAT MATTERS TO ME SECTION */}
      <WhatMattersToMe />

      {/* FUN FACTS */}
      <FunFactsGrid facts={FUN_FACTS} />

      {/* IMPACT METRICS */}
      <section className="w-full max-w-4xl mb-16 z-10">
        <h2 className="text-2xl font-bold text-[#23272f] mb-5 text-center">Results That Matter</h2>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#fcae5a] to-[#7cc6fe] px-6 py-3 rounded-2xl shadow text-white text-xl font-bold">
            💡 ${arrValue}M+ revenue unlocked through a Gig Marketplace
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#85e89d] to-[#fcae5a] px-6 py-3 rounded-2xl shadow text-[#23272f] text-xl font-bold">
            ⚡️ 65% faster onboarding through AI agent ($500K/month saved)
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] px-6 py-3 rounded-2xl shadow text-[#23272f] text-xl font-bold">
            💸 75K+ riders paid, payout errors –42%
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#7cc6fe] to-[#fcae5a] px-6 py-3 rounded-2xl shadow text-[#23272f] text-xl font-bold">
            🎯 +430K DAUs through Feed content Diversity
          </div>
        </div>
        <div className="text-center mt-6 text-lg text-[#41475a] font-medium">
          Want to see how these results happened? Dive into my case studies below!
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative w-full max-w-5xl z-10 mb-16">
        <h2 className="text-2xl font-bold text-[#23272f] mb-8 text-center">Featured Case Studies</h2>
        <div className="grid md:grid-cols-2 gap-8 px-2">
          {CASE_STUDIES.map(({ title, summary, metric, emoji, slug, bg }) => (
            <Link key={slug} href={`/case-studies/${slug}`}>
              <div
                className={`group rounded-3xl bg-white/95 border border-[#f4f1fa] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.035] p-7 flex flex-col gap-3 relative overflow-visible`}
              >
                <span
                  className={`absolute -top-5 left-6 px-5 py-2 rounded-full shadow-md text-base font-bold text-white bg-gradient-to-r ${bg} ring-2 ring-white/70 z-10 transition-all group-hover:scale-105`}
                >
                  {emoji} {metric}
                </span>
                <h3 className="mt-6 text-xl font-black text-[#23272f] group-hover:text-[#7cc6fe] transition">
                  {title}
                </h3>
                <p className="text-[#6d7087] text-base">{summary}</p>
                <span className="mt-2 inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#fcae5a] to-[#cabffd] text-white text-xs font-bold w-fit shadow hover:bg-[#7cc6fe] transition">
                  View Story →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER / CONNECT */}
      <section className="w-full max-w-2xl mx-auto mt-8 rounded-3xl shadow-lg bg-white/95 p-8 border border-[#f4f1fa] text-center z-10">
        <h2 className="text-2xl font-bold text-[#cabffd] mb-2 flex items-center justify-center gap-2">
          🤝 Let’s Connect
        </h2>
        <p className="text-base sm:text-lg text-[#41475a] leading-relaxed mb-4">
          Always up for new ideas, challenging problems, or a good product chat.
          Want to collaborate, swap stories, or just say hi? Let’s talk!
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/about"
            className="inline-block rounded-xl bg-[#cabffd] text-white px-6 py-2 font-bold shadow hover:bg-[#7cc6fe] transition-all"
          >
            About Me
          </a>
          <a
            href="mailto:ritwik.chakradhar1994@gmail.com"
            className="inline-block rounded-xl bg-[#fcae5a] text-white px-6 py-2 font-bold shadow hover:bg-[#7cc6fe] transition-all"
          >
            Contact Me
          </a>
        </div>
      </section>
      
    </main>
    
  );
}


