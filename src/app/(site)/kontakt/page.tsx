"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", phone: "", message: "" };

const hours = [
  { day: "Pondělí – Pátek", time: "8:00 – 17:00" },
  { day: "Sobota",          time: "9:00 – 13:00" },
  { day: "Neděle",          time: "Zavřeno" },
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"/>
      </svg>
    ),
    label: "Adresa",
    value: "Zahradní 42, Praha 6, 160 00",
    href: "https://maps.google.com/?q=Praha+6",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"/>
      </svg>
    ),
    label: "Telefon",
    value: "+420 777 888 999",
    href: "tel:+420777888999",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
      </svg>
    ),
    label: "E-mail",
    value: "info@zelenastrecha.cz",
    href: "mailto:info@zelenastrecha.cz",
  },
];

export default function KontaktPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    const { error } = await supabase.from("contacts").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm(initialForm);
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 overflow-hidden" style={{ backgroundColor: "#0f1f08" }}>
        <div className="absolute right-0 top-0 bottom-0 hidden lg:block"
          style={{ width: "35%", background: "linear-gradient(to left, rgba(196,107,63,0.15), transparent)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#7A9E5F" }}>
              Spojte se s námi
            </span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}>
            Kontakt
          </h1>
          <p className="max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem" }}>
            Máte projekt na mysli? Napište nám nebo zavolejte.
            Konzultace je vždy zdarma a nezávazná.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ backgroundColor: "#F7F3EC" }} className="py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── LEFT: Info ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Contact details */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="font-serif font-bold text-xl mb-6" style={{ color: "#1C1C1C" }}>
                Kontaktní údaje
              </h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item) => (
                  <a key={item.label} href={item.href}
                    target={item.label === "Adresa" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ backgroundColor: "#f2f7ec", color: "#2D5016" }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#7A9E5F" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium transition-colors duration-200 group-hover:underline"
                        style={{ color: "#1C1C1C" }}>
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: "#2D5016" }}>
              <h2 className="font-serif font-bold text-xl text-white mb-6">Otevírací doba</h2>
              <div className="flex flex-col gap-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-2 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{h.day}</span>
                    <span className="text-sm font-semibold text-white">{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                * Mimo pracovní dobu možné po předchozí dohodě.
              </p>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: "220px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.4!2d14.3838!3d50.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUHJhaGEgNg!5e0!3m2!1scs!2scz!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa — Zelená Střecha"
              />
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px" style={{ backgroundColor: "#C46B3F" }} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#7A9E5F" }}>
                  Napište nám
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl mb-8" style={{ color: "#1C1C1C" }}>
                Poptávkový formulář
              </h2>

              {/* Success message */}
              {status === "success" && (
                <div className="rounded-xl p-6 mb-6 text-center" style={{ backgroundColor: "#f2f7ec" }}>
                  <p className="text-3xl mb-3">✅</p>
                  <p className="font-semibold mb-1" style={{ color: "#2D5016" }}>Zpráva odeslána!</p>
                  <p className="text-sm" style={{ color: "rgba(28,28,28,0.6)" }}>
                    Ozveme se vám do 24 hodin na pracovní dny.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm font-semibold"
                    style={{ color: "#2D5016" }}
                  >
                    Odeslat další zprávu →
                  </button>
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#fdf3ee", borderLeft: "3px solid #C46B3F" }}>
                  <p className="text-sm" style={{ color: "#C46B3F" }}>
                    Něco se pokazilo. Zkuste to znovu nebo nás kontaktujte telefonicky.
                  </p>
                </div>
              )}

              {status !== "success" && (
                <div className="flex flex-col gap-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#7A9E5F" }}>
                        Jméno a příjmení *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jan Novák"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          border: "2px solid #e8e2d8",
                          color: "#1C1C1C",
                          backgroundColor: "#faf8f5",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#2D5016"}
                        onBlur={(e) => e.target.style.borderColor = "#e8e2d8"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#7A9E5F" }}>
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jan@novak.cz"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          border: "2px solid #e8e2d8",
                          color: "#1C1C1C",
                          backgroundColor: "#faf8f5",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#2D5016"}
                        onBlur={(e) => e.target.style.borderColor = "#e8e2d8"}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#7A9E5F" }}>
                      Telefon <span style={{ color: "rgba(28,28,28,0.35)" }}>(nepovinné)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+420 777 123 456"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        border: "2px solid #e8e2d8",
                        color: "#1C1C1C",
                        backgroundColor: "#faf8f5",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#2D5016"}
                      onBlur={(e) => e.target.style.borderColor = "#e8e2d8"}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#7A9E5F" }}>
                      Zpráva *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Popište váš projekt — typ prostoru, rozměry, přibližný rozpočet a termín..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        border: "2px solid #e8e2d8",
                        color: "#1C1C1C",
                        backgroundColor: "#faf8f5",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#2D5016"}
                      onBlur={(e) => e.target.style.borderColor = "#e8e2d8"}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <p className="text-xs" style={{ color: "rgba(28,28,28,0.4)" }}>
                      * Povinná pole. Odpovídáme do 24 hodin.
                    </p>
                    <button
                      onClick={handleSubmit}
                      disabled={status === "sending" || !form.name || !form.email || !form.message}
                      className="btn-primary px-8 py-3 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Odesílám…
                        </span>
                      ) : "Odeslat zprávu"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
