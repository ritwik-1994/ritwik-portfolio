"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ---- SCENE DATA ----
const NODES = [
  {
    title: "The Challenge",
    emoji: "⚠️",
    tagline: "When projects end, so do consultant careers…",
    main: "After every project, 60% of top STEM consultants left Turing. Leadership saw the churn, but no one saw the system’s true flaw.",
    cta: "Begin the Consultant&apos;s Journey",
    highlight: null,
  },
  {
    title: "The Hidden Gap",
    emoji: "🕵️‍♂️",
    tagline: "The real enemy? Weeks of idle time. Untapped work. Missed connections.",
    main: "Data, interviews, and sales insights all pointed to a single pain: idle consultants eager for short gigs. Clients needed quick wins—but the marketplace couldn’t deliver.",
    cta: "Reveal the Solution Path",
    highlight: "\"I&apos;d do short gigs just to stay active.\"",
  },
  {
    title: "The Leap",
    emoji: "🌉",
    tagline: "A new bridge to engagement: The Gig Marketplace.",
    main: "Instead of costly upskilling or a slow bench, I pitched a gig market: easy to build, instantly valuable, and loved by consultants and business alike.",
    cta: "Build the MVP",
    highlight: null,
  },
  {
    title: "MVP Launch",
    emoji: "🏪",
    tagline: "Start lean. Launch fast. Listen closely.",
    main: "Launched to 500 idle STEM consultants: simple LLM tasks, direct rewards, and a magic spreadsheet. 80% engagement in 30 days.",
    cta: "Scale the Climb",
    highlight: "80% consultant engagement. 50% less churn.",
  },
  {
    title: "Iteration & Scale",
    emoji: "🕰️",
    tagline: "From MVP to movement.",
    main: "Expanded gig types, built a dashboard, launched client-facing work, and set up smart recommendations. Consultants now used gigs as a bridge, not a bench.",
    cta: "Reveal the Summit",
    highlight: null,
  },
  {
    title: "Impact at the Summit",
    emoji: "🌄",
    tagline: "This is what the Gig Marketplace changed—forever.",
    main: "80%+ engagement, 50% lower churn, 40% less idle time, six-figure revenue unlocked, <2% complaints. Consultants found a new home—and so did Turing.",
    cta: "See the Leadership Lessons",
    highlight: null,
    metrics: [
      {
        label: "Consultant Engagement",
        value: "80%+",
        icon: "👥",
        color: "from-[#cabffd] to-[#7cc6fe]",
      },
      {
        label: "Churn Reduction",
        value: "~50%",
        icon: "📉",
        color: "from-[#fcae5a] to-[#85e89d]",
      },
      {
        label: "Idle Time Reduction",
        value: "40%",
        icon: "⏳",
        color: "from-[#7cc6fe] to-[#cabffd]",
      },
      {
        label: "Revenue Unlocked",
        value: "$xxx,xxx",
        icon: "💸",
        color: "from-[#fcae5a] to-[#cabffd]",
      },
      {
        label: "Quality Complaints",
        value: "<2%",
        icon: "✅",
        color: "from-[#85e89d] to-[#cabffd]",
      },
    ],
  },
  {
    title: "The Campfire",
    emoji: "🔥",
    tagline: "The lessons every traveler brings home.",
    main: "Transformed churn into opportunity. Led discovery, MVP, and scale. Told a story that moved business and consultants alike. Built a product—built loyalty.",
    cta: "Restart the Journey",
    highlight: [
      "Turned churn into a data-backed opportunity",
      "Led discovery, synthesis, and reframing",
      "Launched MVP with clear metrics",
      "Drove cross-functional investment",
      "Balanced scale, quality, compliance"
    ],
  },
];

