import { NextRequest, NextResponse } from "next/server";
import { validateLead } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { ensureLeadsTable, insertLead } from "@/lib/db";

/**
 * POST /api/leads
 *
 * Recebe os dados do popup de captação de lead (components/LeadPopup.tsx)
 * e grava no banco de dados da Vercel. Este arquivo roda SÓ no servidor —
 * nunca é enviado para o navegador do visitante — por isso é o lugar
 * certo para checagens que não podem depender do que o cliente diz.
 *
 * Ordem das checagens abaixo (cada uma pode encerrar a requisição cedo,
 * "falhando rápido" antes de gastar tempo com as próximas):
 *   1. a requisição veio do próprio site? (checagem de origem)
 *   2. este IP não está enviando requisições demais? (rate limit)
 *   3. os dados enviados são válidos? (Zod, de novo, no servidor)
 *   4. o "campo-armadilha" (honeypot) está vazio, como deveria?
 *   5. só então: grava no banco.
 */
export async function POST(request: NextRequest) {
  // --- 1. Checagem de origem (defesa extra contra CSRF) -----------------
  // O navegador já bloqueia, por padrão, que outro site chame esta API
  // via "fetch" (política de CORS). Esta checagem é uma camada extra:
  // confirmamos que o cabeçalho "Origin" enviado pelo navegador bate com
  // o domínio oficial do site, configurado em NEXT_PUBLIC_SITE_URL.
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  }

  // --- 2. Rate limiting por IP -------------------------------------------
  // "x-forwarded-for" é o cabeçalho que a Vercel usa para informar o IP
  // real do visitante (o servidor em si só vê o IP interno da rede da
  // Vercel). Pegamos só o primeiro IP da lista, que é o do visitante.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "desconhecido";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um minuto e tente novamente." },
      { status: 429 } // 429 = "Too Many Requests"
    );
  }

  // --- 3. Leitura e validação do corpo da requisição ---------------------
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // JSON malformado — encerra aqui, nem tenta validar.
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const validation = validateLead(body);
  if (!validation.success) {
    // 422 = "entendi a requisição, mas os dados não passaram nas regras"
    return NextResponse.json({ errors: validation.errors }, { status: 422 });
  }

  const { name, phone, service, website } = validation.data;

  // --- 4. Honeypot ---------------------------------------------------------
  // Este campo é invisível para uma pessoa real (ver components/LeadPopup.tsx)
  // mas costuma ser preenchido por robôs de spam que preenchem todo campo
  // do formulário automaticamente. Se vier algo aqui, finge que deu certo
  // (200 OK) para não ensinar o robô a se adaptar — mas não grava nada.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // --- 5. Gravação no banco -------------------------------------------------
  try {
    await ensureLeadsTable();
    await insertLead({ name, phone, service });
  } catch (error) {
    // Nunca devolvemos o erro real (`error`) para o navegador: ele pode
    // conter detalhes internos do banco de dados que não são da conta do
    // visitante e poderiam ajudar um atacante. Registramos no log do
    // servidor (visível no painel da Vercel) e devolvemos uma mensagem
    // genérica.
    console.error("Falha ao gravar lead:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar seus dados agora. Tente novamente em instantes." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
