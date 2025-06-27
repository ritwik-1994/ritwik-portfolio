import MagicalValueCard from "./MagicalValueCard";

const SIGNATURE_PRINCIPLES = [
  {
    title: "Trust First",
    desc: "Good products build relationships. Every decision starts with user trust.",
    asset: "/images/asset1.png",
  },
  {
    title: "Keep It Simple",
    desc: "Clarity is everything. Even complex tech should feel intuitive.",
    asset: "/images/asset2.png",
  },
  {
    title: "Meaningful Impact",
    desc: "Growth matters, but so does real value. Results must improve lives and work.",
    asset: "/images/asset3.png",
  },
];

export default function WhatMattersToMe() {
  return (
    <section className="max-w-6xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-[#23272f] text-center mb-12">
        What Matters To Me
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {SIGNATURE_PRINCIPLES.map((p) => (
          <MagicalValueCard
            key={p.title}
            value={p.title}
            desc={p.desc}
            asset={p.asset}
          />
        ))}
      </div>
    </section>
  );
}
