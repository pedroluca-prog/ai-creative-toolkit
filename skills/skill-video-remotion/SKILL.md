---
name: skill-video-remotion
description: "Processo completo para produzir vídeos programáticos com Remotion + Claude Code. Use quando pedir 'vídeo programático', 'motion graphics', 'vídeo animado', 'vídeo sem pessoa', 'promo animado', 'Remotion', 'vídeo com texto animado', 'vídeo de produto', 'vídeo de lançamento' ou qualquer produção de vídeo que não envolva gravação de pessoa real. Fluxo iterativo: roteiro → cenas → V1 → iteração cena-a-cena → render."
---

# Skill Video Remotion — Produção de Vídeos Programáticos

Produz vídeos programáticos (React → MP4) seguindo um fluxo iterativo cena-a-cena. A V1 é ponto de partida; o valor está na iteração visual no Remotion Studio.

## Quando Usar vs Outras Skills

| Skill | Quando |
|-------|--------|
| `skill-roteiro-video` | Pessoa real na câmera, talking head, B-roll com locutor |
| `skill-edicao-anuncios-video` | Editar vídeo bruto (corte, color grade, legenda burn-in) |
| `skill-video-remotion` | **Sem pessoa real na câmera.** Texto animado, gráficos, dados, produto SaaS/app, promo animado, motion graphics |

## Pré-requisitos

1. `brand-manual.md` ou `manual-da-marca-{cliente}.md` — **OBRIGATÓRIO** (cores hex, fontes)
2. Brief do vídeo: mensagem principal, CTA, público, tom
3. **Skill `remotion-best-practices` instalada em `~/.claude/skills/`** — carrega o domain knowledge do Remotion (useCurrentFrame, interpolate, springs, Easing) automaticamente quando código Remotion é tocado. Verificar com `ls ~/.claude/skills/remotion-best-practices`.
4. [Opcional, só se vídeo precisar de narração] Chave ElevenLabs API
5. [Opcional] Música background (MP3 royalty-free)

## Arquitetura Remotion — Modelo Mental Obrigatório

Antes de qualquer execução, internalizar esta hierarquia:

```
Composition (= o vídeo inteiro)
├── Scene 1 (= segmento temporal)
│   ├── Component A (título, pill, badge...)
│   ├── Component B (imagem, terminal, card...)
│   └── Animações (entrada, saída, transição para Scene 2)
├── Scene 2
│   ├── Component C
│   └── ...
└── Scene N
```

- **Composition**: arquivo principal (`{NomeVideo}.tsx`) que importa todas as cenas e define ordem + transições entre elas.
- **Scene**: combinação de componentes com timing próprio (frames de início/fim). Cada cena é um componente React, mas agrupa vários componentes visuais.
- **Component**: elemento visual unitário (título animado, terminal, pill/badge, card, imagem, GIF). Reutilizável entre cenas.
- **Assets** (`public/`): fontes, imagens, vídeos, GIFs — tudo que não é código React.
- **Animações por componente**: entrada, saída, cor, posição, rotação, opacidade, escala.
- **Camadas (z-order)**: via CSS/DOM, igual web — quem vem depois no JSX fica na frente.

### Estrutura de pastas Remotion

```
{projeto}/
├── public/              ← assets (preparar ANTES de codar)
│   ├── fonts/
│   ├── images/          ← logos, ícones, screenshots
│   ├── videos/          ← GIFs, clipes curtos
│   └── audio/           ← (opcional) música, narração, SFX
├── src/
│   ├── components/      ← componentes reutilizáveis
│   ├── scenes/          ← cenas (importam components + assets)
│   └── {Video}.tsx      ← composition principal (importa scenes, define transições)
├── out/                 ← MP4 renderizado
├── roteiro.md           ← brief criativo (Passo 2)
└── cenas.md             ← descrição cena-a-cena (Passo 4)
```

Faz sentido `public/` ser a PRIMEIRA coisa que se prepara — os assets precisam existir antes do código referenciá-los.

---

## Fluxo de Execução — Processo Único Iterativo

**Princípio:** vídeo Remotion é construído **iterativamente, cena a cena**. A V1 nunca fica perfeita — o valor está no loop de iteração visual no Remotion Studio. Narração ElevenLabs é passo opcional ao final (quando o vídeo precisa de locução), não gatekeeper do método.

### Passo 1 — Ler brand manual + localizar logo oficial

