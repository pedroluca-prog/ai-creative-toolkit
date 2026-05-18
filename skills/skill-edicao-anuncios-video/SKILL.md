---
name: skill-edicao-anuncios-video
description: "Toolkit de edição de vídeo + motion design para anúncios e conteúdo. Orquestra 4 camadas: (1) método cinematográfico (3 capítulos / shot sequence / sound / music / color), (2) corte inteligente baseado em transcrição (Video-Use), (3) motion overlay programático HTML→MP4 (HyperFrames), (4) finalização ffmpeg (legenda burn-in, logo, formato, fade). Use quando pedir 'editar vídeo', 'cortar vídeo', 'anúncio em vídeo', 'reels editado', 'motion graphics em cima de vídeo real', 'remover fillers', 'colocar legenda', 'converter para reels', 'criativo de ads', 'pacote de anúncios em vídeo'."
---

# Skill Edição de Vídeo & Motion

Pipeline orquestrado em 4 camadas. Cada camada tem ferramenta específica e referência própria. **Esta skill decide qual(is) camada(s) ativar** com base no input bruto e no objetivo do entregável.

---

## Quando Usar vs Skills Irmãs

| Situação | Skill correta |
|----------|---------------|
| Roteiro / storyboard antes de gravar | **skill-roteiro-video** |
| Vídeo 100% animado, sem pessoa real (texto + dados + gráficos) | **skill-video-remotion** |
| Foto / slide estático com texto on-brand | **skill-arte-onbrand** |
| **Vídeo bruto (gravado) → editado, com cortes, motion, música, legenda, formato** | **skill-edicao-anuncios-video** ← você está aqui |

Pode encadear: roteiro-video → gravar → edicao-anuncios-video. Ou: video-remotion (motion puro) → edicao-anuncios-video (composita por cima de filmagem real).

---

## Arquitetura — 4 Camadas

```
LAYER 1 — CRIATIVO (decisão)
   Método cinematográfico: 3 capítulos · shot sequence · sound design · music BPM/drops · color
   → references/metodo-cinematografico.md
       ↓
LAYER 2 — CORTE INTELIGENTE
   Video-Use (browser-use/video-use) — edita por transcrição (ElevenLabs)
   Remove filler words, dead space, fades 30ms, color grading auto, burn-in subtitles
   → references/video-use-integration.md
       ↓
LAYER 3 — MOTION OVERLAY
   HyperFrames (heygen-com/hyperframes) — HTML→MP4 determinístico
   GSAP, Lottie, CSS keyframes; lower-thirds animados, transições, data viz, social overlays
   → references/hyperframes-integration.md
       ↓
LAYER 4 — FINALIZAÇÃO
   ffmpeg direto — burn-in fixo, logo overlay, fade, conversão de formato, compressão
   → references/ffmpeg-templates.md
       ↓
   OUTPUT: pacote multi-formato em Clientes/{cliente}/Conteúdo/{ano-mes}/{formato}/{slug}/_export/
```

**Apoio transversal**:
- `references/sfx-music-library.md` — bibliotecas curadas de SFX e música por gênero/BPM (Layer 1)
- `references/color-grading.md` — LUTs, presets ffmpeg, princípios de luz (Layer 1 + 4)

---

## Pré-requisitos do Ambiente

Antes da primeira execução em uma máquina nova, validar:

```bash
# 1. ffmpeg (todas as camadas precisam)
ffmpeg -version

# 2. yt-dlp (Layer 2, quando o bruto vem de URL)
yt-dlp --version 2>/dev/null || echo "instalar: pip install yt-dlp"

# 3. uv + Python (Layer 2 — Video-Use)
uv --version 2>/dev/null || echo "instalar: curl -LsSf https://astral.sh/uv/install.sh | sh"

# 4. Node ≥ 22 (Layer 3 — HyperFrames)
node --version  # esperado: v22+

# 5. ElevenLabs API key (Layer 2)
test -f ~/.config/elevenlabs/api-key && echo "OK" || echo "criar ~/.config/elevenlabs/api-key (chmod 600)"
```

**Se ffmpeg não instalado** (macOS sem Homebrew): ver `references/ffmpeg-templates.md` §Instalação.

**Se Layer 2 ou 3 não estão prontos:** rodar Layer 1 + Layer 4 (workflow mínimo) e marcar pendência em `aprendizados.md`. Não bloqueia entrega de anúncio simples.

---

## Pré-leitura Obrigatória (toda execução)

