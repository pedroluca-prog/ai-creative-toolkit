# execution/

Aqui vivem os artefatos de execução do workflow dev — specs e issues. É o análogo dev do `campanhas/` no workflow de marketing.

## Estrutura

```
execution/
  <projeto>/
    specs/
      <feature>.md                        # spec (etapa 1, /spec-feature)
      <feature>/
        issues/
          [BRUTA] 00-prototipo-<pagina>.md      # etapa 2, /break-spec
          [BRUTA] 01-<comportamento>.md
          ...
```

Ao longo do fluxo, o prefixo de cada issue evolui:

`[BRUTA]` → `[PLANEJADA]` (após `/plan-issue`) → `[IMPLEMENTADA]` (após `/execute-issue`)

Quando todas as issues de uma spec ficam `[IMPLEMENTADA]`, a **pasta** `<feature>/` também recebe o prefixo `[IMPLEMENTADA]`.

## Single-project

Se o repositório tem um projeto só, dispense o nível `<projeto>/` e use `execution/specs/` direto.

> Esta pasta entra vazia (só com este README). Os artefatos reais são gerados pelos comandos do workflow no seu próprio repositório.
