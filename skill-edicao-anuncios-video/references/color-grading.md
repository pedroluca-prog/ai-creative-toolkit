# Color Grading — Apoio Layer 1 + Layer 4

> Princípios de iluminação na captura + LUTs e técnicas ffmpeg para grade. "Color grading comunica toda a estética." (transcrição método cinematográfico)

---

## Hierarquia da imagem

A imagem é construída em 3 etapas, **nessa ordem**:

1. **Iluminação no set** (captura) — mais luz = mais informação para editar
2. **LUT base** (1 clique, 80% do look)
3. **Refino manual** (curves, saturação, vinheta — 20% restantes)

Pular etapa 1 e tentar resolver em LUT é o erro mais comum.

---

## 1. Iluminação no set (captura)

### Regras de ouro

| Princípio | Aplicação prática agro |
|---|---|
| **Luz suave grande > luz dura pequena** | Use difusor; em ambiente externo, prefira meia-sombra ou hora dourada |
| **3-point lighting básico** | Key (frontal) + fill (preencher sombras) + backlight (separação fundo) |
| **Luzes práticas no enquadramento** | Lanterna no curral à noite; luz da janela do escritório; postes de fazenda; faróis |
| **Hora dourada** | 1h antes do pôr-do-sol, 1h depois do nascer — luz quente lateral, gratuita |
| **Fundo desfocado** | Aumenta profundidade percebida; lente abertura larga ou drone com compressão de plano |
| **Objetos coloridos no quadro** | Camisa do produtor, equipamento amarelo, sal mineral azul — pontos de fuga visual |

### Erros típicos no campo agro

- ☀️ Sol de meio-dia direto na cara → sombras duras, olhos escuros. Mover para sombra ou usar refletor branco
- 🌤️ Vento batendo no microfone → grava direto, áudio inutilizado. Wind shield obrigatório
- 🏚️ Galpão escuro com luz fluorescente → cor verde-doente. Adicionar LED 5600K à frente
- 🐄 Gado se movimentando + câmera tremendo → estabilizador (gimbal) ou tripé com cabeça fluida

---

## 2. Looks-base AZB e LUTs

| Look | Quando usar | LUT base | Notas |
|---|---|---|---|
| **Cinematic warm** | Hero, depoimento emocional, lançamento (Equus, Xiru hero) | `teal-orange-light.cube` | Skin tone alaranjado, sombras turquesa |
| **Natural / clean** | Conteúdo técnico, Escola Pecuária educacional | `rec709-natural.cube` | Look documental, sem distorção |
| **High contrast brand** | Anúncio Meta, hook forte | `contrast-pop.cube` | Saturação +15%, contraste +20%, vinheta sutil |
| **Pasto verde rico** | Conteúdo Xiru de campo, drone aéreo de fazenda | `green-boost.cube` | HSL: green +15 saturação, blue +8 (céu) |
| **Premium cinza-azulado** | Equus institucional, clínica veterinária | `cool-cinematic.cube` | Sombras azuladas, luminância controlada |

### Onde guardar LUTs

```
AZB - Operações Internas/assets-shared/luts/
├── teal-orange-light.cube
├── rec709-natural.cube
├── contrast-pop.cube
├── green-boost.cube
└── cool-cinematic.cube
```

Buscar / criar via: free-luts.com, lutify.me, RocketStock free pack, ou criar via DaVinci Resolve (free) e exportar `.cube`.

---

## 3. Aplicação via ffmpeg

### LUT 3D (estilo "1 clique")

```bash
# Aplicar LUT cube em vídeo:
ffmpeg -i input.mp4 -vf "lut3d=teal-orange-light.cube" -c:a copy graded.mp4
```

### Combinar LUT + saturação + contraste

```bash
ffmpeg -i input.mp4 \
  -vf "lut3d=teal-orange-light.cube,eq=contrast=1.1:saturation=1.1:gamma=1.0" \
  -c:a copy \
  graded.mp4
```

Parâmetros do `eq`:
- `contrast`: 1.0 = neutro, 1.1 = sutil bump, 1.3 = forte
- `saturation`: 1.0 = neutro, 1.1 = sutil bump, 1.5 = punchy ad
- `gamma`: 1.0 = neutro, 0.9 = sombras mais escuras, 1.1 = sombras mais claras

