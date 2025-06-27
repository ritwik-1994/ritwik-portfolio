"use client";
import GigMarketplaceJourney from "@/components/GigMarketplaceJourney";
import React from "react";

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  content: React.ReactNode;
}

export default function GigMarketplacePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#e4edff] via-[#f9fafb] to-[#fceabb] py-14 px-4">
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl p-8 border border-[#cabffd]/30">
        {/* Hero Impact Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 rounded-xl px-5 py-4 bg-gradient-to-r from-[#7cc6fe] via-[#cabffd] to-[#fcae5a] shadow-lg border border-white/40">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold drop-shadow">🚀</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow tracking-tight">
              Turing's Gig Marketplace
            </h1>
          </div>
          <span className="text-base sm:text-lg font-semibold text-[#23272f] bg-white px-5 py-2 rounded-xl shadow-lg ml-0 sm:ml-4 tracking-wider whitespace-nowrap border border-[#cabffd]/30">
            Unlocked New Revenue Stream<br />
            Reduced Consultant Churn
          </span>
        </div>
        <div className="text-lg sm:text-xl text-[#23272f] mb-10 font-semibold tracking-wide flex items-center gap-2 px-3">
          <span className="text-[#fcae5a] text-2xl">💡</span>
          <span>
            <span className="font-semibold text-[#7cc6fe]">Impact:</span>{" "}
            Kept <span className="font-extrabold text-[#23272f]">80%+</span> more consultants engaged. Opened new, scalable revenue streams.
          </span>
        </div>

        {/* Interactive Case Study Journey */}
        <GigMarketplaceJourney />

        {/* Problem Section */}
        <Section
          icon="🛑"
          title="1️⃣ The Problem"
          color="#fcae5a"
          content={
            <ul className="list-disc pl-6 text-[#23272f]">
              <li>
                60% of consultants left the platform waiting between projects.
              </li>
              <li>
                Clients wanted short-term gigs, but we only offered long-term contracts.
              </li>
            </ul>
          }
        />

        {/* What We Learned */}
        <Section
          icon="🔎"
          title="2️⃣ What We Learned"
          color="#cabffd"
          content={
            <ul className="list-disc pl-6 text-[#23272f]">
              <li>User interviews: consultants want steady, flexible work.</li>
              <li>
                Sales feedback: lost PoCs and RLHF/LLM tasks = untapped upside.
              </li>
            </ul>
          }
        />

        {/* Solution */}
        <Section
          icon="🏪"
          title="3️⃣ Our Solution: A Gig Marketplace"
          color="#85e89d"
          content={
            <ul className="list-disc pl-6 text-[#23272f]">
              <li>MVP: Airtable of real tasks, bonus points for completed work.</li>
              <li>
                Targeted LLM training and RLHF gigs—easy to QC and highly in-demand.
              </li>
              <li>
                Quality+engagement loop: reward system, feedback channel, and rapid scaling to full platform.
              </li>
            </ul>
          }
        />

        {/* Results Table */}
        <div className="mb-8 mt-12">
          <h2 className="text-lg font-bold text-[#7cc6fe] mb-2 flex items-center gap-2">
            <span className="text-2xl">🏆</span> 4️⃣ Results
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-base rounded-2xl bg-white shadow-lg">
              <thead>
                <tr className="text-[#7cc6fe] font-bold tracking-wider bg-[#f4f6ff]">
                  <th className="p-2 text-left">KPI</th>
                  <th className="p-2 text-left">Before</th>
                  <th className="p-2 text-left">After</th>
                  <th className="p-2 text-left">Δ</th>
                </tr>
              </thead>
              <tbody className="text-[#23272f] font-semibold">
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#7cc6fe] text-xl">👥</span> Dormant Consultants Engaged
                  </td>
                  <td className="p-2">0%</td>
                  <td className="p-2">70%</td>
                  <td className="p-2 font-bold text-[#27ae60]">+70%</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#fcae5a] text-xl">📉</span> Churn (bench period)
                  </td>
                  <td className="p-2">High</td>
                  <td className="p-2">Low</td>
                  <td className="p-2 font-bold text-[#27ae60]">–70%</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#cabffd] text-xl">🔄</span> Clients Upsold to Long-term
                  </td>
                  <td className="p-2">–</td>
                  <td className="p-2">38%</td>
                  <td className="p-2 font-bold text-[#7c3aed]">New</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#7cc6fe] text-xl">💸</span> Marketplace GMV (18mo)
                  </td>
                  <td className="p-2">$0</td>
                  <td className="p-2">$60M</td>
                  <td className="p-2 font-bold text-[#7c3aed]">Launched</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Step */}
        <blockquote className="border-l-4 border-[#7cc6fe] pl-4 text-[#23272f] bg-[#f4f8ff] rounded-lg p-4 mt-8 font-semibold shadow">
          <span className="text-xl mr-2">🚀</span>
          <b>Roadmap:</b> Dynamic pricing engine and open API for clients to scale the model.
        </blockquote>
      </div>
    </main>
  );
}

// Helper: Section card with left accent and bold heading
function Section({ icon, title, color, content }: SectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl drop-shadow-md">{icon}</span>
        <h2 className={`text-lg font-bold tracking-wider text-[#23272f]`}>
          {title}
        </h2>
      </div>
      <div
        className="rounded-2xl bg-white shadow p-5 border-l-4"
        style={{ borderColor: color }}
      >
        {content}
      </div>
    </section>
  );
}
