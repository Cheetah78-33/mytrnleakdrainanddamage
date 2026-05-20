import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { GoldLink } from "@/components/site/GoldButton";
import { Particles } from "@/components/site/Particles";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading, Eyebrow } from "@/components/site/SectionHeading";
import { CTABanner } from "@/components/site/CTABanner";
import { Phone, Droplet, Waves, Hammer, Wrench, ShieldCheck, Building2, PaintBucket, Sparkles, Award, Clock, Flame, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import workVanity from "@/assets/work-vanity.jpg";
import workShower from "@/assets/work-shower.jpg";
import workBathroom from "@/assets/work-bathroom.jpg";
import workDrain from "@/assets/work-drain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "MYTRN Leak, Drain & Damage Response Co. | Luxury Damage Response — Bay Area" },
    { name: "description", content: "Sit Back & Relax — It's MYTRN to Fix the Damage. Premium leak response, drain backup cleanup, and damage repair. Licensed General B Contractor #1154968." },
  ]}),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number; const start = performance.now(); const dur = 1800;
    const tick = (t: number) => { const p = Math.min(1, (t - start) / dur); setN(Math.floor(p * to)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

const services = [
  { icon: Droplet, title: "Water Leak Response", desc: "Rapid containment and source isolation." },
  { icon: Waves, title: "Drain Backup Cleanup", desc: "Sanitary cleanup and material removal." },
  { icon: Flame, title: "Sewer Backup Damage", desc: "Damage triage and full coordination." },
  { icon: PaintBucket, title: "Drywall & Ceiling Repair", desc: "Texture-matched finish carpentry." },
  { icon: Hammer, title: "Flooring Repair", desc: "Subfloor, hardwood, tile and vinyl." },
  { icon: Wrench, title: "Cabinet & Vanity Repair", desc: "Replacement and millwork repair." },
  { icon: Sparkles, title: "Remodel & Rebuild", desc: "Turn damage into a full upgrade." },
  { icon: Building2, title: "Commercial Damage Repair", desc: "Restaurants, retail and properties." },
];

const timeline = [
  { t: "01", title: "Emergency Response", body: "Same-day arrival and rapid stabilization." },
  { t: "02", title: "Damage Assessment", body: "Documented scope, photos, and plan of work." },
  { t: "03", title: "Material Removal", body: "Wet drywall, flooring, and affected materials." },
  { t: "04", title: "Cleanup Coordination", body: "Sanitation and drying partner coordination." },
  { t: "05", title: "Repair & Rebuild", body: "Drywall, paint, flooring, cabinetry, finish work." },
  { t: "06", title: "Final Walkthrough", body: "Quality check and client sign-off." },
];

const reviews = [
  { q: "Professional, prepared, and handled everything from cleanup to repairs. The property looked better than before.", a: "Homeowner — Oakland" },
  { q: "Showed up the same evening, contained the leak, and rebuilt the ceiling within the week. White-glove service.", a: "Property Manager — Berkeley" },
  { q: "Our restaurant was back in service faster than we believed possible. Discreet, clean, professional.", a: "Commercial Client — Alameda" },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_65%)]" />
        </div>
        <Particles count={28} />
        <div className="mx-auto max-w-7xl px-5 py-32 md:py-44">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Eyebrow>Bay Area · Residential & Commercial</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02]">
                <span className="text-gold-gradient">Sit Back & Relax —</span>
                <br />
                <span className="text-white/95">It's MYTRN to</span>
                <br />
                <span className="text-gold-gradient italic">Fix the Damage.</span>
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Water Leaks · Drain Backups · Sewer Backup Cleanup · Damage Repair · Remodels · Home Repair
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <GoldLink href="tel:5107895001"><Phone className="h-4 w-4" /> Get Emergency Help</GoldLink>
                <GoldLink to="/contact" variant="outline">Request Inspection</GoldLink>
                <GoldLink to="/services" variant="outline">View Services <ChevronRight className="h-4 w-4" /></GoldLink>
              </div>
            </Reveal>
            <Reveal delay={520}>
              <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {[
                  "Licensed General B · Lic. #1154968",
                  "Residential & Commercial",
                  "Emergency Response",
                  "Licensed & Bonded",
                  "Fast Response",
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--gold-bright)]" /> {t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* STATS */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: 10, s: "+", l: "Years Industry Experience" },
            { n: 300, s: "+", l: "Completed Projects" },
            { n: 24, s: "/7", l: "Emergency Response" },
            { n: 100, s: "%", l: "Licensed & Bonded" },
          ].map((x, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="glass-dark p-8 text-center rounded-sm transition-all duration-500 hover:-translate-y-1">
                <div className="font-display text-5xl md:text-6xl text-gold-gradient"><Counter to={x.n} suffix={x.s} /></div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{x.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE HANDLE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="What We Handle" title="A Full-Spectrum Damage Response" subtitle="From the first call to the final walkthrough, every detail is coordinated with white-glove precision." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="group glass-dark p-7 rounded-sm h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:glow-gold-sm">
                  <span className="absolute top-0 left-0 h-px w-0 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
                  <s.icon className="h-8 w-8 text-[color:var(--gold-bright)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                  <h3 className="mt-5 font-display text-xl text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT */}
      <section className="relative py-24 border-y border-gold">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold">
              <img src={workShower} alt="MYTRN finished bathroom rebuild" className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--gold-bright)]">On-Site · Bay Area</div>
                <div className="font-display text-2xl text-white mt-2">Coordinated, contained, and rebuilt.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>Beyond Response</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-gold-gradient leading-tight">We Don't Just Show Up — We Fix the Damage.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              From the moment we arrive to the final walkthrough, MYTRN handles every stage of a damage event with the discipline of a luxury contractor. Cleanup, damaged material removal, rebuild, finish carpentry, remodel upgrades, and insurance documentation — coordinated by one team.
            </p>
            <ul className="mt-7 space-y-3">
              {["Damage cleanup & sanitation coordination","Wet material removal & site protection","Drywall, flooring, cabinetry & finish rebuild","Remodel upgrades during repair","Documentation for insurance claims"].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm text-white/90"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-gradient glow-gold-sm" />{x}</li>
              ))}
            </ul>
            <div className="mt-9 flex gap-4">
              <GoldLink to="/services">View All Services</GoldLink>
              <GoldLink to="/about" variant="outline">About MYTRN</GoldLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="The Process" title="How MYTRN Handles the Damage" />
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[hsl(45_60%_55%/0.5)] to-transparent" />
            <div className="space-y-10">
              {timeline.map((s, i) => (
                <Reveal key={s.t} delay={i * 80}>
                  <div className={`relative grid md:grid-cols-2 gap-6 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <div className={`pl-16 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                      <div className="text-gold-gradient font-display text-5xl">{s.t}</div>
                      <h3 className="font-display text-2xl text-white mt-1">{s.title}</h3>
                      <p className="text-muted-foreground mt-2 max-w-md md:ml-auto">{s.body}</p>
                    </div>
                    <div className="hidden md:block" />
                    <div className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 h-4 w-4 rounded-full bg-gold-gradient glow-gold-sm" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="relative py-24 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Featured" title="Signature Service Offerings" />
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory -mx-5 px-5">
            {[
              { t: "Bathroom Rebuild", i: workShower },
              { t: "Vanity & Cabinetry", i: workVanity },
              { t: "Drain Backup Response", i: workDrain },
              { t: "Finish Carpentry", i: workBathroom },
              { t: "Tile & Shower Repair", i: workShower },
              { t: "Commercial Drain Cleanup", i: workDrain },
            ].map((c) => (
              <div key={c.t} className="group relative min-w-[300px] md:min-w-[380px] aspect-[3/4] snap-start overflow-hidden rounded-sm border border-gold cursor-pointer">
                <img src={c.i} alt={c.t} className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 ring-0 ring-[hsl(45_60%_55%/0.6)] transition-all duration-500 group-hover:ring-2 group-hover:glow-gold" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-bright)] mb-2">MYTRN Service</div>
                  <div className="font-display text-2xl text-white">{c.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Clients" title="What Our Clients Say" />
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="glass-dark p-8 rounded-sm h-full relative">
                  <Quote className="h-8 w-8 text-[color:var(--gold-bright)]/40" />
                  <blockquote className="mt-4 text-white/90 text-lg leading-relaxed font-display italic">"{r.q}"</blockquote>
                  <div className="gold-divider my-6" />
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-bright)]">{r.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      {/* CREDENTIAL STRIP */}
      <section className="py-16 border-t border-gold">
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { i: Award, t: "Licensed General B", s: "Lic. #1154968" },
            { i: ShieldCheck, t: "Licensed & Bonded", s: "Insured Work" },
            { i: Clock, t: "Emergency Response", s: "Same-Day Arrival" },
            { i: Building2, t: "Residential & Commercial", s: "Bay Area Coverage" },
          ].map((x) => (
            <div key={x.t} className="flex flex-col items-center gap-2">
              <x.i className="h-8 w-8 text-[color:var(--gold-bright)]" />
              <div className="font-display text-lg text-white">{x.t}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.2em]">{x.s}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
