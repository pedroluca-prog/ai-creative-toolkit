# FFmpeg Templates — skill-edicao-anuncios-video

Comandos prontos para copiar. Substituir `input.mp4`, `output.mp4` e parâmetros de texto conforme o projeto.

---

## T0 — Inspecionar Vídeo Bruto
```bash
ffprobe -v quiet -print_format json -show_streams "input.mp4" | python3 -m json.tool
# Duração apenas:
ffprobe -v quiet -show_format "input.mp4" | grep duration
```

---

## T1 — Legenda Burn-in (bottom-third fixo)
```bash
ffmpeg -i "input.mp4" \
  -vf "drawtext=text='TEXTO DA LEGENDA':fontsize=48:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=10:x=(w-text_w)/2:y=h-th-40" \
  -c:a copy \
  "output-legenda.mp4"
```
- `text=` — texto a exibir (usar `\n` para quebra de linha)
- `fontsize=48` — adequado para 1080p; reduzir para 32 em 720p
- `y=h-th-40` — 40px acima da base do vídeo
- `box=1:boxcolor=black@0.5` — caixa preta semitransparente (legibilidade)

---

## T2 — Lower-Third (nome/cargo, 1-5 segundos)
```bash
ffmpeg -i "input.mp4" \
  -vf "drawtext=text='Nome do Especialista':fontsize=40:fontcolor=white:x=80:y=h-160:enable='between(t,1,5)',drawtext=text='Cargo \/ Empresa':fontsize=28:fontcolor=#CCCCCC:x=80:y=h-110:enable='between(t,1,5)'" \
  -c:a copy \
  "output-lower-third.mp4"
```
- `enable='between(t,1,5)'` — exibe de t=1s a t=5s. Ajustar conforme duração
- `x=80:y=h-160` — 80px da esquerda, 160px acima da base (linha 1)
- `y=h-110` — linha 2 (cargo), 50px abaixo da linha 1

---

## T3 — Logo Overlay (canto inferior direito)
```bash
ffmpeg -i "input.mp4" -i "logo.png" \
  -filter_complex "overlay=W-w-20:H-h-20" \
  -c:a copy \
  "output-logo.mp4"
```
- `W-w-20:H-h-20` — 20px das bordas direita e inferior
- Logo **deve ser PNG com fundo transparente** (canal alfa)
- Para redimensionar logo: `[1:v]scale=150:-1[logo];[0:v][logo]overlay=W-w-20:H-h-20`

---

## T4 — Fade In + Fade Out
```bash
# Detectar duração primeiro:
DURACAO=$(ffprobe -v quiet -show_format "input.mp4" | grep duration | cut -d= -f2 | cut -d. -f1)
FADE_OUT=$((DURACAO - 1))

ffmpeg -i "input.mp4" \
  -vf "fade=t=in:st=0:d=0.5,fade=t=out:st=${FADE_OUT}:d=1" \
  -af "afade=t=in:st=0:d=0.5,afade=t=out:st=${FADE_OUT}:d=1" \
  "output-fade.mp4"
```
- `d=0.5` — duração do fade em segundos (0.5s entrada, 1s saída)

---

## Pipeline Completo (T1 + T3 + T4 em um único pass)
```bash
# Substituir FADE_OUT pela duração total - 1
ffmpeg -i "input.mp4" -i "logo.png" \
  -filter_complex "[0:v]fade=t=in:st=0:d=0.5,fade=t=out:st=FADE_OUT:d=1,drawtext=text='LEGENDA':fontsize=48:fontcolor=white:box=1:boxcolor=black@0.5:boxborderw=10:x=(w-text_w)/2:y=h-th-40[v];[v][1:v]overlay=W-w-20:H-h-20[vout]" \
  -map "[vout]" -map 0:a \
  -af "afade=t=in:st=0:d=0.5,afade=t=out:st=FADE_OUT:d=1" \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  "output-completo.mp4"
```

---

## Conversão de Formato

### 9:16 Reels/Stories (crop centralizado)
```bash
ffmpeg -i "input.mp4" \
  -vf "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920" \
  -c:a copy \
  "output-reels.mp4"
```

### 1:1 Feed Quadrado (crop centralizado)
```bash
ffmpeg -i "input.mp4" \
  -vf "crop=ih:ih:(iw-ih)/2:0,scale=1080:1080" \
  -c:a copy \
  "output-feed.mp4"
```

### 16:9 YouTube/LinkedIn (sem crop, padding se necessário)
```bash
ffmpeg -i "input.mp4" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:a copy \
  "output-youtube.mp4"
```

### Batch: 3 formatos de uma vez
```bash
BASE="video_editado"
ffmpeg -i "${BASE}.mp4" \
  -vf "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920" "${BASE}-reels.mp4" \
  -vf "crop=ih:ih:(iw-ih)/2:0,scale=1080:1080" "${BASE}-feed.mp4" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" "${BASE}-youtube.mp4"
```

---

## Compressão para Instagram (< 100MB)
```bash
ffmpeg -i "input.mp4" \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  "output-comprimido.mp4"
```
- `crf=23` — qualidade visual (18=alta qualidade, 28=menor arquivo; 23 é o equilíbrio)
- `preset slow` — melhor compressão, mais lento; usar `medium` se tempo for crítico

---

## Instalação ffmpeg (macOS sem Homebrew)
```bash
# Opção 1 — Binário estático pré-compilado (recomendado):
# Baixar em: https://evermeet.cx/ffmpeg/
mv ~/Downloads/ffmpeg /usr/local/bin/ffmpeg
chmod +x /usr/local/bin/ffmpeg
ffmpeg -version  # verificar

# Opção 2 — Via Python imageio-ffmpeg (baixa binário automaticamente):
pip install imageio imageio-ffmpeg
python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"
# Usar o path retornado no lugar de 'ffmpeg'

# Opção 3 — Homebrew (se disponível):
brew install ffmpeg
```