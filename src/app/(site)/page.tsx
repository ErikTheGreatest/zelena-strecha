import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Project, Testimonial } from "@/lib/supabase";
import ProjectCard from "@/components/ui/ProjectCard";
import TestimonialCard from "@/components/ui/TestimonialCard";

async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(3);
  if (error) { console.error(error); return []; }
  return data ?? [];
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false }).limit(3);
  if (error) { console.error(error); return []; }
  return data ?? [];
}

const stats = [
  { value: "350+", label: "Projektů" },
  { value: "12",   label: "Let praxe" },
  { value: "98%",  label: "Spokojených" },
  { value: "4",    label: "Ocenění" },
];

const features = [
  { icon: "🌿", title: "Individuální návrh",  desc: "Každý projekt začíná důkladnou konzultací. Váš prostor, vaše přání, váš styl." },
  { icon: "🏗️", title: "Kvalitní materiály", desc: "Spolupracujeme jen s prověřenými dodavateli rostlin, kamenů a zahradních prvků." },
  { icon: "⏰",  title: "Dodržení termínů",   desc: "Přesné plánování garantuje dokončení projektu v dohodnutém čase." },
  { icon: "🏆", title: "Záruky a servis",     desc: "Na všechny realizace poskytujeme záruku a celoroční následnou péči." },
];

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([getFeaturedProjects(), getTestimonials()]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#0f1f08" }}>
        <div className="absolute right-0 top-0 h-full" style={{ width: "58%", clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
          <Image src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=85" alt="Zahrada" fill priority className="object-cover" sizes="60vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0f1f08 0%, transparent 40%)" }} />
        </div>
        <div className="absolute hidden lg:block" style={{ right: "36%", top: "15%", width: "180px", height: "220px", backgroundColor: "#2D5016", opacity: 0.9, zIndex: 2, clipPath: "polygon(0% 0%, 100% 8%, 100% 100%, 0% 92%)" }} />
        <div className="absolute" style={{ left: 0, bottom: "28%", width: "38%", height: "4px", backgroundColor: "#C46B3F", zIndex: 3 }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col justify-center min-h-screen pt-24 pb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7A9E5F" }}>Zahradnictví & Architektura</span>
            </div>
            <h1 className="font-serif font-bold leading-[0.95] mb-8 text-white" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
              Vaše<br /><span style={{ color: "#7A9E5F" }}>zahrada.</span><br />Náš<br />příběh.
            </h1>
            <p className="leading-relaxed mb-10 max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Proměňujeme venkovní prostory ve výjimečná místa. Od prvního návrhu po poslední kámen.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projekty" className="btn-primary text-sm px-7 py-3">Prohlédnout projekty</Link>
              <Link href="/kontakt" className="btn-outline-white text-sm px-7 py-3">Konzultace zdarma</Link>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif font-bold text-white" style={{ fontSize: "2rem" }}>{s.value}</p>
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#7A9E5F" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} /><span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>Proč my</span></div>
              <h2 className="font-serif font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1C" }}>Zahradnictví<br />s duší</h2>
            </div>
            <p className="max-w-sm leading-relaxed lg:text-right" style={{ color: "rgba(28,28,28,0.55)", fontSize: "0.95rem" }}>Za každým projektem stojí vášeň pro přírodu, respekt k vašemu prostoru a touha po dokonalém výsledku.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#d6d0c8" }}>
            {features.map((f, i) => (
              <div key={f.title} className="group p-8 flex flex-col transition-all duration-300" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#faf6ef" }}>
                <div className="text-3xl mb-6">{f.icon}</div>
                <h3 className="font-serif font-bold text-lg mb-3" style={{ color: "#1C1C1C" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(28,28,28,0.55)" }}>{f.desc}</p>
                <div className="mt-6 w-8 h-0.5 transition-all duration-300 group-hover:w-16" style={{ backgroundColor: "#C46B3F" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ backgroundColor: "#141f0c" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} /><span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>Portfolio</span></div>
              <h2 className="font-serif font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Nedávné projekty</h2>
            </div>
            <Link href="/projekty" className="btn-outline-white shrink-0">Všechny projekty →</Link>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}>
              <p className="text-5xl mb-4">🌱</p>
              <p className="font-semibold text-white mb-1">Projekty se nenačetly</p>
              <p className="text-sm">Spusť SQL INSERT příkazy v Supabase.</p>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[520px]">
            <div className="absolute inset-y-0 left-0 rounded-2xl overflow-hidden" style={{ width: "75%", top: "5%", bottom: "5%" }}>
              <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85" alt="Zahrada" fill className="object-cover" sizes="35vw" />
            </div>
            <div className="absolute rounded-2xl" style={{ right: 0, top: 0, bottom: "20%", width: "45%", backgroundColor: "#2D5016" }} />
            <div className="absolute rounded-xl overflow-hidden shadow-2xl border-4 border-white" style={{ right: "4%", bottom: 0, width: "42%", height: "45%", zIndex: 2 }}>
              <Image src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=85" alt="Detail" fill className="object-cover" sizes="20vw" />
            </div>
            <div className="absolute z-10 rounded-xl px-5 py-4 shadow-xl" style={{ left: "5%", bottom: "8%", backgroundColor: "#C46B3F" }}>
              <p className="font-serif font-bold text-2xl text-white">12+</p>
              <p className="text-xs text-white/80 mt-0.5">let zkušeností</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6"><div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} /><span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>O nás</span></div>
            <h2 className="font-serif font-bold leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: "#1C1C1C" }}>Příroda je náš<br />největší učitel</h2>
            <div className="w-12 h-1 mb-8 rounded" style={{ backgroundColor: "#2D5016" }} />
            <p className="leading-relaxed mb-4" style={{ color: "rgba(28,28,28,0.6)" }}>Zelená Střecha vznikla v roce 2012 s jediným cílem — přinášet radost z přírody do každodenního života. Náš tým zahradních architektů a krajinných designérů věří, že každý venkovní prostor má svůj skrytý potenciál.</p>
            <p className="leading-relaxed mb-10" style={{ color: "rgba(28,28,28,0.6)" }}>Pracujeme po celé ČR — od malých pražských balkónů po rozsáhlé firemní areály. Každý projekt je pro nás příběh, který píšeme společně s vámi.</p>
            <Link href="/o-nas" className="btn-outline">Poznejte náš tým</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} /><span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>Reference</span></div>
          <h2 className="font-serif font-bold mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1C1C1C" }}>Co říkají klienti</h2>
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl bg-white" style={{ color: "rgba(28,28,28,0.4)" }}>
              <p className="text-5xl mb-4">💬</p>
              <p className="font-semibold mb-1">Recenze se nenačetly</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#2D5016" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
            <div className="flex flex-col justify-center py-20 pr-0 lg:pr-16">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} /><span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>Začněte dnes</span></div>
              <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Připraveni proměnit váš prostor?</h2>
              <p className="leading-relaxed mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.65)" }}>Přijedeme, prohlédneme váš prostor a navrhneme řešení přesně pro vás. Konzultace je zcela zdarma.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/kontakt" className="btn-primary px-8 py-4">Nezávazná konzultace</Link>
                <Link href="/projekty" className="btn-outline-white px-8 py-4">Portfolio →</Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85" alt="Zahrada" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #2D5016 0%, transparent 35%)" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
