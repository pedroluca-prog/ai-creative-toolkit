---
description: Enriquece uma issue com pesquisa interna, docs externas e lista exata de arquivos. Etapa 3 do workflow Spec → Break → Plan → Execute.
argument-hint: <caminho para issue.md>
---

Etapa 3 do workflow descrito em `directives/workflow_dev.md`.

## Input

Caminho de um arquivo `.md` de issue (gerado por `/break-spec`): **$ARGUMENTS**

Se vazio, pergunte: "Qual issue você quer planejar? Passe o caminho."

## O que fazer

Delegue ao agente `issue-planner` via Agent tool. Prompt:

> Planeje a issue em `$ARGUMENTS` seguindo o seu system prompt. Leia o `architecture.md` do projeto correspondente, pesquise código reutilizável, consulte docs externas, detalhe schema se aplica, e enriqueça o arquivo com a seção "Plano" completa (arquivos a criar/modificar, edge cases, checklist). Ao final, renomeie o arquivo trocando o prefixo `[BRUTA] ` por `[PLANEJADA] `.

## Output

O agente vai editar a issue e renomeá-la. Acrescente no final:

> "Para executar, rode: `/execute-issue <novo-caminho-com-[PLANEJADA]>`."

Mostre o novo caminho exato (com o prefixo `[PLANEJADA]`) — o usuário precisa dele para a próxima etapa.

## O que NÃO fazer

- Não implemente o plano — só delegue o enriquecimento.
- Não modifique código do projeto — o `issue-planner` também não deve.
