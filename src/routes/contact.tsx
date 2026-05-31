import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { GoldButton } from "@/components/site/GoldButton";
import { Phone, MapPin, Mail, Upload, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import valve from "@/assets/valve.jpg";

export const Route = createFileRoute("/contact")({
 head: () => ({ meta: [
  { title: "Contact & Emergency Response MYTRN" },
  { name: "description", content: "Need immediate help? Reach the MYTRN response line at 510-890-5790 or send an emergency request." },
 ]}),
 component: Page,
});

const schema = z.object({
 name: z.string().trim().min(1, "Required").max(100),
 phone: z.string().trim().min(7, "Valid phone required").max(20),
 property: z.string().min(1, "Select one"),
 issue: z.string().min(1, "Select one"),
 message: z.string().trim().max(1000).optional(),
});

function Page() {
 const [done, setDone] = useState(false);
 const [errors, setErrors] = useState<Record<string,string>>({});

 const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const data = Object.fromEntries(fd.entries());
  const r = schema.safeParse(data);
  if (!r.success) {
   const errs: Record<string,string> = {};
   r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
   setErrors(errs);
   return;
  }
  setErrors({});
  setDone(true);
 };

 return (
  <SiteLayout>
   <PageHero eyebrow="Emergency Response" title="Need Immediate Help?" subtitle="Reach the MYTRN response line, day or night. We confirm receipt of every emergency request." image={valve} />

   <section className="py-20">
    <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-5 gap-8">
     <Reveal className="lg:col-span-2">
      <div className="glass-dark rounded-sm p-8 h-full">
       <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--gold-bright)]">Direct Contact</div>
       <div className="gold-divider my-5" />
       <ul className="space-y-6 text-white">
        <li className="flex items-start gap-4">
         <Phone className="h-6 w-6 text-[color:var(--gold-bright)] mt-1" />
         <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Emergency Line</div>
          <a href="tel:5108905790" className="font-display text-2xl text-gold-gradient">510-890-5790</a>
         </div>
        </li>
        <li className="flex items-start gap-4">
         <MapPin className="h-6 w-6 text-[color:var(--gold-bright)] mt-1" />
         <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Service Area</div>
          <div className="font-display text-lg">Bay Area, California</div>
         </div>
        </li>
        <li className="flex items-start gap-4">
         <Mail className="h-6 w-6 text-[color:var(--gold-bright)] mt-1" />
         <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Email</div>
          <a href="mailto:Mytrnentr@gmail.com" className="font-display text-lg text-white hover:text-[color:var(--gold-bright)]">Mytrnentr@gmail.com</a>
         </div>
        </li>
       </ul>
       <div className="gold-divider my-7" />
       <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Credentials</div>
       <div className="text-sm text-white/90">Licensed General B Contractor · License No. 1154968 · LICENSED, BONDED, INSURED</div>
      </div>
     </Reveal>

     <Reveal delay={120} className="lg:col-span-3">
      {done ? (
       <div className="glass-dark rounded-sm p-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-[color:var(--gold-bright)] mx-auto" />
        <h3 className="mt-5 font-display text-3xl text-gold-gradient">Request Received.</h3>
        <p className="mt-3 text-muted-foreground">A MYTRN coordinator will be in touch shortly. For active emergencies, please call 510-890-5790 now.</p>
       </div>
      ) : (
       <form onSubmit={onSubmit} className="glass-dark rounded-sm p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
         <Field label="Name" name="name" error={errors.name} />
         <Field label="Phone" name="phone" type="tel" error={errors.phone} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
         <Select label="Property Type" name="property" options={["Residential","Commercial","Property Management","Restaurant / Kitchen","Other"]} error={errors.property} />
         <Select label="Issue Type" name="issue" options={["Water Leak","Drain Backup","Sewer Backup","Damage Repair","Remodel / Rebuild","Other"]} error={errors.issue} />
        </div>
        <div>
         <Label>Upload Damage Photos</Label>
         <label className="mt-2 flex items-center justify-center gap-3 px-5 py-6 border border-dashed border-gold rounded-sm cursor-pointer hover:bg-[hsl(45_60%_55%/0.05)] transition">
          <Upload className="h-5 w-5 text-[color:var(--gold-bright)]" />
          <span className="text-sm text-muted-foreground">Drop files or click to upload</span>
          <input type="file" name="photos" multiple accept="image/*" className="hidden" />
         </label>
        </div>
        <div>
         <Label>Message</Label>
         <textarea name="message" rows={4} maxLength={1000} className="mt-2 w-full bg-black/50 border border-gold rounded-sm px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:glow-gold-sm focus:border-[color:var(--gold-bright)] transition" placeholder="Describe what's happening..." />
        </div>
        <GoldButton type="submit" className="w-full"><Send className="h-4 w-4" /> Send Emergency Request</GoldButton>
       </form>
      )}
     </Reveal>
    </div>
   </section>

   <section className="relative mx-5 mb-24">
    <div className="relative mx-auto max-w-6xl glass-dark border border-gold rounded-sm overflow-hidden">
     <div className="px-6 py-16 md:py-20 text-center">
      <h3 className="font-display text-4xl md:text-5xl text-gold-gradient leading-tight">Sit Back & Relax It's MYTRN to Fix the Damage.</h3>
     </div>
    </div>
   </section>
  </SiteLayout>
 );
}

function Label({ children }: { children: React.ReactNode }) {
 return <span className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--gold-bright)]">{children}</span>;
}
function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
 return (
  <div>
   <Label>{label}</Label>
   <input name={name} type={type} maxLength={100} className="mt-2 w-full bg-black/50 border border-gold rounded-sm px-4 py-3 text-white focus:outline-none focus:glow-gold-sm focus:border-[color:var(--gold-bright)] transition" />
   {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
 );
}
function Select({ label, name, options, error }: { label: string; name: string; options: string[]; error?: string }) {
 return (
  <div>
   <Label>{label}</Label>
   <select name={name} defaultValue="" className="mt-2 w-full bg-black/50 border border-gold rounded-sm px-4 py-3 text-white focus:outline-none focus:glow-gold-sm focus:border-[color:var(--gold-bright)] transition">
    <option value="" disabled>Select…</option>
    {options.map((o) => <option key={o} value={o} className="bg-black">{o}</option>)}
   </select>
   {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
 );
}
