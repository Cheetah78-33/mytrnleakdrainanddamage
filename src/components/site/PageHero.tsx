import type { ReactNode } from "react";
import { Particles } from "./Particles";
import { Eyebrow } from "./SectionHeading";

export function PageHero({ eyebrow, title, subtitle, image }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18),transparent_60%)]" />
      </div>
      <Particles count={18} />
      <div className="mx-auto max-w-6xl px-5 py-32 md:py-44 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] reveal"><span className="text-gold-gradient">{title}</span></h1>
        {subtitle && <p className="mt-7 max-w-2xl mx-auto text-lg text-muted-foreground reveal" style={{ animationDelay: "200ms" }}>{subtitle}</p>}
      </div>
      <div className="gold-divider" />
    </section>
  );
}
