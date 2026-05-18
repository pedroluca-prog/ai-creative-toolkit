# Remotion — Template de Prompt Executável

> Este arquivo define a estrutura de um `prompt.md` completo que o Claude Code lê e executa para produzir um projeto Remotion do zero até o MP4 final.
> Baseado no padrão do vídeo de referência (Sendkit/Paulo Castellano).

---

## Estrutura do prompt.md

O prompt.md deve conter exatamente estas seções, nesta ordem:

---

### 1. Cabeçalho — Descrição do vídeo

```markdown
# {Nome do Cliente} — {Tipo de Vídeo}

> Prompt para Claude Code replicar este vídeo usando Remotion.
```

---

### 2. Tech Stack

```markdown
## Tech Stack

- **Remotion 4.x** (React + TypeScript)
- **Fonts**: `@remotion/google-fonts` — {FontePrincipal} (weights: 400, 500, 600, 700) e {FonteSerif} (weight: 400)
- **TTS**: ElevenLabs API  
- **Background music**: royalty-free (Pixabay ou similar)
```

---

### 3. Video Settings

```markdown
## Video Settings

| Property | Value |
|----------|-------|
| Resolution | {1920×1080 / 1080×1920 / 1080×1080} |
| FPS | 30 |
| Total duration | {X} frames (~{X/30} segundos) |
```

Resoluções por formato:
- Landscape / Product video: `1920×1080`
- Reels / Stories: `1080×1920`
- Feed quadrado: `1080×1080`

---

### 4. Voice Narration (ElevenLabs)

```markdown
## Voice Narration (ElevenLabs)

| Setting | Value |
|---------|-------|
| Voice ID | `{voice_id}` |
| Fallback voice (free) | Laura — `FGY2WhTYpPnrIDTdsKH5` |
| Model | `eleven_multilingual_v2` |
| Stability | 0.3 |
| Similarity boost | 0.8 |
| Style | 0.8 |
| Speaker boost | true |

Gerar um MP3 por cena. Nomear como `v1-s01.mp3` até `v1-s{N}.mp3`.
```

**Vozes recomendadas (PT-BR):**
| Tom | Voice ID | Descrição |
|-----|----------|-----------|
| Masculino profissional | `TX3LPaxmHKxFdv7VOQHJ` | Grave, autoridade |
| Feminino energético | `FGY2WhTYpPnrIDTdsKH5` | Laura, free tier |
| Masculino jovem | `gJx1vCzNCD1EQHT212Ls` | Paulo Castellano (referência) |

---

### 5. Background Music

```markdown
## Background Music

- **File**: `public/audio/background.mp3`
- **Volume**: 0.12 (abaixo da narração)
- **Starts at**: frame 45 (1.5s de intro antes de iniciar)
- Toca por toda a duração restante
```

---

### 6. Narration Script (por cena)

```markdown
## Narration Script

| Cena | Audio file | Narração (PT-BR) |
|------|-----------|-------------------|
| 1 — Intro | v1-s01.mp3 | "Apresentando {NomeProduto}. {Tagline curta}." |
| 2 — Dor | v1-s02.mp3 | "Você acabou de {contexto do problema}." |
| 3 — Agitação | v1-s03.mp3 | "Mas {nada acontece / algo falha}. {Consequência}." |
| 4 — Agravamento | v1-s04.mp3 | "{Custo do problema}. {Alternativa ruim}." |
| 5 — Alívio | v1-s05.mp3 | "Ou... você simplesmente {ação simples com o produto}." |
| 6 — Prova | v1-s06.mp3 | "{Resultado concreto em X segundos/minutos}." |
| 7 — Como funciona | v1-s07.mp3 | "{Feature principal em ação}." |
| 8 — Payoff | v1-s08.mp3 | "{Resultado final quantificado}." |
| 9 — Mic drop | v1-s09.mp3 | "{Afirmação de impacto curta}. {Timeframe impressionante}." |
| 10 — CTA | v1-s10.mp3 | "Acesse grátis em {url}" |
```

**Regras de narração PT-BR:**
- Frases curtas (max 12 palavras por cena de até 3s)
- Tom conversacional, não institucional
- Contrações naturais: "você", "a gente", "pra"
- Evitar jargão técnico até a cena de features

---

