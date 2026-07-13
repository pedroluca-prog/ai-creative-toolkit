# Workflow Dev — Spec → Break → Plan → Execute

Este documento define **como trabalhar num repositório de software** sem misturar camadas nem gerar bagunça em mudanças grandes. É a diretiva-mestre que os comandos (`/spec-feature`, `/break-spec`, `/plan-issue`, `/execute-issue`) referenciam.

Use este workflow **sempre** para: feature nova, página nova, correção que envolve mais de 2 arquivos ou toca `supabase/` (banco / edge functions).

## Quando usar

- **Sempre** para: feature nova, página nova, correção que envolve mais de 2 arquivos ou toca banco/edge functions.
- **Opcional** para: typo, ajuste de copy/estilo trivial, rename local.
- **Não usar** para: trabalho de estratégia (ICP, GTM, messaging) — isso é outro workflow.

## Arquitetura de 3 camadas

O workflow separa responsabilidades para maximizar confiabilidade:

1. **Diretiva (o quê)** — SOPs em Markdown (`directives/`). Definem objetivo, entradas, ferramentas, saídas, edge cases.
2. **Orquestração (decisão)** — os comandos (`.claude/commands/`). Leem a diretiva, chamam o agente certo na ordem correta, cuidam de renomeações de status.
3. **Execução (fazer)** — os subagentes (`.claude/agents/`). Cada um faz uma coisa e só ela.

## As 4 etapas

| Etapa | Comando | Agente | Saída |
|---|---|---|---|
| 1. Spec | `/spec-feature` | — (conversacional) | spec em `execution/<projeto>/specs/<feature>.md` |
| 2. Break | `/break-spec` | `spec-breaker` | issues `[BRUTA]` em `.../<feature>/issues/*.md` |
| 3. Plan | `/plan-issue` | `issue-planner` | issue `[PLANEJADA]` (arquivos exatos, reuso, edge cases, checklist) |
| 4. Execute | `/execute-issue` | `component-writer` e/ou `supabase-writer` | código + issue `[IMPLEMENTADA]` |

As etapas têm dependências: **planejar antes de executar**; **schema antes do client** quando a issue toca ambos (o front depende dos tipos gerados). Não pule.

## Convenção de status (prefixo no nome do arquivo)

Cada issue carrega o estado no próprio nome, entre colchetes:

`[BRUTA]` (recém-quebrada) → `[PLANEJADA]` (enriquecida) → `[IMPLEMENTADA]` (aplicada)

Quando **todas** as issues de uma spec viram `[IMPLEMENTADA]`, o `/execute-issue` prefixa a **pasta** da spec com `[IMPLEMENTADA]` também.

> **Shell:** os colchetes são literais no nome do arquivo. Sempre use aspas duplas no `mv` (`mv "[BRUTA] 01-x.md" "[PLANEJADA] 01-x.md"`). Para criar, use a ferramenta `Write` (aceita o nome direto).

## Onde os artefatos vivem

| Artefato | Caminho |
|---|---|
| Specs | `execution/<projeto>/specs/<feature>.md` |
| Issues | `execution/<projeto>/specs/<feature>/issues/*.md` |
| Convenções do projeto | `architecture.md` na raiz do projeto (veja `architecture.example.md`) |

Em repositório **single-project**, dá pra dispensar o nível `<projeto>` e usar `execution/specs/` direto.

O paralelo com o workflow de marketing/GTM: lá os artefatos de execução vivem em `campanhas/`; aqui vivem em `execution/`. Mesma ideia de "diretiva descreve, execução materializa".

## Regras mínimas

- **Não misturar camadas** — mudanças em `src/` (client) e `supabase/` (server) são planejadas e executadas separadas quando possível. Por isso há dois writers distintos.
- **Lista exata de arquivos** — o plano da issue lista os arquivos a criar/modificar; a execução segue isso ao pé da letra. Sem a lista, o writer infere e erra.
- **Reuso > recriar** — antes de criar componente/hook/util novo, procurar o que já existe (é o maior valor do `issue-planner`).
- **`architecture.md` manda** — thin client / fat server, RLS obrigatório em tabela nova, sem secret no client. Os writers param e reportam se o plano pedir um anti-padrão.
- **Git é do humano** — nenhum agente comita. Você decide quando.
