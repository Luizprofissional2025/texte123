import { BUSINESS } from "@/lib/business";
import { IconStar } from "./Icons";

const BADGES = [
  `${BUSINESS.yearsInBusiness} anos de mercado`,
  "Especialista em GNV",
  "Homologado pelo INMETRO",
];

/**
 * TEXTO DE EXEMPLO — troque pelos depoimentos reais dos clientes antes de
 * publicar. Fica marcado assim, em vez de eu inventar falas atribuídas a
 * clientes de verdade, para não colocar no ar uma citação que ninguém
 * disse. O ideal é copiar 3 avaliações reais do perfil do Google da
 * Imperador (com nota alta) para este lugar.
 */
const EXAMPLE_TESTIMONIALS = [
  { name: "Cliente Imperador", text: "Texto de exemplo — substitua por uma avaliação real do Google." },
  { name: "Cliente Imperador", text: "Texto de exemplo — substitua por uma avaliação real do Google." },
  { name: "Cliente Imperador", text: "Texto de exemplo — substitua por uma avaliação real do Google." },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-bold text-navy">Diferenciais & avaliações</h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {BADGES.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-slate-600">
        <div className="flex text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} className="h-4 w-4" />
          ))}
        </div>
        <span>
          {BUSINESS.rating} de 5 — {BUSINESS.reviewCount} avaliações no Google
        </span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {EXAMPLE_TESTIMONIALS.map((t, i) => (
          <blockquote key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <IconStar key={starIndex} className="h-4 w-4" />
              ))}
            </div>
            <p className="mt-3 text-sm italic text-slate-600">&ldquo;{t.text}&rdquo;</p>
            <footer className="mt-3 text-sm font-semibold text-navy">{t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
