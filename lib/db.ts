import { sql } from "@vercel/postgres";
import type { LeadRecord } from "@/types/lead";

/**
 * Este arquivo é o ÚNICO lugar do projeto que fala diretamente com o
 * banco de dados. Nenhum outro componente ou rota importa "@vercel/postgres"
 * diretamente — eles sempre passam por aqui. Isso tem duas vantagens:
 *
 *  1. Se um dia você trocar de banco (Postgres -> outro), só este arquivo
 *     muda.
 *  2. Toda query SQL do projeto fica visível em um único lugar, fácil de
 *     revisar por segurança.
 *
 * SEGURANÇA CONTRA SQL INJECTION: repare que nunca "colamos" texto do
 * usuário dentro de uma string SQL manualmente (isso seria perigoso).
 * A função `sql` do @vercel/postgres é uma "tagged template" — cada
 * ${valor} vira automaticamente um parâmetro separado da query, nunca
 * texto solto. Ou seja, mesmo que alguém digite algo como
 * `'; DROP TABLE leads; --` no campo nome, o banco trata isso como um
 * texto comum a ser guardado, não como um comando SQL.
 */

/**
 * Cria a tabela "leads" caso ela ainda não exista. É seguro chamar isso
 * toda vez (por isso "IF NOT EXISTS") — na prática ela só faz algo na
 * primeiríssima vez que o site recebe um lead.
 */
export async function ensureLeadsTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      service VARCHAR(60) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

/** Grava um novo lead já validado (ver lib/validation.ts) no banco. */
export async function insertLead(lead: {
  name: string;
  phone: string;
  service: string;
}): Promise<LeadRecord> {
  const { rows } = await sql<LeadRecord>`
    INSERT INTO leads (name, phone, service)
    VALUES (${lead.name}, ${lead.phone}, ${lead.service})
    RETURNING id, name, phone, service, created_at;
  `;

  return rows[0];
}
