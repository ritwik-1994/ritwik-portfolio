"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// LANDMARKS
const LANDMARKS = [
    { key: "origin", label: "Origin", icon: "🏠", x: 50, y: 0, connections: [1] },
    { key: "signup", label: "Sign Up on the App", icon: "📝", x: 50, y: 12, connections: [0, 2] },
    { key: "telecom", label: "Telecom Tower", icon: "📡", x: 50, y: 25, connections: [1, 3] },
    { key: "atm", label: "ATM/Bank", icon: "🏦", x: 25, y: 42, connections: [2, 4] },
    { key: "orderalloc", label: "Order Allocation", icon: "🗺️", x: 60, y: 60, connections: [3] },
];

const DOCS = [
  { key: "photo", label: "Photo", icon: "📷" },
  { key: "id", label: "ID Proof", icon: "🪪" },
  { key: "bank", label: "Bank Details", icon: "🏦" },
  { key: "dl", label: "Driving License", icon: "🚗" },
];

const LANGUAGES = ["English", "Hindi", "Tamil"];
const MAP_SIZE = 450;

// Avatar will appear above the node
const AVATAR_OFFSET = { x: 0, y: -45 };

const EARNING_CHIPS = [
    { key: "trip", label: "Trip Earning", icon: "💸", color: "bg-green-200 text-green-700" },
    { key: "tax", label: "Tax", icon: "🧾", color: "bg-red-100 text-red-500" },
    { key: "penalty", label: "Penalties", icon: "⚠️", color: "bg-gray-200 text-gray-600" },
    { key: "incentive", label: "Incentives", icon: "🎁", color: "bg-blue-100 text-blue-500" },
  ];

  interface SignupNodeModalProps {
    scene: any; // Replace 'any' with your scene type if known
    setScene: (scene: any) => void;
    handleComplete: () => void;
    docSlots: any;
    setDocSlots: (docSlots: any) => void;
    draggedDoc: any;
    setDraggedDoc: (doc: any) => void;
    language: number;
    setLanguage: (lang: number) => void;
  }
  
  function SignupNodeModal({
    scene,
    setScene,
    handleComplete,
    docSlots,
    setDocSlots,
    draggedDoc,
    setDraggedDoc,
    language,
    setLanguage
  }: SignupNodeModalProps) {
    const DOCS = [
      { key: "photo", label: "Photo", icon: "📷" },
      { key: "id", label: "ID Proof", icon: "🪪" },
      { key: "bank", label: "Bank Details", icon: "🏦" },
      { key: "dl", label: "Driving License", icon: "🚗" },
    ];
    const LANGUAGES = ["English", "Hindi", "Tamil"];
    const allDocsUploaded = Object.keys(docSlots).length === DOCS.length;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.93, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative"
        >
          <div className="text-3xl mb-4">📝</div>
          <h2 className="text-xl font-black mb-2 text-[#7cc6fe] tracking-wide">
            Sign Up on the App
          </h2>
          {/* PROBLEM */}
          {scene === "problem" && (
            <>
              <div className="mb-4 text-[#23272f] text-lg font-semibold">
                You’re trying to sign up as a Rider. Steps are unclear—where to upload which document? No status, just a spinner.
              </div>
              <div className="flex flex-col gap-3 items-center mt-5 mb-4">
                <div className="flex gap-2">
                  {DOCS.map((doc, i) => (
                    <div
                      key={doc.key}
                      className={`w-16 h-16 flex flex-col items-center justify-center rounded-xl border-2 shadow font-bold text-3xl bg-[#f7f8fa] border-[#cabffd]/40 select-none opacity-80`}
                    >
                      <span>{doc.icon}</span>
                      <span className="text-xs text-[#7cc6fe]">{doc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="mt-4 px-7 py-3 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                onClick={() => setScene("action")}
              >
                Try to Upload Documents
              </button>
            </>
          )}
          {/* INTERACTION: DRAG AND DROP */}
          {scene === "action" && (
            <div className="mt-1">
              <div className="mb-2 text-[#41475a] font-semibold">
                Drag each document icon into the correct slot:
              </div>
              {/* Slots */}
              <div className="flex gap-2 justify-center mb-4">
                {DOCS.map((doc, i) => (
                  <div
                    key={doc.key}
                    className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center shadow transition
                      ${docSlots[doc.key] ? "bg-[#d1fae5] border-[#16a34a]" : "bg-[#f3f3fc] border-[#cabffd]/60"}
                    `}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      if (draggedDoc === doc.key) {
                        setDocSlots((slots: Record<string, boolean>) => ({
                          ...slots,
                          [doc.key]: true,
                        }));
                        setDraggedDoc(null);
                      }
                    }}
                  >
                    <span className="text-3xl">
                      {docSlots[doc.key] ? doc.icon : ""}
                    </span>
                    <span className={`text-xs mt-1 ${docSlots[doc.key] ? "text-[#16a34a]" : "text-[#cabffd]"}`}>{doc.label}</span>
                    {docSlots[doc.key] && (
                      <span className="text-[#16a34a] font-bold text-xl absolute top-1 right-2 animate-bounce">✓</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Draggable icons */}
              <div className="flex gap-4 mt-6 justify-center">
                {DOCS.map((doc) =>
                  docSlots[doc.key] ? null : (
                    <motion.div
                      key={doc.key}
                      draggable
                      onDragStart={() => setDraggedDoc(doc.key)}
                      onDragEnd={() => setDraggedDoc(null)}
                      className={`w-12 h-12 rounded-full bg-[#fceabb] flex items-center justify-center font-bold text-2xl cursor-grab shadow border-2 border-[#cabffd] hover:scale-110 transition`}
                    >
                      {doc.icon}
                    </motion.div>
                  )
                )}
              </div>
              {/* Language Switch */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <span className="font-medium text-[#7cc6fe]">Language:</span>
                {LANGUAGES.map((lang, i) => (
                  <button
                    key={lang}
                    className={`px-3 py-1 rounded-lg font-bold text-sm border-2 transition
                      ${i === language
                      ? "bg-[#7cc6fe] text-white border-[#cabffd]"
                      : "bg-white text-[#7cc6fe] border-[#cabffd]/40 hover:bg-[#f4f8ff]"}

                    `}
                    onClick={() => setLanguage(i)}
                  >
                    {lang}
                  </button>
                ))}

              </div>
              {/* Continue only when all docs uploaded */}
              <button
                className={`mt-7 px-8 py-3 rounded-xl text-white font-bold shadow-lg text-lg
                  ${allDocsUploaded
                    ? "bg-gradient-to-r from-[#16a34a] to-[#7cc6fe] hover:scale-105"
                    : "bg-[#a3a3a3] cursor-not-allowed opacity-60"}
                `}
                disabled={!allDocsUploaded}
                onClick={() => setScene("solution")}
              >
                Unlock Tracker
              </button>
            </div>
          )}
          {/* SOLUTION */}
          {scene === "solution" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-5 mt-4"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.23 }}
                className="flex flex-col items-center gap-2 mb-2"
              >
                <span className="text-5xl animate-bounce">🛵</span>
                <span className="font-bold text-lg text-[#16a34a]">
                  Sign Up Complete!
                </span>
              </motion.div>
              {/* Animated Tracker Checklist */}
              <div className="w-full max-w-xs mx-auto bg-[#f3f8ff] rounded-xl p-4 shadow border border-[#cabffd]">
                <div className="font-bold text-[#7cc6fe] mb-2 text-center">
                  Onboarding Tracker
                </div>
                <ul className="flex flex-col gap-2">
                  {DOCS.map((doc, idx) => (
                    <motion.li
                      key={doc.key}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.32 + idx * 0.11 }}
                      className="flex items-center gap-2 font-semibold text-[#23272f]"
                    >
                      <span className="text-2xl text-[#16a34a]">✓</span>
                      {doc.label} Uploaded
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 }}
                    className="flex items-center gap-2 font-semibold text-[#7cc6fe]"
                  >
                    <span className="text-xl">🌐</span>
                    App in {LANGUAGES[language]}
                  </motion.li>
                </ul>
              </div>
              {/* Confetti */}
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <span className="text-3xl animate-pulse text-[#fcae5a]">🎉</span>
              </motion.div>
              <button
                onClick={handleComplete}
                className="mt-2 px-7 py-3 bg-gradient-to-r from-[#7cc6fe] to-[#cabffd] text-white font-bold rounded-xl shadow hover:scale-105 transition"
              >
                Continue Journey
              </button>
            </motion.div>
          )}
          <button
            onClick={() => {
              setScene(null);
              setDocSlots({});
              setDraggedDoc(null);
              setLanguage(0);
            }}
            className="absolute right-3 top-3 text-[#cabffd] text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    );
  }
  
  // TELECOM TOWER NODE MODAL
  interface TelecomNodeModalProps {
    scene: string | null;
    setScene: (scene: string | null) => void;
    handleComplete: () => void;
    boosted: boolean;
    setBoosted: React.Dispatch<React.SetStateAction<boolean>>;
  }
  function TelecomNodeModal({
    scene,
    setScene,
    handleComplete,
    boosted,
    setBoosted,
  }: TelecomNodeModalProps) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative"
          >
            <div className="text-3xl mb-4">📡</div>
            <h2 className="text-xl font-black mb-2 text-[#7cc6fe] tracking-wide">
              Telecom Tower
            </h2>
            {/* PROBLEM */}
            {scene === "problem" && (
              <>
                <div className="mb-6 text-[#23272f] text-lg font-semibold">
                  Why do I keep missing marking orders at the right location? My location never updates accurately or in time.
                </div>
                <motion.div
                  initial={{ x: -20, opacity: 0.8 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center gap-2 mb-6"
                >
                  <span className="text-5xl animate-pulse">🛵</span>
                  <div className="w-44 h-3 bg-[#cabffd]/40 rounded-full mb-2 relative overflow-hidden">
                    {/* Simulated slow ping */}
                    <motion.div
                      animate={{ width: ["0%", "55%", "0%"], opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut" }}
                      className="absolute left-0 top-0 h-full bg-[#7cc6fe]/70 rounded-full"
                    />
                  </div>
                  <div className="italic text-[#b91c1c] text-sm">Location lags, orders miss me!</div>
                </motion.div>
                <button
                  className="mt-2 px-7 py-3 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                  onClick={() => setScene("action")}
                >
                  Boost Signal
                </button>
              </>
            )}
            {/* ACTION */}
            {scene === "action" && (
              <>
                <div className="mb-4 text-[#23272f] text-base">
                  Pull the lever to optimize SIM ping!
                </div>
                <div className="flex flex-col items-center mb-5">
                  <div className="relative w-24 h-40 flex items-end justify-center">
                    {/* Lever base */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-28 bg-[#cabffd]/40 rounded-full" />
                    {/* Lever handle */}
                    <motion.div
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 46 }}
                      style={{
                        y: boosted ? 46 : 0,
                        touchAction: "none",
                        cursor: boosted ? "not-allowed" : "grab",
                      }}
                      onDragEnd={(_, info) => {
                        if (info.point.y > 30) setBoosted(true);
                      }}
                      className="w-12 h-12 bg-[#7cc6fe] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-[#cabffd] absolute left-1/2 -translate-x-1/2 bottom-0"
                    >
                      <span className="text-2xl">🔌</span>
                    </motion.div>
                    {boosted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 }}
                        className="absolute left-1/2 -translate-x-1/2 -top-5 text-[#16a34a] font-bold"
                      >
                        Signal Boosted!
                      </motion.div>
                    )}
                  </div>
                </div>
                <button
                  className={`mt-4 px-7 py-3 rounded-xl font-bold shadow transition-all
                    ${boosted
                      ? "bg-gradient-to-r from-[#16a34a] to-[#cabffd] text-white hover:scale-105"
                      : "bg-[#a3a3a3] text-white cursor-not-allowed opacity-60"}
                  `}
                  disabled={!boosted}
                  onClick={() => setScene("solution")}
                >
                  Reveal Location Fix
                </button>
              </>
            )}
            {/* SOLUTION */}
            {scene === "solution" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-5 mt-4"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.23 }}
                  className="flex flex-col items-center gap-2 mb-2"
                >
                  <span className="text-5xl animate-bounce">🛵</span>
                  <span className="font-bold text-lg text-[#16a34a]">
                    Location Optimized!
                  </span>
                </motion.div>
                {/* Animated improvement */}
                <div className="bg-[#e0f7fa] rounded-xl p-4 shadow w-full max-w-xs mx-auto text-center">
                  <div className="font-bold text-[#7cc6fe] mb-2">SIM Ping Refactor</div>
                  <div className="text-[#23272f] mb-2">
                    <b>Location now updates every <span className="text-[#16a34a]">3.5s</span> (was 12s)</b>
                    <br />
                    <span>and is accurate up to <span className="text-[#16a34a]">10 meters</span> (was 50m).</span>
                    <br />
                    Orders find you!
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-xl animate-pulse">📍</span>
                    <span className="text-[#7cc6fe] font-semibold">+ Reliable, Fast Location!</span>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <span className="text-3xl animate-pulse text-[#fcae5a]">🎉</span>
                </motion.div>
                <button
                  onClick={handleComplete}
                  className="mt-2 px-7 py-3 bg-gradient-to-r from-[#7cc6fe] to-[#cabffd] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                >
                  Continue Journey
                </button>
              </motion.div>
            )}
            <button
              onClick={() => {
                setScene(null);
                setBoosted(false);
              }}
              className="absolute right-3 top-3 text-[#cabffd] text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      );
    }
    
    // ATM/BANK NODE MODAL
    interface ATMNodeModalProps {
  scene: string | null;
  setScene: (scene: string | null) => void;
  handleComplete: () => void;
  dashboardSlots: Record<string, boolean>;
  setDashboardSlots: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  draggedChip: string | null;
  setDraggedChip: React.Dispatch<React.SetStateAction<string | null>>;
}
function ATMNodeModal({
  scene,
  setScene,
  handleComplete,
  dashboardSlots,
  setDashboardSlots,
  draggedChip,
  setDraggedChip,
}: ATMNodeModalProps) {
      const allChipsPlaced = Object.keys(dashboardSlots).length === EARNING_CHIPS.length;
    
      return (
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative"
          >
            <div className="text-3xl mb-4">🏦</div>
            <h2 className="text-xl font-black mb-2 text-[#7cc6fe] tracking-wide">
              ATM / Bank
            </h2>
            {/* PROBLEM */}
            {scene === "problem" && (
              <>
                <div className="mb-6 text-[#23272f] text-lg font-semibold">
                  How much will I get paid? Where’s my bonus?
                </div>
                <motion.div
                  initial={{ x: 20, opacity: 0.8 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center gap-2 mb-6"
                >
                  <span className="text-5xl">🛵</span>
                  <div className="w-44 h-10 bg-gray-200/50 rounded-lg mb-1 relative flex justify-between items-center px-4">
                    <span className="opacity-60 text-[#cabffd] text-xl">???</span>
                    <span className="opacity-60 text-[#cabffd] text-xl">???</span>
                    <span className="opacity-60 text-[#cabffd] text-xl">???</span>
                  </div>
                  <div className="italic text-[#b91c1c] text-sm">Dashboard is unclear, payouts missing!</div>
                </motion.div>
                <button
                  className="mt-2 px-7 py-3 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                  onClick={() => setScene("action")}
                >
                  Fix My Dashboard
                </button>
              </>
            )}
            {/* ACTION */}
            {scene === "action" && (
              <>
                <div className="mb-4 text-[#23272f] text-base">
                  Drag each earnings chip into the dashboard!
                </div>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {EARNING_CHIPS.map((chip) =>
                    dashboardSlots[chip.key] ? null : (
                      <motion.div
                        key={chip.key}
                        draggable
                        onDragStart={() => setDraggedChip(chip.key)}
                        onDragEnd={() => setDraggedChip(null)}
                        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold text-2xl cursor-grab shadow border-2 border-[#cabffd] hover:scale-110 transition ${chip.color}`}
                      >
                        <span>{chip.icon}</span>
                        <span className="text-xs mt-0.5">{chip.label}</span>
                      </motion.div>
                    )
                  )}
                </div>
                {/* Dashboard slots */}
                <div className="w-full max-w-xs mx-auto bg-[#f3f8ff] rounded-xl p-4 shadow border border-[#cabffd] flex flex-col gap-3">
                  <div className="font-bold text-[#7cc6fe] mb-1">Earnings Dashboard</div>
                  {EARNING_CHIPS.map((chip) => (
                    <div
                      key={chip.key}
                      className={`w-full h-12 rounded-xl border-2 flex items-center justify-between px-4 shadow transition mb-2 ${dashboardSlots[chip.key]
                        ? chip.color + " border-[#16a34a]"
                        : "bg-[#f3f3fc] border-[#cabffd]/60"
                        }`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        if (draggedChip === chip.key) {
                          setDashboardSlots((slots) => ({
                            ...slots,
                            [chip.key]: true,
                          }));
                          setDraggedChip(null);
                        }
                      }}
                    >
                      <span className="text-xl">{chip.icon}</span>
                      <span className="font-bold">{chip.label}</span>
                      {dashboardSlots[chip.key] && (
                        <span className="text-[#16a34a] font-bold text-xl animate-bounce">✓</span>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className={`mt-7 px-8 py-3 rounded-xl text-white font-bold shadow-lg text-lg
                    ${allChipsPlaced
                      ? "bg-gradient-to-r from-[#16a34a] to-[#7cc6fe] hover:scale-105"
                      : "bg-[#a3a3a3] cursor-not-allowed opacity-60"}
                  `}
                  disabled={!allChipsPlaced}
                  onClick={() => setScene("solution")}
                >
                  Reveal Dashboard
                </button>
              </>
            )}
            {/* SOLUTION */}
            {scene === "solution" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-5 mt-4"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.23 }}
                  className="flex flex-col items-center gap-2 mb-2"
                >
                  <span className="text-5xl animate-bounce">🛵</span>
                  <span className="font-bold text-lg text-[#16a34a]">
                    Earnings Clear!
                  </span>
                </motion.div>
                {/* Animated Dashboard Reveal */}
                <div className="w-full max-w-xs mx-auto bg-gradient-to-br from-[#fceabb]/70 to-[#cabffd]/60 rounded-xl p-4 shadow border border-[#cabffd] flex flex-col gap-3 text-left">
                  <div className="font-bold text-[#7cc6fe] mb-1">Earnings Breakdown</div>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-3 font-semibold text-[#16a34a]">
                      <span className="text-xl">💸</span>Trip earning: <span className="ml-auto font-extrabold">₹312</span>
                    </li>
                    <li className="flex items-center gap-3 font-semibold text-[#dc2626]">
                      <span className="text-xl">🧾</span>Tax: <span className="ml-auto font-extrabold">-₹24</span>
                    </li>
                    <li className="flex items-center gap-3 font-semibold text-[#6b7280]">
                      <span className="text-xl">⚠️</span>Penalties: <span className="ml-auto font-extrabold">-₹12</span>
                    </li>
                    <li className="flex items-center gap-3 font-semibold text-[#2563eb]">
                      <span className="text-xl">🎁</span>Incentives: <span className="ml-auto font-extrabold">+₹54</span>
                    </li>
                  </ul>
                </div>
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <span className="text-3xl animate-pulse text-[#fcae5a]">🎉</span>
                </motion.div>
                <button
                  onClick={handleComplete}
                  className="mt-2 px-7 py-3 bg-gradient-to-r from-[#7cc6fe] to-[#cabffd] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                >
                  Continue Journey
                </button>
              </motion.div>
            )}
            <button
              onClick={() => {
                setScene(null);
                setDashboardSlots({});
                setDraggedChip(null);
              }}
              className="absolute right-3 top-3 text-[#cabffd] text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      );
    }
    
    interface OrderAllocationNodeModalProps {
      scene: string | null;
      setScene: (scene: string | null) => void;
      handleComplete: () => void;
    }
    function OrderAllocationNodeModal({
      scene,
      setScene,
      handleComplete,
    }: OrderAllocationNodeModalProps) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative"
            >
              <div className="text-3xl mb-4">🗺️</div>
              <h2 className="text-xl font-black mb-2 text-[#7cc6fe] tracking-wide">
                Order Allocation
              </h2>
              {/* PROBLEM */}
              {scene === "problem" && (
                <>
                  <div className="mb-6 text-[#23272f] text-lg font-semibold">
                    Previously, orders were allocated with no route logic—so you’d get deliveries all over town and miss SLAs or lose incentives.
                  </div>
                  <motion.div
                    initial={{ x: -20, opacity: 0.8 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-2 mb-6"
                  >
                    <span className="text-5xl animate-pulse">🛵</span>
                    <span className="italic text-[#b91c1c] text-sm">Missed delivery times, more penalties.</span>
                  </motion.div>
                  <button
                    className="mt-2 px-7 py-3 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                    onClick={() => setScene("action")}
                  >
                    See Smart Routing
                  </button>
                </>
              )}
              {/* ACTION */}
              {scene === "action" && (
                <div className="flex flex-col items-center justify-center mb-6 mt-2">
                  <div className="relative w-64 h-32">
                    {/* Rider on left */}
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                      initial={false}
                      animate={{ y: 0 }}
                    >
                      <span className="text-3xl">🛵</span>
                    </motion.div>
                    {/* Orders (boxes) - scattered, then animate to line up */}
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={false}
                        animate={{
                          left: 64 + i * 56,
                          top: (scene as string) === "solution" ? 44 : [24, 60, 12][i],
                        }}

                        transition={{ type: "spring", stiffness: 130, damping: 15, delay: (scene as string) === "solution" ? i * 0.08 : 0 }}
                      >
                        <span className="text-3xl">{["📦", "📦", "📦"][i]}</span>
                      </motion.div>
                    ))}
                    {/* Dotted path: wavy before, straight after */}
                    <motion.svg
                      className="absolute left-8 top-0 w-48 h-full"
                      width={192}
                      height={128}
                    >
                      <motion.path
                        d={
                          scene === "action"
                            // Scattered, wavy line
                            ? "M0,60 Q24,10 48,44 T96,80 T144,30 T192,60"
                            // Solution: straight
                            : "M0,60 L192,60"
                        }
                        fill="none"
                        stroke={(scene as string) === "solution" ? "#16a34a" : "#cabffd"}
                        strokeWidth={4}
                        strokeDasharray="8 7"
                        initial={false}
                        animate={{
                          pathLength: (scene as string) === "solution" ? 1 : 0.98,
                          opacity: 1
                        }}
                        transition={{ duration: 0.7 }}
                      />
                    </motion.svg>
                  </div>
                  <button
                    className="mt-7 px-7 py-3 bg-gradient-to-r from-[#16a34a] to-[#cabffd] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                    onClick={() => setScene("aligned")}
                    >
                    Optimize Route
                    </button>

                </div>
              )}


                {scene === "aligned" && (
                <div className="flex flex-col items-center justify-center mb-6 mt-2">
                    <div className="relative w-64 h-32">
                    {/* Rider on left */}
                    <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                        initial={false}
                        animate={{ y: 0 }}
                    >
                        <span className="text-3xl">🛵</span>
                    </motion.div>
                    {/* Orders animate to straight line */}
                    {[0, 1, 2].map(i => (
                        <motion.div
                        key={i}
                        className="absolute"
                        initial={false}
                        animate={{
                            left: 64 + i * 56,
                            top: 44 // now aligned
                        }}
                        transition={{ type: "spring", stiffness: 130, damping: 15, delay: i * 0.08 }}
                        >
                        <span className="text-3xl">{["📦", "📦", "📦"][i]}</span>
                        </motion.div>
                    ))}
                    {/* Dotted path: straight */}
                    <motion.svg
                        className="absolute left-8 top-0 w-48 h-full"
                        width={192}
                        height={128}
                    >
                        <motion.path
                        d="M0,60 L192,60"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth={4}
                        strokeDasharray="8 7"
                        initial={false}
                        animate={{
                            pathLength: 1,
                            opacity: 1
                        }}
                        transition={{ duration: 0.7 }}
                        />
                    </motion.svg>
                    </div>
                    <button
                    className="mt-7 px-7 py-3 bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                    onClick={() => setScene("solution")}
                    >
                    Reveal Impact
                    </button>
                </div>
                )}

      
              {/* SOLUTION */}
              {scene === "solution" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center gap-5 mt-4"
                >
                  {/* (Keep animation of boxes in a line here, as above) */}
                  <div className="font-bold text-[#7cc6fe] mb-2">Order Allocation Algorithm</div>
                  <div className="bg-[#e0f7fa] rounded-xl p-4 shadow w-full max-w-xs mx-auto text-center">
                    <div className="text-[#23272f] mb-1">
                      <b>You&apos;ve fixed:</b> <br />
                      ❌ Missed SLAs<br />
                      ❌ Lost incentives<br />
                      ❌ Wasted time<br />
                    </div>
                    <div className="mt-2 text-[#16a34a] font-semibold">
                      Now, orders are clubbed by route.<br />
                      <b>Fewer penalties, higher earnings, faster deliveries!</b>
                    </div>
                    <div className="mt-3 text-[#425674] text-sm">
                      <span className="font-bold text-[#cabffd]">Impact:</span> Riders maximize earnings and the platform boosts on-time performance and customer NPS.
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <span className="text-3xl animate-pulse text-[#fcae5a]">🎉</span>
                  </motion.div>
                  <button
                    onClick={handleComplete}
                    className="mt-2 px-7 py-3 bg-gradient-to-r from-[#7cc6fe] to-[#cabffd] text-white font-bold rounded-xl shadow hover:scale-105 transition"
                  >
                    You completed the journey!
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      }
      


      
    
    export default function RiderExperienceRPG() {
      const [showIntro, setShowIntro] = useState(true);
      const [currentNode, setCurrentNode] = useState(0);
      const [visited, setVisited] = useState<boolean[]>(Array(LANDMARKS.length).fill(false));
      const [scene, setScene] = useState<string | null>(null);
      const [draggedDoc, setDraggedDoc] = useState<string | null>(null);
      const [docSlots, setDocSlots] = useState<Record<string, boolean>>({});
      const [language, setLanguage] = useState<number>(0);
      const [boosted, setBoosted] = useState<boolean>(false);
      const [draggedChip, setDraggedChip] = useState<string | null>(null);
      const [dashboardSlots, setDashboardSlots] = useState<Record<string, boolean>>({});
      
        // Only allow move to the next unlocked node in sequence
        function getAllowedMoves(node: typeof LANDMARKS[number], visited: boolean[]) {
            const furthestNode = visited.lastIndexOf(true);
            return node.connections
              .filter(i => furthestNode === -1 ? i === 1 : i <= furthestNode + 1)
              .map(i => ({
                i,
                dx: LANDMARKS[i].x - node.x,
                dy: LANDMARKS[i].y - node.y
              }));            
        }
      
        // Keyboard navigation (arrow keys and wasd)
        useEffect(() => {
          const handleKey = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
              }
              
            if (scene || showIntro) return;
            const node = LANDMARKS[currentNode];
            if (!node) return;
            const moves = getAllowedMoves(node, visited);
            let dir = null;
            if (["ArrowUp", "w", "W"].includes(e.key)) dir = "up";
            else if (["ArrowDown", "s", "S"].includes(e.key)) dir = "down";
            else if (["ArrowLeft", "a", "A"].includes(e.key)) dir = "left";
            else if (["ArrowRight", "d", "D"].includes(e.key)) dir = "right";
            if (dir) {
              let filterFn;
              if (dir === "up") filterFn = (m: { dx: number; dy: number }) => m.dy < 0 && Math.abs(m.dx) <= 20;
              if (dir === "down") filterFn = (m: { dx: number; dy: number }) => m.dy > 0 && Math.abs(m.dx) <= 50;
              if (dir === "left") filterFn = (m: { dx: number; dy: number }) => m.dx < 0 && Math.abs(m.dy) <= 20;
              if (dir === "right") filterFn = (m: { dx: number; dy: number }) => m.dx > 0 && Math.abs(m.dy) <= 20;

              const filtered = moves.filter(filterFn);
              if (filtered.length) setCurrentNode(
                filtered.reduce(
                  (a: MoveObj, b: MoveObj) =>
                    dir === "up" || dir === "left"
                      ? (dir === "up" ? (a.dy > b.dy ? a : b) : (a.dx > b.dx ? a : b))
                      : (dir === "down" ? (a.dy < b.dy ? a : b) : (a.dx < b.dx ? a : b)),
                  filtered[0]
                ).i
              );

            } else if (["Enter", " "].includes(e.key)) {
              if (!visited[currentNode] && [1,2,3].includes(currentNode)) setScene("problem");
            }
          };
          window.addEventListener("keydown", handleKey, { passive: false });
            return () => window.removeEventListener("keydown", handleKey);

        }, [currentNode, scene, showIntro, visited]);
      
        // On-screen controls
        const tryMove = (dir) => {
            if (scene || showIntro) return;
            const node = LANDMARKS[currentNode];
            const moves = getAllowedMoves(node, visited);
            let filterFn;
            if (dir === "up") filterFn = m => m.dy < 0 && Math.abs(m.dx) <= 20;
            if (dir === "down") filterFn = m => m.dy > 0 && Math.abs(m.dx) <= 50;
            if (dir === "left") filterFn = m => m.dx < 0 && Math.abs(m.dy) <= 20;
            if (dir === "right") filterFn = m => m.dx > 0 && Math.abs(m.dy) <= 20;
            const filtered = moves.filter(filterFn);
            if (filtered.length) setCurrentNode(filtered.reduce((a, b) =>
              dir === "up" || dir === "left"
                ? (dir === "up" ? (a.dy > b.dy ? a : b) : (a.dx > b.dx ? a : b))
                : (dir === "down" ? (a.dy < b.dy ? a : b) : (a.dx < b.dx ? a : b))
            ).i);
          };
      
        const handleComplete = () => {
          setVisited((arr) => {
            const copy = [...arr];
            copy[currentNode] = true;
            return copy;
          });
          setScene(null);
          setDocSlots({});
          setDraggedDoc(null);
          setLanguage(0);
          setBoosted(false);
          setDashboardSlots({});
          setDraggedChip(null);
        };
      
        const avatarPos = {
          x: (LANDMARKS[currentNode].x / 100) * MAP_SIZE + AVATAR_OFFSET.x,
          y: (LANDMARKS[currentNode].y / 100) * MAP_SIZE + AVATAR_OFFSET.y,
        };
      
        const nodeActionable = idx =>
          currentNode === idx && !visited[idx] && idx !== 0 && !scene;
      
        // Furthest completed node (for lock styling)
        const furthestNode = visited.lastIndexOf(true);
      
        return (
          <div className="w-full max-w-xl mx-auto mb-16 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#257ecb] font-semibold text-base rounded-full px-4 py-2 bg-[#f4faff] hover:bg-[#e1f0fd] shadow transition mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            {/* Intro modal */}
            <AnimatePresence>
              {showIntro && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 170, damping: 17 }}
                    className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative"
                  >
                    <div className="text-5xl mb-2">🛵</div>
                    <h2 className="text-2xl font-extrabold mb-3 text-[#7cc6fe]">Step Into a Rider&apos;s Journey</h2>
                    <div className="text-lg text-[#41475a] mb-6 font-medium">
                      Experience a day in the life of a Jubilant delivery partner.<br /><br />
                      <span className="font-semibold text-[#fcae5a]">How to play:</span><br />
                      <span>
                        <b>1.</b> Use <b>Arrow keys</b> or <b>on-screen buttons</b> to move.<br />
                        <b>2.</b> At a glowing stop, press <b>Enter</b> or tap the icon to begin.<br />
                        <b>3.</b> Complete all stops and see your <span className="text-[#16a34a]">impact</span>!
                      </span>
                    </div>
                    <button
                      onClick={() => setShowIntro(false)}
                      className="mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#cabffd] to-[#7cc6fe] text-white font-bold shadow-lg hover:scale-105 transition text-lg"
                    >
                      Start My Day
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
      
            {/* Map */}
            <div className="relative" style={{ width: MAP_SIZE, height: MAP_SIZE }}>
              <svg width={MAP_SIZE} height={MAP_SIZE} className="rounded-3xl">
                <defs>
                  <radialGradient id="mapGrad" cx="60%" cy="40%" r="1.1">
                    <stop offset="0%" stopColor="#cabffd" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#f4f4fd" stopOpacity="0.9" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width={MAP_SIZE} height={MAP_SIZE} fill="url(#mapGrad)" />
                {LANDMARKS.map((node, idx) => (
                  node.connections.map((ci) => (
                    idx < ci && (
                      <line
                        key={node.key + "-" + LANDMARKS[ci].key}
                        x1={(node.x / 100) * MAP_SIZE}
                        y1={(node.y / 100) * MAP_SIZE}
                        x2={(LANDMARKS[ci].x / 100) * MAP_SIZE}
                        y2={(LANDMARKS[ci].y / 100) * MAP_SIZE}
                        stroke="#cabffd"
                        strokeWidth={7}
                        opacity={0.45}
                        strokeLinecap="round"
                      />
                    )
                  ))
                ))}
              </svg>

              {/* Background grid/accent */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg width={MAP_SIZE} height={MAP_SIZE} className="block">
                        <defs>
                        <radialGradient id="lawn-bg" cx="60%" cy="40%" r="1.1">
                            <stop offset="0%" stopColor="#b8e994" />
                            <stop offset="100%" stopColor="#e0efc2" />
                        </radialGradient>
                        {/* Optional: add a subtle criss-cross pattern */}
                        <pattern id="lawn-stripes" width="26" height="26" patternUnits="userSpaceOnUse">
                            <rect width="26" height="26" fill="none"/>
                            <path d="M0 26 L26 0" stroke="#c6edb7" strokeWidth="5"/>
                        </pattern>
                        </defs>
                        <rect width={MAP_SIZE} height={MAP_SIZE} fill="url(#lawn-bg)" />
                        <rect width={MAP_SIZE} height={MAP_SIZE} fill="url(#lawn-stripes)" opacity="0.17"/>
                    </svg>
                    </div>


                {/* Route lines with glow and gradient */}
                <svg width={MAP_SIZE} height={MAP_SIZE} className="absolute left-0 top-0 z-10">
                <defs>
                    <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7cc6fe" />
                    <stop offset="80%" stopColor="#cabffd" />
                    </linearGradient>
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                    </filter>
                </defs>
                {LANDMARKS.map((node, idx) =>
                    node.connections.map((ci) => (
                    idx < ci && (
                        <line
                        key={node.key + "-" + LANDMARKS[ci].key}
                        x1={(node.x / 100) * MAP_SIZE}
                        y1={(node.y / 100) * MAP_SIZE}
                        x2={(LANDMARKS[ci].x / 100) * MAP_SIZE}
                        y2={(LANDMARKS[ci].y / 100) * MAP_SIZE}
                        stroke="url(#route-gradient)"
                        strokeWidth={8}
                        opacity={0.7}
                        filter={idx === currentNode || ci === currentNode ? "url(#glow)" : undefined}
                        strokeDasharray={idx === currentNode || ci === currentNode ? "none" : "12 12"}
                        />
                    )
                    ))
                )}
                </svg>

              {/* Landmarks */}
              {LANDMARKS.map((l, idx) => {
                const isActive = currentNode === idx;
                const isVisited = visited[idx];
                const actionable = nodeActionable(idx);
                const isLocked = idx > furthestNode + 1;

                // For the origin node, highlight with a green glow and show arrow cue if sprite is there.
                const isStart = idx === 0;
                return (
                    <motion.button
                    key={l.key}
                    style={{
                        position: "absolute",
                        left: `calc(${l.x}% - 26px)`,
                        top: `calc(${l.y}% - 26px)`,
                        width: 54,
                        height: 54,
                        zIndex: 30,
                        outline: isActive ? "2.5px solid #7cc6fe" : undefined
                    }}
                    className={`rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-[#cabffd] transition-all
                        ${isActive ? "scale-110 ring-4 ring-[#7cc6fe]/60" : ""}
                        ${isVisited ? "ring-4 ring-[#16a34a]/70" : ""}
                        ${actionable || isStart ? "animate-pulse" : ""}
                        ${isLocked ? "opacity-40 grayscale pointer-events-none" : ""}
                        ${isStart && isActive ? "ring-4 ring-[#b8e994]/80 shadow-2xl" : ""}
                    `}
                    onClick={() => {
                        if (showIntro || isLocked) return;
                        if (actionable) setScene("problem");
                    }}
                    tabIndex={isActive && !showIntro && !isLocked ? 0 : -1}
                    disabled={isLocked}
                    >
                    <span className="text-3xl">{l.icon}</span>
                    {(actionable || (isStart && isActive)) && (
                        <span
                        className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 animate-bounce pointer-events-none"
                        style={{ fontSize: 22, color: "#7cc6fe" }}
                        >
                        ⬇️
                        </span>
                    )}

                    {isActive && !scene && (
                    <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 text-sm font-bold text-[#23272f] bg-white/90 rounded-full px-3 py-1 shadow animate-fadein pointer-events-none z-20">
                        Press <kbd className="bg-[#ececec] px-1 mx-0.5 rounded text-xs">Space</kbd> or <kbd className="bg-[#ececec] px-1 mx-0.5 rounded text-xs">Enter</kbd>
                    </span>
                    )}

                    </motion.button>

                
  
                );
                {isActive && actionable && !isStart && !scene && (
                    <div
                    className="absolute left-1/2"
                    style={{
                        top: `calc(${l.y}% + 42px)`,
                        left: `calc(${l.x}% - 40px)`, // adjust for centering
                        pointerEvents: "none",
                        zIndex: 40,
                    }}
                    >
                    <div className="bg-white/90 border border-[#cabffd] shadow-lg rounded-full px-4 py-1 text-[#7cc6fe] font-bold text-xs flex items-center gap-1 animate-fadein">
                        <span>Press</span>
                        <kbd className="bg-[#ececec] px-1 mx-0.5 rounded text-xs font-bold border border-[#cabffd]/50">Space</kbd>
                        <span>or</span>
                        <kbd className="bg-[#ececec] px-1 mx-0.5 rounded text-xs font-bold border border-[#cabffd]/50">Enter</kbd>
                    </div>
                    </div>
                )}
                })}



                {/* Rider avatar */}
                <motion.div
          initial={false}
          animate={{
            left: avatarPos.x - 16,
            top: avatarPos.y - 20,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 27 }}
          className="absolute w-12 h-12 rounded-full flex items-center justify-center z-50"
        >
          <motion.span
            animate={{
              scale: [1, 1.09, 1],
              y: [0, -5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut"
            }}
            className="text-4xl bg-white/95 rounded-full p-1 border-2 border-[#7cc6fe] shadow-lg"
          >
            🛵
          </motion.span>
        </motion.div>
      </div>

      {/* On-screen controls */}
      <div className="flex gap-5 justify-center mt-5">
            <button type="button" onClick={() => tryMove("up")} className="w-11 h-11 bg-white rounded-full shadow border font-bold text-xl text-[#7cc6fe]">↑</button>
            <div className="flex flex-col gap-2">
                <button type="button" onClick={() => tryMove("left")} className="w-11 h-11 bg-white rounded-full shadow border font-bold text-xl text-[#7cc6fe]">←</button>
                <button type="button" onClick={() => tryMove("right")} className="w-11 h-11 bg-white rounded-full shadow border font-bold text-xl text-[#7cc6fe]">→</button>
            </div>
            <button type="button" onClick={() => tryMove("down")} className="w-11 h-11 bg-white rounded-full shadow border font-bold text-xl text-[#7cc6fe]">↓</button>
            </div>

      {/* MODALS */}
      <AnimatePresence>
        {scene && currentNode === 1 && (
          <SignupNodeModal
            scene={scene}
            setScene={setScene}
            handleComplete={handleComplete}
            docSlots={docSlots}
            setDocSlots={setDocSlots}
            draggedDoc={draggedDoc}
            setDraggedDoc={setDraggedDoc}
            language={language}
            setLanguage={setLanguage}
          />
        )}
        {scene && currentNode === 2 && (
          <TelecomNodeModal
            scene={scene}
            setScene={setScene}
            handleComplete={handleComplete}
            boosted={boosted}
            setBoosted={setBoosted}
          />
        )}
        {scene && currentNode === 3 && (
          <ATMNodeModal
            scene={scene}
            setScene={setScene}
            handleComplete={handleComplete}
            dashboardSlots={dashboardSlots}
            setDashboardSlots={setDashboardSlots}
            draggedChip={draggedChip}
            setDraggedChip={setDraggedChip}
          />
        )}

        {scene && currentNode === 4 && (
                <OrderAllocationNodeModal
                scene={scene}
                setScene={setScene}
                handleComplete={handleComplete}
                />
            )}
      </AnimatePresence>

      


      {/* Progress bar */}
      <div className="flex gap-2 mt-7 justify-center">
        {LANDMARKS.map((l, idx) =>
          visited[idx] ? (
            <span key={l.key} className="text-2xl text-[#16a34a]" title={"Complete"}>
              ⭐
            </span>
          ) : (
            <span key={l.key} className="text-2xl text-[#cabffd]" title={l.label}>
              {l.icon}
            </span>
          )
        )}
      </div>
    </div>
  );
}
