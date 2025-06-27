'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick } from "lucide-react";

interface MagicalValueCardProps {
  value: string;
  desc: string;
  asset: string;
}

export default function MagicalValueCard({ value, desc, asset }: MagicalValueCardProps) {

  const [hovered, setHovered] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle submission of user opinion
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userInput.trim()) return;
    setLoading(true);
    setSubmitted(true);
    try {
      const res = await fetch('/api/value-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, opinion: userInput }),
      });
      const { response } = await res.json();
      setAiResponse(response);
    } catch {
      setAiResponse("Thanks for sharing! (AI could not respond right now.)");
    }
    setLoading(false);
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={{
        scale: 1.035,
        boxShadow: '0 8px 32px 0 rgba(202,191,253,0.16)',
      }}
      whileFocus={{
        scale: 1.035,
        boxShadow: '0 8px 32px 0 rgba(202,191,253,0.16)',
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      tabIndex={0}
      className="relative rounded-3xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-md outline-none transition duration-300 border border-[#e5e5e5] focus:ring-2 focus:ring-[#cabffd]"
      style={{ aspectRatio: "1 / 1.12" }}
    >
      {/* Top-right MousePointerClick icon with pulse */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="cue"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
            className="absolute top-4 right-4 z-20 select-none pointer-events-none"
            aria-hidden="true"
          >
            <motion.span
              animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <MousePointerClick className="w-6 h-6 text-fuchsia-400 drop-shadow" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset image */}
      <img
        src={asset}
        alt={value}
        className={`w-full h-72 object-contain transition-all duration-300 z-0
          ${hovered ? "opacity-25" : "opacity-100"}
        `}
        style={{ borderRadius: "1.5rem" }}
        draggable={false}
      />

      {/* Content reveal */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-7 bg-gradient-to-t from-white/90 via-white/70 to-transparent z-30 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-[#23272f] mb-2 drop-shadow">{value}</h3>
            <p className="text-[#4d5875] text-base max-w-xs mx-auto">{desc}</p>

            {/* Feedback input */}
            {!submitted && (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 mt-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-fuchsia-200 bg-white/70 text-[#23272f] placeholder:text-[#cabffd] focus:outline-none focus:ring-2 focus:ring-fuchsia-300 text-sm transition"
                  placeholder="Your take? (1 per card)"
                  maxLength={100}
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  disabled={loading || submitted}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-1 self-center bg-fuchsia-500 text-white rounded-full font-semibold text-xs shadow hover:bg-fuchsia-600 transition disabled:opacity-60"
                  disabled={loading || submitted || !userInput.trim()}
                >
                  {loading ? "Responding..." : "Share"}
                </button>
              </form>
            )}

            {/* AI Response */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-3 py-2 bg-fuchsia-100 rounded-xl text-sm text-fuchsia-800 font-medium shadow-inner max-w-xs mx-auto"
              >
                {loading ? "Thinking..." : aiResponse}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
