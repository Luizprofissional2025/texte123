import { z } from "zod";

/**
 * Este é o ÚNICO lugar onde definimos "o que é um lead válido".
 *
 * O mesmo schema é usado:
 *  - no navegador (components/LeadPopup.tsx), para mostrar erros
 *    instantaneamente, sem esperar o servidor responder; e
 *  - no servidor (app/api/leads/route.ts), para checar de novo antes de
 *    gravar qualquer coisa no banco.
 *
 * Isso é importante por segurança: a validação do navegador é só para dar
 * uma experiência melhor. Ela pode ser completamente ignorada por alguém
 * que chame a API diretamente (sem passar pelo formulário). Por isso o
 * servidor NUNCA confia no que o navegador validou e roda esta mesma
 * checagem de novo, do zero.
 */
export const leadSchema = z.object({
  // .trim() remove espaços acidentais no início/fim antes de validar.
  name: z
    .string()
    .trim()
    .min(2, "Digite seu nome completo.")
    .max(80, "Nome muito longo."),

  // Aceita formatos comuns de telefone brasileiro; a regex é propositalmente
  // tolerante (com ou sem DDD entre parênteses, com ou sem traço) porque
  // quem preenche o campo não deveria precisar acertar uma máscara exata.
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido.")
    .max(20, "Telefone inválido.")
    .regex(/^[\d()\s-]+$/, "Use apenas números, espaços, parênteses ou traço."),

  service: z
    .string()
    .trim()
    .min(2, "Selecione o serviço de interesse.")
    .max(60, "Texto muito longo."),

  // Campo "honeypot": um input invisível para humanos (escondido por CSS),
  // mas visível para a maioria dos robôs de spam que preenchem TODO campo
  // automaticamente. Se este campo vier preenchido, tratamos como spam.
  // Um humano de verdade nunca vai digitar nada aqui.
  website: z.string().max(0, "Falha na validação.").optional().default(""),
});

// Tipo TypeScript derivado automaticamente do schema acima — assim
// nunca existe o risco do "tipo" e da "validação" ficarem dessincronizados.
export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Função de conveniência: valida os dados e devolve um resultado
 * já no formato que os componentes precisam (sucesso + dados limpos,
 * ou lista de mensagens de erro por campo).
 */
export function validateLead(data: unknown) {
  const result = leadSchema.safeParse(data);

  if (!result.success) {
    // .flatten() transforma os erros do Zod em um objeto simples
    // { campo: ["mensagem"] }, fácil de exibir embaixo de cada input.
    return { success: false as const, errors: result.error.flatten().fieldErrors };
  }

  return { success: true as const, data: result.data };
}
