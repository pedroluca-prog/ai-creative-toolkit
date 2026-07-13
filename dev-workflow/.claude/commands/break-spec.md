---
description: Quebra uma spec em issues pequenas usando o agente spec-breaker. Etapa 2 do workflow Spec → Break → Plan → Execute.
argument-hint: <caminho para spec.md>
---

Etapa 2 do workflow descrito em `directives/workflow_dev.md`.

## Input

Caminho de um arquivo `.md` de spec (gerado por `/spec-feature` ou escrito manualmente): **$ARGUMENTS**

Se vazio, pergunte: "Qual spec você quer quebrar em issues? Passe o caminho do arquivo."

## O que fazer

Delegue ao agente `spec-breaker` via Agent tool. Prompt para o agente:

> Quebre a spec em `$ARGUMENTS` em issues pequenas seguindo as regras do seu system prompt. Grave em `<dir-da-spec>/<nome-spec>/issues/`, com cada arquivo prefixado por `[BRUTA] `. Ao terminar, liste as issues criadas em ordem.

## Output

O agente vai listar as issues criadas. Acrescente no final:

> "Para planejar a primeira issue, rode: `/plan-issue <caminho-da-primeira-issue>`."

## O que NÃO fazer

- Não implemente nada no próprio command — só delegue.
- Não enriqueça as issues. Isso é a etapa 3 (`/plan-issue`), feita pelo `issue-planner`.
