import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Hammer } from "lucide-react";
import ducts from "@/assets/ducts.jpg";
import valve from "@/assets/valve.jpg";
import toilet from "@/assets/toilet.jpg";

export const Route = createFileRoute("/repairs")({
  head: () => ({ meta: [
    { title: "Damage Repair — MYTRN" },
    { name: "description", content: "Rebuilding what the damage left behind: drywall, texture, paint, trim, flooring, cabinets, doors, ceiling repair." },
  ]}),
  component: Page,
});

const grid = ["Drywall","Texture","Paint","Trim","Baseboards","Flooring","Cabinets","Doors","Ceiling Repair"];
const gallery = [ducts, valve, toilet, valve, toilet, ducts];

function Page() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Damage Repair" title="Rebuilding What the Damage Left Behind" image={ducts} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Capabilities" title="A Finish-Grade Rebuild, Every Time" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grid.map((t, i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm">
                  <Hammer className="h-7 w-7 text-[color:var(--gold-bright)]" />
                  <div className="mt-4 font-display text-xl text-white">{t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Gallery" title="Interactive Showcase" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((g, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-sm border border-gold">
                <img src={g} alt="MYTRN repair work" className="h-full w-full object-cover transition-all duration-[1800ms] group-hover:scale-110 group-hover:rotate-1" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--gold-bright)]">MYTRN · 0{i+1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Restore the Property Professionally" />
    </SiteLayout>
  );
}
