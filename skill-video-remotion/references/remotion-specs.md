# Remotion — Referência Técnica

## Animações Suportadas

### Entradas (Spring — padrão para TUDO)

```js
// Defaults AZB
const spring = interpolate(
  useCurrentFrame(),
  [0, 30],
  [0, 1],
  { extrapolateRight: 'clamp',
    easing: (t) => springEffect(t, { damping: 10, stiffness: 150, mass: 0.8 }) }
)
```

| Animação | Como implementar | Params |
|----------|-----------------|--------|
| `spring_scale` | scale: `spring(frame, fps, { damping:10, stiffness:150 })` | 0→1 ou 0.7→1 |
| `slide_up` | translateY: `interpolate(spring, [0,1], [30, 0])` | 15–30px de offset |
| `slide_right` | translateX: `interpolate(spring, [0,1], [-200, 0])` | entrada pela esquerda |
| `slide_left` | translateX: `interpolate(spring, [0,1], [200, 0])` | entrada pela direita |
| `fade_in` | opacity: `interpolate(frame, [0, 15], [0, 1])` | simples |
| `count_up` | `Math.floor(interpolate(frame, [start, end], [0, valorFinal]))` | contador |
| `typewriter` | `texto.slice(0, Math.floor(interpolate(frame, [0, duracao], [0, texto.length])))` | |
| `marching_ants` | `backgroundPosition: \`${frame * 2}px 0\`` em dashed border | linhas de automação |
| `sparkline_draw` | `strokeDashoffset: interpolate(frame, [0, 30], [totalLength, 0])` | gráfico SVG |
| `underline_grow` | `width: interpolate(frame, [0, 20], [0, 100]) + '%'` | CTA URL |
| `pulse_glow` | `boxShadow` animado com opacity oscilando | dot "ao vivo" |

### Saídas (fade out padrão)
```js
// Sempre nos últimos 12 frames da cena
const fadeOut = interpolate(
  frame,
  [durationInFrames - 12, durationInFrames],
  [1, 0],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
)
const scaleOut = interpolate(
  frame,
  [durationInFrames - 12, durationInFrames],
  [1, 0.96],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
)
```
**Exceção:** Cena de CTA final — sem fade out.

---

## Tipos de Cena

| Tipo | Quando usar | Componente React principal |
|------|------------|---------------------------|
| `intro_logo` | Abertura com logo + tagline | Logo spring + texto |
| `pain_browser` | Problema com UI mockup | `<BrowserWindow>` |
| `dado_grande` | Número de impacto (0, 100%, etc.) | Número 160px bold |
| `agitation_cards` | Complexidade / ferramentas demais | Cards flutuantes + SVG lines |
| `relief_input` | Produto resolvendo com typewriter | Card grande + typewriter |
| `feature_list` | Lista de entregáveis com checkmark | Vertical list staggered |
| `ui_preview` | Preview completo (email, app, page) | Mockup pixel-perfect |
| `automation_flow` | Pipeline / sequência de automação | Vertical flow + marching ants |
| `metrics_payoff` | Resultados quantificados | CountUp + sparklines |
| `mic_drop` | Afirmação de impacto + timeframe | Serif grande + muted sub |
| `cta_final` | Call to action final | Logo + URL + underline |

---

## Resoluções

| Uso | Resolução | Aspecto |
|-----|-----------|---------|
| Product video / Ads landscape | 1920×1080 | 16:9 |
| Stories / Reels / Shorts | 1080×1920 | 9:16 |
| Feed Instagram quadrado | 1080×1080 | 1:1 |
| LinkedIn horizontal | 1920×1080 | 16:9 |

---

## Componentes Reutilizáveis (criar uma vez, usar em múltiplos vídeos)

### BrowserWindow
```tsx
<BrowserWindow url="app.com/dashboard" width={700}>
  {/* conteúdo interno */}
</BrowserWindow>
```
- Dots macOS: #ff5f57, #ffbd2e, #28c840
- URL bar em pill com border sutil
- Rounded 14px, shadow card

### AnimatedCard
```tsx
<AnimatedCard
  startFrame={10}
  delay={0}
  color="blue"   // "blue" | "green" | "orange" | "purple" | "red"
  title="Título"
  content={<SkeletonBars />}
/>
```

### MetricCard
```tsx
<MetricCard
  label="Conversões"
  value={32}
  suffix="%"
  color="green"
  startFrame={20}
/>
```

### DashedConnector
```tsx
<DashedConnector
  from={{ x: 0, y: 0 }}
  to={{ x: 0, y: 80 }}
  startFrame={15}
/>
```

---

## Background Padrão AZB

```css
/* Cream base com grid sutil */
background: #f5f5f0;
backgroundImage: `
  linear-gradient(${borderColor}99 1px, transparent 1px),
  linear-gradient(90deg, ${borderColor}99 1px, transparent 1px)
`;
backgroundSize: '60px 60px';
opacity: 0.6;

/* Blobs */
/* top-right: radial-gradient(ellipse 700px 700px, rgba(255,182,193,0.25), transparent) */
/* bottom-left: radial-gradient(ellipse 700px 700px, rgba(255,218,185,0.20), transparent) */
```

Para backgrounds escuros (clientes tech): substituir cream por `#0a0a0a` ou `#1a1a2e`, blobs com cores brand.

---

## Design Tokens AZB (padrão cream)

```js
const tokens = {
  bg: '#f5f5f0',
  card: '#ffffff',
  border: '#e2e2dc',
  foreground: '#262622',
  muted: '#757568',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.12)',
  blue: '#2563eb',
  blueLight: 'rgba(37,99,235,0.10)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.10)',
  purple: '#7c3aed',
  purpleLight: 'rgba(124,58,237,0.10)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.10)',
}
```

---

## Audio — ElevenLabs

```
Model: eleven_multilingual_v2
Stability: 0.3
Similarity boost: 0.8
Style: 0.8
Speaker boost: true

Vozes PT-BR recomendadas:
- Masculino profissional: TX3LPaxmHKxFdv7VOQHJ
- Feminino (free tier): FGY2WhTYpPnrIDTdsKH5 (Laura)

Endpoint: POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

### Medir duração do áudio gerado
```bash
ffprobe -v error -show_entries format=duration \
  -of default=noprint_wrappers=1:nokey=1 \
  public/audio/narration/v1-s01.mp3
# → ex: 3.254000
# Frames = 3.254 × 30 = 97.62 → 98 + 5 padding = 103 frames
```

---

## Música Background

- Volume: 0.10–0.15 (nunca acima da narração)
- Iniciar no frame 45 (deixar 1.5s de intro em silêncio)
- Fonte gratuita recomendada: Pixabay.com (filtrar por "corporate" ou "ambient")
- Arquivo: `public/audio/background.mp3`

---

## Regras de Produção

- Max 10 cenas por vídeo
- Cada cena: mínimo 2s (60 frames), máximo 8s (240 frames)
- Texto: max 12 palavras por tela em cenas rápidas
- Fonte mínima: 24px (mobile-first para Reels)
- Cores: usar paleta do brand manual (max 3 cores de destaque por cena)
- Logo: sempre como PNG oficial com transparência
- **Nunca usar screenshots** — toda UI é React animado
- **Audio-first:** gerar áudio → medir → calcular frames → codar