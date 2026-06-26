import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Služby",
  description: "Kompletní nabídka zahradnických služeb — návrh, realizace, údržba, terasy, balkóny, zavlažování a vodní prvky.",
};

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order", { ascending: true });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

const process = [
  { step: "01", title: "Konzultace", desc: "Přijedeme k vám, prohlédneme prostor a prodiskutujeme vaše přání. Zdarma a nezávazně." },
  { step: "02", title: "Návrh",      desc: "Vypracujeme vizualizaci a detailní plán včetně výběru rostlin a materiálů." },
  { step: "03", title: "Realizace",  desc: "Zkušený tým provede vše od zemních prací po finální výsadbu." },
  { step: "04", title: "Péče",       desc: "Nabízíme pravidelnou údržbu a celoroční servis pro váš klid." },
];

export default async function SluzbyPage() {
  const services = await getServices();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ backgroundColor: "#0f1f08" }}>
        {/* Background image subtle */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
            alt="Zahradní služby"
            fill className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Accent block */}
        <div className="absolute right-0 top-0 bottom-0 w-1 hidden lg:block" style={{ backgroundColor: "#C46B3F" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7A9E5F" }}>
              Co nabízíme
            </span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}>
            Naše služby
          </h1>
          <p className="max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem" }}>
            Od prvního tužkou načrtnutého návrhu až po pravidelnou péči —
            postaráme se o váš venkovní prostor v každé fázi.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#d6d0c8" }}>
              {services.map((service, i) => (
                <div
                  key={service.id}
                  className="group p-10 flex flex-col transition-all duration-300 cursor-default"
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#faf6ef" }}
                >
                  {/* Icon & order */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-4xl">{service.icon ?? "🌿"}</div>
                    <span className="font-serif font-bold text-5xl" style={{ color: "rgba(28,28,28,0.06)", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-xl mb-3" style={{ color: "#1C1C1C" }}>
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(28,28,28,0.6)" }}>
                    {service.description}
                  </p>

                  {/* Price */}
                  {service.price_from && (
                    <div className="mt-6 pt-6 border-t flex items-center justify-between" style={{ borderColor: "#e8e2d8" }}>
                      <span className="text-xs uppercase tracking-widest" style={{ color: "#7A9E5F" }}>od</span>
                      <span className="font-serif font-bold text-lg" style={{ color: "#2D5016" }}>
                        {service.price_from.toLocaleString("cs-CZ")} Kč
                      </span>
                    </div>
                  )}

                  {/* Hover line */}
                  <div className="mt-4 w-0 h-0.5 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: "#C46B3F" }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 rounded-2xl bg-white" style={{ color: "rgba(28,28,28,0.4)" }}>
              <p className="text-5xl mb-4">🌱</p>
              <p className="font-semibold mb-1 text-lg">Služby se nenačetly</p>
              <p className="text-sm">Spusť SQL INSERT příkazy v Supabase.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ backgroundColor: "#141f0c" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
              Jak pracujeme
            </span>
          </div>
          <h2 className="font-serif font-bold text-white mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Postup spolupráce
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            {process.map((p) => (
              <div key={p.step} className="p-8" style={{ backgroundColor: "#141f0c" }}>
                <span className="font-serif font-bold block mb-6" style={{ fontSize: "3.5rem", lineHeight: 1, color: "#2D5016" }}>
                  {p.step}
                </span>
                <h3 className="font-serif font-bold text-lg text-white mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.desc}</p>
                <div className="mt-8 w-8 h-0.5" style={{ backgroundColor: "#C46B3F" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ STRIP ── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>Časté otázky</span>
            </div>
            <h2 className="font-serif font-bold mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1C1C1C" }}>
              Než nás kontaktujete
            </h2>
            <div className="flex flex-col gap-6">
              {[
                { q: "Jak dlouho trvá realizace?", a: "Záleží na rozsahu projektu. Menší balkón zvládneme za 1–2 dny, velká zahrada může trvat 2–4 týdny." },
                { q: "Pracujete i mimo Prahu?", a: "Ano, realizujeme projekty po celé ČR. Konzultace na místě je zdarma do 50 km od Prahy." },
                { q: "Poskytujete záruky?", a: "Na všechny realizace poskytujeme záruku 2 roky a nabízíme servisní smlouvy na údržbu." },
                { q: "Kdy je nejlepší čas začít?", a: "Ideálně na podzim nebo začátkem jara. Návrh a plánování ale zvládneme kdykoliv během roku." },
              ].map((faq) => (
                <div key={faq.q} className="border-b pb-6" style={{ borderColor: "#e8e2d8" }}>
                  <h3 className="font-semibold mb-2" style={{ color: "#1C1C1C" }}>{faq.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.6)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&q=85"
              alt="Zahradní práce"
              fill className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,31,8,0.7) 0%, transparent 60%)" }} />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-serif font-bold text-white text-xl mb-1">Stále máte otázky?</p>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Rádi vám odpovíme osobně.</p>
              <Link href="/kontakt" className="btn-primary text-sm">Napsat nám</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#2D5016" }} className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif font-bold text-white mb-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              Připraveni začít?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>Konzultace je zdarma a nezávazná.</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/kontakt" className="btn-primary px-8 py-4">Nezávazná konzultace</Link>
            <Link href="/projekty" className="btn-outline-white px-8 py-4">Naše projekty →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
