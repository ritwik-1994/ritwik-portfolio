"use client";
import { useEffect, useState } from "react";

const METRICS = [
  { label: "ARR Impact", value: "$100M+" },
  { label: "Onboarding Lag Cut", value: "-65%" },
  { label: "Consultant Churn Reduction", value: "-70%" },
  { label: "DAU Lift", value: "+1% (→ 430K users)" },
];

export default function MetricCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % METRICS.length), 2300);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="flex space-x-6 text-2xl font-bold">
        <span className="text-teal-400 transition-all duration-300">{METRICS[current].value}</span>
        <span className="text-gray-300 transition-all duration-300">{METRICS[current].label}</span>
      </div>
      <div className="flex mt-2 space-x-2">
        {METRICS.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${idx === current ? "bg-teal-400" : "bg-gray-600"}`}
          />
        ))}
      </div>
    </div>
  );
}
