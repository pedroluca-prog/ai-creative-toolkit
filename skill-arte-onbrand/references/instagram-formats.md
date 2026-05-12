# Instagram Formats — skill-arte-onbrand

Referência rápida de dimensões, safe zones e práticas por tipo de post no Instagram (padrão abril 2026).

## Dimensões canônicas

| Nome | Dimensões | Proporção | `size` na skill |
|---|---|---|---|
| Feed quadrado | 1080 × 1080 | 1:1 | `"square"` |
| Feed vertical (retrato) | 1080 × 1350 | 4:5 | `"portrait"` |
| Stories / Reels (capa) | 1080 × 1920 | 9:16 | `"story"` |

## Qual formato usar

- **Post estático de dado** (arroba, crédito, ROI) → `square`. Aparece limpo no grid do perfil.
- **Carrossel** → `square` em todos os slides (Instagram trata tamanho do primeiro slide como padrão para os outros).
- **Post de autoridade/citação com muita letra** → `portrait` (4:5). Ocupa mais espaço no feed, captura mais atenção, cabe mais texto.
- **Stories / capa de reels** → `story` (9:16).

## Safe zone

Instagram corta bordas e sobrepõe UI em alguns formatos. Regras:

- **Feed quadrado/portrait**: margem mínima de **80 px** em todos os lados para conteúdo crítico (título, número). Nada importante nos 40px externos (frame decorativo tudo bem).
- **Stories**: margem de **250 px no topo** (UI de perfil) e **220 px embaixo** (DM/reply). Título central seguro entre 1/4 e 3/4 da altura.
- **Reels**: mesma regra de stories. Além disso, legenda do reel cobre os últimos 300px em mobile — evite texto crítico aí.

## Texto por slide

- **Título de slide**: máximo ~45 caracteres por linha em 56–70px. Se passar, quebrar em 2 linhas manualmente.
- **Parágrafo**: máximo ~4 linhas por slide. Se precisar mais, divida em 2 slides.
- **Highlight numérico**: máximo 14 caracteres incluindo moeda/unidade ("R$ 10 bilhões" = 13).
- **CTA**: máximo ~60 caracteres na linha principal.

## Consistência visual do carrossel

- Mantenha **rodapé idêntico** em todos os slides (mesma posição de handle, page-num, logo).
- **Varie layout** entre slides adjacentes — evita sensação de "mesmo slide com texto diferente". Ex: tabela → texto → tabela alterna bem.
- **Primeiro slide (capa)** deve prometer o que os outros entregam. Headline respondendo "por que vale deslizar?".
- **Último slide (CTA)** deve ter ação clara + handle IG visível.

## Peso do arquivo

Instagram aceita PNG até 30 MB por slide, mas recomenda:
- Feed: ~1–3 MB por imagem.
- Carrossel: ~500 KB–1 MB por slide (10 slides = 5–10 MB).

A skill gera PNG com `deviceScaleFactor: 2` (densidade retina), resultando em ~500–800 KB por slide 1080×1080 — dentro da faixa recomendada.

## Acentos e caracteres especiais

Todos os acentos do português brasileiro (á, à, â, ã, é, ê, í, ó, ô, õ, ú, ç) são suportados nativamente pelo Chromium + Google Fonts. Zero risco de typo — o que está no JSON é o que aparece no PNG.

Emojis (✅ 🌾 🚜) também renderizam nativos, usando a fonte de emoji do sistema. Use com moderação — o público 40–70 anos do Xiru reage melhor a ícones editoriais (setas, traços, barras) do que emojis coloridos.
