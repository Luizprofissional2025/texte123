# Imperador Auto GNV — Landing Page

Site institucional em **Next.js 14 + TypeScript + Tailwind CSS**, com
captação de leads integrada ao banco de dados gratuito da Vercel
(Postgres) e botões de contato direto no WhatsApp.

## Estrutura do projeto

```
app/
  layout.tsx        -> layout raiz (metadados, fontes do sistema, CSS global)
  page.tsx           -> monta a página juntando todas as seções, na ordem
  globals.css         -> diretivas do Tailwind + 2-3 regras globais
  api/leads/route.ts  -> API que recebe o formulário do popup e grava no banco

components/
  Header.tsx          -> menu fixo no topo (único trecho com estado no header)
  Hero.tsx             -> seção principal, com o CTA de WhatsApp
  HowToFindUs.tsx      -> endereço + mapa incorporado do Google
  Services.tsx         -> grade de serviços (lê a lista de lib/business.ts)
  ServiceCard.tsx       -> cartão individual de serviço
  Differentials.tsx     -> selos de autoridade + avaliações
  FinalCTA.tsx           -> último convite ao WhatsApp antes do rodapé
  Footer.tsx              -> contato, redes sociais, endereço
  WhatsAppButton.tsx       -> botão flutuante fixo (sem JavaScript)
  LeadPopup.tsx             -> popup de captação de lead (com gatilho de tempo/saída)
  Icons.tsx                  -> ícones SVG escritos à mão (ver "Performance" abaixo)

lib/
  business.ts    -> dados reais da empresa (endereço, telefone, serviços) em um só lugar
  whatsapp.ts     -> monta os links "wa.me" com mensagem pré-preenchida
  validation.ts    -> schema único (Zod) usado no navegador E no servidor
  rateLimit.ts      -> limite simples de envios por IP na API de leads
  db.ts              -> toda a comunicação com o Postgres fica só aqui

types/lead.ts   -> tipo TypeScript de uma linha da tabela "leads"
```

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # depois edite .env.local com valores reais
npm run dev
```

Abra http://localhost:3000.

> Sem configurar `POSTGRES_URL`, o site funciona normalmente — só o envio
> do popup de lead vai falhar (com uma mensagem de erro amigável), porque
> ainda não há banco para gravar.

## Configurando o banco de dados gratuito da Vercel

1. No painel do projeto na Vercel, vá em **Storage → Create Database →
   Postgres** (o plano "Hobby"/gratuito é suficiente para o volume de
   leads de uma landing page).
2. Depois de criado, clique em **Connect Project** e selecione este
   projeto — a Vercel preenche a variável `POSTGRES_URL` sozinha, tanto em
   produção quanto para você copiar em desenvolvimento local.
3. Não é preciso criar a tabela manualmente: a primeira vez que alguém
   envia o formulário, `lib/db.ts` executa um
   `CREATE TABLE IF NOT EXISTS` automaticamente. Se preferir criar antes
   (para já poder consultar no painel), rode este SQL uma vez no editor de
   queries da Vercel:

   ```sql
   CREATE TABLE IF NOT EXISTS leads (
     id SERIAL PRIMARY KEY,
     name VARCHAR(80) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     service VARCHAR(60) NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   ```

4. Para ver os leads recebidos, use o próprio editor de queries da Vercel
   com `SELECT * FROM leads ORDER BY created_at DESC;`, ou conecte uma
   ferramenta como o TablePlus/DBeaver usando a mesma `POSTGRES_URL`.

## Publicando na Vercel

1. Suba este projeto para um repositório Git (GitHub, GitLab ou
   Bitbucket).
2. Na Vercel, **Add New → Project** e importe o repositório.
3. Configure as variáveis de ambiente (as mesmas do `.env.example`) em
   **Settings → Environment Variables**.
4. Deploy. A Vercel já entrega o site em HTTPS automaticamente.

## Decisões de segurança (o que foi implementado e por quê)

| Camada | O que foi feito | Onde |
|---|---|---|
| Validação de dados | Mesmo schema (Zod) no navegador e no servidor — o servidor nunca confia só na checagem do navegador | `lib/validation.ts` |
| Injeção de SQL | Todas as queries usam parâmetros automáticos (`sql\`...${valor}...\``), nunca texto concatenado | `lib/db.ts` |
| XSS | O React escapa automaticamente qualquer texto exibido; nenhum `dangerouslySetInnerHTML` é usado no projeto | todo o projeto |
| CSRF | Checagem do cabeçalho `Origin` da requisição contra o domínio oficial do site | `app/api/leads/route.ts` |
| Spam / bots | Campo-armadilha (honeypot) invisível a humanos + limite de 5 envios por IP a cada minuto | `lib/validation.ts`, `lib/rateLimit.ts` |
| Cabeçalhos HTTP | HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy e Content-Security-Policy em todas as páginas | `next.config.js` |
| Segredos | `.env.local` nunca é commitado (`.gitignore`); a URL do banco só existe no servidor, nunca chega ao navegador | `.gitignore`, `.env.example` |
| Mensagens de erro | Erros internos do banco nunca são devolvidos ao navegador — só uma mensagem genérica; o detalhe fica no log do servidor | `app/api/leads/route.ts` |

## Decisões de performance ("menor consumo de internet")

- **Tailwind CSS com purge automático**: o CSS final do site contém só as
  classes realmente usadas — tipicamente alguns KB, contra centenas de KB
  de um framework CSS completo.
- **Zero fontes baixadas da internet**: o site usa fontes que já vêm
  instaladas no aparelho do visitante (`system-ui`, `Georgia`).
- **Ícones em SVG escritos à mão**: nenhuma biblioteca de ícones foi
  instalada — só o punhado de ícones realmente usados, em `components/Icons.tsx`.
- **Componentes de servidor por padrão**: só `Header.tsx` e
  `LeadPopup.tsx` têm `"use client"` (por precisarem de estado no
  navegador); todo o resto do site é HTML puro, sem JavaScript extra para
  baixar e executar.
- **Imagens otimizadas**: uso do componente `<Image>` do Next.js, que gera
  automaticamente versões em WebP/AVIF e no tamanho certo para a tela do
  visitante; o mapa do Google só carrega quando a seção entra perto da
  tela (`loading="lazy"`).

## Antes de publicar de verdade

- [ ] Trocar `public/images/oficina-imperador.jpg` (hoje é um placeholder gerado automaticamente) por uma foto real da oficina
- [ ] Trocar os depoimentos de exemplo em `components/Differentials.tsx` por avaliações reais do Google
- [ ] Conferir o número de WhatsApp em `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] Configurar `POSTGRES_URL` no projeto na Vercel
- [ ] Ajustar `NEXT_PUBLIC_SITE_URL` para o domínio definitivo
