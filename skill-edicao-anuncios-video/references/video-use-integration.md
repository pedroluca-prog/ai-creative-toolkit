# Video-Use — Integração Layer 2 (Corte Inteligente)

> Repo: https://github.com/browser-use/video-use · Licença: open-source · Stack: ffmpeg + yt-dlp + ElevenLabs API + Python (uv)
> Carregado quando o pipeline ativa Layer 2: corte automático de bruto longo, remoção de filler words / dead space, legendas burn-in inteligentes, color grading auto, fades 30ms.

---

## Por que Video-Use existe

Vídeo bruto tem ~45M tokens se você tentar passar frames brutos para um LLM. Isso é inviável.

Video-Use resolve com 2 layers:

1. **Transcrição via ElevenLabs** com timestamps por palavra (~12 KB para um vídeo de 10 min) — o agente lê texto, não pixels.
2. **Composites visuais opcionais** gerados só quando o agente precisa "olhar" um corte específico.

Resultado: o agente edita por linguagem natural com precisão de palavra, e o token cost cai 3000×.

Filosofia idêntica ao browser-use original (DOM estruturado em vez de screenshot).

---

## O que Video-Use faz por você

| Capacidade | Detalhe |
|---|---|
| **Remove filler words** | "umm", "uh", "tipo assim", "né" — configurável por idioma |
| **Remove dead space** | Pausas longas entre takes (default > 1.5s) |
| **Audio fades** | 30ms cross-fade em cada cut para evitar pop |
| **Color grading auto** | Aplica gradação consistente por segmento |
| **Burn-in subtitles** | Default: 2 palavras maiúsculas em chunks (estilo MrBeast / Alex Hormozi); customizável |
| **Animation overlays** | Integra HyperFrames, Remotion, Manim, PIL para gráficos |
| **Self-evaluation** | Renderiza preview e avalia cuts; refina automaticamente |
| **Session memory** | Persiste estado em arquivos do projeto — multi-sessão |

---

## Instalação (uma vez por máquina)

```bash
# 1. Pré-requisitos
ffmpeg -version              # obrigatório
yt-dlp --version             # opcional (URLs)
uv --version                 # gerenciador Python rápido — instalar se faltar:
# curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Clonar e setup
mkdir -p ~/tools && cd ~/tools
git clone https://github.com/browser-use/video-use
cd video-use
uv sync

# 3. ElevenLabs API key
mkdir -p ~/.config/elevenlabs
echo "YOUR_KEY_AQUI" > ~/.config/elevenlabs/api-key
chmod 600 ~/.config/elevenlabs/api-key

# 4. .env do video-use (se exigido pelo repo)
cp .env.example .env
# Editar .env e setar ELEVENLABS_API_KEY

# 5. Linkar como skill do Claude Code (skill discovery)
mkdir -p ~/.claude/skills
ln -s ~/tools/video-use ~/.claude/skills/video-use
# Reabrir Claude Code para detectar
```

**Validar:**
```bash
ls ~/.claude/skills/video-use/SKILL.md   # se existe, skill foi reconhecida
```

---

## Como invocar dentro do pipeline AZB

Video-Use é uma **skill externa** que Claude Code carrega quando você instrui em linguagem natural. **Esta skill (skill-edicao-anuncios-video) chama Video-Use, não substitui.**

### Padrão de invocação

```
1. Preparar pasta de trabalho:
   mkdir -p /tmp/edit-{cliente}-{slug}
   cp "Clientes/{cliente}/Arquivos {cliente}/raw-video/{tema}/"*.mp4 \
      /tmp/edit-{cliente}-{slug}/

2. Em uma sessão Claude Code, pedir explicitamente:
   "Use video-use para editar /tmp/edit-{cliente}-{slug}.
    Objetivo: {ex: anúncio Reels 30s para Xiru Mudas}.
    - remover filler words em PT-BR
    - remover dead space > 1s
    - target duration: 30s
    - subtitles: 2-word uppercase chunks, fonte Inter Bold, cor #FFFFFF, stroke #000000
    - output: 1080x1920 (9:16)
    - color grading: cinematic warm leve"

3. Video-Use vai:
   - Transcrever com ElevenLabs
   - Propor um corte (mostra plano-de-corte em texto)
   - Você (Claude principal) revisa e aprova
   - Renderiza /tmp/edit-{cliente}-{slug}/edit/final.mp4

4. Mover output para o entregável:
   mv /tmp/edit-{cliente}-{slug}/edit/final.mp4 \
      "Clientes/{cliente}/Conteúdo/{ano-mes}/{formato}/{slug}/_intermediate/final-cut.mp4"
```

