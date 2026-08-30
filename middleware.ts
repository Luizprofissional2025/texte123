import { NextRequest, NextResponse } from "next/server";

/**
 * Este middleware roda ANTES de qualquer página ser servida.
 *
 * Ele resolve um problema que a versão anterior do "Content-Security-Policy"
 * causava: o Next.js precisa inserir alguns scripts "inline" na página para
 * entregar os dados que fazem os componentes interativos (o popup de lead,
 * o menu mobile) funcionarem no navegador. Uma CSP com "script-src 'self'"
 * bloqueia QUALQUER script inline — inclusive esses do próprio Next.js —
 * o que fazia a página aparecer certinha (o HTML não depende disso) mas
 * nada reagir a clique, tempo ou saída do mouse.
 *
 * A solução correta (e a recomendada pela documentação do Next.js) é gerar
 * um "nonce" — um código aleatório, diferente a cada visita — e autorizar
 * na CSP só os scripts marcados com esse nonce específico. Como o nonce
 * muda a cada requisição, um script injetado por um atacante (que não
 * conhece o nonce da vez) continua bloqueado; só os scripts que o próprio
 * Next.js gera (e automaticamente marca com esse nonce) têm permissão.
 */
export function middleware(request: NextRequest) {
  // Gera 16 bytes aleatórios e converte para base64 — um valor
  // imprevisível, diferente a cada carregamento de página.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    frame-src https://www.google.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `;
  // Remove quebras de linha/espaços duplicados — cabeçalhos HTTP devem
  // ir em uma linha só.
  const contentSecurityPolicy = cspHeader.replace(/\s{2,}/g, " ").trim();

  // Repassamos o nonce como cabeçalho da REQUISIÇÃO também, para que,
  // se um dia você precisar de um <script nonce={...}> manual em algum
  // componente do servidor, dê para ler esse valor via `headers()`.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  // E como cabeçalho da RESPOSTA — é isso que o navegador de fato lê
  // para aplicar a política, e é o que faz o Next.js "descobrir" o nonce
  // e aplicá-lo sozinho aos scripts que ele mesmo injeta.
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

// Aplica o middleware em todas as rotas, exceto arquivos estáticos
// internos do Next.js (_next/static, _next/image) e o favicon — não faz
// sentido gastar tempo de processamento nesses.
export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
