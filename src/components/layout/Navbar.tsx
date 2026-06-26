"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",         label: "Úvod" },
  { href: "/sluzby",   label: "Služby" },
  { href: "/projekty", label: "Projekty" },
  { href: "/o-nas",    label: "O nás" },
  { href: "/kontakt",  label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#2D5016" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.5C6 15 9 12.5 12 12.5s6 2.5 7.4 6C21 16.8 22 14.5 22 12c0-5.5-4.5-10-10-10z" fill="currentColor" opacity="0.3"/>
              <path d="M12 2C8 8 8 14 12 22c4-8 4-14 0-20z" fill="currentColor"/>
              <path d="M12 12.5C9 12.5 6 15 4.6 18.5A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.4-3.5C18 15 15 12.5 12 12.5z" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>
          <div>
            <span className="block font-serif font-bold text-lg leading-tight transition-colors duration-300"
              style={{ color: scrolled ? "#2D5016" : "white" }}>
              Zelená Střecha
            </span>
            <span className="block text-xs leading-tight transition-colors duration-300"
              style={{ color: scrolled ? "#7A9E5F" : "rgba(255,255,255,0.7)" }}>
              zahradnictví & architektura
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
                style={{
                  color: isActive(link.href)
                    ? "#2D5016"
                    : scrolled ? "#1C1C1C" : "rgba(255,255,255,0.9)",
                  backgroundColor: isActive(link.href) ? "#f2f7ec" : "transparent",
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#C46B3F" }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/kontakt" className="btn-primary">Nezávazná konzultace</Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
          aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-6 h-0.5 transition-all duration-300 rounded"
              style={{
                backgroundColor: scrolled ? "#1C1C1C" : "white",
                transform: menuOpen
                  ? i === 0 ? "translateY(8px) rotate(45deg)"
                  : i === 2 ? "translateY(-8px) rotate(-45deg)" : "none"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "400px" : "0", opacity: menuOpen ? 1 : 0 }}>
        <div className="bg-white px-4 py-6 flex flex-col gap-1 border-t" style={{ borderColor: "#f2f7ec" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="px-4 py-3 rounded-xl text-sm transition-all duration-200"
              style={{
                backgroundColor: isActive(link.href) ? "#f2f7ec" : "transparent",
                color: isActive(link.href) ? "#2D5016" : "#1C1C1C",
                fontWeight: isActive(link.href) ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: "#f2f7ec" }}>
            <Link href="/kontakt" className="btn-primary w-full justify-center">
              Nezávazná konzultace
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
