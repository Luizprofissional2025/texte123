/** Formato de uma linha da tabela "leads" no Postgres (ver lib/db.ts). */
export interface LeadRecord {
  id: number;
  name: string;
  phone: string;
  service: string;
  created_at: string;
}
