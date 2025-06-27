import FunFactCard from "./FunFactCards";

export default function FunFactsGrid({ facts }) {
  return (
    <section className="w-full max-w-5xl mx-auto mb-16 py-6">
      <h2 className="text-2xl font-bold text-[#7cc6fe] text-center mb-6">More About Me</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 px-2">
        {facts.map((fact, idx) => (
          <FunFactCard key={idx} {...fact} />
        ))}
      </div>
    </section>
  );
}
