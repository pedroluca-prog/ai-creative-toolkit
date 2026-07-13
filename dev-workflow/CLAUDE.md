# CLAUDE.md — Bootstrap do Workflow Dev

> Copie o conteúdo relevante deste arquivo para o `CLAUDE.md` (ou `AGENTS.md`) do seu repositório ao adotar o framework. Ele é lido automaticamente em toda sessão.

## O que este repositório usa

Este workspace usa o **Workflow Dev — Spec → Break → Plan → Execute** para toda mudança não-trivial de código. A diretiva completa está em [`directives/workflow_dev.md`](directives/workflow_dev.md).

| Etapa | Comando | Agente |
|---|---|---|
| 1. Spec | `/spec-feature` | — (conversacional) |
| 2. Break | `/break-spec` | `spec-breaker` |
| 3. Plan | `/plan-issue` | `issue-planner` |
| 4. Execute | `/execute-issue` | `component-writer` e/ou `supabase-writer` |

## Arquitetura de 3 camadas

1. **Diretiva (o quê)** — `directives/workflow_dev.md`.
2. **Orquestração (decisão)** — você + os comandos em `.claude/commands/`.
3. **Execução (fazer)** — os subagentes em `.claude/agents/`.

## Documentos condutores

| Arquivo | Propósito |
|---|---|
| `directives/workflow_dev.md` | A diretiva-mestre do fluxo |
| `architecture.md` (raiz do projeto) | Stack, convenções, anti-padrões — os agentes **param** se não existir |
| `execution/<projeto>/specs/` | Onde specs e issues são materializadas |

## Regras invioláveis

1. **Planejar antes de executar.** Issue sem prefixo `[PLANEJADA]` → o `/execute-issue` aborta.
2. **Schema antes do client** quando a issue toca banco e front — o front depende dos tipos gerados.
3. **`architecture.md` é lei.** Thin client / fat server; RLS obrigatório; sem secret no client.
4. **Reuso > recriar.** O `issue-planner` procura código existente antes de propor código novo.
5. **Git é decisão do humano.** Nenhum agente comita.
6. **Colchetes = aspas duplas no shell** ao renomear prefixos de status.
