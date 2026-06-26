import type { Testimonial } from "@/lib/supabase";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card p-8 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-terracotta-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-charcoal/70 text-sm leading-relaxed italic flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-forest-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-700 to-sage-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm text-charcoal">{testimonial.name}</p>
          {testimonial.location && (
            <p className="text-xs text-charcoal/50">{testimonial.location}</p>
          )}
        </div>
      </div>
    </div>
  );
}
