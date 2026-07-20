# AI Creative Toolkit — Instruções para Claude Code

> Lido automaticamente em toda sessão neste repositório.

## O que é este toolkit

4 kits de skills para produção criativa com Claude Code:

| Kit | Skills | Trigger |
|-----|--------|---------|
| **Conteúdo Editorial** | `skill-linha-editorial` (+ agentes `editorial-researcher`, `editorial-estrategista`, `card-arquiteto`, `copy-auditor`) | "linha editorial", "pauta de conteúdo", "newsjacking", "carrossel estilo V4/G4", "faça uma linha editorial para \<cliente\>" |
| **Vídeo** | `skill-video-remotion`, `skill-edicao-anuncios-video` | "vídeo programático", "motion graphics", "editar vídeo", "anúncio em vídeo" |
| **Imagens** | `skill-arte-onbrand`, `image-prompt-generator` | "arte on-brand", "carrossel", "post com texto", "gerar imagem", "prompt de imagem" |
| **Landing Page** | `skill-landing-page-builder` | "construir LP", "landing page", "HTML pronto", "site single-file" |

O Kit **Conteúdo Editorial** é o orquestrador de topo: constrói a linha editorial de QUALQUER cliente a partir de um perfil parametrizável (`skill-linha-editorial/config/exemplos/<cliente>.md`), roda newsjacking, pontua pautas e produz os carrosséis — chamando o Kit Imagens (render), `anti-ai-copy` (texto) e o Kit Vídeo (card com vídeo) por baixo. Comando: `/linha-editorial <cliente> [linha|pautas|produz]`.

## Regra #1 — Primeira ação de TODA sessão

1. Identificar qual kit/skill é necessário para a tarefa
2. Ler a `SKILL.md` da skill correspondente
3. Ler o `aprendizados.md` da skill (evita repetir erros documentados)
4. Carregar referências específicas (`references/`) conforme indicado pela SKILL.md
5. Executar

## Regra #2 — Roteamento por trigger

### Kit Conteúdo Editorial

| Trigger | Skill / agente |
|---------|----------------|
| linha editorial, pauta, calendário editorial, newsjacking, "faça uma linha editorial para \<cliente\>", carrossel estilo V4/G4, banco de pautas | `skill-linha-editorial` (orquestra os agentes) |
| varrer notícia quente por veia (Fase 2) | agente `editorial-researcher` (um por veia, paralelo) |
| pontuar pautas / escrever headline V4 / linha editorial | agente `editorial-estrategista` |
| mapear cards em ref_id do banco de formatos (ETAPA 2) | agente `card-arquiteto` |
| caça anti-cacoete + auditoria de fidelidade | agente `copy-auditor` |

> Sempre começa lendo `config/exemplos/<cliente>.md`. Sem perfil, roda a Fase 0 (instanciar do template) primeiro.

### Kit Vídeo

| Trigger | Skill |
|---------|-------|
| vídeo programático, motion graphics, lettering animado, Remotion, promo animado, vídeo sem pessoa | `skill-video-remotion` |
| editar vídeo bruto, cortar, anúncio em vídeo, motion overlay, legenda burn-in, color grade, multi-formato | `skill-edicao-anuncios-video` |

### Kit Imagens

| Trigger | Skill |
|---------|-------|
| arte on-brand, slide com texto, número grande, carrossel, render HTML→PNG | `skill-arte-onbrand` |
| gerar imagem fotorrealista, prompt para gpt-image-2, gen-image.sh | `image-prompt-generator` (SEMPRE antes de executar gen-image.sh) |

### Kit Landing Page

| Trigger | Skill |
|---------|-------|
| construir LP, HTML single-file, landing page pronta, deploy | `skill-landing-page-builder` |

## Regra #3 — Dependências entre skills

- `gen-image.sh` sempre pede `image-prompt-generator` primeiro (constrói o prompt)
- `skill-arte-onbrand` pode receber foto gerada por `gen-image.sh` como `backgroundImage`
- `skill-landing-page-builder` (Fase 5) usa `image-prompt-generator` + `gen-image.sh` para hero autoral
- `skill-edicao-anuncios-video` pode receber spec de `skill-roteiro-video` (skill externa, não neste repo)
- `skill-linha-editorial` é o topo: chama `skill-arte-onbrand` (render dos cards), `anti-ai-copy` (todo texto), `image-prompt-generator`+`gen-image.sh` (fundos), e o Kit Vídeo (card com vídeo). Nunca hardcode marca — tudo vem de `config/exemplos/<cliente>.md`.

## Regra #4 — Texto anti-IA

**Todo texto produzido passa pela skill `anti-ai-copy` antes de ser entregue.** Ela tem prioridade sobre qualquer outra skill de texto. As outras definem O QUE produzir; ela define COMO o texto deve soar.

Resumo executivo:
- Demonstrar > evocar
- Abertura como veredito, não como pergunta retórica
- Fechamento como estocada, não como resumo
- Sem travessão, sem "jornada", sem "propósito", sem "mindset"
- Verbo concreto, substantivo específico

Detalhes (11 grupos de desperdício, maquinário retórico, teste de bolso): `anti-ai-copy/SKILL.md`.

## Regra #5 — Logo e texto em imagens

- **Logo**: NUNCA via gen-image.sh ou qualquer modelo de difusão. Usar overlay com PNG/SVG oficial via `skill-arte-onbrand` ou HTML/CSS.
- **Texto crítico em PT-BR**: SEMPRE via `skill-arte-onbrand` (Chromium) ou HTML/CSS. Nunca via difusão — IA hallucina acentos.

## Regra #6 — macOS Sequoia (Darwin 25.x) + Remotion

Em macOS Sequoia, o `chrome-headless-shell` baixado pelo Remotion tem assinatura inválida (SIGKILL). Sempre incluir `--browser-executable` no render:

```bash
npx remotion render src/index.ts Composition out/video.mp4 \
  --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## Seleção de modelo por tarefa

| Tarefa | Modelo recomendado |
|--------|-------------------|
| Escrita criativa, copy, scripts | Opus (núcleo criativo) |
| Execução estruturada (templates, código, renders) | Sonnet (default) |
| Parsing, formatação, volume | Haiku |
