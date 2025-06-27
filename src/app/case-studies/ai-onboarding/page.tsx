"use client";

import React, { useState } from "react";
import AIOnboardingCaseGame from "@/components/AIOnboardingCaseGame";
import { motion } from "framer-motion";

interface ImpactMetric {
  icon: React.ReactNode;
  headline: string;
  value: { before: string; after: string; delta: string };
  subtext: string;
  color: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
  {
    icon: "⏱️",
    headline: "Lag Dropped 65%",
    value: { before: "11.0 days", after: "3.9 days", delta: "-65%" },
    subtext: "Start time dropped from 11 to 3.9 days.",
    color: "from-[#312e81] via-[#7c3aed] to-[#3b82f6]",
  },
  {
    icon: "💸",
    headline: "$500K/mo Recovered",
    value: { before: "$500K lost", after: "$0 lost", delta: "+$500K/mo" },
    subtext: "Automated onboarding eliminated $500K/month leaks.",
    color: "from-[#0ea5e9] via-[#0369a1] to-[#7cc6fe]",
  },
  {
    icon: "🌟",
    headline: "NPS Up +60",
    value: { before: "9", after: "69", delta: "+60" },
    subtext: "NPS went from 9 to 69.",
    color: "from-[#16a34a] via-[#15803d] to-[#22d3ee]",
  },
  {
    icon: "👍",
    headline: "CSAT +18%",
    value: { before: "7.6", after: "9.0", delta: "+18%" },
    subtext: "Client satisfaction up 18%.",
    color: "from-[#7c3aed] via-[#a21caf] to-[#3b82f6]",
  },
];

interface ImpactTileProps {
  icon: React.ReactNode;
  headline: string;
  value: { before: string; after: string; delta: string };
  subtext: string;
  color: string;
}

function ImpactTile({ icon, headline, value, subtext, color }: ImpactTileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-[2.7rem] p-[2.5px] overflow-visible"
      style={{
        background:
          "linear-gradient(120deg, #b8b8d1 0%, #f6e58d 50%, #b8b8d1 100%)",
      }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          scale: 1.085,
          boxShadow: "0 18px 44px 0 rgba(40,30,100,0.28)",
        }}
        transition={{ type: "spring", stiffness: 210, damping: 20 }}
        className={`
          relative flex flex-col justify-between
          rounded-[2.3rem] px-8 py-6 shadow-lg
          bg-gradient-to-br ${color}
          min-w-[350px] max-w-[420px] h-[180px]
          overflow-visible z-10 border-0
          transition-all
          ${hovered ? "z-50" : ""}
        `}
      >
        <span
          className="absolute top-5 right-5 text-base font-bold bg-white text-[#059669] rounded-xl px-3 py-1 shadow-lg border border-white/80"
          style={{
            letterSpacing: ".01em",
            boxShadow: "0 1px 8px #cabffd33",
          }}
        >
          {value.delta}
        </span>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <span className="text-xl font-extrabold text-white drop-shadow">
            {headline}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base text-white/70 line-through">{value.before}</span>
          <span className="mx-1 text-lg font-bold text-white/90">→</span>
          <span className="text-3xl font-black text-white drop-shadow">
            {value.after}
          </span>
        </div>
        <div className="text-base text-white/90">{subtext}</div>
      </motion.div>
    </div>
  );
}

interface CaseStudySectionProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}