### Vinheta sutil (foco no centro)

```bash
ffmpeg -i input.mp4 \
  -vf "vignette=PI/4" \
  -c:a copy \
  vignetted.mp4
```

### Curves manual (sombras / médios / luzes)

```bash
# Levantar sombras + bumpear médios:
ffmpeg -i input.mp4 \
  -vf "curves=master='0/0 0.25/0.18 0.5/0.55 0.75/0.82 1/1'" \
  -c:a copy \
  curved.mp4
```

### Pipeline completo (LUT + eq + vinheta)

```bash
ffmpeg -i input.mp4 \
  -vf "lut3d=teal-orange-light.cube,eq=contrast=1.08:saturation=1.12,vignette=PI/5" \
  -c:a copy \
  -c:v libx264 -crf 20 -preset slow \
  graded-final.mp4
```

---

## 4. Padrões por cliente AZB

### Xiru Mudas

| Contexto | Look |
|---|---|
| Glauco no campo (depoimento) | `teal-orange-light` + saturação 1.1 + curves leve para skin tone |
| Drone de pasto Tifton | `green-boost` + saturação 1.2 (verde rico) |
| Anúncio promo | `contrast-pop` + vinheta `PI/5` |

### Equus

| Contexto | Look |
|---|---|
| Clínica institucional | `cool-cinematic` + curves para preservar tons médios |
| Cavalo em movimento (drone/campo) | `cinematic warm` mais quente, saturação 1.1 |
| Anúncio Black Friday | `contrast-pop` |

### Escola Pecuária

| Contexto | Look |
|---|---|
| Aula técnica em sala | `rec709-natural` clean (não distorcer) |
| Manejo no curral / campo | `green-boost` levemente desaturado (-5%) para realismo |
| Promo do NNM | `cinematic warm` |

---

## 5. Antes/depois — checagem visual

Sempre gerar um sample antes/depois para validar:

```bash
# Side-by-side raw vs graded:
ffmpeg -i raw.mp4 -i graded.mp4 \
  -filter_complex "[0:v]scale=540:960[l];[1:v]scale=540:960[r];[l][r]hstack[v]" \
  -map "[v]" -t 10 \
  comparison.mp4
```

Conferir:
- [ ] Skin tones naturais (não verde nem rosa fosco)
- [ ] Céu não estourado (perdeu textura → reduzir contraste)
- [ ] Sombras não esmagadas (perdeu detalhe → levantar curves nas low)
- [ ] Identidade da marca preservada (cores próximas do brand manual)

---

## 6. Anti-padrões

- ❌ LUT muito forte (saturação 2.0+) — TikTok 2020 cara, satura skin tones
- ❌ Aplicar LUT antes de stabilizar/cortar — refazer várias vezes desperdiça tempo
- ❌ Não usar referência (peça de marca aprovada) para casar look — fica solto
- ❌ Color grading pesado em vídeo de áudio ruim — não salva; corrija áudio primeiro
- ❌ Dar `eq=saturation=1.5` em vídeo já com LUT punchy — duplica esforço, cor sai irreal
- ❌ Esquecer de aplicar mesma grade em pacote multi-formato — feed e reels saem com cores diferentes

---

## 7. Color grading vs color correction

| Conceito | Definição | Quando |
|---|---|---|
| **Correction** | Trazer raw para neutro técnico (white balance, exposure) | Sempre, etapa 0 |
| **Grading** | Aplicar look estético sobre o neutro | Depois de corrigir |

Ordem ffmpeg correta:
```
raw → white balance + exposure → LUT (look) → eq fino → vinheta
```

Inverter essa ordem distorce skin tones.

---

## 8. Checklist Layer 4 — Color

- [ ] Iluminação adequada na captura (re-gravar se possível antes de gradar)
- [ ] Look definido no `_brief.md` (cinematic warm, natural, contrast-pop, etc.)
- [ ] LUT base aplicado
- [ ] Refino manual com `eq` se necessário
- [ ] Side-by-side raw vs graded gerado para validação
- [ ] Mesma grade aplicada em todos os formatos do pacote (9:16, 1:1, 16:9)
- [ ] Skin tones naturais conferidos
- [ ] Sombras e luzes não esmagadas