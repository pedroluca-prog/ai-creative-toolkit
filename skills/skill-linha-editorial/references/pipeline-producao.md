# Pipeline de produção do carrossel — ETAPA 3 (universal)

> Da narrativa aprovada (GATE 1) + arquitetura aprovada (GATE 2) até os **PNGs prontos pra postar**. Este é o guia de produção FÍSICA — comprovado em campo, client-agnóstico. Toda marca/ICP vem do perfil (`config/exemplos/<cliente>.md`); aqui só entra o método. Onde este doc diz "accent", "manchete", "formato", leia o token correspondente do perfil, nunca um valor fixo.

Pré-requisitos travados antes de renderizar um pixel:
- **GATE 1** — narrativa em prosa contínua aprovada pelo humano (passou pela `anti-ai-copy`).
- **GATE 2** — tabela de arquitetura aprovada: cada card com `ref_id` do banco, 2-4 recursos estilísticos e **os preenchimentos de mídia planejados** (gen-image vs. CSS vs. still real, decidido no gate — não improvisar fill no meio do build).

---

## 1. Render: HTML → PNG via Chromium, 2× (supersampling)

**Um HTML por card.** O caminho default é o `skill-arte-onbrand`: o brand-loader lê o `brand_manual` do perfil (paleta hex, fontes com Google Fonts link, logo) e aplica nos templates de carrossel (`carrossel-capa`, `carrossel-texto`, `carrossel-foto-texto`, `carrossel-tabela`, `carrossel-cta`, `carrossel-keeper`). Prefira sempre esse fluxo — ver `skill-arte-onbrand/SKILL.md` para inputs (`manualPath`, `clienteDir`, `jobs[]`) e o CLI (`node pipeline/cli.mjs --spec spec.json`). Ele garante texto nativo do Chromium (zero typo de acento) e constância de marca nos N cards.

Quando um card precisa de geometria fora dos templates (colagem, split com costura torta, diagrama de convergência, moldura de vídeo), escreva o HTML do card à mão, mas **puxe os tokens do mesmo `brand_manual`** (fundo, fonte de manchete, fonte de corpo, fonte de dado/mono, cor-accent, selo, numeração) — nunca hardcode a cor da marca no HTML do card.

Parâmetros de render (Chromium headless):
```
chrome --headless=new \
  --force-device-scale-factor=2 \        # 2× supersampling: tipo e bordas cravados
  --window-size=<LARGURA>,<ALTURA> \     # = formato_padrao do perfil (default 1080,1350)
  --virtual-time-budget=8000 \           # espera fontes/@import carregarem
  --allow-file-access-from-files \       # libera imagens locais
  --screenshot=card-NN.png \
  "file:///caminho/absoluto/card-NN.html"
```
- **Janela = `formato_padrao` do perfil.** Default `1080×1350` (4:5 do feed); `1080×1920` stories; `1080×1080` quadrado. O 2× produz um PNG físico de `2160×2700` que você reduz na exportação — daí a nitidez.
- **Fontes:** `@import` do Google Fonts no `<head>` do HTML (as fontes do `brand_manual`). O `--virtual-time-budget` dá tempo de baixar antes do screenshot.
- **Imagens locais no Chromium:** caminho absoluto `file:///...`, espaços viram `%20`, e `--allow-file-access-from-files` ligado.
- **Renderize em lotes** com timeout largo (>2 min): um único comando com o Chromium é lento pra subir; rodar os N cards de uma vez amortiza.
- Exportar **sem recompressão agressiva** — recompressão come a nitidez que o 2× ganhou.

---

## 2. Personalidade-primeiro = rosto REAL

A Lei do Canal (ver perfil) manda toda capa abrir com um rosto reconhecível. Rosto real não se gera por difusão — se busca ou se recorta. Ordem de obtenção:

1. **Still de filme/série via TMDB.** `image.tmdb.org` é CDN aberto (sem chave pra baixar o arquivo depois de achar o path). Busque o still/backdrop da obra (um agente resolve a busca), baixe em alta-res, recorte o fundo se precisar isolar a figura (ferramenta de remove-bg / cutout). Ideal quando a personalidade é um personagem.
2. **Foto de imprensa** da figura pública (quando é pessoa real, não personagem). Fonte alta-res obrigatória (ver §4).
3. **Figuras/cenas/colagens/avatares via `gen-image.sh`** (gpt-image-2, em `scripts/gen-image.sh`) — para o elenco genérico (o decisor, cenas, backdrops, colagens editoriais, fundos). **SEMPRE** construa o prompt antes com a skill `image-prompt-generator` (prompt EN otimizado + size/quality); nunca chame o renderer cru.

**Regra dura de composição:** logo, wordmark, número-herói e qualquer texto crítico são **SEMPRE overlay vetorial** (HTML/CSS via `skill-arte-onbrand`), NUNCA baked na imagem de difusão. Modelo de imagem erra acento PT-BR e alucina logo. A imagem gerada entra como **fundo/camada**; o texto vem por cima, nativo. O gen-image entrega o pano de fundo fotográfico; o HTML entrega a mensagem.

Camadas por card (padrão dos campeões): 2-4 registros de mídia empilhados — foto/cena + textura (halftone/grão) + copy + o evento accent. Card montado só de texto sobre cor chapada lê como PowerPoint; replique as camadas da referência real do `ref_id`.

