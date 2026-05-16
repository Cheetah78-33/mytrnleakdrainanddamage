export function Particles({ count = 24 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 5;
        const left = Math.random() * 100;
        const dur = 12 + Math.random() * 14;
        const delay = Math.random() * 12;
        return (
          <span key={i} className="particle" style={{
            width: `${size}px`, height: `${size}px`, left: `${left}%`,
            animationDuration: `${dur}s`, animationDelay: `${delay}s`,
          }} />
        );
      })}
    </div>
  );
}
