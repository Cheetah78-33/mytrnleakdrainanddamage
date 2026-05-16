import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Waves } from "lucide-react";
import toilet from "@/assets/toilet.jpg";
import valve from "@/assets/valve.jpg";
import ducts from "@/assets/ducts.jpg";

export const Route = createFileRoute("/drain-backup")({
  head: () => ({ meta: [
    { title: "Drain & Sewer Backup — MYTRN" },
    { name: "description", content: "Drain backup cleanup and damage repair for residential and commercial properties across the Bay Area." },
  ]}),
  component: Page,
});

const items = [
  "Drain Overflow Cleanup","Sewer Backup Support","Damaged Material Removal","Sanitation Coordination","Flooring & Wall Repairs","Commercial Drain Backup Response"
];
const steps = [
  { t: "Stabilize", b: "Contain the affected area and stop the spread." },
  { t: "Sanitize", b: "Coordinated sanitation by certified partners." },
  { t: "Remove", b: "Damaged drywall, flooring and trim removed cleanly." },
  { t: "Rebuild", b: "Finish-grade rebuild and walkthrough sign-off." },
];

function Page() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Drain & Sewer Backup" title={<>Drain Backup Cleanup <br/><span className="text-white/90">& Damage Repair</span></>} image={toilet} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Capabilities" title="Discreet, Sanitary, Complete" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((t, i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm">
                  <Waves className="h-7 w-7 text-[color:var(--gold-bright)]" />
                  <h3 className="mt-4 font-display text-xl text-white">{t}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold">
            <img src={valve} alt="Commercial kitchen drain backup response" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
          <Reveal>
            <SectionHeading eyebrow="Commercial Kitchen" title="Operations Back Online — Fast." center={false} />
            <p className="text-muted-foreground leading-relaxed">Restaurant and commercial kitchen drain events are handled with discretion and urgency. We coordinate cleanup, removal, and rebuild so service can resume.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="The Walkthrough" title="What Happens After a Backup?" />
          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 100}>
                <div className="glass-dark p-7 rounded-sm h-full relative">
                  <div className="text-gold-gradient font-display text-4xl">{String(i+1).padStart(2,"0")}</div>
                  <div className="font-display text-xl text-white mt-1">{s.t}</div>
                  <div className="text-muted-foreground mt-2 text-sm">{s.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </SiteLayout>
  );
}
