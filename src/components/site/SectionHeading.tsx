import type { ReactNode } from "react";
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <span className="h-px w-10 bg-gold-gradient" />
      <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--gold-bright)]">{children}</span>
      <span className="h-px w-10 bg-gold-gradient" />
    </div>
  );
}
export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto mb-14" : "max-w-3xl mb-14"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl md:text-5xl leading-tight"><span className="text-gold-gradient">{title}</span></h2>
      {subtitle && <p className="mt-5 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
