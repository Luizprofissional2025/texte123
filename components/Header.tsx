"use client";

// "use client" é necessário aqui (e só aqui, não no resto do site) porque
// este componente guarda um estado (o menu mobile aberto/fechado) que só
// existe no navegador. Todo o resto do site é renderizado no servidor e
// enviado como HTML pronto — mais rápido para o visitante, e menos
// JavaScript para o navegador baixar e executar.

import { useState } from "react";
import { BUSINESS } from "@/lib/business";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { IconMenu, IconClose, IconWhatsApp } from "./Icons";

const NAV_LINKS = [
  { href: "#como-encontrar", label: "Como nos encontrar" },
  { href: "#servicos", label: "Serviços" },
  { href: "#diferenciais", label: "Diferenciais" },
];

export default function Header() {
  // Guarda se o menu "hambúrguer" do celular está aberto. Começa fechado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo em texto — troque por <Image> quando houver o arquivo da marca */}
        <a href="#topo" className="font-display text-lg font-bold text-navy">
          {BUSINESS.name}
        </a>

        {/* Menu para telas médias/grandes */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-navy"
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.generic)}
            target="_blank"
            rel="noopener noreferrer" // evita que a nova aba tenha acesso à janela original (segurança)
            className="flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            <IconWhatsApp className="h-4 w-4" />
            Peça seu orçamento
          </a>
        </nav>

        {/* Botão hambúrguer, só aparece em telas pequenas */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Painel do menu mobile — só existe no HTML quando está aberto */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink(WHATSAPP_MESSAGES.generic)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white"
          >
            <IconWhatsApp className="h-4 w-4" />
            Peça seu orçamento
          </a>
        </nav>
      )}
    </header>
  );
}
