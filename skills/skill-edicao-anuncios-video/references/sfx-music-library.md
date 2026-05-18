# Biblioteca de SFX e Música — Apoio Layer 1

> Curadoria de fontes e princípios para sound design e música. Não é exaustivo — é o starter pack AZB.

---

## Princípios de mixagem (referência)

| Track | Nível alvo (dB) | Notas |
|---|---|---|
| Voz principal | -6 dB pico, -16 LUFS short-term | Sempre o "rei"; tudo abaixo |
| Música | -15 a -18 dB sob a voz | Aumenta -8 dB nos momentos sem fala |
| SFX (whoosh, impact) | -8 a -12 dB | Pico em 1 frame; sub-bass em impacts |
| Ambient | -25 dB | Cobre falhas; contínuo |

ffmpeg `loudnorm` ajusta automaticamente:

```bash
ffmpeg -i input.mp4 -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:v copy normalized.mp4
```

---

## SFX — Fontes recomendadas

| Fonte | Tipo | Custo | Notas |
|---|---|---|---|
| **freesound.org** | Banco aberto | Free (CC) | Buscar por tag "whoosh", "impact"; conferir licença |
| **soundsnap.com** | Banco premium | $/mês | Qualidade alta; busca por categoria |
| **zapsplat.com** | Banco premium | Free com login | Bom catálogo de UI bleeps |
| **YouTube Audio Library** | Banco aberto | Free | Limitado em SFX, bom em música; license-safe |
| **Adobe Audition Soundbank** | Banco premium | Bundle CC | Excelente; vem com Creative Cloud |

### Lista mínima a manter no banco AZB

Estrutura sugerida:
```
AZB - Operações Internas/assets-shared/sfx/
├── whoosh/
│   ├── whoosh-soft.wav
│   ├── whoosh-hard.wav
│   └── whoosh-cinematic.wav
├── impact/
│   ├── impact-deep-boom.wav
│   ├── impact-snare-hit.wav
│   └── impact-sub-bass.wav
├── ui/
│   ├── click-soft.wav
│   ├── click-pop.wav
│   └── beep-confirm.wav
├── ambient/
│   ├── room-tone-quiet.wav
│   └── outdoor-rural-tone.wav
└── transitions/
    ├── glitch-short.wav
    └── tape-stop.wav
```

Subir os 10-15 SFX mais usados para a pasta compartilhada — copiar para o entregável quando usar.

### Aplicação típica (ffmpeg)

```bash
# Whoosh em transição no segundo 3:
ffmpeg -i video.mp4 -i whoosh.wav -filter_complex \
  "[1:a]adelay=3000|3000,volume=0.6[s1];[0:a][s1]amix=inputs=2:duration=first[a]" \
  -map 0:v -map "[a]" -c:v copy output.mp4

# Impact em hook (segundo 0):
ffmpeg -i video.mp4 -i impact.wav -filter_complex \
  "[1:a]volume=0.8[s1];[0:a][s1]amix=inputs=2:duration=first[a]" \
  -map 0:v -map "[a]" -c:v copy output.mp4
```

---

## Música — Fontes recomendadas

| Fonte | Tipo | Custo | Notas |
|---|---|---|---|
| **Epidemic Sound** | Royalty-free curado | $/mês ($15-25) | **Recomendado AZB** — qualidade hi, BPM tagueado, license-safe |
| **Artlist** | Royalty-free curado | $/ano ($199) | Catálogo cinematográfico forte |
| **Musicbed** | Royalty-free curado | $/projeto | Premium, depoimentos institucionais |
| **YouTube Audio Library** | Banco aberto | Free | Bom catálogo, mas comum demais |
| **Storyblocks** | Bundle (música + footage) | $/mês | Bundle interessante para agência |
| **Uppbeat** | Royalty-free | Free + Pro | Catálogo limitado free, qualidade média |

**Default AZB:** Epidemic Sound (premium) ou YouTube Audio Library (free fallback).

### Tags de busca úteis

Para o setor agro AZB:

| Tipo de vídeo | Tags Epidemic / busca |
|---|---|
| **Hero Xiru / Equus / lançamento** | "cinematic", "uplifting", "documentary", "inspiring", BPM 80-100 |
| **Reels rápido informativo** | "house", "electro chill", "energetic", BPM 110-130 |
| **Depoimento técnico** | "ambient", "corporate uplift", "soft piano", BPM 70-90 |
| **Demo de campo / drone** | "epic", "cinematic", "orchestral", BPM 80-110 |
| **Conteúdo país-rural** | "country acoustic", "modern folk", BPM 100-120 (evitar bluegrass tradicional sem ironia) |

### Identificar drops e BPM

Para sincronizar cortes com a música:

```bash
# Detectar BPM via ffmpeg + python (aubio):
pip install aubio
aubio tempo musica.mp3
# Output: BPM
```

Para drops, ouvir manual e marcar timestamps no `_brief.md`:
```
Música: "Title Track" — BPM 95
Drops em: 0:00 (start), 0:08 (build-up), 0:15 (drop principal — alinhar com hook), 0:32 (segundo drop — alinhar com CTA)
```

---

## Trilhas reaproveitáveis por cliente

Manter em `Clientes/{cliente}/Conteúdo/_assets-audio/`:
- 3-5 trilhas aprovadas pelo cliente (consistência sonora ao longo do tempo)
- Versão master + versões trimadas (15s, 30s, 60s)
- BPM e drops anotados em `_assets-audio/README.md`

Reusar a mesma família de trilhas constrói **identidade sonora** — o seguidor reconhece "isso é da Xiru" mesmo sem ver a marca.

---

## Anti-padrões

- ❌ Música mais alta que voz — mata copy, ninguém entende o pitch
- ❌ Lo-fi default — antiquado e sobreusado (transcrição original do método)
- ❌ Música com letra em inglês competindo com voz em PT-BR — confunde
- ❌ Trocar música em cada peça — perde identidade sonora ao longo do mês
- ❌ SFX em cada corte — fica cansativo; reservar para transições marcadas e momentos-âncora
- ❌ Música sem fade out — acaba abrupto; sempre trim com fade -af "afade=t=out:st=...:d=0.5"

---

## Checklist sound design

- [ ] Música escolhida ANTES de cortar (define ritmo)
- [ ] BPM e drops anotados no `_brief.md`
- [ ] Cortes alinhados com batidas/drops
- [ ] Voz em -6 dB pico, música 12 dB abaixo
- [ ] SFX nos momentos-âncora (hook, transições marcadas, CTA)
- [ ] `loudnorm` aplicado no master final
- [ ] Trilha salva em `_assets-audio/` se for reaproveitável