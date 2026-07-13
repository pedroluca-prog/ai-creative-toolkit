---
description: Executa uma issue planejada orquestrando component-writer e/ou supabase-writer, atualiza prefixo de status e marca a spec como implementada quando todas as issues terminam. Etapa 4 do workflow Spec → Break → Plan → Execute.
argument-hint: <caminho para issue.md já planejada>
---

Etapa 4 do workflow descrito em `directives/workflow_dev.md`.

## Input

Caminho de uma issue `.md` já enriquecida por `/plan-issue`: **$ARGUMENTS**

Se vazio, pergunte: "Qual issue você quer executar? Passe o caminho."

## Pré-checagem

1. Leia a issue em `$ARGUMENTS`.
2. Confirme que a seção **"Plano"** existe com **"Arquivos a criar/modificar"**. Se não existir, aborte e instrua: "Essa issue ainda não foi planejada. Rode `/plan-issue $ARGUMENTS` primeiro."
3. Confirme que o arquivo tem prefixo **`[PLANEJADA] `** no nome. Se tiver `[BRUTA] `, aborte e peça `/plan-issue` antes. Se tiver `[IMPLEMENTADA] `, avise que a issue já foi executada e pergunte se deve refazer (sem renomear).
4. Examine quais tipos de arquivo o plano lista:
   - Arquivos em `src/*` (React/TS) → envolver `component-writer`.
   - Arquivos em `supabase/migrations/*` ou `supabase/functions/*` → envolver `supabase-writer`.
   - Ambos → decidir ordem (schema antes se o client depende dos tipos).

## Orquestração

Use a Agent tool para cada writer envolvido:

- **Só client**: delegue ao `component-writer` com o caminho da issue.
- **Só server**: delegue ao `supabase-writer`.
- **Ambos**: rode em sequência. Por padrão, **schema primeiro** — avise o usuário que após o `supabase-writer` precisa aplicar migration e regenerar types antes do `component-writer` rodar.

Os writers **não** renomeiam o arquivo da issue — você (este command) faz isso após eles terminarem.

## Pós-execução: rename do arquivo

Após todos os writers concluírem com sucesso, renomeie a issue trocando o prefixo `[PLANEJADA] ` por `[IMPLEMENTADA] `. Use Bash com aspas duplas (colchetes literais):

```bash
mv "<dir>/[PLANEJADA] 03-foo.md" "<dir>/[IMPLEMENTADA] 03-foo.md"
```

Se algum writer falhou ou retornou parcial, **NÃO renomeie** — mantenha `[PLANEJADA] ` para sinalizar que ainda há trabalho.

## Pós-execução: detectar última issue da spec

Após renomear o arquivo desta issue para `[IMPLEMENTADA] `:

1. Liste todos os arquivos `.md` em `<dir-da-issue>/` (a pasta `issues/`).
2. Verifique se **todos** têm prefixo `[IMPLEMENTADA] `. Se sim, esta foi a última.
3. Se foi a última: renomeie a **pasta-mãe da issues/** (ou seja, `<dir-spec>/<nome-spec>/`) prefixando com `[IMPLEMENTADA] `.

Estrutura típica:
```
specs/
  refino-landing-resultados.md           # spec original (não tocar)
  refino-landing-resultados/             # esta pasta é renomeada
    issues/
      [IMPLEMENTADA] 00-...
      [IMPLEMENTADA] 01-...
      ...
```

Após o rename:
```
specs/
  refino-landing-resultados.md
  [IMPLEMENTADA] refino-landing-resultados/
    issues/
      [IMPLEMENTADA] 00-...
      ...
```

Comando shell (com aspas duplas obrigatórias):
```bash
mv "<dir-spec>/<nome-spec>" "<dir-spec>/[IMPLEMENTADA] <nome-spec>"
```

Se nem todas as issues estiverem `[IMPLEMENTADA] `, **não** renomeie a pasta — apenas reporte ao usuário quantas issues ainda faltam.

## Output final

Resumo consolidado para o usuário:
- Arquivos de código criados/modificados (lista combinada dos writers).
- Comandos para finalizar (ex: `supabase db push`, `bun dev`, `bun run lint`).
- Itens da checklist da issue ainda em aberto.
- **Estado dos prefixos**:
  - "Issue renomeada para `[IMPLEMENTADA] <nome>`."
  - Se foi a última: "Pasta da spec renomeada para `[IMPLEMENTADA] <nome-spec>/`. Spec inteira concluída."
  - Se faltam issues: "Ainda restam N issues `[BRUTA] ` ou `[PLANEJADA] ` na spec. Próximas: <listar>."

## O que NÃO fazer

- Não implemente você mesmo — delegue.
- Não pule a pré-checagem. Issue sem `[PLANEJADA] ` no prefixo significa que não foi planejada — writer vai errar.
- Não renomeie a pasta da spec se houver alguma issue não-`[IMPLEMENTADA] `.
- Não comite nada — git é decisão do usuário.
