"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/supabase";

const categories = [
  { key: "vse",      label: "Vše" },
  { key: "zahrada",  label: "Zahrada" },
  { key: "terasa",   label: "Terasa" },
  { key: "balkon",   label: "Balkón" },
  { key: "firemni",  label: "Firemní" },
];

const categoryLabels: Record<string, string> = {
  zahrada: "Zahrada",
  terasa:  "Terasa",
  balkon:  "Balkón",
  firemni: "Firemní",
};

export default function ProjektyPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState("vse");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setProjects(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = active === "vse"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ backgroundColor: "#0f1f08" }}>
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Projekty"
            fill className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7A9E5F" }}>
              Naše práce
            </span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}>
            Projekty
          </h1>
          <p className="max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem" }}>
            Každý projekt je unikátní příběh. Prohlédněte si naše realizace
            a nechte se inspirovat.
          </p>
        </div>
      </section>

      {/* ── FILTERS + GRID ── */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: active === cat.key ? "#2D5016" : "white",
                  color: active === cat.key ? "white" : "#1C1C1C",
                  border: `2px solid ${active === cat.key ? "#2D5016" : "#e8e2d8"}`,
                }}
              >
                {cat.label}
                {active === cat.key && cat.key !== "vse" && (
                  <span className="ml-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    ({filtered.length})
                  </span>
                )}
              </button>
            ))}
            {/* Count */}
            <span className="ml-auto self-center text-sm" style={{ color: "rgba(28,28,28,0.4)" }}>
              {loading ? "Načítám…" : `${filtered.length} projektů`}
            </span>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-64" style={{ backgroundColor: "#e8e2d8" }} />
                  <div className="p-6 bg-white">
                    <div className="h-4 rounded mb-3" style={{ backgroundColor: "#e8e2d8", width: "60%" }} />
                    <div className="h-3 rounded" style={{ backgroundColor: "#e8e2d8", width: "80%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                  style={{ transform: "translateY(0)" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: "260px" }}>
                    <Image
                      src={project.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background: "linear-gradient(to top, rgba(15,31,8,0.7) 0%, transparent 60%)" }} />

                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#2D5016" }}>
                      {categoryLabels[project.category] ?? project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-serif font-bold text-lg mb-2 group-hover:transition-colors duration-200"
                      style={{ color: "#1C1C1C" }}>
                      {project.title}
                    </h2>
                    {project.description && (
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(28,28,28,0.55)" }}>
                        {project.description}
                      </p>
                    )}
                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#f0ebe2" }}>
                      <span className="text-xs uppercase tracking-widest" style={{ color: "#7A9E5F" }}>
                        {new Date(project.created_at).getFullYear()}
                      </span>
                      <span className="text-xs font-semibold flex items-center gap-1 transition-colors duration-200"
                        style={{ color: "#C46B3F" }}>
                        Detail
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 rounded-2xl bg-white" style={{ color: "rgba(28,28,28,0.4)" }}>
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-semibold text-lg mb-1" style={{ color: "#1C1C1C" }}>
                Žádné projekty v této kategorii
              </p>
              <button
                onClick={() => setActive("vse")}
                className="mt-4 text-sm font-semibold"
                style={{ color: "#2D5016" }}
              >
                Zobrazit vše →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#2D5016" }} className="py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif font-bold text-white mb-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              Zaujal vás některý projekt?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Rádi vytvoříme něco podobného přímo pro vás.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/kontakt" className="btn-primary px-8 py-4">Nezávazná konzultace</Link>
            <Link href="/sluzby" className="btn-outline-white px-8 py-4">Naše služby →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
