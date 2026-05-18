# Hero Asset Autoral — N5b/c Imagem-Conceito + Vídeo Loop

> Carregar quando: a estrutura base está montada e você vai criar o asset visual do hero. É o momento que separa "template de IA" de "site com personalidade".

## Por que Importa

Background genérico = gradiente + stock photo de trator. Background autoral = imagem que conta a história do produto antes de ler uma palavra.

O hero é o primeiro contato. Se o visual é genérico, o visitante já classificou como "mais um site". Se é específico e coerente com o texto, o visitante lê.

---

## Fluxo AZB — Geração de Imagem-Conceito

### Passo 1 — Definir o conceito visual

Antes de gerar, responder:
1. Qual é a **história** do produto/cliente em 1 frase visual? (não textual)
2. Qual é o **personagem ou elemento central**? (pessoa, ambiente, ferramenta, animal)
3. Qual o **tom emocional**? (confiança robusta, modernidade técnica, abundância, etc.)
4. Qual o **negative space necessário**? (o texto do hero vai para esquerda ou direita — o lado oposto precisa de espaço limpo)

**Exemplo Xiru Mudas:**
- História: plantadeira que transforma pastagem em lucro
- Elemento central: pastagem de Tifton densa ao horizonte, sol quente
- Tom: robustez técnica + abundância natural
- Negative space: direita da imagem

### Passo 2 — Construir o prompt com image-prompt-generator

**SEMPRE usar `image-prompt-generator` antes de executar `gen-image.sh`.**

A skill `image-prompt-generator` (em `~/.claude/skills/image-prompt-generator/`) constrói o prompt otimizado para gpt-image-2, seguindo as regras de:
- Especificidade de cenário (não "campo verde" mas "pastagem de Tifton 85 com 30cm de altura em dia de sol forte")
- Iluminação (hora do dia, direção da luz, temperatura de cor)
- Composição (negative space, rule of thirds, foco de profundidade)
- Estilo fotográfico (não "realista" mas "fotografia editorial agro, Canon 5D Mark IV, 35mm, f/2.8")
- Anti-padrões (sem logo via gen-image.sh, sem texto na imagem, sem pessoas sem contexto)

### Passo 3 — Executar gen-image.sh

```bash
~/tools/gen-image.sh "[prompt construído pelo image-prompt-generator]" \
  --output "hero-[cliente].png" \
  --size "1792x1024"
```

**Política:**
- Logo NUNCA via gen-image.sh — sempre overlay com PNG/SVG oficial via skill-arte-onbrand
- Texto NUNCA via gen-image.sh — sempre via skill-arte-onbrand ou HTML/CSS sobre a imagem
- Pessoas reais identificáveis: verificar autorização antes de usar como base de prompt

### Passo 4 — Integrar no hero

```html
<!-- Hero com negative space à direita para texto sobreposto -->
<div class="relative min-h-screen overflow-hidden">
  <img 
    src="hero-cliente.jpg" 
    alt="[descrição factual da imagem — não genérico]"
    class="absolute inset-0 w-full h-full object-cover"
    fetchpriority="high"
  >
  <!-- Overlay gradiente da esquerda (texto) para transparente (direita) -->
  <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
  <!-- Texto à esquerda -->
  <div class="relative z-10 flex items-center min-h-screen">
    <div class="max-w-xl pl-8 md:pl-16">
      <!-- headline, subheadline, CTA -->
    </div>
  </div>
</div>
```

---

## Upgrade — Background em Vídeo Loop (N5c)

### Quando vale

- LP institucional ou de lançamento (não LP de captura simples)
- Tem B-roll do cliente disponível (fotos/vídeos do produto em ação)
- Target é audiência que consome conteúdo no desktop (B2B, decisores)

### Fluxo

1. **Imagem estática primeiro.** Gerar a imagem-conceito (N5b) e testar no hero.
2. **Verificar se o movimento agrega.** Movimento de 15s sutil (vento no pasto, luz mudando) > movimento dramático (câmera voando).
3. **Usar imagem como start frame** em Kling 3.0 ou Veo 3.1 se disponível.
4. **Especificar:**
   - Duração: 15s (ponto de corte invisível no loop)
   - Movimento: câmera lenta ou elementos naturais (não pan/zoom agressivo)
   - End frame: idêntico ao start frame para loop sem corte visível

### Implementação iOS-Safe (4 atributos obrigatórios)

```html
<video 
  autoplay 
  muted 
  loop 
  playsinline
  preload="metadata"
  poster="hero-cliente.jpg"
  class="absolute inset-0 w-full h-full object-cover"
>
  <source src="hero-loop.webm" type="video/webm">
  <source src="hero-loop.mp4" type="video/mp4">
</video>
```

**Por que os 4 atributos são obrigatórios:**
- `autoplay` — óbvio
- `muted` — iOS rejeita autoplay com som (política do browser)
- `loop` — sem isso o vídeo para no fim e expõe o frame final estático
- `playsinline` — sem isso iOS abre em fullscreen ao invés de inline

Sem qualquer um desses 4, o comportamento quebra em algum dispositivo.

**Ordem dos `<source>`:** webm primeiro (Chrome/Firefox/Edge), mp4 segundo (Safari iOS). Browser pega o primeiro que suporta — webm é ~25% menor.

### Mobile: imagem estática obrigatória

Nunca carregar vídeo no mobile. Dados móveis + vídeo de background = experiência lenta.

**Implementação Alpine.js:**
```html
<div x-data="{ isMobile: window.innerWidth < 768 }">
  <video x-show="!isMobile" autoplay muted loop playsinline>...</video>
  <img x-show="isMobile" src="hero-cliente.jpg" alt="..." class="...">
</div>
```

Ou mais simples, via CSS:
```html
<video class="hidden md:block absolute inset-0 ..." autoplay muted loop playsinline>...</video>
<img class="md:hidden absolute inset-0 ..." src="hero-cliente.jpg" alt="...">
```

---

## Casos de Uso por Tipo de Cliente AZB

| Cliente | Elemento hero recomendado | Movimento |
|---------|--------------------------|----------|
| Xiru Mudas | Pastagem densa ao horizonte, plantadeira em ação | Vento nas folhas do Tifton |
| Equus | Cavalo em trote elegante em arena | Câmera slow-motion acompanhando |
| Escola Pecuária | Curral organizado, técnico e produtor conversando | Luz mudando (manhã → dia) |
| AZB (interno) | Dashboard com dados + mapa do Brasil | Números animados subindo |

---

## Regras Anti-Slop para Hero

- **Sem stock genérico de homem de terno apertando mão.** Agro é concreto: terra, animal, ferramenta, agrônomo trabalhando.
- **Sem logo via gen-image.sh.** Logo sempre overlay via HTML ou skill-arte-onbrand.
- **Sem texto na imagem gerada.** Texto vai por cima via HTML — nunca queimado na imagem (não é editável depois).
- **Sem gradient roxo/azul genérico.** Se saiu gradiente, o prompt não foi específico o suficiente — refazer com image-prompt-generator.
- **Sem pessoas sem contexto.** Pessoa sozinha sorrindo = banco de stock. Pessoa trabalhando em situação específica = credível.
