/**
 * Configuração do Next.js.
 *
 * A parte mais importante deste arquivo, do ponto de vista de segurança,
 * é a função `headers()` abaixo: ela adiciona cabeçalhos HTTP de proteção
 * em TODAS as páginas do site, sem precisar repetir isso em cada uma.
 *
 * Cada cabeçalho resolve um tipo de ataque diferente — os comentários
 * explicam qual.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // "poweredByHeader: false" remove o cabeçalho "X-Powered-By: Next.js"
  // que o Next.js manda por padrão. Ele não ajuda em nada o visitante e
  // só entrega de graça, para quem quiser atacar o site, qual tecnologia
  // ele usa por trás.
  poweredByHeader: false,

  // Formatos modernos de imagem (menor tamanho de arquivo = menos dados
  // consumidos pelo visitante no celular).
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        // Aplica os cabeçalhos abaixo a QUALQUER rota do site.
        source: "/:path*",
        headers: [
          {
            // Força o navegador a só falar com o site via HTTPS pelos
            // próximos 2 anos, mesmo que alguém digite "http://" na barra
            // de endereço. Evita ataques de "downgrade" para HTTP puro.
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Impede que o site seja carregado dentro de um <iframe> em
            // outro domínio — bloqueia ataques de "clickjacking" (um site
            // malicioso te mostra o Imperador Auto GNV escondido atrás de
            // botões falsos).
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Impede que o navegador tente "adivinhar" o tipo de um
            // arquivo diferente do que o servidor declarou. Sem isso, um
            // arquivo de imagem malicioso poderia, em teoria, ser
            // interpretado como script.
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Controla quanta informação o navegador envia no cabeçalho
            // "Referer" ao clicar em links que saem do site (por exemplo,
            // o link do WhatsApp). "strict-origin-when-cross-origin" só
            // manda o domínio, nunca a página exata que a pessoa estava
            // vendo, quando o destino é outro site.
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Desliga, por padrão, o acesso a APIs sensíveis do navegador
            // (câmera, microfone, geolocalização) que este site não usa.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // O cabeçalho "Content-Security-Policy" NÃO está mais aqui de
          // propósito: ele agora é gerado a cada requisição pelo
          // middleware.ts (na raiz do projeto), porque a CSP precisa
          // incluir um "nonce" diferente a cada visita — algo que este
          // arquivo de configuração estática não tem como fazer. Ver os
          // comentários em middleware.ts para o motivo completo.
        ],
      },
    ];
  },
};

module.exports = nextConfig;