### 7. Scene-by-Scene Breakdown

Cada cena deve especificar:

```markdown
### Cena N: {Nome da cena}
- **Frames**: {from}–{to} ({durationInFrames} frames)
- **Content**: {descrição dos elementos visuais com dimensões exatas, cores, textos}
- **Componentes React**: {lista de componentes a criar}
- **Animation**: {spring params, sequência de frames internos, fade out}
```

**Template por tipo de cena:**

#### Cena de Intro (Logo + Tagline)
```
- Logo (80×80px, rounded {X}px) springs de scale 0→1 no frame 2
- Título em {FonteSerif} {N}px no frame 8 (slide up 30px, opacity 0→1)
- Subtítulo em {FonteSans} {N}px, cor muted, no frame 18 (slide up 15px)
- Fade out: últimos 12 frames (opacity→0, scale→0.96)
```

#### Cena de Dor / Pain (UI mockup com badge negativo)
```
- BrowserWindow component (700px wide, URL: {url-fictício})
- Badge vermelho "{N} saídas hoje" no header
- {N} linhas de item staggered entering, cada 10 frames (slide from right 120px)
- Progressivamente desaturam (grayscale filter) nas últimas 20 frames
```

#### Cena de Dado Grande (Número de impacto)
```
- Número em Inter Bold 160px, cor foreground, springs no frame 5
- Label em Inter 24px, cor muted, logo abaixo
- Texto em {FonteSerif} italic {N}px aparece no frame {X} (slide up 15px)
```

#### Cena de Complexidade / Problema (Cards flutuantes)
```
- Header texto + subtítulo muted
- {N} cards (200px, padding 16px 20px, rounded 12px, white, shadow)
- Cada card com dot colorido (8px) + label (15px, 600) + conteúdo único interno
- Linhas SVG dashed conectando os cards (strokeWidth 1.5, dasharray 8)
- Cards entram staggered (scale 0.3→1), linhas faceiam nos frames 50–100
```

#### Cena de Solução (Chat/Input com produto)
```
- Card grande (760px) com logo + nome + badge verde "AI" ou "MCP"
- Typewriter effect: "{prompt do usuário}" (frames 10–50)
- Após frame 52: 3 pontos de loading animados (verde/cinza ciclando)
```

#### Cena de Features/Templates (Lista com checkmarks)
```
- {N} cards em lista vertical (600px), cada um com ✓ verde e título
- Alternando entrada da esquerda (-200px) e direita (+200px), a cada 8 frames
- Badge "{N} itens · 1 prompt" aparece no frame 70
```

#### Cena de Email/UI Preview (Full mockup)
```
- Card (620px, padding 40px 24px) com conteúdo completo do email
- Logo, heading bold, parágrafos, steps numerados em cards cream, botão CTA
- Reveal staggered: cada seção +8 frames (fade + slide up 15px)
```

#### Cena de Automation Flow (Vertical pipeline)
```
- {N} cards conectados por linhas dashed animadas (marching ants)
- Cada card: dot colorido + título bold + 2 skeleton bars (cream)
- Badge "Ao vivo" com dot pulsando (glowing green) no canto top-right
- Bifurcação SVG no final: verde "Sim" e vermelho "Não"
```

#### Cena de Métricas (Números contando)
```
- Headline em {FonteSerif} grande
- 3 cards horizontais: cada um com dot + métrica countUp + sparkline SVG animado
- Avatars sobrepostos (26px, -8px margin, 2px white border) no card de customers
```

#### Cena de Mic Drop (Afirmação + timeframe)
```
- Subtítulo muted 24px weight 500
- Main text em {FonteSerif} 100px weight 400 springs no frame 4 (scale 0.7→1)
- Subtítulo fades in frame 14
```

#### Cena de CTA Final
```
- Logo springs no frame 2
- Texto "{FonteSerif} 64px: "acesse grátis em {url}"
- Underline animado verde sob a URL (cresce de 0% a 100% width, frame 16)
- SEM fade out — segura até o fim
```

---

### 8. Visual Design System

