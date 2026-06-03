import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { useState } from "react";
import { ChevronDown, Droplet, Hammer, Sparkles, Building2 } from "lucide-react";
import valve from "@/assets/valve.jpg";
import bathroomRebuild from "@/assets/remodel-after.png.asset.json";
import kitchenRestoration from "@/assets/kitchen-restoration-new.png.asset.json";
import tenantImprovements from "@/assets/tenant-improvements-floor.png.asset.json";
import interiorUpgrades from "@/assets/repair-toilet.png.asset.json";

export const Route = createFileRoute("/services")({
 head: () => ({ meta: [
  { title: "Services MYTRN Leak, Drain & Damage Response Co." },
  { name: "description", content: "Cleanup, repair, rebuild. Full-spectrum leak response, drain backup cleanup, damage repair, and remodel services across the Bay Area." },
 ]}),
 component: Services,
});

const emergency = [
 { t: "Water Leak Response", b: "Immediate stabilization, isolation of the source, and protective measures while the rebuild plan is set." },
 { t: "Overflow Cleanup", b: "Extraction support, sanitation coordination, and removal of compromised materials." },
 { t: "Sewer Backup Cleanup", b: "Documented sanitary cleanup and damaged material removal in residential and commercial properties." },
 { t: "Water Extraction Coordination", b: "Partnered drying and dehumidification dispatched alongside our team." },
 { t: "Temporary Protection", b: "Floor protection, containment, and dust barriers installed on arrival." },
 { t: "Damage Documentation", b: "Photographic and written records for owners and insurance carriers." },
 { t: "Access Opening & Repair", b: "Wall and ceiling access cut and finished cleanly for trade work and rebuild." },
 { t: "Damaged Material Removal", b: "Wet drywall, flooring, baseboards, and cabinetry removed and disposed of properly." },
];
const repair = [
 "Drywall Repair","Ceiling Repair","Wall Repair","Texture Matching","Paint Repair","Flooring Repair","Cabinet Repair","Trim & Baseboards","Vanity Replacement","Subfloor Repair"
];

function Accordion({ items }: { items: { t: string; b: string }[] }) {
 const [open, setOpen] = useState<number | null>(0);
 return (
  <div className="space-y-3">
   {items.map((it, i) => (
    <div key={it.t} className="glass-dark rounded-sm overflow-hidden">
     <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
      <span className="font-display text-lg text-white">{it.t}</span>
      <ChevronDown className={`h-5 w-5 text-[color:var(--gold-bright)] transition-transform duration-500 ${open === i ? "rotate-180" : ""}`} />
     </button>
     <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">
       <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-gold pt-4">{it.b}</div>
      </div>
     </div>
    </div>
   ))}
  </div>
 );
}

function Services() {
 return (
  <SiteLayout>
   <PageHero eyebrow="Services" title={<>Cleanup. Repair. <em className="not-italic text-white/90">Rebuild.</em></>} subtitle="One coordinated team for every stage from the first call to the final walkthrough." image={valve} />

   <section className="py-24">
    <div className="mx-auto max-w-6xl px-5">
     <SectionHeading eyebrow="Emergency & Response" title="When the Damage Begins, We Begin." />
     <Accordion items={emergency} />
    </div>
   </section>

   <section className="py-24 border-t border-gold">
    <div className="mx-auto max-w-7xl px-5">
     <SectionHeading eyebrow="Damage Repair" title="Finish-Carpentry Quality, Every Repair." />
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {repair.map((r, i) => (
       <Reveal key={r} delay={i * 60}>
        <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm">
         <Hammer className="h-7 w-7 text-[color:var(--gold-bright)]" />
         <div className="mt-4 font-display text-xl text-white">{r}</div>
         <div className="mt-2 text-sm text-muted-foreground">Texture-matched, paint-ready and finished to a premium standard.</div>
        </div>
       </Reveal>
      ))}
     </div>
    </div>
   </section>

   <section className="py-24 border-t border-gold">
    <div className="mx-auto max-w-7xl px-5">
     <SectionHeading eyebrow="Remodel & Rebuild" title="Turn Damage Into a Full Upgrade." />
     <div className="grid md:grid-cols-2 gap-6">
      {[{i: bathroomRebuild.url, t: "Bathroom Rebuild"},{i: kitchenRestoration.url, t: "Kitchen Restoration"},{i: tenantImprovements.url, t: "Tenant Improvements"},{i: interiorUpgrades.url, t: "Interior Upgrades"}].map((x) => (
       <div key={x.t} className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-gold">
        <img src={x.i} alt={x.t} className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
         <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--gold-bright)]">Remodel</div>
          <div className="font-display text-2xl text-white mt-1">{x.t}</div>
         </div>
         <Sparkles className="h-6 w-6 text-[color:var(--gold-bright)]" />
        </div>
       </div>
      ))}
     </div>
    </div>
   </section>

   <section className="py-24 border-t border-gold">
    <div className="mx-auto max-w-7xl px-5">
     <SectionHeading eyebrow="Commercial" title="Built for Properties That Can't Wait." />
     <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {["Restaurants","Commercial Kitchens","Retail","Offices","Rental Properties"].map((x) => (
       <div key={x} className="glass-dark p-6 text-center rounded-sm hover:glow-gold-sm transition-all">
        <Building2 className="h-7 w-7 text-[color:var(--gold-bright)] mx-auto" />
        <div className="mt-4 font-display text-lg text-white">{x}</div>
       </div>
      ))}
     </div>
    </div>
   </section>

   <CTABanner title="Speak With a Response Coordinator" sub="We staff our intake line during emergencies. Tell us what's happening." />
  </SiteLayout>
 );
}
