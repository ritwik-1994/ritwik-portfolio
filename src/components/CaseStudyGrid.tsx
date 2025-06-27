import Link from "next/link";

const CASE_STUDIES = [
  {
    title: "AI Agent Onboarding",
    summary: "Cut onboarding lag by 65% and rescued $500K/month.",
    metric: "-65% Lag",
    slug: "ai-onboarding",
  },
  {
    title: "Gig Marketplace",
    summary: "Reduced churn by 70%, unlocked new revenue streams.",
    metric: "-70% Churn",
    slug: "gig-marketplace",
  },
  {
    title: "Hyperlocal Payments",
    summary: "Scaled payments platform to 75K MAUs, error rate ↓42%.",
    metric: "75K MAUs",
    slug: "payments-optimization",
  },
  {
    title: "Feed Fairness Algorithm",
    summary: "Drove +1% DAU (→ 430K users) via diversity-aware ranking.",
    metric: "+1% DAU",
    slug: "feed-diversity",
  },
];

export default function CaseStudyGrid() {
  return (
    <section className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Featured Case Studies</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {CASE_STUDIES.map(({ title, summary, metric, slug }) => (
          <Link
            key={slug}
            href={`/case-studies/${slug}`}
            className="group rounded-2xl bg-[#181f2a] border border-gray-700 hover:border-teal-400 transition shadow-md hover:shadow-lg p-6 flex flex-col cursor-pointer"
          >
            <div className="flex items-center mb-2">
              <span className="text-teal-400 text-lg font-semibold mr-3">{metric}</span>
              <span className="text-xl font-bold group-hover:text-teal-300 transition">{title}</span>
            </div>
            <p className="text-gray-300">{summary}</p>
            <span className="mt-4 inline-block px-4 py-1 rounded-full bg-gray-800 text-teal-400 text-xs font-medium w-fit group-hover:bg-teal-400 group-hover:text-gray-900 transition">
              View Case Study →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
