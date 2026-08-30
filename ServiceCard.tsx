import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { IconGas, IconBolt, IconTools, IconCheck, IconWhatsApp } from "./Icons";

// Mapeia o nome do ícone (guardado como texto simples em lib/business.ts)
// para o componente de ícone de verdade. Manter os dados (business.ts)
// separados dos componentes de UI facilita reordenar ou editar a lista de
// serviços sem tocar em JSX.
const ICONS = {
  gas: IconGas,
  bolt: IconBolt,
  tools: IconTools,
  check: IconCheck,
} as const;

type ServiceCardProps = {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
};

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const Icon = ICONS[icon];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan/10 text-cyan">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-semibold text-navy">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      <a
        href={buildWhatsAppLink(WHATSAPP_MESSAGES.service(title))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp"
      >
        <IconWhatsApp className="h-4 w-4" />
        Pedir orçamento
      </a>
    </div>
  );
}
