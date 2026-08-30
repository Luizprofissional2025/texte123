import type { Metadata } from "next";
import "./globals.css";
import { BUSINESS } from "@/lib/business";

// Repare que NÃO importamos nenhuma fonte do Google Fonts (nem via
// next/font). O projeto usa fontes que já vêm instaladas em qualquer
// computador ou celular (system-ui, Georgia — ver tailwind.config.ts).
// Isso elimina completamente o download de arquivos de fonte, que costuma
// ser um dos itens mais pesados de uma página — mais uma decisão a favor
// do "menor consumo de internet".

// A "Metadata" do Next.js gera automaticamente as tags <title>,
// <meta description> e as tags Open Graph (usadas quando o link do site
// é compartilhado no WhatsApp ou redes sociais) — sem precisar escrever
// HTML de <head> manualmente.
export const metadata: Metadata = {
  title: `${BUSINESS.name} — Oficina especializada em GNV no Rio de Janeiro`,
  description: `${BUSINESS.tagline}. Peça seu orçamento pelo WhatsApp.`,
  openGraph: {
    title: BUSINESS.name,
    description: BUSINESS.tagline,
    locale: "pt_BR",
    type: "website",
  },
  // Impede que buscadores indexem versões de teste do site (você pode
  // remover esta linha quando o domínio definitivo for ao ar).
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
