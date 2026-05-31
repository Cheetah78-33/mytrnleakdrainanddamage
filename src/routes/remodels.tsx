import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import valve from "@/assets/valve.jpg";
import toilet from "@/assets/toilet.jpg";
import ducts from "@/assets/ducts.jpg";

export const Route = createFileRoute("/remodels")({
 head: () => ({ meta: [
  { title: "Remodel & Rebuild MYTRN" },
  { name: "description", content: "Damage repair can become a full upgrade. Bathroom, kitchen, interior refresh, finish carpentry and commercial improvements." },
 ]}),
 component: Page,
});

const items = ["Bathroom Remodels","Kitchen Remodels","Interior Refreshes","Flooring Upgrades","Finish Carpentry","Commercial Improvements"];

function BeforeAfter({ before, after }: { before: string; after: string }) {
 const [pos, setPos] = useState(50);
 const ref = useRef<HTMLDivElement>(null);
 const onMove = (e: React.PointerEvent) => {
  if (!ref.current) return;
  const r = ref.current.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width) * 100;
  setPos(Math.max(0, Math.min(100, x)));
 };
 return (
  <div ref={ref} onPointerMove={onMove} className="relative aspect-[16/10] overflow-hidden rounded-sm border border-gold select-none cursor-ew-resize">
   <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
   <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
    <img src={before} alt="Before" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${100 / (pos/100)}%`, maxWidth: "none" }} />
   </div>
   <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-bright)] border border-gold">Before</div>
   <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-bright)] border border-gold">After</div>
   <div className="absolute top-0 bottom-0 w-px bg-gold-gradient glow-gold" style={{ left: `${pos}%` }}>
    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-gold-gradient flex items-center justify-center text-black font-bold text-xs">⇆</div>
   </div>
  </div>
 );
}

function Page() {
 return (
  <SiteLayout>
   <PageHero eyebrow="Remodel & Rebuild" title="Damage Repair Can Become a Full Upgrade" image={toilet} />

   <section className="py-24">
    <div className="mx-auto max-w-7xl px-5">
     <SectionHeading eyebrow="Upgrades" title="Where Repair Meets Renovation" />
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((t, i) => (
       <Reveal key={t} delay={i * 70}>
        <div className="group glass-dark p-7 rounded-sm h-full transition-all duration-500 hover:-translate-y-1 hover:glow-gold-sm">
         <Sparkles className="h-7 w-7 text-[color:var(--gold-bright)]" />
         <div className="mt-4 font-display text-xl text-white">{t}</div>
         <div className="mt-2 text-sm text-muted-foreground">Finished to a luxury standard with full project coordination.</div>
        </div>
       </Reveal>
      ))}
     </div>
    </div>
   </section>

   <section className="py-24 border-t border-gold">
    <div className="mx-auto max-w-5xl px-5">
     <SectionHeading eyebrow="Before & After" title="Drag to Reveal the Rebuild" />
     <BeforeAfter before={ducts} after={valve} />
    </div>
   </section>

   <CTABanner title="Turn Damage Into Improvement" />
  </SiteLayout>
 );
}
