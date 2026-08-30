/**
 * Monta o link "wa.me" usado em todos os botões de WhatsApp do site
 * (o flutuante, o do menu, o do herói e o de cada card de serviço).
 *
 * Centralizar essa lógica aqui evita que cada componente monte a URL do
 * seu próprio jeito — e faz mais fácil trocar o número no futuro (basta
 * mudar a variável de ambiente, sem tocar em nenhum componente).
 */

// Lido do .env — ver .env.example para o formato esperado.
// Se a variável não estiver definida, cai em uma string vazia em vez de
// quebrar o build; o botão simplesmente não vai gerar um link válido até
// a variável ser configurada.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

/**
 * @param message texto que já vem digitado na conversa quando o visitante
 *                clica no botão. Cada seção do site passa uma mensagem
 *                diferente (ex: menciona o serviço específico que a
 *                pessoa estava olhando).
 */
export function buildWhatsAppLink(message: string): string {
  // encodeURIComponent transforma espaços, acentos e pontuação em um
  // formato seguro para URL (ex: espaço vira "%20"). Sem isso, o link
  // quebraria com qualquer mensagem que tivesse acento — como "orçamento".
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Mensagens padrão reaproveitadas pelo site inteiro.
export const WHATSAPP_MESSAGES = {
  generic: "Olá! Vim pelo site e gostaria de um orçamento.",
  service: (serviceName: string) =>
    `Olá! Vim pelo site e gostaria de um orçamento para: ${serviceName}.`,
} as const;
