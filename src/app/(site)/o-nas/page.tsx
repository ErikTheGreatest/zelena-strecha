import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nás",
  description: "Poznejte tým Zelené Střechy — zahradní architekty a designéry s vášní pro přírodu a více než 12 lety zkušeností.",
};

const team = [
  {
    name: "Ing. Martin Kovář",
    role: "Zakladatel & hlavní architekt",
    bio: "Vystudoval krajinnou architekturu na ČZU v Praze. Za 12 let vedl přes 200 projektů od soukromých zahrad po firemní areály.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85",
    emoji: "🌿",
  },
  {
    name: "Bc. Tereza Nováková",
    role: "Zahradní designérka",
    bio: "Specialistka na barevné kompozice a sezónní výsadby. Miluje kombinaci divokých trav s moderními zahradními prvky.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85",
    emoji: "🌸",
  },
  {
    name: "Pavel Horák",
    role: "Vedoucí realizačního týmu",
    bio: "15 let praxe v realizaci zahrad. Garant kvality každého projektu od zemních prací po finální výsadbu.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85",
    emoji: "🏗️",
  },
  {
    name: "Lucie Procházková",
    role: "Specialistka na zavlažování",
    bio: "Certifikovaná odbornice na automatické závlahové systémy Hunter a Rain Bird. Navrhla přes 150 závlahových systémů.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85",
    emoji: "💧",
  },
];

const values = [
  {
    icon: "🌱",
    title: "Udržitelnost",
    desc: "Používáme pouze ekologické materiály a navrhujeme zahrady šetrné k životnímu prostředí. Voda, půda a rostliny jsou naši partneři.",
  },
  {
    icon: "🎨",
    title: "Kreativita",
    desc: "Každý projekt je originál. Inspirujeme se přírodou, uměním i architekturou — výsledkem jsou prostory, které překvapí.",
  },
  {
    icon: "🤝",
    title: "Partnerství",
    desc: "Nasloucháme vašim přáním a bereme vás jako partnery projektu, ne jako zákazníky. Váš souhlas je pro nás klíčový.",
  },
  {
    icon: "✨",
    title: "Preciznost",
    desc: "Každý detail má svůj důvod. Od výběru kamene po rozmístění rostlin — perfekcionismus je naše přirozená vlastnost.",
  },
];

const milestones = [
  { year: "2012", event: "Založení Zelené Střechy, první 3 projekty v Praze 6." },
  { year: "2015", event: "Rozšíření týmu na 8 lidí, první firemní zakázka pro tech park." },
  { year: "2018", event: "Ocenění Zahradní firma roku od Asociace zahradních architektů ČR." },
  { year: "2020", event: "Spuštění online konzultací a expanze do Brna a Ostravy." },
  { year: "2022", event: "200. dokončený projekt — japonská zahrada v Praze 5." },
  { year: "2024", event: "Certifikace ISO 14001 pro environmentální management." },
];

