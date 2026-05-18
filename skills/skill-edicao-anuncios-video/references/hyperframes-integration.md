# HyperFrames — Integração Layer 3 (Motion Overlay)

> Repo: https://github.com/heygen-com/hyperframes · Licença: Apache 2.0 (uso comercial livre, sem fee per render) · Stack: Node ≥ 22 + ffmpeg
> Carregado quando o pipeline ativa Layer 3: motion design programático para sobrepor em filmagem real (lower-thirds animados, intros/outros, transições, data viz, social overlays animados, CTA animado).

---

## O que HyperFrames faz

Renderiza **HTML → MP4 determinístico**. Você descreve a animação em HTML+CSS (e qualquer biblioteca animation que rode em browser), e a CLI gera frame-accurate MP4.

**Frame Adapter pattern** — escolha o motor:

| Adapter | Quando usar |
|---|---|
| **GSAP** | Animação de timeline complexa, easing fino, master-timeline |
| **Lottie** | Animação ilustrada (After Effects → JSON), branding storytelling |
| **CSS keyframes** | Animação simples (fade, slide, scale, rotate) — mais barato |
| **Three.js** | Cenas 3D, transições com câmera, parallax avançado |
| **WAAPI** | Animação programática direta no DOM, performance |
| **Anime.js** | Lightweight alternative à GSAP |

**Saída deterministic**: mesma input → mesmo MP4 frame por frame. Crítico para regression de marca.

---

## O que vem pronto (50+ componentes)

A lib traz prontos:
- Transitions (fade, slide, glitch, wipe, blur)
- Social overlays (handle, like, comment, follower count)
- Data viz (bar chart, line chart, pie, counter)
- Title cards
- Lower-thirds
- Subtítulos animados
- Backgrounds (gradients, patterns, particles)

A AZB customiza o subset relevante via brand manual de cada cliente.

---

## Instalação (uma vez por máquina)

```bash
# Pré-requisitos
node --version       # esperado v22+
ffmpeg -version

# Setup do scaffold AZB (compartilhado entre clientes)
cd ~/tools
npx hyperframes init hyperframes-azb
cd hyperframes-azb
npm install

# Estrutura criada:
# ├── compositions/      # cada arquivo HTML é uma composition
# ├── components/        # componentes reutilizáveis (lower-third, intro, etc.)
# ├── assets/            # fontes, logos, imagens
# └── package.json
```

**Validar:**
```bash
cd ~/tools/hyperframes-azb
npx hyperframes preview --port 4747   # abre browser preview
# Editar compositions/test.html — recarrega ao vivo
```

---

## Setup AZB compartilhado (uma vez)

Cada cliente vai ter um diretório de componentes brand-aligned. Manter em `~/tools/hyperframes-azb/components/{cliente}/`:

```
components/
├── xiru-mudas/
│   ├── lower-third.html       # nome + cargo, cores Xiru
│   ├── intro.html             # logo Xiru animado
│   ├── outro-cta.html         # "@xirumudas + link" animado
│   └── data-viz-counter.html  # contador animado (ex: "+150 fazendas")
├── equus/
│   └── ...
└── _shared/
    ├── transitions/
    └── overlays/
```

Cada componente lê **paleta + tipografia** do brand manual via `data-*` attributes:

```html
<!-- exemplo lower-third Xiru -->
<div class="lower-third"
     data-primary="#2E7D32"
     data-secondary="#FFA726"
     data-font="Inter">
  <h2 data-name>{{NAME}}</h2>
  <p data-role>{{ROLE}}</p>
</div>
```

Substitua `{{NAME}}` e `{{ROLE}}` no momento do render.

---

## Como invocar dentro do pipeline AZB

### Caso 1 — Lower-third para depoimento

```bash
cd ~/tools/hyperframes-azb

# Editar compositions/lower-third-instance.html clonando do component:
cp components/xiru-mudas/lower-third.html compositions/lower-third-instance.html

# Substituir placeholders ({{NAME}}, {{ROLE}}, duração 5s):
# Na prática, faça via sed ou edite em editor — o HTML deve ter:
#   data-duration="5"
#   data-fps="30"
#   <h2>Glauco Xiru</h2>
#   <p>Fundador, Xiru Mudas</p>

# Render para MP4 com canal alfa (overlay):
npx hyperframes render \
  --input compositions/lower-third-instance.html \
  --output /tmp/lower-third.mov \
  --transparent \
  --duration 5 \
  --fps 30 \
  --resolution 1080x1920

# Compor no vídeo principal com ffmpeg:
ffmpeg -i final-cut.mp4 -i /tmp/lower-third.mov \
  -filter_complex "[0:v][1:v]overlay=enable='between(t,2,7)'[v]" \
  -map "[v]" -map 0:a -c:a copy \
  final-with-lower-third.mp4
```

