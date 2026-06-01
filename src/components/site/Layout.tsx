import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/logo.png";
import { Phone, Menu, X } from "lucide-react";

const NAV = [
 { to: "/", label: "Home" },
 { to: "/services", label: "Services" },
 { to: "/water-response", label: "Water Response" },
 { to: "/drain-backup", label: "Drain Backup" },
 { to: "/repairs", label: "Repairs" },
 { to: "/remodels", label: "Remodels" },
 { to: "/commercial", label: "Commercial" },
 { to: "/about", label: "About" },
 { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
 const [scrolled, setScrolled] = useState(false);
 const [open, setOpen] = useState(false);
 const path = useRouterState({ select: (s) => s.location.pathname });

 useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
 }, []);
 useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }); }, [path]);

 return (
  <div className="min-h-screen bg-background text-foreground bg-noise">
   <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark py-2" : "bg-transparent py-4"}`}>
    <div className="mx-auto max-w-7xl px-5 flex items-center justify-between gap-6">
     <Link to="/" className="flex items-center gap-3 group">
      <img src={logo} alt="MYTRN Leak, Drain & Damage Response Co. logo" className="h-12 w-auto transition-transform group-hover:scale-105" />
      <span className="hidden sm:flex flex-col leading-tight">
       <span className="text-gold-gradient font-display text-lg font-semibold tracking-wider">MYTRN</span>
       <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Leak · Drain · Damage</span>
      </span>
     </Link>
     <nav className="hidden lg:flex items-center gap-1">
      {NAV.map((n) => {
       const active = path === n.to;
       return (
        <Link key={n.to} to={n.to as any}
         className={`relative px-3 py-2 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300
          ${active ? "text-[color:var(--gold-bright)]" : "text-muted-foreground hover:text-[color:var(--gold-bright)]"}`}>
         {n.label}
         <span className={`absolute left-3 right-3 -bottom-0.5 h-px transition-all duration-500 ${active ? "bg-gold-gradient opacity-100" : "bg-gold-gradient opacity-0 group-hover:opacity-100"}`} />
        </Link>
       );
      })}
     </nav>
     <a href="tel:5108905790" className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-gold text-[color:var(--gold-bright)] text-xs uppercase tracking-[0.2em] hover:bg-[hsl(45_60%_55%/0.1)] hover:glow-gold-sm transition-all">
      <Phone className="h-3.5 w-3.5" /> 510-890-5790
     </a>
     <button className="lg:hidden text-[color:var(--gold-bright)]" onClick={() => setOpen(!open)} aria-label="Menu">
      {open ? <X /> : <Menu />}
     </button>
    </div>
    {open && (
     <div className="lg:hidden glass-dark border-t border-gold mt-2">
      <nav className="flex flex-col px-5 py-4 gap-1">
       {NAV.map((n) => (
        <Link key={n.to} to={n.to as any} className="py-2 text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-[color:var(--gold-bright)]">{n.label}</Link>
       ))}
       <a href="tel:5108905790" className="mt-3 inline-flex items-center justify-center gap-2 bg-gold-gradient text-black px-4 py-3 text-xs uppercase tracking-[0.2em] font-semibold">
        <Phone className="h-4 w-4" /> Call 510-890-5790
       </a>
      </nav>
     </div>
    )}
   </header>

   <main className="pt-20">{children}</main>

   <Footer />

   <a href="tel:5108905790" className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-gold-gradient text-black px-5 py-4 rounded-full font-semibold text-xs uppercase tracking-[0.2em] pulse-gold glow-gold">
    <Phone className="h-4 w-4" /> Emergency
   </a>
  </div>
 );
}

function Footer() {
 return (
  <footer className="relative mt-24 border-t border-gold bg-[#050505]">
   <div className="gold-divider" />
   <div className="mx-auto max-w-7xl px-5 py-16 grid gap-12 md:grid-cols-4">
    <div className="space-y-4">
     <img src={logo} alt="MYTRN logo" className="h-16 w-auto" />
     <p className="text-sm text-muted-foreground leading-relaxed">
      Bay Area's luxury leak, drain & damage response. Built on response, repair, and reliability.
     </p>
      <p className="text-sm italic text-[color:var(--gold-bright)]">Our mission is to remove your problems.</p>
    </div>
    <div>
     <h4 className="text-gold-gradient text-sm uppercase tracking-[0.22em] mb-4">Navigate</h4>
     <ul className="space-y-2 text-sm">
      {NAV.slice(0, 5).map((n) => <li key={n.to}><Link to={n.to as any} className="text-muted-foreground hover:text-[color:var(--gold-bright)] transition">{n.label}</Link></li>)}
     </ul>
    </div>
    <div>
     <h4 className="text-gold-gradient text-sm uppercase tracking-[0.22em] mb-4">Services</h4>
     <ul className="space-y-2 text-sm">
      {NAV.slice(5).map((n) => <li key={n.to}><Link to={n.to as any} className="text-muted-foreground hover:text-[color:var(--gold-bright)] transition">{n.label}</Link></li>)}
     </ul>
    </div>
    <div>
     <h4 className="text-gold-gradient text-sm uppercase tracking-[0.22em] mb-4">Contact</h4>
     <ul className="space-y-2 text-sm text-muted-foreground">
      <li><a href="tel:5108905790" className="hover:text-[color:var(--gold-bright)]">📞 510-890-5790</a></li>
      <li>📍 Bay Area, California</li>
      <li>✉ Mytrnentr@gmail.com</li>
     </ul>
     <div className="mt-5 inline-flex flex-col gap-1 border border-gold px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--gold-bright)]">
      <span>LICENSED, BONDED, INSURED</span>
      <span>General B Contractor</span>
      <span>License No. 1154968</span>
     </div>
    </div>
   </div>
   <div className="border-t border-gold px-5 py-6 text-center text-xs text-muted-foreground space-y-1">
    <p>© {new Date().getFullYear()} MYTRN Leak, Drain & Damage Response Co. All rights reserved.</p>
    <p className="italic">Specialty trade work performed by properly licensed contractors.</p>
   </div>
  </footer>
 );
}