1. `brand-manual.{md,html}` — paleta hex, tipografia, padrões visuais (cores entram em Layer 3 e 4)
2. Brief do vídeo: produto, oferta, diferencial, público, dores, gatilhos
3. **Aprendizados** desta skill (`aprendizados.md`) e da skill upstream se houver (skill-roteiro-video)

Sem brand manual lido, **não chame Layer 3 nem Layer 4** — você produzirá motion / lower-third fora da identidade.

---

## Fluxo de Execução

### Passo 0 — Classificar o pedido

| Tipo de pedido | Camadas mínimas |
|---|---|
| "Cortar vídeo cru, tirar erros, adicionar legenda automática" | L1 (briefing curto) → L2 |
| "Reels com motion em cima de filmagem do cliente" | L1 → L2 → L3 → L4 |
| "Criativo de anúncio Meta a partir de bruto longo" | L1 (3 capítulos) → L2 (corte forte) → L3 (lower-third + CTA) → L4 (formatos múltiplos) |
| "Versão vertical/quadrada de vídeo já editado" | L4 apenas |
| "Adicionar logo + fade num vídeo já cortado" | L4 apenas |
| "Vídeo institucional com depoimento" | L1 → L2 → L3 (lower-thirds nome/cargo) → L4 |

Decida no Passo 0 e comunique ao usuário antes de executar. Não pule camadas para "ganhar tempo" se o pedido pede acabamento.

### Passo 1 — Inspecionar bruto e ler método cinematográfico

```bash
# Localizar bruto(s) — convenção: Clientes/{cliente}/Arquivos {cliente}/raw-video/{tema}/
# Inspecionar:
ffprobe -v quiet -print_format json -show_streams "video_bruto.mp4" | python3 -m json.tool
```

Extrair: duração, resolução nativa, fps, codec áudio, número de takes.

**Ler `references/metodo-cinematografico.md`** se for um pedido com produção criativa (não só formato/logo). Define a estrutura em 3 capítulos, regras de shot sequence, escolha de música por BPM/drops, e iluminação.

### Passo 2 — Layer 1: Briefing criativo

Produzir um briefing curto (em arquivo `_brief.md` na pasta do entregável) com:

```markdown
# Brief de Edição — {tema} — {cliente}

## Objetivo do vídeo
{anúncio | conteúdo orgânico | depoimento | demo} — duração-alvo {Xs}

## 3 Capítulos
1. Hook (Xs): {o que entrega}
2. Desenvolvimento (Xs): {core message}
3. CTA / Pay-off (Xs): {ação esperada}

## Shot sequence?
{sim/não — descrever sequência se sim}

## Música
Gênero: {jazz | house | cinematic | ambient — NUNCA lo-fi default}
BPM-alvo: {X}
Cortes prováveis em drops: {sim/não}

## Sound design
SFX a inserir: {whoosh em transição | impact em hook | etc.}

## Color
Look: {cinematic warm | natural | high-contrast | brand-aligned}
LUT base: {nome do LUT em references/color-grading.md ou ffmpeg preset}

## Motion (Layer 3)
Lower-thirds: {nome+cargo, sim/não}
Overlays animados: {logo intro | data viz | CTA animado}

## Legendas (Layer 2)
Estilo: {2-word uppercase chunks default Video-Use | full sentence bottom | custom}

## Output esperado
Formatos: {9:16 reels | 1:1 feed | 16:9 youtube}
Compressão-alvo: < 100 MB para Instagram
```

Esse brief vira o contrato para as 3 camadas seguintes — guarde-o no entregável.

### Passo 3 — Layer 2: Corte inteligente (Video-Use)

**Quando ativar:** vídeo bruto longo, com falhas, fillers, takes múltiplos, ou quando o pedido envolve legenda automática.

**Quando pular:** vídeo já cortado, < 30s, sem fala (puro B-roll), ou ambiente sem ElevenLabs key.

Ler `references/video-use-integration.md` para o comando exato. Síntese:

```bash
# 1. Garantir Video-Use instalado uma vez por máquina:
#    git clone https://github.com/browser-use/video-use ~/tools/video-use
#    cd ~/tools/video-use && uv sync
#    ln -s ~/tools/video-use ~/.claude/skills/video-use   # (Claude Code skill discovery)
#    Configurar .env com ELEVENLABS_API_KEY

# 2. Apontar para a pasta com brutos:
mkdir -p "/tmp/edit-{cliente}-{slug}"
cp "Clientes/{cliente}/Arquivos {cliente}/raw-video/{tema}/"*.mp4 "/tmp/edit-{cliente}-{slug}/"

# 3. Invocar Video-Use via Claude (skill carrega o prompt sistema dele)
#    Em sessão: "use video-use to cut /tmp/edit-{cliente}-{slug}, remove fillers, 
#                add 2-word uppercase subtitles, target 30s, output 1080x1920"
#
#    Video-Use lê transcript ElevenLabs (~12KB) ao invés de frames brutos (45M tokens).
#    Output: /tmp/edit-{cliente}-{slug}/edit/final.mp4
```

