"use client";

import { useState, useEffect } from "react";

export default function DisclaimerPopup() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("zs_disclaimer");
    if (!dismissed) {
      setTimeout(() => setVisible(true), 600);
    }
  }, []);

  function handleClose() {
    setHiding(true);
    setTimeout(() => {
      sessionStorage.setItem("zs_disclaimer", "1");
      setVisible(false);
      setHiding(false);
    }, 250);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[9999] w-72 transition-all duration-250"
      style={{
        opacity: hiding ? 0 : 1,
        transform: hiding ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#0f0f0f", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4ade80" }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              Portfolio projekt
            </span>
          </div>
          <button
            onClick={handleClose}
            className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 mt-0.5"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            Tato stránka je <span style={{ color: "white", fontWeight: 600 }}>fiktivní ukázka</span> vytvořená pro portfolio. Firma, data ani kontakty neexistují.
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {["Next.js 14", "TypeScript", "Tailwind", "Supabase"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-medium"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            Rozumím →
          </button>
        </div>
      </div>
    </div>
  );
}
