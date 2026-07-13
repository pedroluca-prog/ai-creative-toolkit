# architecture.md (exemplo)

> Copie este arquivo para a **raiz do seu projeto** como `architecture.md` e adapte.
> O `issue-planner` e os writers (`component-writer`, `supabase-writer`) leem este arquivo **antes** de planejar/implementar. Se ele não existir, eles param e pedem.

## Stack

- **Front:** React + TypeScript (strict), Vite, Tailwind, shadcn/ui.
- **Back:** Supabase (Postgres + RLS + edge functions em Deno).
- **Gerenciador:** `<bun | pnpm | npm>`.

## Princípio-mestre: thin client / fat server

- Autorização **nunca** no client. Toda tabela tem RLS; a policy é a fonte da verdade.
- Segredos **nunca** em `VITE_*`. Segredo que o front precisa consumir passa por edge function.
- SQL não fica solto em TypeScript — migrations versionadas em `supabase/migrations/`.

## Convenções de código

- **Isolamento por comportamento:** código de uma feature vive em `src/features/<comportamento>/`, não em `src/components/` genérico.
- **shadcn/ui primeiro:** primitives em `src/components/ui/` antes de escrever primitive caseiro.
- **Design tokens:** cores/spacing via `tailwind.config.ts`. Sem inline style, sem CSS solto.
- **Tipos explícitos:** props tipadas, sem `any`.

## Convenções de banco (Supabase)

- Migration: `supabase/migrations/<timestamp>_<descrição-kebab>.sql` (timestamp via `date +%Y%m%d%H%M%S`).
- Toda tabela nova: `ENABLE ROW LEVEL SECURITY` + policies explícitas na mesma migration.
- Migrations são **append-only** — não editar/remover as antigas para "consolidar".
- Tipos gerados em `src/integrations/supabase/types.ts` — regenerar após migration.

## Anti-padrões bloqueantes (writer para e reporta)

1. Secret/token em variável client (`VITE_*`) que não é público.
2. Lógica de autorização no client sem RLS correspondente.
3. Duplicar componente que já existe.
4. Chamar API externa com secret direto do front (deveria ser edge function).
5. SQL ad-hoc em TypeScript.
6. Migration destrutiva (DROP / ALTER com perda de dados) sem confirmação explícita na issue.

## Comandos úteis

```bash
<bun|pnpm|npm> run dev          # subir local
<bun|pnpm|npm> run lint         # lint
npx tsc --noEmit                # checar tipos
supabase db push                # aplicar migrations (decisão do humano)
supabase gen types typescript   # regenerar types
```