**Output Layer 2:** `final-cut.mp4` — vídeo cortado com fades 30ms, color grading básico aplicado, legendas burn-in (se pedido).

Mover para a pasta do entregável: `Clientes/{cliente}/Conteúdo/{ano-mes}/{formato}/{slug}/_intermediate/final-cut.mp4`.

### Passo 4 — Layer 3: Motion overlay (HyperFrames)

**Quando ativar:** lower-third animado, intro/outro com logo, transição 3D, data viz em cima de filmagem, CTA animado, social handle deslizando.

**Quando pular:** vídeo orgânico simples, contexto sem Node 22 instalado.

Ler `references/hyperframes-integration.md` para CLI e padrões. Síntese:

```bash
# 1. Garantir HyperFrames instalado uma vez por máquina:
#    cd ~/tools && npx hyperframes init hyperframes-azb
#    Configurar componentes brand-aligned em hyperframes-azb/components/

# 2. Para cada overlay (lower-third, intro, CTA):
cd ~/tools/hyperframes-azb
# Editar composition.html com brand colors do cliente (vindas do manual-da-marca)
# Preview live:
npx hyperframes preview
# Render para PNG sequence ou MP4 com canal alfa (overlays):
npx hyperframes render --input composition.html --output overlay.mov --transparent

# 3. Compor em cima do final-cut.mp4 com ffmpeg:
ffmpeg -i final-cut.mp4 -i overlay.mov \
  -filter_complex "[0:v][1:v]overlay=enable='between(t,1,5)'[v]" \
  -map "[v]" -map 0:a -c:a copy \
  final-with-motion.mp4
```

**Saída Layer 3:** `final-with-motion.mp4` salvo em `_intermediate/`.

### Passo 5 — Layer 4: Finalização ffmpeg

**Sempre executa** (mesmo que tenha pulado L2 e L3, é o passo de empacotamento).

Ler `references/ffmpeg-templates.md`. Aplicar conforme brief:
- T1 — legenda burn-in fixa (se Video-Use não foi usado e o pedido pede legenda)
- T2 — lower-third programático (se HyperFrames não foi usado e quiser opção barata)
- T3 — logo overlay (sempre, em quase todos os entregáveis — usar PNG oficial do cliente, **nunca via IA**)
- T4 — fade in/out
- Conversão de formato — gerar 1, 2 ou 3 formatos conforme brief
- Compressão final — < 100 MB para Instagram

**Logo:** SEMPRE PNG oficial em `Arquivos {cliente}/*ID*/` — não gerar via IA. Mesma regra da geração de imagens.

### Passo 6 — Color grading (refino opcional)

Ler `references/color-grading.md` se brief pediu look específico. ffmpeg suporta LUTs `.cube` e curves manuais. Exemplo:

```bash
ffmpeg -i input.mp4 -vf "lut3d=teal-orange.cube" -c:a copy graded.mp4
```

### Passo 7 — Sound design (apoio Layer 1)

Se o brief listou SFX, sobrepor com ffmpeg amix:

```bash
ffmpeg -i input.mp4 -i whoosh.wav -filter_complex \
  "[1:a]adelay=2000|2000[a1];[0:a][a1]amix=inputs=2:duration=first[aout]" \
  -map 0:v -map "[aout]" output.mp4
```

Lista de SFX e música em `references/sfx-music-library.md`.

### Passo 8 — Verificar e salvar

```bash
# Conferir output final:
ffprobe -v quiet -show_format "final.mp4" | grep duration
ls -lh final.mp4   # esperado: < 100 MB para Instagram, < 500 MB para YouTube
```

Estrutura final do entregável:

```
Clientes/{cliente}/Conteúdo/{ano-mes}/{formato}/{slug}/
├── _brief.md                 ← Layer 1
├── _intermediate/
│   ├── final-cut.mp4         ← Layer 2 output
│   ├── overlay.mov           ← Layer 3 output (alpha)
│   └── final-with-motion.mp4
└── _export/
    ├── final-9x16.mp4        ← Reels/Stories
    ├── final-1x1.mp4         ← Feed
    └── final-16x9.mp4        ← YouTube/LinkedIn (se aplicável)
```

