"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

// --- Game Constants ---
const CORRECT_METRICS_ORDER = [
  "Rescued Revenue",
  "Onboarding Lag Time",
  "Onboardings with Data Quality Issues",
];

const INSIGHT_PAIRS = [
  {
    problem: "Payroll mismatches",
    cause: "Manual onboarding mistakes",
  },
  {
    problem: "Lost revenue",
    cause: "Delays before project start",
  },
  {
    problem: "Low customer confidence",
    cause: "Unclear communication in onboarding",
  },
];

const GAME_STEPS = [
  {
    label: "Problem Discovery",
    prompt: "Click to reveal how Ritwik discovered the core onboarding problem.",
    action: "click",
    reveal:
      "I interviewed users, mapped $500K/mo lost to delays, and validated pain with consultants, sales, and finance.",
    icon: "🔎",
  },
  {
    label: "Stakeholder Interviews",
    prompt: "Swipe any direction to interview each persona.",
    action: "swipe",
    personas: [
      { name: "Consultant", emoji: "👨‍💼", quote: "Onboarding takes forever!" },
      { name: "Sales Lead", emoji: "💼", quote: "We’re losing deals to delays." },
      { name: "Finance", emoji: "💰", quote: "Too much revenue loss, too slow!" },
      { name: "Delivery", emoji: "🚚", quote: "Payroll chaos every project." },
    ],
    reveal:
      "Gathered insights from all key stakeholders—mapped pain and business loss.",
    icon: "🗣️",
  },
  {
    label: "Synthesize Insights",
    prompt: "Match each problem with its true root cause. Click a problem, then its root cause.",
    action: "match",
    reveal:
      "Synthesized true root causes—unlocked real solutions by connecting pain to root issues.",
    icon: "🧩",
  },
  {
    label: "Prioritize Solutions",
    prompt: "Tap on the solution Ritwik chose first.",
    action: "choose",
    options: [
      {
        text: "Automate onboarding with AI",
        correct: true,
      },
      {
        text: "Hire more support staff",
        correct: false,
        reason: "Scaling with more staff is slow and not cost-effective.",
      },
      {
        text: "Automate onboarding with simple form-based automations",
        correct: false,
        reason:
          "Simple forms can't scale to complex use cases like salary negotiation or technical comms checks.",
      },
    ],
    reveal: "Chose to automate with AI—scalable, measurable, and high-impact.",
    icon: "🚀",
  },
  {
    label: "Rank the Metrics",
    prompt:
      "Drag and drop the metrics below to order them by importance (1 = most important). When you're correct, you can reveal the results.",
    action: "rank",
    metrics: [
      "Onboarding Lag Time",
      "Onboardings with Data Quality Issues",
      "Rescued Revenue",
    ],
    reveal: null,
    icon: "📊",
  },
];

// --- Type Definitions ---
interface AIOnboardingCaseGameProps {
  onReveal: () => void;
}