Extrair do brand manual: cores hex (primária, secundária, fundo, texto, muted), fontes (serif para impacto, sans para corpo), estilo visual. Localizar logo oficial em `Clientes/{cliente}/Arquivos {cliente}/*ID*/` (PNG com transparência).

### Passo 2 — Escrever roteiro do vídeo (brief criativo)

Texto livre descrevendo O QUE o vídeo deve comunicar:
- Tema / produto / oferta
- Mensagem principal (1 frase)
- Público (referência ao ICP do cliente)
- CTA
- Duração alvo (15s ads Meta, 30–60s vídeo padrão, 60–90s institucional)

**Isso NÃO é o prompt do Remotion** — é o brief criativo, equivalente ao que se passaria pra um motion designer humano. Salvar em `roteiro.md`.

### Passo 3 — Preparar assets em `public/` ANTES de codar

Coletar e organizar **antes** de qualquer prompt pro Claude:

```
{projeto}/public/
├── fonts/       ← TTF/WOFF do cliente
├── images/      ← logo oficial PNG, ícones, screenshots, fotos
├── videos/      ← GIFs, clipes curtos pra embed
└── audio/       ← (opcional) música, voiceover, SFX
```

**Se faltar asset, o Claude inventa ou omite.** Listar e copiar tudo primeiro evita 2–3 ciclos de re-prompt.

### Passo 4 — Quebrar roteiro em cenas

Transformar o roteiro em descrição cena-a-cena. Cada cena especifica:

| Campo | Descrição |
|-------|-----------|
| Duração | Em segundos |
| Cor de fundo | Hex do brand |
| Elementos | Componentes na tela (título, pill, screenshot, terminal, card, logo...) |
| Animações | Entrada, movimento, saída de cada elemento |
| Transição | Como sai pra próxima (fade, slide, zoom, cut) |

Salvar em `cenas.md`.

**Exemplo (vídeo promo 32s, 6 cenas):**
```
Cena 1 (4s, bg #0a0a0a): Título "No video skills?" entra com spring.
                         Pausa 1s. "No problem" entra por baixo.
                         Trans: fade.

Cena 2 (5s, bg #1a1a1a): Screenshot CapCut (public/images/capcut.png) reta, sem tilt.
                         Título "Manual editing sucks" desliza da esquerda.
                         Trans: slide.

Cena 3 (4s, bg brand-primary): Confetti (react-confetti).
                         Título "Create videos in Claude Code" + powered-by.
                         Trans: zoom.

Cena 4 (5s, bg #0a0a0a): Logo Remotion (public/images/remotion-logo.png) scale + glow.
                         Trans: fade.

Cena 5 (8s, bg #f5f5f5): 3 pills pretas com texto branco, stagger 8 frames:
                         1. "Describe what you want"
                         2. "Code gets generated"
                         3. "Video renders"
                         Trans: fade.

Cena 6 (6s, bg #000):    Terminal preto, comando typewriter "claude install...".
                         Logo no canto. SEM fade out.
```

### Passo 5 — Montar prompt e enviar pro Claude Code

O prompt contém: video specs (resolução, fps, duração) + descrição das cenas (Passo 4) + **caminhos explícitos dos assets** do `public/` + guidelines de animação globais.

**Antecipar ajustes recorrentes no prompt inicial** (economiza 2–3 iterações):
- Sem tilts em screenshots/cards
- Contraste forte: terminais bg preto, pills pretas com texto branco
- Spring damping 10, stiffness 150, mass 0.8
- Fade out últimos 12 frames (opacity 0, scale 0.96)
- Stagger 8–15 frames entre elementos
- Logo oficial é o PNG em `public/images/...` — NUNCA gerar via diffusion

```bash
# No projeto Remotion (cria com npx create-video@latest --yes --blank):
claude
> [colar prompt completo com specs + cenas + assets]
```

Quando o Claude tocar código Remotion, a skill `remotion-best-practices` carrega automaticamente e dá o domain knowledge (springs, interpolate, Easing, useCurrentFrame).

### Passo 6 — Visualizar V1 no Remotion Studio

```bash
npm run dev    # abre localhost:3000
```

**A V1 NÃO vai estar perfeita.** Ajustes recorrentes esperados:
- Tilts indesejados (modelo adiciona pra "dinamismo")
- Falta de contraste (pills/terminais sem fundo escuro)
- Texto redundante (ex: "Remotion + Remotion Skills")
- Falta de movimento em cenas estáticas

Aceitar de início. **Não renderizar MP4 agora** — o Studio mostra em tempo real.

### Passo 7 — Iterar cena a cena (UMA por vez)