```markdown
## Visual Design System

### Colors
\`\`\`
bg:          {#hex}   (fundo principal — cream, dark, brand)
card:        #ffffff
border:      {#hex}   (borda sutil dos cards)
foreground:  {#hex}   (texto principal)
muted:       {#hex}   (texto secundário)
green:       #16a34a
greenLight:  rgba(22, 163, 74, 0.12)
blue:        #2563eb
blueLight:   rgba(37, 99, 235, 0.10)
orange:      #ea580c
orangeLight: rgba(234, 88, 12, 0.10)
purple:      #7c3aed
purpleLight: rgba(124, 58, 237, 0.10)
red:         #dc2626
redLight:    rgba(220, 38, 38, 0.10)
\`\`\`

### Fonts
- **Body**: {FonteSans} via @remotion/google-fonts — weights 400, 500, 600, 700
- **Headlines**: {FonteSerif} via @remotion/google-fonts — weight 400
- **Mono**: 'SF Mono', 'Fira Code', monospace

### Background
- Cor sólida {bg} com grid pattern (60px, border-color a 60% alpha opacity)
- Blob radial top-right (700px, 25% alpha, blur 40px) — cor brand
- Blob radial bottom-left (700px, 20% alpha, blur 40px) — cor complementar

### Cards
- White bg, border {border} 1px solid, rounded 12–14px
- Shadow: \`0 25px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.04)\`

### BrowserWindow Component
- Dots macOS: red #ff5f57, yellow #ffbd2e, green #28c840
- URL bar em pill cream com border sutil
- Rounded 14px

### Animation Defaults
- **Spring**: damping 10, stiffness 150, mass 0.8, overshootClamping false
- **Fade out**: últimos 12 frames → opacity 0, scale 0.96
- **Stagger**: 8–15 frames entre items
```

---

### 9. Process Steps (Ordem de execução)

```markdown
## Process to Build

1. **Generate audio**: ElevenLabs API com as configurações acima.
   Salvar como `v1-s01.mp3` a `v1-s{N}.mp3` em `public/audio/narration/`.

2. **Measure durations**: `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {arquivo}.mp3`
   Multiplicar por 30 (fps) → frames. Adicionar 5 frames de padding.

3. **Recalcular timings**: Os frames no breakdown acima são estimados.
   Recalcular `from` e `durationInFrames` de cada cena com base no áudio real.

4. **Build scenes**: Seguir o breakdown acima. Toda UI em React, zero screenshots.

5. **Add background music**: `public/audio/background.mp3`, volume 0.12, starts frame 45.

6. **Assets needed**:
   - Logo em `public/images/{cliente}-logo.png` (PNG com transparência)
   - Background music em `public/audio/background.mp3`
```

---

## Checklist de Qualidade do prompt.md

Antes de entregar o prompt.md ao usuário, verificar:

- [ ] Script de narração em PT-BR revisado (sem erros, tom correto)
- [ ] Voice ID especificado (ou fallback gratuito indicado)
- [ ] Frames totais calculados (mesmo que estimados — indicar que serão ajustados após medir áudio)
- [ ] Cores hex extraídas do brand manual (não valores genéricos)
- [ ] Fontes especificadas (disponíveis em @remotion/google-fonts)
- [ ] Cada cena tem dimensões explícitas em px (não "grande", "médio")
- [ ] Logo do cliente referenciado como PNG oficial (nunca gerado por IA)
- [ ] Caminho de output especificado
- [ ] Process steps incluídos com comando ffprobe exato

---

## Exemplo de Cálculo de Frames

```
Cena 1 narração: 3.2s → 3.2 × 30 = 96 frames + 5 padding = 101 frames
Cena 2 narração: 2.8s → 2.8 × 30 = 84 frames + 5 padding = 89 frames
...
Total = soma de todas as cenas
```

**Frame 0** = cena 1 começa
**Frame 101** = cena 2 começa
**Frame 190** = cena 3 começa
... e assim por diante.

---

## Referência de Fontes Disponíveis (@remotion/google-fonts)

Fontes testadas e aprovadas para vídeos AZB:

| Família | Estilo | Uso |
|---------|--------|-----|
| Inter | Sans | Corpo, dados, UI |
| Instrument Serif | Serif | Headlines emocionais |
| Geist | Sans | Tech, SaaS, moderno |
| Playfair Display | Serif | Premium, agro tradicional |
| DM Sans | Sans | Clean, institucional |
| Lora | Serif | Editorial, educacional |