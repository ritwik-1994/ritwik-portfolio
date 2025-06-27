"use client";
import RiderExperienceRPG from "@/components/RiderExperienceRPG";

export default function RiderExperiencePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#e4edff] via-[#f9fafb] to-[#fceabb] py-14 px-4">
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl p-8 border border-[#cabffd]/30">
        {/* Hero Impact Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 rounded-xl px-5 py-4 bg-gradient-to-r from-[#7cc6fe] via-[#cabffd] to-[#fcae5a] shadow-lg border border-white/40">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold drop-shadow">🛵</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow tracking-tight">
              Rider Experience: Payments & Retention
            </h1>
          </div>
          <span className="text-base sm:text-lg font-semibold text-[#23272f] bg-white px-5 py-2 rounded-xl shadow-lg ml-0 sm:ml-4 tracking-wider whitespace-nowrap border border-[#cabffd]/30">
            Scaled to 75,000+ riders<br />
            Payout errors down 42%
          </span>
        </div>
        <div className="text-lg sm:text-xl text-[#23272f] mb-10 font-semibold tracking-wide flex items-center gap-2 px-3">
          <span className="text-[#fcae5a] text-2xl">⚡</span>
          <span>
            <span className="font-semibold text-[#7cc6fe]">Impact:</span>{" "}
            <span className="font-extrabold text-[#23272f]">75,000</span> monthly active riders.
            Payout errors <span className="text-[#16a34a] font-bold">↓ 42%</span>.
          </span>
        </div>

        {/* Interactive RPG Simulation */}
        <RiderExperienceRPG />

        {/* Case Study Sections */}
        <Section
          icon="🛑"
          title="1️⃣ Context & Problem"
          color="[#fcae5a]"
          content={
            <ul className="list-disc pl-6 text-[#23272f]">
              <li>30,000+ riders suffered from late payouts and confusing earnings.</li>
              <li>Manual, batch files + lack of real-time info = churn and tickets.</li>
            </ul>
          }
        />
        <Section
          icon="🔎"
          title="2️⃣ Discovery"
          color="[#cabffd]"
          content={
            <ul className="list-disc pl-6 text-[#23272f]">
              <li>Shadowed riders and hubs—batch-processing, surge confusion, and no transparent calculator.</li>
              <li>Support tickets cost ₹45 each, with error rates at 7%.</li>
            </ul>
          }
        />
        <Section
          icon="💡"
          title="3️⃣ Solution: Real-time, Trust-building Platform"
          color="[#7cc6fe]"
          content={
            <ul className="list-disc pl-6 text-[#23272f]">
              <li>Built real-time earnings calculator.</li>
              <li>Instant wallet payouts (via UPI).</li>
              <li>Earnings dashboard and gamified missions for engagement.</li>
            </ul>
          }
        />
        <div className="mb-8 mt-12">
          <h2 className="text-lg font-bold text-[#7cc6fe] mb-2 flex items-center gap-2">
            <span className="text-2xl">🏆</span> 4️⃣ Results
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-base rounded-2xl bg-white shadow-lg">
              <thead>
                <tr className="text-[#7cc6fe] font-bold tracking-wider bg-[#f4f6ff]">
                  <th className="p-2 text-left">Metric</th>
                  <th className="p-2 text-left">Before</th>
                  <th className="p-2 text-left">After</th>
                  <th className="p-2 text-left">Δ</th>
                </tr>
              </thead>
              <tbody className="text-[#23272f] font-semibold">
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#fcae5a] text-xl">❌</span> Payout Errors
                  </td>
                  <td className="p-2">7%</td>
                  <td className="p-2">&lt;3%</td>
                  <td className="p-2 font-bold text-[#16a34a]">-42%</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#cabffd] text-xl">🔢</span> Estimate Accuracy
                  </td>
                  <td className="p-2">88%</td>
                  <td className="p-2">97%</td>
                  <td className="p-2 font-bold text-[#16a34a]">+9pts</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#7cc6fe] text-xl">👥</span> Monthly Active Riders
                  </td>
                  <td className="p-2">–</td>
                  <td className="p-2">75K</td>
                  <td className="p-2 font-bold text-[#cabffd]">New</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2">
                    <span className="text-[#fcae5a] text-xl">💰</span> Support Cost per Ticket
                  </td>
                  <td className="p-2">₹45</td>
                  <td className="p-2">₹18</td>
                  <td className="p-2 font-bold text-[#16a34a]">-60%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Step */}
        <blockquote className="border-l-4 border-[#7cc6fe] pl-4 text-[#23272f] bg-[#f4f8ff] rounded-lg p-4 mt-8 font-semibold shadow">
          <span className="text-xl mr-2">🚀</span>
          <b>Next:</b> Predictive simulator for riders, ML fraud guard for surge gaming.
        </blockquote>
      </div>
    </main>
  );
}

// Section card with icon and strong heading
function Section({ icon, title, color, content }) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl drop-shadow-md">{icon}</span>
        <h2 className={`text-lg font-bold tracking-wider text-[#23272f]`}>{title}</h2>
      </div>
      <div className="rounded-2xl bg-white shadow p-5 border-l-4" style={{ borderColor: color.replace('[', '').replace(']', '') }}>
        {content}
      </div>
    </section>
  );
}