Assistir cada cena, anotar o que mudar, pedir ajustes uma de cada vez:

```
> Na cena 2, tire o tilt da screenshot e deixe ela reta.
[ver Studio]
> Na cena 3, adicione confetti com react-confetti.
[ver Studio]
> Na cena 5, mude as pills pra fundo preto com texto branco.
[ver Studio]
> Na cena 6, deixe o terminal preto pra parecer real.
```

**Regras da iteração:**
- **Uma cena por vez** (não pedir 6 mudanças de 6 cenas num prompt só — confunde o modelo)
- **Ser específico**: "fundo `#000`" > "fundo escuro"
- **Verificar no Studio** antes de seguir pra próxima
- **Sem render MP4** entre iterações

### Passo 8 (opcional) — Adicionar narração ElevenLabs

Quando o vídeo precisar de locução (institucional, lançamento, explainer longo):

1. Gerar MP3 por cena via ElevenLabs API (voice ID + model `eleven_multilingual_v2` + stability 0.3 + similarity_boost 0.8 + style 0.8)
2. Medir duração real: `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 v1-s01.mp3`
3. Multiplicar por fps (30) → frames reais por cena. Adicionar +5 frames de padding.
4. Recalcular `from` e `durationInFrames` no `{Video}.tsx` para sincronizar visual ↔ áudio
5. Adicionar `<Audio src={staticFile('audio/v1-s01.mp3')} />` em cada cena React

**Vozes recomendadas PT-BR:**
| Tom | Voice ID |
|-----|----------|
| Masculino profissional | `TX3LPaxmHKxFdv7VOQHJ` |
| Feminino energético (free) | `FGY2WhTYpPnrIDTdsKH5` (Laura) |
| Masculino jovem | `gJx1vCzNCD1EQHT212Ls` |

Settings detalhados, regras de script PT-BR e templates de cena: `references/remotion-prompt-template.md`.

### Passo 9 — Renderizar MP4 final

```bash
npx remotion render src/index.ts {CompositionName} out/video.mp4
```

Pós-render opcional (música background, SFX, ajuste fino, multi-formato 9:16/1:1/16:9): `skill-edicao-anuncios-video` (ffmpeg).

### Passo 10 — Salvar no cliente

```
Clientes/{cliente}/Conteúdo/{ano-mes}/videos/{nome-video}/
├── out/video.mp4                    ← entregável final
├── src/, public/                    ← projeto Remotion completo (versionável)
├── roteiro.md                       ← brief criativo (Passo 2)
└── cenas.md                         ← descrição cena-a-cena (Passo 4)
```

Para vídeos vinculados a campanha, salvar em `Clientes/{cliente}/Campanhas/{campanha}/remotion/` em vez de `Conteúdo/`.

---

## Padrões de Qualidade

- **Iteração visual > spec perfeita:** V1 sempre tem ajustes. O loop cena-a-cena é o método.
- **Assets em `public/` antes do código:** evita inventar caminhos ou omitir elementos.
- **Spring em tudo:** nunca usar easing linear pra entradas/saídas. Padrão: damping 10, stiffness 150, mass 0.8.
- **Fade out padronizado:** últimos 12 frames de cada cena → opacity 0, scale 0.96.
- **Sem screenshots de UI imaginária:** componentes React animados, não imagens estáticas de telas inventadas.
- **Logo SEMPRE PNG oficial** — nunca gerar via diffusion (difusão hallucina logos com texto incorreto).
- **Audio-first (se houver narração):** medir áudio com ffprobe e calcular frames a partir disso. Nunca hardcodar antes de medir.
- **Contraste explícito:** terminais bg `#000`, pills com fundo escuro e texto branco. Antecipar no prompt inicial.

---

## Limitações

- **NÃO faz:** pessoa real na câmera, animação orgânica de personagens, lip sync realista, partículas físicas complexas
- **FUNCIONA:** texto animado, gráficos de dados, UI mockups, logos, transições, contadores, automation flows, cards de produto, terminais animados, splash screens, confetti, typewriter effects

---

## Referências

| Arquivo | Quando ler |
|---------|-----------|
| `references/remotion-prompt-template.md` | Quando o vídeo tiver narração ElevenLabs — templates de cena por arco narrativo + settings de voz |
| `references/remotion-specs.md` | Consulta de animações, resoluções, design tokens |
| `~/.claude/skills/remotion-best-practices/SKILL.md` | Carrega automaticamente quando código Remotion é tocado — não precisa ler manualmente |
