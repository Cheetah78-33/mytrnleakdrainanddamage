import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
type Variant = "solid" | "outline";
type Common = { variant?: Variant; className?: string; children: ReactNode };
export function GoldButton({ variant = "solid", className = "", children, ...rest }: Common & ComponentProps<"button">) {
  return <button {...rest} className={cls(variant, className)}>{children}</button>;
}
export function GoldLink({ variant = "solid", className = "", children, to, href, ...rest }: Common & { to?: string; href?: string } & Omit<ComponentProps<"a">, "href">) {
  if (to) return <Link to={to as any} className={cls(variant, className)}>{children}</Link>;
  return <a href={href} {...rest} className={cls(variant, className)}>{children}</a>;
}
function cls(v: Variant, extra: string) {
  const base = "group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-500 overflow-hidden";
  if (v === "solid") return `${base} bg-gold-gradient text-black hover:glow-gold hover:scale-[1.03] shimmer ${extra}`;
  return `${base} border border-[hsl(45_60%_55%/0.6)] text-[color:var(--gold-bright)] hover:bg-[hsl(45_60%_55%/0.1)] hover:glow-gold-sm hover:scale-[1.03] ${extra}`;
}