### Parâmetros típicos AZB

| Parâmetro | Default AZB | Override quando |
|---|---|---|
| Idioma transcrição | `pt-BR` | Vídeo em inglês raro |
| Filler words | `["umm", "uh", "tipo", "né", "então assim", "aí"]` | Cliente específico tem vícios diferentes |
| Dead space threshold | `1.5s` | Depoimento emocional → 2.5s; demo rápido → 0.8s |
| Subtitle style | `2-word uppercase, Inter Bold, white + black stroke` | Brand manual define alternativa |
| Color grading auto | `cinematic_warm_subtle` | Brand pede look específico |
| Audio fade | `30ms` | Default suficiente em quase todos os casos |

---

## Output esperado

```
/tmp/edit-{cliente}-{slug}/
├── (vídeos brutos copiados)
└── edit/
    ├── final.mp4              ← output principal
    ├── transcript.json        ← timestamps por palavra
    ├── cut-plan.md            ← plano de cortes em texto (audit trail)
    └── memory.json            ← state para continuação multi-sessão
```

**Sempre preservar `cut-plan.md`** — é o audit trail. Mover para `_intermediate/` junto com o final.mp4.

---

## Custos esperados

| Item | Custo |
|---|---|
| ElevenLabs Scribe (transcrição) | ~$0.40 por hora de áudio (preço varia conforme plano) |
| Tokens LLM (Claude editando) | 15-30k típico para vídeo 5-10 min |
| ffmpeg render | local, zero custo direto, ~1-3min de CPU |

Cliente AZB: **~R$ 5-15 por vídeo curto editado** (transcrição + tokens), versus R$ 200-500 de edição terceirizada simples.

---

## Quando NÃO usar Layer 2

- Vídeo já cortado (passe direto para Layer 3 ou 4)
- < 15s sem fala (puro B-roll → Layer 4 só)
- Sem ElevenLabs key configurada (fallback: Layer 4 manual com legenda fixa via T1 do ffmpeg-templates)
- Vídeo ultra-curto (< 30s) com 1 take só, sem erros — não justifica overhead

---

## Erros comuns e correções

| Sintoma | Causa | Correção |
|---|---|---|
| Transcrição vazia ou ruim | Áudio com música alta + voz baixa | Pré-processar áudio com ffmpeg `loudnorm` ou separar voz com Demucs |
| Cortes "tropeçados" | Threshold de dead space muito agressivo | Subir para 2.0s ou 2.5s |
| Legendas off-screen em 9:16 | Padding default é para 16:9 | Setar `subtitle_y_position=0.78` (78% da altura) |
| Filler word importante removido (ex: "uh" intencional do depoimento) | Lista padrão muito ampla | Customizar lista por cliente |
| Acentos PT-BR errados na legenda | Fonte sem suporte UTF-8 | Forçar Inter, Roboto ou DM Sans (todas suportam) |
| Output em 30fps quando bruto era 24fps | Default Video-Use | Setar `fps: 'source'` ou `fps: 24` |

---

## Integração com camadas seguintes

Video-Use já produz um vídeo "quase final". O que ainda passa pelas camadas seguintes:

| O que pode ainda fazer | Onde |
|---|---|
| Lower-third animado (nome+cargo) | Layer 3 (HyperFrames) ou Layer 4 (T2 ffmpeg) |
| Logo overlay corner | Layer 4 (T3) |
| Múltiplos formatos a partir do `final.mp4` | Layer 4 (Conversão de Formato) |
| Sound design extra (SFX em transições) | Layer 4 (amix) |
| Color grading hardcore (LUT custom) | Layer 4 (`lut3d`) |

---

## Checklist Layer 2

- [ ] ffmpeg + yt-dlp + uv instalados
- [ ] ElevenLabs key em `~/.config/elevenlabs/api-key`
- [ ] Video-Use clonado em `~/tools/video-use` e linkado em `~/.claude/skills/video-use`
- [ ] Pasta de trabalho em `/tmp/edit-{cliente}-{slug}/` com brutos
- [ ] Brief Layer 1 (`_brief.md`) lido — define duração-alvo, look, legendas
- [ ] Invocação clara em PT-BR com parâmetros explícitos
- [ ] Output movido para `_intermediate/final-cut.mp4`
- [ ] `cut-plan.md` preservado em `_intermediate/`