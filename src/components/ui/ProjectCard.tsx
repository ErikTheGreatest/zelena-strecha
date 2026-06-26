import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/supabase";

const categoryLabels: Record<string, string> = {
  zahrada: "Zahrada",
  terasa: "Terasa",
  balkon: "Balkón",
  firemni: "Firemní",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card group overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={
            project.image_url ||
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
          }
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-forest-700 text-xs font-semibold px-3 py-1 rounded-full">
          {categoryLabels[project.category] ?? project.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-lg text-charcoal mb-2 group-hover:text-forest-700 transition-colors duration-200">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}
        <Link
          href="/projekty"
          className="inline-flex items-center gap-1 mt-4 text-forest-700 text-sm font-semibold hover:text-terracotta-500 transition-colors duration-200"
        >
          Zobrazit detail
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
