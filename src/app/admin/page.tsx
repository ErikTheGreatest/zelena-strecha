"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Project, Service, Testimonial, Contact } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "zelenastrecha2024";

type Tab = "projekty" | "sluzby" | "recenze" | "kontakty";

// ── helpers ──────────────────────────────────────────────
function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: color + "20", color }}>
      {children}
    </span>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-serif font-bold text-xl" style={{ color: "#1C1C1C" }}>{title}</h2>
      <Badge color="#2D5016">{count} záznamů</Badge>
    </div>
  );
}

// ── LOGIN ────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("zs_admin", "1");
      onLogin();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f1f08" }}>
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "#2D5016" }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.5C6 15 9 12.5 12 12.5s6 2.5 7.4 6C21 16.8 22 14.5 22 12c0-5.5-4.5-10-10-10z" fill="currentColor" opacity="0.3"/>
            <path d="M12 2C8 8 8 14 12 22c4-8 4-14 0-20z" fill="currentColor"/>
          </svg>
        </div>
        <h1 className="font-serif font-bold text-2xl mb-1" style={{ color: "#1C1C1C" }}>Admin panel</h1>
        <p className="text-sm mb-8" style={{ color: "rgba(28,28,28,0.5)" }}>Zelená Střecha s.r.o.</p>

        <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7A9E5F" }}>
          Heslo
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
          style={{ border: `2px solid ${error ? "#C46B3F" : "#e8e2d8"}`, backgroundColor: "#faf8f5" }}
        />
        {error && <p className="text-xs mb-4" style={{ color: "#C46B3F" }}>Nesprávné heslo.</p>}
        <button onClick={handleLogin} className="btn-primary w-full justify-center py-3">
          Přihlásit se
        </button>
      </div>
    </div>
  );
}

