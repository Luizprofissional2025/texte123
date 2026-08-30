// Sem "use client" aqui de propósito: esta seção não tem nenhuma
// interatividade (sem estado, sem evento de clique tratado em JS), então
// o Next.js a renderiza inteira no servidor como HTML puro. O navegador
// do visitante não precisa baixar nem executar JavaScript nenhum para
// mostrar este bloco — só para o header e o popup, que realmente
// precisam.

import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";

export default function Hero() {
  return (
    <section id="topo" className="bg-navy pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">
            {BUSINESS.yearsInBusiness} anos cuidando do seu carro a GNV
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            A oficina de GNV que o Rio de Janeiro já confia
          </h1>
          <p className="mt-5 max-w-md text-lg text-slate-300">
            {BUSINESS.tagline}. Peça seu orçamento agora mesmo pelo WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={buildWhatsAppLink(WHATSAPP_MESSAGES.generic)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white shadow-card transition hover:brightness-95"
            >
              <IconWhatsApp className="h-5 w-5" />
              Orçamento no WhatsApp
            </a>
            <a
              href="#servicos"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver serviços
            </a>
          </div>
        </div>

        {/*
          "priority" diz ao Next.js para carregar esta imagem imediatamente,
          já que ela aparece "acima da dobra" (visível assim que a página
          abre). "sizes" ajuda o navegador a baixar o tamanho de arquivo
          certo para a tela do visitante, em vez de sempre baixar a versão
          gigante — outra economia de dados no celular.
        */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card">
          <Image
            src="/images/oficina-imperador.jpg"
            alt="Fachada da oficina Imperador Auto GNV"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