---

## 3. Card com VÍDEO na moldura (clipe real)

Quando a arquitetura pede um clipe rodando dentro da moldura de um card:

1. **Baixe o clipe** com `yt-dlp`.
2. **Pré-extraia o trecho pra H.264** com `ffmpeg` antes de compor (`-c:v libx264`). Fontes AV1 estouram o filtergraph em timeout — sempre transcodifique pra h264 primeiro.
3. **Componha com MÁSCARA GEOMÉTRICA (`alphamerge`), NUNCA `colorkey`.** Colorkey come o texto claro e as bordas — é armadilha conhecida (custou re-trabalho de posts inteiros). O método:
   - Renderize `card-NN-mask.html` → um **retângulo branco na forma/rotação EXATAS da moldura** sobre fundo preto (a máscara alpha).
   - Renderize `card-NN-plate.html` → o **plate RGBA transparente**: a moldura com borda/sombra/tag/selo, **sem preenchimento** (o buraco por onde o vídeo aparece).
   - `ffmpeg`: posiciona+rotaciona o vídeo num canvas → `alphamerge` com a máscara → `overlay` base + vídeo mascarado + plate por cima → encode.
4. **Tags de cor no encode** (senão o IG re-mapeia e escurece): `bt709` / `tv`:
   ```
   -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
   -x264-params colorprim=bt709:transfer=bt709:colormatrix=bt709:fullrange=off
   ```
5. **Meça o pico-luma do texto no frame extraído ANTES de publicar** — o texto claro tem que ficar em ~230 (não ~50). Se caiu, a conversão de cor comeu o brilho; refaça as tags/composição.

O IG exige que o item de carrossel-vídeo tenha **áudio e ≥3s** — garanta faixa de áudio (pode ser silêncio) e duração mínima no encode.

---

## 4. Diretriz de NITIDEZ (gate de qualidade — vale pra TODO card)

Referência de crispness: os posts das contas-gabarito do perfil (`contas_referencia_arquitetura`). Antes de aprovar qualquer card:
- **Render 2×** (`--force-device-scale-factor=2`, janela = `formato_padrao`). Supersampling deixa tipo e bordas cravados.
- **Foto/still de fonte alta-res** (≥1500px no lado curto). Nunca esticar thumbnail. Fonte baixa → **upscale** (ferramenta de upscale 2K/4K) ANTES de compor.
- **gen-image no maior tamanho/qualidade** + upscale quando preciso. Nada de asset mole.
- **Texto e logo sempre overlay vetorial** (HTML / `skill-arte-onbrand`), nunca baked em raster mole.
- **Halftone/grão sutil (4-10%)**: lê como impressão, não como borrão; não amolece a tipografia.
- **Confira a 1:1 (100%)** antes de aprovar: bordas, rosto e número-herói afiados.

Este é um gate: card mole reprova, volta pro render.

---

## 5. Staging (uma pasta por post)

```
<posts>/post-XX-<slug>/
├── 01-narrativa.md          # prosa contínua aprovada (GATE 1)
├── 02-arquitetura.md        # tabela de cards + preenchimentos (GATE 2)
├── 03-build-log.md          # decisões de render, comandos, o que deu certo/errado
├── 04-legenda.md            # legenda do post + fontes dos números
├── card-01.png … card-NN.png   # os PNGs finais, numerados na ordem do carrossel
├── build/                   # render.sh, os .html por card, masks/plates de vídeo
├── _bg/                     # imagens de fundo (gen-image, stills TMDB, upscales)
└── PARA-POSTAR/             # handoff: slides renomeados 01..NN na ordem + POSTAR.md
```
- Cards numerados na **ordem exata** do carrossel; zero arquivo solto na raiz do post.
- `build/` guarda tudo que produz pixel (scripts, HTMLs, masks). `_bg/` guarda a matéria-prima visual.
- `PARA-POSTAR/` é o pacote de handoff manual: slides na ordem + um `POSTAR.md` com legenda e ordem, pra quem for publicar não ter que reconstruir nada.

---

## 6. Auditoria de fidelidade (obrigatória, antes de postar)

Compare a copy **RENDERIZADA** com a narrativa aprovada (01-narrativa.md), card a card. Ao condensar a prosa pro design é fácil dropar o nome da personalidade, a abertura-história ou a frase que explica o mecanismo. Restaure tudo. Copy aprovada é congelada e verbatim: o layout se adapta ao texto, nunca o contrário.

---

## 7. Publicação no Instagram — FORA do universal

Renderizar os PNGs é universal; **publicar não é.** A postagem de um carrossel misto imagem+vídeo segue sempre o mesmo desenho de API (hospedar cada asset em storage público → criar um container por item → criar o container CAROUSEL com os filhos na ordem + legenda → publicar), mas os **IDs de conta, tokens e o bucket de hospedagem são específicos de cada cliente**. Esses segredos vivem no **projeto do cliente** (arquivo de env gitignored do cliente), NÃO neste toolkit e NÃO neste doc.

Regra transversal: mostrar o carrossel final + a legenda ao humano ANTES de publicar (post público, irreversível). A API não arquiva nem deleta post — arquivamento é manual.

Para o desenho concreto de container→publish e as credenciais, use o runbook de publicação do projeto do cliente.
