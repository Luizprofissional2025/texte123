import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";

/**
 * Botão flutuante do WhatsApp, fixo no canto inferior direito em
 * qualquer seção da página.
 *
 * Repare que este componente NÃO tem "use client": ele não guarda
 * nenhum estado nem reage a eventos tratados em JavaScript — é apenas um
 * link estilizado para ficar fixo na tela via CSS (`fixed`). Ou seja, o
 * "flutuar durante a rolagem" é 100% CSS, sem custo nenhum de JavaScript
 * para o navegador.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_MESSAGES.generic)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition hover:scale-105 hover:brightness-95"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
