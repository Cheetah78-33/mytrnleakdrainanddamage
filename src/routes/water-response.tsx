import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Droplet } from "lucide-react";
import valve from "@/assets/valve.jpg";
import toilet from "@/assets/toilet.jpg";
import ducts from "@/assets/ducts.jpg";

export const Route = createFileRoute("/water-response")({
  head: () => ({ meta: [
    { title: "Water & Leak Response — MYTRN" },
    { name: "description", content: "Water damage spreads fast. Fast response matters. Leak detection support, appliance leak damage, ceiling and wall moisture damage repair." },
  ]}),
  component: Page,
});

const sections = [
  { t: "Leak Detection Support", b: "We coordinate detection and isolate active leaks at the source." },
  { t: "Appliance Leak Damage", b: "Dishwashers, washing machines, water heaters and refrigerators." },
  { t: "Ceiling Water Damage", b: "Stain assessment, drywall removal, structural drying coordination." },
  { t: "Wall Moisture Damage", b: "Moisture mapping, baseboard removal, drywall replacement." },
  { t: "Flooded Flooring", b: "Hardwood, laminate, vinyl, tile — removed and rebuilt to spec." },
  { t: "Emergency Mitigation Coordination", b: "Drying, extraction, and sanitation partners dispatched alongside us." },
];

function Page() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Water & Leak Response" title={<>Water Damage Spreads Fast. <br/><span className="text-white/90">Fast Response Matters.</span></>} image={valve} />

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="What We Handle" title="Every Stage of a Water Event" />
          <div className="grid md:grid-cols-2 gap-5">
            {sections.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm">
                  <Droplet className="h-7 w-7 text-[color:var(--gold-bright)]" />
                  <h3 className="mt-4 font-display text-2xl text-white">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Before & After" title="The MYTRN Standard" subtitle="From containment to a finished, photo-ready rebuild." />
          <div className="grid md:grid-cols-2 gap-6">
            {[{i: ducts, t: "Before"}, {i: toilet, t: "After"}].map((x) => (
              <div key={x.t} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-gold group">
                <img src={x.i} alt={x.t} className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute top-5 left-5 px-3 py-1 bg-gold-gradient text-black text-[11px] uppercase tracking-[0.22em] font-semibold">{x.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Call Now Before the Damage Spreads" sub="Every minute matters with active water damage. Reach the MYTRN response line now." />
    </SiteLayout>
  );
}
