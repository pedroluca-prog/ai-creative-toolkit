# Dev Workflow — Spec → Break → Plan → Execute

Um workflow agêntico para Claude Code que estrutura mudanças de código não-triviais em 4 etapas, cada uma com um agente especializado. Nasceu para evitar o modo de falha mais comum de código gerado por IA: **implementar antes de entender**, misturando camadas e recriando o que já existe.

A ideia central é a **separação em 3 camadas** — diretiva (o quê), orquestração (decisão), execução (fazer) — e a **materialização de estado no sistema de arquivos**: cada issue carrega seu progresso no próprio nome (`[BRUTA]` → `[PLANEJADA]` → `[IMPLEMENTADA]`), então o fluxo é retomável e auditável sem estado escondido.

## As 4 etapas

| # | Comando | Agente | O que faz |
|---|---------|--------|-----------|
| 1 | `/spec-feature` | — (conversa) | Clarifica **o que** construir. Gera uma spec técnica enxuta em `execution/<projeto>/specs/<feature>.md`. |
| 2 | `/break-spec` | `spec-breaker` | Quebra a spec em issues **pequenas e ordenadas** (`[BRUTA]`). 1 protótipo por página, 1 issue por comportamento, 1 por mudança de schema. |
| 3 | `/plan-issue` | `issue-planner` | Enriquece **uma** issue: pesquisa código reutilizável, consulta docs externas, detalha schema, lista os arquivos exatos a tocar. Marca `[PLANEJADA]`. |
| 4 | `/execute-issue` | `component-writer` / `supabase-writer` | Implementa seguindo o plano ao pé da letra. Marca `[IMPLEMENTADA]` e, na última issue, a spec inteira. |

## Os agentes

- **`spec-breaker`** — só quebra. Não enriquece, não pesquisa código, não lê o `architecture.md`. Output minimalista de propósito.
- **`issue-planner`** — só planeja. Pesquisa interna (reuso) + externa (docs) e produz a lista exata de arquivos. Não escreve código.
- **`component-writer`** — implementa React/TS (shadcn/ui + Tailwind, isolamento por comportamento). Não toca banco.
- **`supabase-writer`** — implementa migrations SQL + RLS + edge functions. Não toca `src/`.

A divisão client/server em dois writers é deliberada: mantém `thin client / fat server` e impede o vazamento de autorização/segredo para o front.

## Instalação

Copie o conteúdo de `.claude/` deste módulo para o `.claude/` do seu repositório:

```bash
cp -r dev-workflow/.claude/agents/*   SEU_REPO/.claude/agents/
cp -r dev-workflow/.claude/commands/* SEU_REPO/.claude/commands/
cp    dev-workflow/directives/workflow_dev.md SEU_REPO/directives/
cp    dev-workflow/architecture.example.md    SEU_REPO/architecture.md   # e adapte
mkdir -p SEU_REPO/execution
```

Depois cole os pontos relevantes de [`CLAUDE.md`](CLAUDE.md) no `CLAUDE.md`/`AGENTS.md` do seu repositório.

## Uso

```
/spec-feature quero permitir exportar CSV da tela de resultados
/break-spec  execution/app/specs/export-csv.md
/plan-issue  "execution/app/specs/export-csv/issues/[BRUTA] 01-exportar-csv.md"
/execute-issue "execution/app/specs/export-csv/issues/[PLANEJADA] 01-exportar-csv.md"
```

Cada comando termina te dizendo o comando seguinte e o caminho exato — inclusive com o novo prefixo de status.

## Convenções

- **Status no nome do arquivo:** `[BRUTA]` → `[PLANEJADA]` → `[IMPLEMENTADA]`. Colchetes são literais — **sempre aspas duplas no `mv`**.
- **`architecture.md` na raiz do projeto** é obrigatório: define stack, convenções e anti-padrões bloqueantes. Comece pelo `architecture.example.md`.
- **Git é do humano.** Os agentes nunca comitam.

## Estrutura do módulo

```
dev-workflow/
├── README.md                  # este arquivo
├── CLAUDE.md                  # bootstrap para colar no seu repo
├── architecture.example.md    # template do architecture.md do projeto
├── .claude/
│   ├── agents/                # spec-breaker, issue-planner, component-writer, supabase-writer
│   └── commands/              # spec-feature, break-spec, plan-issue, execute-issue
├── directives/
│   └── workflow_dev.md        # diretiva-mestre do fluxo
└── execution/                 # onde specs e issues são materializadas (entra vazia)
```

## Premissa de stack

Os writers assumem **React + TypeScript + Supabase** por padrão (é o que o `architecture.example.md` descreve). O fluxo (Spec → Break → Plan → Execute) e os agentes de spec/planejamento são agnósticos — adapte o `architecture.md` e os writers para outra stack conforme necessário.