### Passo 9 — Registrar aprendizados

1. Registrar tempo total em `aprendizados.md`.
2. Se um pattern criativo funcionou (música, look, shot sequence) → registrar como Padrão #N para reuso.

---

## Templates de Output Multi-formato

| Formato | Dimensões | Uso | Crop strategy |
|---|---|---|---|
| Reels / Stories | 9:16 (1080×1920) | Instagram Reels, Stories, TikTok | crop centralizado se origem 16:9 |
| Feed quadrado | 1:1 (1080×1080) | Instagram feed | crop centralizado |
| YouTube / LinkedIn | 16:9 (1920×1080) | YouTube, LinkedIn, site | letterbox / pad se origem vertical |

Ver `references/ffmpeg-templates.md` §Conversão de Formato.

---

## Estimativa de Custo (calibrar no primeiro run real)

| Pipeline | Tempo wall-clock | Tokens estimados |
|---|---|---|
| L4 só (logo + fade + 1 formato) | 2-5 min | 3-8k |
| L1 + L4 (brief manual + ffmpeg) | 10-15 min | 10-20k |
| L1 + L2 + L4 (brief + Video-Use + ffmpeg) | 15-30 min | 15-30k |
| Pipeline completo L1→L4 | 30-60 min | 30-60k |
| Pacote 3 formatos completo | 45-90 min | 50-100k |

**Critério go/no-go**: se passar de 100k tokens ou 90 min em vídeo único, parar e revisar com Pedro — possivelmente quebrar em duas sessões ou terceirizar.

---

## Limitações (o que esta skill NÃO faz)

- ❌ Lip sync IA (não há ferramenta open-source de qualidade no toolkit; se cliente pedir, terceirizar)
- ❌ Geração de pessoa falando do zero (HeyGen / Synthesia — não disponíveis no toolkit)
- ❌ Captura de tela / gravação web (avaliar Video-Use upstream do `browser-use` se necessário)
- ❌ Edição multi-track avançada com timeline visual (DaVinci/Premiere — não substitui)
- ✅ Cobre: corte inteligente por transcrição, motion programático, legendas, lower-thirds, color grading básico, formato múltiplo, sound design simples

Para o que NÃO está coberto, pedir terceirização e registrar em `aprendizados.md`.

---

## Regras Críticas

1. **Backup do bruto sempre** — copiar para `_intermediate/raw/` antes de tocar; nunca editar in-place.
2. **Logo via PNG oficial** — Layer 3 e 4 usam SVG/PNG real do cliente; nunca via diffusion model (Nano Banana / gpt-image-1 alucinam logos).
3. **Brand manual lido antes de Layer 3** — cores hex e tipografia do HyperFrames vêm dele.
4. **Brief escrito antes de cortar** — `_brief.md` é o contrato; sem ele, retrabalho garantido.
5. **Documentar tempo + tokens** por entregável até estabilizar — toolkit ainda em maturação.
6. **3 capítulos como default** — toda peça com mais de 15s segue Hook → Dev → CTA. Forçar disciplina criativa.
7. **Não pular Layer 1** — mesmo em pedidos "rápidos", briefar 3 linhas. Custa 30s, evita 30 min de retrabalho.

---

## Aprendizados

Ler `aprendizados.md` antes de iniciar. Após executar, **registrar**:
- Padrão criativo que funcionou (música, look, shot sequence)
- Erro de pipeline (camada que falhou e por quê)
- Tempo / tokens consumidos vs estimativa

---

## Referências

| Arquivo | Quando ler |
|---|---|
| `references/metodo-cinematografico.md` | **Passo 1-2** — sempre que tiver decisão criativa (3 capítulos, shot seq, música, color) |
| `references/video-use-integration.md` | **Passo 3** — antes de invocar Layer 2 |
| `references/hyperframes-integration.md` | **Passo 4** — antes de invocar Layer 3 |
| `references/ffmpeg-templates.md` | **Passo 5** — comandos de finalização |
| `references/sfx-music-library.md` | **Passo 7** — escolha de música/SFX |
| `references/color-grading.md` | **Passo 6** — look e LUTs |

---

## Modelo recomendado

**Sonnet 4.6 medium** (skill é execução estruturada — template + dados, não núcleo criativo). Promover a **Opus high** apenas no Passo 1 (brief criativo) quando o entregável for hero/lançamento. Layer 2-4 são orquestração de ferramentas externas — Sonnet basta. Conferir Regra #11 do CLAUDE.md raiz.
