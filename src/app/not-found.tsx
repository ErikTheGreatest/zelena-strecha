import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f1f08" }}>
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <p className="font-serif font-bold leading-none mb-6 select-none"
          style={{ fontSize: "clamp(6rem, 20vw, 12rem)", color: "rgba(255,255,255,0.04)" }}>
          404
        </p>

        {/* Icon */}
        <div className="text-5xl mb-6 -mt-16">🌿</div>

        {/* Text */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
            Stránka nenalezena
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
        </div>

        <h1 className="font-serif font-bold text-white mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          Tato stránka neexistuje
        </h1>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
          Stránka kterou hledáte byla přesunuta, smazána nebo nikdy neexistovala.
          Vraťte se na úvodní stránku.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">Zpět na úvod</Link>
          <Link href="/kontakt" className="btn-outline-white px-8 py-3">Kontaktovat nás</Link>
        </div>
      </div>
    </div>
  );
}