export default function ONasPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ backgroundColor: "#0f1f08" }}>
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80"
            alt="O nás"
            fill className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        {/* Diagonal accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 hidden lg:block"
          style={{ background: "linear-gradient(to bottom right, transparent 49%, #F7F3EC 50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7A9E5F" }}>
              Náš příběh
            </span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}>
            O nás
          </h1>
          <p className="max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem" }}>
            Jsme tým vášnivých zahradníků, architektů a designérů, kteří věří,
            že každý venkovní prostor má svůj skrytý potenciál.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
                Jak jsme začali
              </span>
            </div>
            <h2 className="font-serif font-bold mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "#1C1C1C", lineHeight: 1.1 }}>
              Z malé garáže<br />na 350 projektů
            </h2>
            <div className="w-12 h-1 mb-8 rounded" style={{ backgroundColor: "#2D5016" }} />
            <p className="leading-relaxed mb-5" style={{ color: "rgba(28,28,28,0.65)" }}>
              Zelená Střecha vznikla v roce 2012, kdy Martin Kovář dokončil studium krajinné architektury
              a rozhodl se jít vlastní cestou. S jednou dodávkou, dvěma zaměstnanci a obrovskou vášní
              pro zahradní tvorbu začal přetvářet první pražské zahrady.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: "rgba(28,28,28,0.65)" }}>
              Dnes jsme 14členný tým specializovaný na návrh a realizaci zahrad, teras a balkónů
              po celé ČR. Každý rok dokončíme přes 30 projektů — od intimních balkónů po rozsáhlé
              firemní areály.
            </p>
            <p className="leading-relaxed" style={{ color: "rgba(28,28,28,0.65)" }}>
              Naše filozofie je jednoduchá: nasloucháme přírodě a nasloucháme vám.
              Výsledkem jsou prostory, které dýchají, fungují a přinášejí radost po celý rok.
            </p>
          </div>

          {/* Images */}
          <div className="relative h-[500px]">
            <div className="absolute top-0 right-0 rounded-2xl overflow-hidden shadow-xl"
              style={{ width: "70%", height: "65%" }}>
              <Image
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=85"
                alt="Zahrada"
                fill className="object-cover"
                sizes="35vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              style={{ width: "55%", height: "55%" }}>
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=85"
                alt="Tým při práci"
                fill className="object-cover"
                sizes="27vw"
              />
            </div>
            {/* Floating stat */}
            <div className="absolute rounded-2xl px-6 py-5 shadow-xl z-10"
              style={{ right: "2%", bottom: "8%", backgroundColor: "#2D5016" }}>
              <p className="font-serif font-bold text-3xl text-white">350+</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>spokojených klientů</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ backgroundColor: "#ffffff" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
                Co nás řídí
              </span>
              <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            </div>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1C" }}>
              Naše hodnoty
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#e8e2d8" }}>
            {values.map((v, i) => (
              <div key={v.title}
                className="p-10 flex flex-col"
                style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#faf6ef" }}>
                <div className="text-4xl mb-6">{v.icon}</div>
                <h3 className="font-serif font-bold text-xl mb-4" style={{ color: "#1C1C1C" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(28,28,28,0.6)" }}>{v.desc}</p>
                <div className="mt-8 w-8 h-0.5" style={{ backgroundColor: "#C46B3F" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ backgroundColor: "#141f0c" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
              Historie
            </span>
          </div>
          <h2 className="font-serif font-bold text-white mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Naše cesta
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

            <div className="flex flex-col gap-10">
              {milestones.map((m) => (
                <div key={m.year} className="flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                  {/* Year */}
                  <div className="shrink-0 w-full md:w-28 text-left md:text-right">
                    <span className="font-serif font-bold text-2xl" style={{ color: "#7A9E5F" }}>
                      {m.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex shrink-0 w-5 items-center justify-center mt-1.5">
                    <div className="w-3 h-3 rounded-full border-2 relative z-10"
                      style={{ backgroundColor: "#C46B3F", borderColor: "#C46B3F" }} />
                  </div>
                  {/* Text */}
                  <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
              Lidé za projekty
            </span>
          </div>
          <h2 className="font-serif font-bold mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1C" }}>
            Náš tým
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group">
                {/* Photo */}
                <div className="relative h-72 rounded-2xl overflow-hidden mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, rgba(15,31,8,0.6) 0%, transparent 60%)" }} />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
                    {member.emoji}
                  </div>
                </div>
                {/* Info */}
                <h3 className="font-serif font-bold text-lg mb-1" style={{ color: "#1C1C1C" }}>
                  {member.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#7A9E5F" }}>
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.6)" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#2D5016" }} className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif font-bold text-white mb-2"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              Pojďme spolupracovat
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Rádi vás osobně poznáme a ukážeme vám, co pro vás můžeme udělat.
            </p>
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