export default function AIOnboardingCaseGame({ onReveal }: AIOnboardingCaseGameProps) {
  const [step, setStep] = useState(0);
  const [interviewed, setInterviewed] = useState<string[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ problem: string; cause: string }[]>([]);
  const [matchFeedback, setMatchFeedback] = useState("");
  const [chosen, setChosen] = useState<number | null>(null);
  const [attempted, setAttempted] = useState<number[]>([]);
  const [showWrong, setShowWrong] = useState(false);
  const [metrics, setMetrics] = useState<string[]>([
    "Onboarding Lag Time",
    "Onboardings with Data Quality Issues",
    "Rescued Revenue",
  ]);
  const [isMetricsCorrect, setIsMetricsCorrect] = useState(false);

  const current = GAME_STEPS[step];
  const progress = ((step + 1) / GAME_STEPS.length) * 100;

  const next = () => {
    setInterviewed([]);
    setSelectedProblem(null);
    setSelectedCause(null);
    setMatchedPairs([]);
    setMatchFeedback("");
    setChosen(null);
    setAttempted([]);
    setShowWrong(false);
    setIsMetricsCorrect(false);
    setMetrics([
      "Onboarding Lag Time",
      "Onboardings with Data Quality Issues",
      "Rescued Revenue",
    ]);
    setStep((s) => Math.min(s + 1, GAME_STEPS.length - 1));
  };

  const swipeInterview = (name: string) => {
    setInterviewed((list) => (list.includes(name) ? list : [...list, name]));
  };

  const isAllMatched = matchedPairs.length === INSIGHT_PAIRS.length;

  const handleProblemClick = (problem: string) => {
    setSelectedProblem(problem === selectedProblem ? null : problem);
    setMatchFeedback("");
  };

  const handleCauseClick = (cause: string) => {
    if (!selectedProblem) return;
    const match = INSIGHT_PAIRS.find(
      (p) => p.problem === selectedProblem && p.cause === cause
    );
    if (match) {
      setMatchedPairs((pairs) => [...pairs, { problem: selectedProblem, cause }]);
      setMatchFeedback("✔️ Correct pair!");
    } else {
      setMatchFeedback("❌ Not a correct pair. Try again!");
    }
    setTimeout(() => {
      setSelectedProblem(null);
      setSelectedCause(null);
      setMatchFeedback("");
    }, 900);
  };

  const chooseOption = (idx: number, correct: boolean) => {
    setAttempted((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
    setChosen(idx);
    if (correct) setTimeout(next, 1000);
    else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 800);
    }
  };

  useEffect(() => {
    if (step === GAME_STEPS.length - 1)
      setIsMetricsCorrect(
        metrics.every((metric, i) => metric === CORRECT_METRICS_ORDER[i])
      );
  }, [metrics, step]);

  return (
    <section className="w-full max-w-2xl mx-auto mb-12 mt-8 p-5 rounded-3xl shadow-xl bg-white/90 border border-[#eaeaea] flex flex-col items-center relative overflow-visible">
      <div className="absolute top-4 left-0 w-full flex items-center px-4">
        <div className="flex-1 h-2 bg-[#cabffd]/40 rounded-xl overflow-hidden mr-3">
          <div
            className="h-full bg-gradient-to-r from-[#fcae5a] to-[#7cc6fe] rounded-xl"
            style={{ width: `${progress}%`, transition: "width 0.4s" }}
          />
        </div>
        <span className="text-xs font-bold text-[#7c3aed]">
          {step + 1}/{GAME_STEPS.length}
        </span>
      </div>
      <div className="flex flex-col gap-4 items-center w-full mt-10 mb-3">
        <span className="text-4xl">{current.icon}</span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#23272f] text-center">
          {current.label}
        </h2>
        <p className="text-base text-[#7c3aed] font-semibold text-center mb-2">
          {current.prompt}
        </p>
        {/* STEP 1: Click */}
        {current.action === "click" && (
          <button
            className="rounded-2xl px-7 py-4 bg-[#fcae5a] text-white text-lg font-bold shadow-md hover:scale-105 active:scale-98 transition"
            onClick={next}
          >
            Reveal
          </button>
        )}
        {/* STEP 2: Swipe any direction */}
        {current.action === "swipe" && (
          <div className="flex gap-5 flex-wrap justify-center">
            {current.personas?.map((p) =>
              !interviewed.includes(p.name) ? (
                <motion.div
                  key={p.name}
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                  whileDrag={{ scale: 1.08, rotate: 10 }}
                  className="rounded-2xl px-6 py-4 bg-[#cabffd] text-[#23272f] text-lg font-bold shadow-lg cursor-grab"
                  onDragEnd={() => swipeInterview(p.name)}
                >
                  <span className="text-2xl mr-2">{p.emoji}</span>
                  {p.name}
                </motion.div>
              ) : (
                <div
                  key={p.name}
                  className="rounded-2xl px-6 py-4 bg-[#7cc6fe] text-white text-lg font-bold shadow-md opacity-90"
                >
                  <span className="text-2xl mr-2">{p.emoji}</span>
                  {p.name}
                  <div className="text-sm mt-2 font-medium">{p.quote}</div>
                </div>
              )
            )}
            {interviewed.length === current.personas?.length && (
              <button
                onClick={next}
                className="rounded-xl mt-2 px-6 py-3 bg-[#7cc6fe] text-white font-bold shadow hover:scale-105 transition"
              >
                Continue
              </button>
            )}
          </div>
        )}
        {/* STEP 3: Synthesize Insights (Click-to-match) */}
        {current.action === "match" && (
          <div className="w-full flex flex-col sm:flex-row gap-8 justify-center items-start mt-4">
            {/* Problems */}
            <div className="flex flex-col gap-3">
              {INSIGHT_PAIRS.map((pair) => {
                const alreadyMatched = matchedPairs.find(
                  (mp) => mp.problem === pair.problem
                );
                return (
                  <button
                    key={pair.problem}
                    className={`w-56 px-4 py-3 rounded-xl shadow font-semibold border-2 mb-2 transition text-base text-left ${
                      alreadyMatched
                        ? "bg-[#f3f4f6] text-[#b0b0b0] cursor-not-allowed border-[#e5e7eb]"
                        : "bg-[#fceabb] text-[#a16207] cursor-pointer border-[#fcae5a] hover:bg-[#ffe4b5]"
                    } ${selectedProblem === pair.problem ? "ring-4 ring-[#cabffd]" : ""}`}
                    disabled={!!alreadyMatched}
                    onClick={() => handleProblemClick(pair.problem)}
                  >
                    {pair.problem}
                  </button>
                );
              })}
            </div>
            {/* Causes */}
            <div className="flex flex-col gap-3">
              {INSIGHT_PAIRS.map((pair) => {
                const alreadyMatched = matchedPairs.find(
                  (mp) => mp.cause === pair.cause
                );
                return (
                  <button
                    key={pair.cause}
                    className={`w-56 px-4 py-3 rounded-xl shadow font-semibold border-2 mb-2 transition text-base text-left ${
                      alreadyMatched
                        ? "bg-[#f3f4f6] text-[#b0b0b0] cursor-not-allowed border-[#e5e7eb]"
                        : "bg-[#cabffd]/70 text-[#564294] cursor-pointer border-[#cabffd] hover:bg-[#cabffd]"
                    } ${selectedCause === pair.cause ? "ring-4 ring-[#fcae5a]" : ""}`}
                    disabled={!selectedProblem || !!alreadyMatched}
                    onClick={() => handleCauseClick(pair.cause)}
                  >
                    {pair.cause}
                  </button>
                );
              })}
            </div>
            {/* Matched pairs as blue/green pills */}
            <div className="flex flex-col gap-2 mt-2 flex-1 min-w-[200px] max-w-xs">
              <span className="text-sm text-[#cabffd] mb-2 font-semibold">
                Matched Pairs
              </span>
              <div className="flex flex-wrap gap-3">
                {matchedPairs.map((pair) => (
                  <div
                    key={pair.problem}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f9ec] border border-[#34d399] text-[#059669] text-sm font-semibold whitespace-nowrap shadow"
                  >
                    <span>{pair.problem}</span>
                    <span className="text-base font-bold">→</span>
                    <span>{pair.cause}</span>
                    <span className="ml-2 text-lg">✅</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Feedback below all in this step */}
        {current.action === "match" && matchFeedback && (
          <div
            className={`
              mt-5 text-center text-base font-semibold
              ${matchFeedback.includes("✔️")
                ? "text-[#16a34a] bg-[#e6f9ec] border border-[#34d399]"
                : "text-[#dc2626] bg-[#fee2e2] border border-[#fca5a5]"}
              px-4 py-2 rounded-lg shadow-sm inline-block
            `}
            style={{ maxWidth: 320 }}
          >
            {matchFeedback}
          </div>
        )}
        {current.action === "match" && isAllMatched && (
          <button
            onClick={next}
            className="rounded-xl mt-5 px-7 py-3 bg-[#cabffd] text-white font-bold shadow hover:scale-105 transition"
          >
            Continue
          </button>
        )}
        {/* STEP 4: Prioritize Solutions */}
        {current.action === "choose" && (
          <>
            <div className={`flex flex-col gap-3 w-full max-w-xs ${showWrong ? "animate-shake" : ""}`}>
              {current.options?.map((o, idx) => (
                <button
                  key={o.text}
                  className={`rounded-xl px-5 py-3 text-lg font-semibold shadow transition
                    ${
                      chosen === idx
                        ? o.correct
                          ? "bg-[#34d399] text-white"
                          : "bg-[#fcae5a] text-white"
                        : attempted.includes(idx)
                        ? "bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5]"
                        : "bg-white text-[#23272f] hover:bg-[#fcae5a]/60"
                    }
                  `}
                  onClick={() => chooseOption(idx, o.correct)}
                  disabled={o.correct ? false : attempted.includes(idx)}
                >
                  {o.text}
                  {!o.correct && attempted.includes(idx) && o.reason && (
                    <div className="text-xs mt-2 text-[#dc2626] italic">
                      {o.reason}
                    </div>
                  )}
                </button>
              ))}
            </div>
            {attempted.includes(0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-white rounded-2xl px-6 py-5 shadow-lg text-[#4d5875] font-medium text-center border border-[#cabffd]/50"
              >
                {current.reveal}
              </motion.div>
            )}
          </>
        )}
        {/* STEP 5: Drag-and-drop metric ranking */}
        {current.action === "rank" && (
          <>
            <div className="w-full max-w-sm mx-auto">
              <Reorder.Group
                as="div"
                axis="y"
                values={metrics}
                onReorder={setMetrics}
                className="flex flex-col gap-3"
              >
                {metrics.map((metric, i) => (
                  <Reorder.Item
                    as="div"
                    key={metric}
                    value={metric}
                    className={`rounded-xl px-6 py-3 shadow bg-[#fceabb]/90 text-[#23272f] font-bold text-lg cursor-grab select-none border border-[#cabffd]/60`}
                  >
                    <span className="inline-block w-6 text-[#cabffd] font-black mr-2">{i + 1}</span>
                    {metric}
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
            <div className="text-xs text-[#cabffd] mt-3 italic">
              Drag and drop the metrics to change their order. <br /> 1 = most important.
            </div>
            {isMetricsCorrect && (
              <motion.button
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl mt-6 px-8 py-4 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold shadow-lg hover:scale-105 transition text-lg"
                onClick={onReveal}
              >
                Reveal Results
              </motion.button>
            )}
          </>
        )}
      </div>
      {/* Reveal explanations after each step except final */}
      <AnimatePresence>
        {(
          (current.action === "click" && step > 0) ||
          (current.action === "swipe" && interviewed.length === current.personas?.length) ||
          (current.action === "match" && isAllMatched) ||
          (current.action === "choose" && attempted.includes(0))
        ) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 bg-white rounded-2xl px-6 py-5 shadow-lg text-[#4d5875] font-medium text-center border border-[#cabffd]/50"
          >
            {current.reveal}
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.6s; }
      `}</style>
    </section>
  );
}