export default function GigMarketplaceFlowchart() {
  const [revealed, setRevealed] = useState(0);
  const [badges, setBadges] = useState<number[]>([]);
  const revealNext = () => setRevealed((n) => Math.min(n + 1, NODES.length - 1));

  return (
    <div className="w-full max-w-2xl mx-auto py-10 select-none">
      <Link
        href="/"
        className="fixed top-7 left-7 z-50 flex items-center gap-2 text-[#257ecb] font-semibold text-base rounded-full px-5 py-2 bg-white/90 hover:bg-[#e1f0fd] shadow-lg ring-1 ring-[#7cc6fe]/40 transition"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </Link>
      {/* Animated, glowing progress path */}
      <div className="flex items-center gap-0.5 mb-10">
        {NODES.map((stop, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              animate={{
                scale: revealed === idx ? 1.24 : 1,
                boxShadow: revealed === idx ? "0 0 26px #cabffd" : "0 1px 2px #cabffd44"
              }}
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#cabffd] via-[#7cc6fe] to-[#fcae5a] border-2 border-white shadow-lg z-20`}
            />
            {idx < NODES.length - 1 && (
              <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-[#cabffd] to-[#e6eaf6] rounded" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex flex-col items-center relative">
        {NODES.map((node, idx) => (
          <div key={idx} className="relative flex flex-col items-center w-full">
            {/* Connecting line */}
            {idx > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: revealed >= idx ? 38 : 0,
                  opacity: revealed >= idx ? 1 : 0,
                }}
                transition={{ duration: 0.6, delay: 0.09 }}
                className="w-1 bg-gradient-to-b from-[#cabffd] to-[#7cc6fe] rounded-full mb-3"
                style={{ minHeight: 30, maxHeight: 38 }}
              />
            )}
            {/* Node Card */}
            <AnimatePresence>
              {revealed >= idx && (
                <motion.div
                  initial={{ opacity: 0, y: 64, scale: 0.93, filter: "blur(5px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0)",
                    boxShadow:
                      revealed === idx
                        ? "0 8px 42px 0 #cabffd88, 0 1px 5px #fcae5a44"
                        : "0 2px 8px 0 #cabffd22",
                  }}
                  exit={{ opacity: 0, y: 90, scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 20,
                  }}
                  className={`relative w-full bg-white/30 backdrop-blur-[7px] shadow-2xl rounded-[2rem] p-8 mb-10 border-2 border-white/50 overflow-hidden`}
                  style={{
                    boxShadow: "0 6px 48px #cabffd66, 0 0px 1px #fff6",
                    background:
                      "radial-gradient(circle at 40% 0,#cabffd66 0%,transparent 75%),rgba(255,255,255,0.32)",
                  }}
                >
                  {/* Glowing Emoji & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="relative text-4xl z-10">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#cabffd] via-[#7cc6fe] to-[#fcae5a] opacity-40 blur-2xl" />
                      <span className="relative">{node.emoji}</span>
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#23272f] tracking-tight drop-shadow z-10">
                      {node.title}
                    </span>
                  </div>
                  {/* Tagline */}
                  <div className="italic text-[#7cc6fe] mb-3 text-base tracking-wide font-semibold">
                    {node.tagline}
                  </div>
                  {/* Main story */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.33, duration: 0.7 }}
                    className="text-[#41475a] text-base sm:text-lg mb-4 leading-relaxed font-medium"
                  >
                    {node.main}
                  </motion.div>
                  {/* Highlight number or quote */}
                  {node.highlight &&
                    (Array.isArray(node.highlight) ? (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {node.highlight.map((badge, i) => (
                          <motion.button
                            key={badge}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2 rounded-xl shadow border border-[#cabffd] bg-white text-[#cabffd] font-semibold text-base transition ${
                              badges.includes(i)
                                ? "bg-gradient-to-r from-[#cabffd]/60 to-[#7cc6fe]/60 text-white"
                                : ""
                            }`}
                            disabled={badges.includes(i)}
                            onClick={() =>
                              setBadges((arr) =>
                                arr.includes(i) ? arr : [...arr, i]
                              )
                            }
                          >
                            {badges.includes(i) ? "🏅" : "🎖️"} {badge}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[#fcae5a] text-lg font-extrabold mt-2">
                        {node.highlight}
                      </div>
                    ))}
                  {/* Impact Metrics: Summit */}
                  {node.metrics && revealed === idx && (
                    <>
                      <div className="mb-3 font-bold text-[#cabffd] text-lg mt-4">
                        This is what the Gig Marketplace changed—forever.
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mt-2 w-full justify-center items-center">
                        {node.metrics.map((m, i) => (
                          <motion.div
                            key={m.label}
                            initial={{ opacity: 0, scale: 0.8, rotateY: -35 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ delay: 0.3 + i * 0.11, type: "spring", stiffness: 220 }}
                            className={`
                              relative flex flex-col items-center justify-center 
                              aspect-[1/1.25] min-w-[110px] max-w-[170px] px-4 py-6
                              bg-gradient-to-tr ${m.color} shadow-2xl
                              rounded-[1.75rem] border-2 border-white/40
                              ring-4 ring-[#cabffd]/30
                              before:absolute before:inset-0 before:rounded-[1.75rem]
                              before:bg-white/10 before:backdrop-blur-sm
                              overflow-hidden group
                            `}
                            style={{ zIndex: 10 - i }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none blur-sm opacity-60 group-hover:opacity-100 transition" />
                            <span className="text-3xl drop-shadow-lg z-10 mb-1">{m.icon}</span>
                            <span className="relative text-4xl font-extrabold drop-shadow-2xl z-10 flex items-center">
                              <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#fcae5a] to-[#cabffd] animate-shine"
                                style={{
                                  backgroundSize: "200% 100%",
                                  animation: "shine 1.6s linear infinite",
                                }}
                              >
                                {m.value}
                              </span>
                            </span>
                            <span className="mt-2 text-base font-semibold text-white/90 text-center z-10 tracking-wide">
                              {m.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      <style jsx global>{`
                        @keyframes shine {
                          0% {
                            background-position: 200% 0;
                          }
                          100% {
                            background-position: 0 0;
                          }
                        }
                      `}</style>
                    </>
                  )}
                  {/* CTA/Next */}
                  {revealed === idx &&
                    idx < NODES.length - 1 && (
                      <button
                        onClick={revealNext}
                        className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold shadow-xl hover:scale-105 transition text-lg tracking-wider backdrop-blur-md"
                        style={{
                          boxShadow: "0 4px 32px #cabffd55,0 0px 1px #fff5"
                        }}
                      >
                        {node.cta}
                      </button>
                    )}
                  {/* End animation for final scene */}
                  {revealed === idx &&
                    idx === NODES.length - 1 &&
                    badges.length === node.highlight?.length && (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1.07, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                        className="text-3xl text-[#16a34a] mt-6 font-bold"
                      >
                        Journey Complete! 🎉
                      </motion.div>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* Soft background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.11 + 0.09 * revealed,
          background:
            revealed < 2
              ? "radial-gradient(circle at 60% 20%, #cabffd 20%, #fceabb 90%)"
              : revealed < 4
              ? "radial-gradient(circle at 60% 80%, #7cc6fe 20%, #cabffd 90%)"
              : "radial-gradient(circle at 30% 50%, #fcae5a 20%, #b5e7fb 90%)",
        }}
        transition={{ duration: 1.3 }}
        className="absolute inset-0 w-full h-full -z-10 rounded-3xl"
      />
    </div>
  );
}
