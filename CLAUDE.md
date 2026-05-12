# AI Creative Toolkit — Instruções para Claude Code

> Lido automaticamente em toda sessão neste repositório.

## O que é este toolkit

3 kits de skills para produção criativa com Claude Code:

| Kit | Skills | Trigger |
|-----|--------|---------|
| **Vídeo** | `skill-video-remotion`, `skill-edicao-anuncios-video` | "vídeo programático", "motion graphics", "editar vídeo", "anúncio em vídeo" |
| **Imagens** | `skill-arte-onbrand`, `image-prompt-generator` | "arte on-brand", "carrossel", "post com texto", "gerar imagem", "prompt de imagem" |
| **Landing Page** | `skill-landing-page-builder` | "construir LP", "landing page", "HTML pronto", "site single-file" |

## Regra #1 — Primeira ação de TODA sessão

1. Identificar qual kit/skill é necessário para a tarefa
2. Ler a `SKILL.md` da skill correspondente
3. Ler o `aprendizados.md` da skill (evita repetir erros documentados)
4. Carregar referências específicas (`references/`) conforme indicado pela SKILL.md
5. Executar

## Regra #2 — Roteamento por trigger

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

## Regra #4 — Texto anti-IA

Todo texto produzido passa pela régua anti-IA antes de ser entregue:
- Demonstrar > evocar
- Abertura como veredito, não como pergunta retórica
- Fechamento como estocada, não como resumo
- Sem travessão, sem "jornada", sem "propósito", sem "mindset"
- Verbo concreto, substantivo específico

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
