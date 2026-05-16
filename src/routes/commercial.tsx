import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Building2, Wrench } from "lucide-react";
import ducts from "@/assets/ducts.jpg";

export const Route = createFileRoute("/commercial")({
  head: () => ({ meta: [
    { title: "Commercial Services — MYTRN" },
    { name: "description", content: "Commercial property damage support across the Bay Area: restaurants, kitchens, offices, retail, property management and apartments." },
  ]}),
  component: Page,
});

const industries = ["Restaurants","Commercial Kitchens","Offices","Retail Spaces","Property Management","Apartments"];
const services = ["FRP Wall Repair","Acoustic Ceiling Tile Replacement","T-Bar Ceiling Repair","Epoxy Floor Spot Repair","Tenant Improvements","Building Maintenance Repairs"];

function Page() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Commercial" title="Commercial Property Damage Support" image={ducts} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Industries Served" title="Built for Properties That Can't Pause" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {industries.map((t, i) => (
              <Reveal key={t} delay={i * 70}>
                <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm text-center">
                  <Building2 className="h-7 w-7 text-[color:var(--gold-bright)] mx-auto" />
                  <div className="mt-4 font-display text-xl text-white">{t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Services" title="Commercial Repair Specialties" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((t, i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm">
                  <Wrench className="h-7 w-7 text-[color:var(--gold-bright)]" />
                  <div className="mt-4 font-display text-xl text-white">{t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Protect Your Property & Operations" sub="Discreet, fast, and finished to a commercial standard." />
    </SiteLayout>
  );
}