### Caso 2 — Intro animada com logo

```bash
# Render intro de 2s com logo + tagline animada:
npx hyperframes render \
  --input compositions/intro-xiru.html \
  --output /tmp/intro.mp4 \
  --duration 2 \
  --resolution 1080x1920

# Concat com vídeo principal:
ffmpeg -i /tmp/intro.mp4 -i final-cut.mp4 \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" \
  final-with-intro.mp4
```

### Caso 3 — CTA animado no fim

```bash
# Render CTA de 3s ("Saiba mais → @xirumudas") com slide-in:
npx hyperframes render \
  --input compositions/cta-xiru.html \
  --output /tmp/cta.mov --transparent --duration 3 --resolution 1080x1920

# Compor nos últimos 3s:
DUR=$(ffprobe -v quiet -show_format final-cut.mp4 | grep duration | cut -d= -f2 | cut -d. -f1)
START=$((DUR - 3))

ffmpeg -i final-cut.mp4 -i /tmp/cta.mov \
  -filter_complex "[0:v][1:v]overlay=enable='gte(t,${START})'[v]" \
  -map "[v]" -map 0:a -c:a copy \
  final-with-cta.mp4
```

### Caso 4 — Data viz counter

```bash
# "+150 fazendas atendidas" subindo de 0 a 150 em 2s:
npx hyperframes render \
  --input compositions/counter-xiru.html \
  --output /tmp/counter.mov --transparent --duration 2 --resolution 1080x1920
# (counter.html usa GSAP timeline para count_up)
```

---

## Padrão de composition AZB

Template mínimo `compositions/{component}.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <style>
    body { margin: 0; padding: 0; background: transparent; font-family: 'Inter', sans-serif; }
    .lower-third {
      position: absolute; bottom: 100px; left: 60px;
      background: var(--primary); color: white;
      padding: 16px 24px; border-radius: 8px;
    }
    .lower-third h2 { font-size: 36px; margin: 0 0 6px; }
    .lower-third p  { font-size: 22px; margin: 0; opacity: 0.85; }
  </style>
</head>
<body data-duration="5" data-fps="30" data-resolution="1080x1920" style="--primary: #2E7D32;">
  <div class="lower-third">
    <h2 id="name">Glauco Xiru</h2>
    <p id="role">Fundador, Xiru Mudas</p>
  </div>

  <script>
    // GSAP timeline frame-accurate
    const tl = gsap.timeline({ paused: true });
    tl.from(".lower-third", { x: -300, opacity: 0, duration: 0.4, ease: "power2.out" })
      .to(".lower-third", { opacity: 1, duration: 4 })
      .to(".lower-third", { x: -300, opacity: 0, duration: 0.4, ease: "power2.in" });

    // HyperFrames runtime hook — chama tl.seek(time) por frame
    window.__HF_TIMELINE__ = tl;
  </script>
</body>
</html>
```

---

## Quando NÃO usar Layer 3

- Vídeo orgânico simples sem necessidade de overlay (Layer 2 + Layer 4 bastam)
- Ambiente sem Node 22 instalado — fallback Layer 4 (T2 lower-third via ffmpeg drawtext, mais limitado)
- Animação ultra-simples (1 fade) — `ffmpeg drawtext + enable='between(t,...)'` resolve em 1 linha sem HyperFrames

---

## Vantagem vs Remotion (skill-video-remotion)

| Critério | HyperFrames | Remotion |
|---|---|---|
| Stack | HTML+CSS+JS puro | React/TSX |
| Curva de aprendizado | Menor (qualquer dev/IA) | Maior (precisa React) |
| Determinismo | Forte | Forte |
| Componentes prontos | 50+ na lib | Ecossistema maior |
| Skill AZB compatível | Esta (Layer 3) | skill-video-remotion |
| Caso típico | Overlays sobre filmagem | Vídeo 100% animado sem pessoa |

**Regra:** vídeo com pessoa real + overlays → HyperFrames. Vídeo 100% animado sem pessoa → Remotion (skill irmã).

---

## Checklist Layer 3

- [ ] Node ≥ 22 instalado
- [ ] `~/tools/hyperframes-azb` setado
- [ ] Componente do cliente criado em `components/{cliente}/` (lower-third, intro, outro, etc.)
- [ ] Brand manual lido (cores hex, fonte definida)
- [ ] Composição renderizada com `--transparent` (alpha) para overlay
- [ ] ffmpeg overlay aplicado com `enable='between(t,...)'` no momento certo
- [ ] Output salvo em `_intermediate/final-with-motion.mp4`
- [ ] Componente reutilizável salvo no scaffold para próximos vídeos do mesmo cliente