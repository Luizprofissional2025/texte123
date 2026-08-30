/**
 * Rate limiting simples por IP: no máximo `MAX_REQUESTS` envios do
 * formulário a cada `WINDOW_MS` milissegundos, por IP.
 *
 * Isso impede que um script tente enviar o formulário centenas de vezes
 * por segundo (spam, ou uma tentativa de sobrecarregar o banco de dados).
 *
 * ---------------------------------------------------------------------
 * LIMITAÇÃO HONESTA deste código: ele guarda a contagem em uma variável
 * na memória do servidor (um `Map`). Isso funciona perfeitamente em
 * desenvolvimento e também em produção na Vercel enquanto o tráfego é
 * baixo/médio, mas cada instância "serverless" da Vercel tem sua própria
 * memória — ou seja, em picos de tráfego, o limite é "por instância", não
 * globalmente exato. Para um limite 100% preciso entre todas as
 * instâncias, o próximo passo seria trocar este arquivo por uma versão
 * que usa o add-on gratuito "Vercel KV" (Redis) para guardar a contagem
 * em um lugar compartilhado. Deixei o código pronto para essa evolução,
 * mas comecei pela versão mais simples possível, que já resolve o
 * problema mais comum (bots básicos e cliques duplicados).
 */

const WINDOW_MS = 60_000; // janela de 1 minuto
const MAX_REQUESTS = 5; // no máximo 5 envios por IP a cada janela

type Bucket = { count: number; windowStart: number };

// Vive na memória do processo do servidor enquanto ele estiver "quente".
const buckets = new Map<string, Bucket>();

/**
 * @param identifier normalmente o IP do visitante (ver app/api/leads/route.ts)
 * @returns true se a requisição pode seguir, false se o limite estourou
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  // Primeira requisição deste IP, ou a janela anterior já expirou:
  // começa a contar do zero.
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(identifier, { count: 1, windowStart: now });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) {
    return false; // estourou o limite dentro da janela atual
  }

  bucket.count += 1;
  return true;
}
