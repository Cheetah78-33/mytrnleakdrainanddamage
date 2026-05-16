import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Award, ShieldCheck, Building2, Users } from "lucide-react";
import valve from "@/assets/valve.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — MYTRN Leak, Drain & Damage Response Co." },
    { name: "description", content: "Built around response, repair and reliability. A family business with industry experience and a property-first mindset." },
  ]}),
  component: Page,
});

const creds = [
  { i: Award, t: "Licensed General B Contractor", s: "License No. 1154968" },
  { i: ShieldCheck, t: "Licensed & Bonded", s: "Fully Insured Work" },
  { i: Building2, t: "Residential & Commercial", s: "Bay Area Coverage" },
  { i: Users, t: "Multi-Trade Coordination", s: "Single Point of Contact" },
];

const trust = [
  "Fast communication","Transparent process","Professional repair standards","Full project coordination","High-end workmanship",
];

function Page() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About" title="Built Around Response, Repair & Reliability" image={valve} />

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading eyebrow="Our Story" title="A Family Business with a Property-First Mindset" />
          <Reveal>
            <p className="text-muted-foreground leading-relaxed text-lg">
              MYTRN was founded out of years of hands-on industry experience watching damage events go from bad to worse because no one took ownership of the full picture. We built a different kind of response company — one that arrives quickly, communicates clearly, and stays with the property from the first containment through the final coat of paint. We treat every home and business like our own.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Credentials" title="Licensed, Bonded & Coordinated" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {creds.map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="glass-dark p-7 rounded-sm h-full text-center">
                  <c.i className="h-9 w-9 text-[color:var(--gold-bright)] mx-auto" />
                  <div className="mt-4 font-display text-lg text-white">{c.t}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{c.s}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gold">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <div className="glass-dark border-gold rounded-sm p-10 text-center">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--gold-bright)] mb-4">Important Notice</div>
              <blockquote className="font-display text-2xl md:text-3xl text-gold-gradient italic leading-relaxed">
                "Specialty trade work performed by properly licensed contractors when required."
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Why Clients Trust MYTRN" title="A Standard You Can Feel On Site" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trust.map((t, i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="glass-dark p-6 rounded-sm h-full text-center">
                  <div className="font-display text-lg text-white">{t}</div>
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