function CaseStudySection({
  icon,
  title,
  color,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-start gap-4">
        <span
          className="text-3xl rounded-full w-14 h-14 flex items-center justify-center"
          style={{ background: color || "#eee" }}
        >
          {icon}
        </span>
        <div className="flex-1 bg-white/90 rounded-xl shadow p-7 border border-[#f3ede7]">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
          <div className="text-base text-[#41475a]">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function AiOnboardingPage() {
  const [showMetrics, setShowMetrics] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center py-10 px-2 bg-gradient-to-br from-[#FCEABB] via-[#fff] to-[#b5e7fb] overflow-x-hidden">
      <div className="bg-gradient-to-r from-[#fcae5a]/20 to-[#7cc6fe]/10 rounded-3xl shadow-md px-6 py-4 mb-10 flex flex-col items-center border border-[#e5e5e5] max-w-3xl w-full mx-auto">
        <h2 className="text-2xl font-black text-[#23272f] mb-2 text-center">
          AI Onboarding Agent: $6M/year Saved, 65% Faster, +60 NPS
        </h2>
        <p className="text-lg text-[#425674] text-center max-w-2xl">
          How I rebuilt onboarding for 3 markets—saving revenue, delighting users, and turning a pain point into a growth lever.
        </p>
      </div>

      <AIOnboardingCaseGame onReveal={() => setShowMetrics(true)} />

      <section className="w-full max-w-7xl mx-auto mb-10 overflow-x-auto overflow-visible">
        {!showMetrics ? (
          <div className="flex items-center justify-center w-full py-8">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-full text-center bg-gradient-to-r from-[#cabffd]/50 to-[#7cc6fe]/30 border-2 border-dashed border-[#cabffd] py-8 rounded-2xl flex flex-col items-center shadow"
            >
              <span className="text-4xl mb-2 animate-bounce">🔒</span>
              <span className="text-lg sm:text-xl font-extrabold text-[#7c3aed]">
                Unlock Real Impact
              </span>
              <span className="text-base text-[#5b54b5] font-medium">
                Complete the interactive journey above to reveal the secrets behind the AI agent onboarding quest.
              </span>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-nowrap gap-8 py-4 overflow-visible">
            {IMPACT_METRICS.map((metric, idx) => (
              <ImpactTile key={idx} {...metric} />
            ))}
          </div>
        )}
      </section>

      {/* My Role & Case StudySections unchanged... (kept from your provided original code) */}
      {/* Always visible: My Role, Case Study Sections */}
      <div className="max-w-3xl mx-auto my-7 bg-white border-l-8 border-[#7cc6fe] shadow-lg rounded-2xl p-6 flex items-center gap-3">
          <span className="text-3xl">🧑‍💻</span>
          <span className="font-bold text-[#23272f] text-lg leading-tight">
            My Role: Personally mapped the funnel, led user and stakeholder interviews, designed AI evals & A/B tests, and owned project delivery.
          </span>
        </div>
  
        <CaseStudySection icon="1️⃣" title="Context & Problem" color="#fcae5a">
          <ul className="list-disc pl-6 leading-relaxed space-y-1">
            <li>Onboarding delays cost ~$500K/mo in lost billable hours.</li>
            <li>
              Median time from “Consultant Chosen” to “Project Start” was <b>11 days</b>—way too slow.
            </li>
            <li>Data chaos: payroll couldn’t reconcile across systems.</li>
          </ul>
        </CaseStudySection>
  
        <CaseStudySection icon="🔍" title="Discovery & Insight" color="#7cc6fe">
          <ul className="list-disc pl-6 leading-relaxed space-y-1">
            <li>Mapped the onboarding funnel, found repetitive, manual steps.</li>
            <li>
              <span className="text-[#7cc6fe] font-semibold">80%+</span> of lag was due to 3 problematic steps and waiting, not real evaluation.
            </li>
            <li>
              Listened to both sales and delivery for root pain and real dollars lost.
            </li>
          </ul>
        </CaseStudySection>
  
        <CaseStudySection icon="💡" title="Solution: AI Onboarding Agent" color="#fcae5a">
          <ul className="list-disc pl-6 leading-relaxed space-y-1">
            <li>
              Automation Iterations: Context Knowledge Graphs, voice screening, availability, negotiation, language.
            </li>
            <li>
              Each stage A/B tested for accuracy, transparency, and Lag improvement.
            </li>
          </ul>
        </CaseStudySection>
  
        <div className="flex gap-2 items-center rounded-xl bg-gradient-to-r from-[#fceabb] to-[#cabffd] p-5 my-7 shadow-lg border border-[#f6e3c3] max-w-3xl mx-auto">
          <span className="text-2xl">🌱</span>
          <span className="text-base font-semibold text-[#23272f]">
            <b>Next:</b> Connect agent to auto-upskilling and feedback loops for continuous improvement.
          </span>
        </div>
   
    </main>
  );
}

  