// ── PROJECTS TAB ─────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", category: "zahrada", description: "", image_url: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd() {
    if (!form.title) return;
    setSaving(true);
    await supabase.from("projects").insert([form]);
    setForm({ title: "", category: "zahrada", description: "", image_url: "" });
    await load();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await supabase.from("projects").delete().eq("id", id);
    await load();
    setDeleting(null);
  }

  const categoryLabels: Record<string, string> = { zahrada: "Zahrada", terasa: "Terasa", balkon: "Balkón", firemni: "Firemní" };

  return (
    <div>
      <SectionHeader title="Projekty" count={projects.length} />

      {/* Add form */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "#7A9E5F" }}>Přidat projekt</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Název projektu *" className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
          <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
            className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }}>
            <option value="zahrada">Zahrada</option>
            <option value="terasa">Terasa</option>
            <option value="balkon">Balkón</option>
            <option value="firemni">Firemní</option>
          </select>
          <input value={form.image_url} onChange={(e) => setForm(p => ({ ...p, image_url: e.target.value }))}
            placeholder="URL obrázku (Unsplash…)" className="px-4 py-2.5 rounded-xl text-sm outline-none sm:col-span-2"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
          <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Popis projektu" rows={2} className="px-4 py-2.5 rounded-xl text-sm outline-none sm:col-span-2 resize-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
        </div>
        <button onClick={handleAdd} disabled={saving || !form.title} className="btn-primary text-sm disabled:opacity-50">
          {saving ? "Ukládám…" : "+ Přidat projekt"}
        </button>
      </div>

      {/* List */}
      {loading ? <p className="text-sm" style={{ color: "rgba(28,28,28,0.4)" }}>Načítám…</p> : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <Badge color="#2D5016">{categoryLabels[p.category] ?? p.category}</Badge>
                <span className="font-medium text-sm truncate" style={{ color: "#1C1C1C" }}>{p.title}</span>
              </div>
              <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                className="text-xs font-semibold shrink-0 px-3 py-1.5 rounded-lg transition-colors duration-200"
                style={{ color: "#C46B3F", backgroundColor: "#fdf3ee" }}>
                {deleting === p.id ? "…" : "Smazat"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── SERVICES TAB ─────────────────────────────────────────
function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", icon: "🌿", price_from: "", order: "0" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("services").select("*").order("order", { ascending: true });
    setServices(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd() {
    if (!form.title) return;
    setSaving(true);
    await supabase.from("services").insert([{
      title: form.title,
      description: form.description,
      icon: form.icon,
      price_from: form.price_from ? parseInt(form.price_from) : null,
      order: parseInt(form.order),
    }]);
    setForm({ title: "", description: "", icon: "🌿", price_from: "", order: "0" });
    await load();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await supabase.from("services").delete().eq("id", id);
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <SectionHeader title="Služby" count={services.length} />
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "#7A9E5F" }}>Přidat službu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Název služby *" className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
          <div className="flex gap-2">
            <input value={form.icon} onChange={(e) => setForm(p => ({ ...p, icon: e.target.value }))}
              placeholder="🌿" className="w-20 px-4 py-2.5 rounded-xl text-sm outline-none text-center"
              style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
            <input value={form.price_from} onChange={(e) => setForm(p => ({ ...p, price_from: e.target.value }))}
              placeholder="Cena od (Kč)" type="number" className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
          </div>
          <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Popis služby" rows={2} className="px-4 py-2.5 rounded-xl text-sm outline-none sm:col-span-2 resize-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
        </div>
        <button onClick={handleAdd} disabled={saving || !form.title} className="btn-primary text-sm disabled:opacity-50">
          {saving ? "Ukládám…" : "+ Přidat službu"}
        </button>
      </div>
      {loading ? <p className="text-sm" style={{ color: "rgba(28,28,28,0.4)" }}>Načítám…</p> : (
        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl">{s.icon}</span>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: "#1C1C1C" }}>{s.title}</p>
                  {s.price_from && <p className="text-xs" style={{ color: "#7A9E5F" }}>od {s.price_from.toLocaleString("cs-CZ")} Kč</p>}
                </div>
              </div>
              <button onClick={() => handleDelete(s.id)} disabled={deleting === s.id}
                className="text-xs font-semibold shrink-0 px-3 py-1.5 rounded-lg"
                style={{ color: "#C46B3F", backgroundColor: "#fdf3ee" }}>
                {deleting === s.id ? "…" : "Smazat"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── TESTIMONIALS TAB ─────────────────────────────────────
function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", location: "", text: "", rating: "5" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd() {
    if (!form.name || !form.text) return;
    setSaving(true);
    await supabase.from("testimonials").insert([{ ...form, rating: parseInt(form.rating) }]);
    setForm({ name: "", location: "", text: "", rating: "5" });
    await load();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await supabase.from("testimonials").delete().eq("id", id);
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <SectionHeader title="Recenze" count={items.length} />
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "#7A9E5F" }}>Přidat recenzi</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Jméno *" className="px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
          <div className="flex gap-2">
            <input value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))}
              placeholder="Město" className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
            <select value={form.rating} onChange={(e) => setForm(p => ({ ...p, rating: e.target.value }))}
              className="w-20 px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{"⭐".repeat(n)}</option>)}
            </select>
          </div>
          <textarea value={form.text} onChange={(e) => setForm(p => ({ ...p, text: e.target.value }))}
            placeholder="Text recenze *" rows={3} className="px-4 py-2.5 rounded-xl text-sm outline-none sm:col-span-2 resize-none"
            style={{ border: "2px solid #e8e2d8", backgroundColor: "#faf8f5" }} />
        </div>
        <button onClick={handleAdd} disabled={saving || !form.name || !form.text} className="btn-primary text-sm disabled:opacity-50">
          {saving ? "Ukládám…" : "+ Přidat recenzi"}
        </button>
      </div>
      {loading ? <p className="text-sm" style={{ color: "rgba(28,28,28,0.4)" }}>Načítám…</p> : (
        <div className="flex flex-col gap-3">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-xl px-5 py-4 flex items-start justify-between gap-4 shadow-sm">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm" style={{ color: "#1C1C1C" }}>{t.name}</p>
                  {t.location && <span className="text-xs" style={{ color: "#7A9E5F" }}>{t.location}</span>}
                  <span className="text-xs">{"⭐".repeat(t.rating)}</span>
                </div>
                <p className="text-xs line-clamp-2" style={{ color: "rgba(28,28,28,0.55)" }}>{t.text}</p>
              </div>
              <button onClick={() => handleDelete(t.id)} disabled={deleting === t.id}
                className="text-xs font-semibold shrink-0 px-3 py-1.5 rounded-lg"
                style={{ color: "#C46B3F", backgroundColor: "#fdf3ee" }}>
                {deleting === t.id ? "…" : "Smazat"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CONTACTS TAB ─────────────────────────────────────────
function ContactsTab() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    setDeleting(id);
    await supabase.from("contacts").delete().eq("id", id);
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <SectionHeader title="Přijaté zprávy" count={items.length} />
      {loading ? <p className="text-sm" style={{ color: "rgba(28,28,28,0.4)" }}>Načítám…</p> : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <p className="text-3xl mb-3">📭</p>
          <p className="font-semibold" style={{ color: "#1C1C1C" }}>Zatím žádné zprávy</p>
          <p className="text-sm mt-1" style={{ color: "rgba(28,28,28,0.4)" }}>Zprávy z kontaktního formuláře se zobrazí zde.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold" style={{ color: "#1C1C1C" }}>{c.name}</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <a href={`mailto:${c.email}`} className="text-xs hover:underline" style={{ color: "#2D5016" }}>{c.email}</a>
                    {c.phone && <a href={`tel:${c.phone}`} className="text-xs hover:underline" style={{ color: "#2D5016" }}>{c.phone}</a>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs" style={{ color: "rgba(28,28,28,0.4)" }}>
                    {new Date(c.created_at).toLocaleDateString("cs-CZ")}
                  </span>
                  <button onClick={() => handleDelete(c.id)} disabled={deleting === c.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ color: "#C46B3F", backgroundColor: "#fdf3ee" }}>
                    {deleting === c.id ? "…" : "Smazat"}
                  </button>
                </div>
              </div>
              <p className="text-sm leading-relaxed p-4 rounded-xl" style={{ color: "rgba(28,28,28,0.7)", backgroundColor: "#faf8f5" }}>
                {c.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN ADMIN ───────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("projekty");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("zs_admin") === "1") setAuthed(true);
  }, []);

  if (!mounted) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "projekty", label: "Projekty",  emoji: "🌿" },
    { key: "sluzby",   label: "Služby",    emoji: "🏗️" },
    { key: "recenze",  label: "Recenze",   emoji: "⭐" },
    { key: "kontakty", label: "Zprávy",    emoji: "📬" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F3EC" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "rgba(255,255,255,0.97)", borderColor: "#e8e2d8", backdropFilter: "blur(8px)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#2D5016" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                <path d="M12 2C8 8 8 14 12 22c4-8 4-14 0-20z" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-serif font-bold" style={{ color: "#2D5016" }}>Admin panel</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-xs font-semibold hover:underline" style={{ color: "#7A9E5F" }}>
              Zobrazit web →
            </a>
            <button onClick={() => { sessionStorage.removeItem("zs_admin"); setAuthed(false); }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "#C46B3F", backgroundColor: "#fdf3ee" }}>
              Odhlásit
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Tab navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                backgroundColor: tab === t.key ? "#2D5016" : "white",
                color: tab === t.key ? "white" : "#1C1C1C",
                border: `2px solid ${tab === t.key ? "#2D5016" : "#e8e2d8"}`,
              }}>
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "projekty"  && <ProjectsTab />}
        {tab === "sluzby"    && <ServicesTab />}
        {tab === "recenze"   && <TestimonialsTab />}
        {tab === "kontakty"  && <ContactsTab />}
      </div>
    </div>
  );
}
