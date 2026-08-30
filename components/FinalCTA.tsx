import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";

export default function FinalCTA() {
  return (
    <section className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Pronto para agendar seu serviço?
          </h2>
          <p className="mt-2 text-slate-300">Fale agora com a Imperador e receba seu orçamento no WhatsApp.</p>
        </div>
        <a
          href={buildWhatsAppLink(WHATSAPP_MESSAGES.generic)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white shadow-card transition hover:brightness-95"
        >
          <IconWhatsApp className="h-5 w-5" />
          Falar no WhatsApp agora
        </a>
      </div>
    </section>
  );
}
