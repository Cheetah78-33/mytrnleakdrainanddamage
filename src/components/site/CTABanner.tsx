import { Phone } from "lucide-react";
import { GoldButton, GoldLink } from "./GoldButton";
import { Particles } from "./Particles";
import { Reveal } from "./Reveal";

export function CTABanner({ title = "Damage Doesn't Wait. Neither Do We.", sub = "Speak with a response coordinator now. Bay Area residential & commercial.\nRemember: Our Mission is to remove your problems." }: { title?: string; sub?: string }) {
  return (
    <section className="relative my-24 mx-5">
      <div className="relative mx-auto max-w-6xl overflow-hidden border border-gold glass-dark rounded-sm">
        <Particles count={14} />
        <div className="relative px-6 py-16 md:py-20 text-center">
          <Reveal>
            <h3 className="font-display text-4xl md:text-5xl text-gold-gradient">{title}</h3>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">{sub}</p>
            <div className="mt-9 flex flex-wrap gap-4 justify-center">
              <GoldLink href="tel:5108905792"><Phone className="h-4 w-4" /> Call 510-890-5792</GoldLink>
              <GoldLink to="/contact" variant="outline">Request Inspection</GoldLink>
              <GoldLink to="/water-response" variant="outline">Emergency Response</GoldLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
