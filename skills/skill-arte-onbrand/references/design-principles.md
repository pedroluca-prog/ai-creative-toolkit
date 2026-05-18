# Design Principles — skill-arte-onbrand

Princípios visuais para templates. Baseado em princípios anti-AI slop (plugin oficial Anthropic Frontend Design) adaptados para Instagram/agronegócio.

## 1. Tipografia

- **Fonte display (títulos)** sempre vem do brand manual do cliente. Nunca use Inter, Roboto ou fontes-default. A Xiru usa Bree Serif — força visual no número/headline.
- **Fonte body** também vem do brand manual (Xiru: Poppins 200/300/400/500/600).
- **Pesos**: títulos display em peso regular (serif já tem personalidade), body em 300 para parágrafos longos e 600 apenas em eyebrow/labels uppercase.
- **Letter-spacing** negativo (-0.5 a -2px) em números grandes e headlines display — compensa a abertura natural da serif.
- **Uppercase + letter-spacing 2px** para eyebrows e labels. Nunca em parágrafos.

## 2. Hierarquia tipográfica por slide

| Nível | Tamanho (1080px) | Uso |
|---|---|---|
| Eyebrow | 20–24px | Categoria do slide ("PROTEÍNA BRUTA") |
| Title | 56–70px display | Título do slide |
| Headline capa | 92px display | Só no slide de capa |
| Highlight | 58–180px display | Número de destaque (varia por contexto) |
| Body | 26–34px body 300 | Parágrafos |
| Label/handle/page | 16–20px body 600 | Rodapé, handle IG, número de página |

## 3. Cor

- **Fundo padrão**: `{{bgDeep}}` (#02431b para Xiru — verde escuro profundo). Cria autoridade e legibilidade do texto branco.
- **Accent ativo**: `{{accentLight}}` (#47a613 para Xiru) para eyebrows, destaques markdown (**), números em tabela coluna B.
- **Texto principal**: branco puro `#fff`. Para parágrafos longos, `rgba(255,255,255,0.92)` reduz cansaço visual.
- **Texto secundário**: `rgba(255,255,255,0.7)` para handles, page numbers, footnotes.
- **Muted** (coluna A de tabela comparativa, dados que vão perder): `rgba(255,255,255,0.55)`.
- **Nunca** use gradientes roxo-azul-branco genéricos. Se precisar variar, use `{{bgDark}}` (#0a5a28) para contraste sutil.

## 4. Composição

- **Frame interno** (1.5px border rgba(255,255,255,0.22)) em posts estáticos isolados — remete a molduras editoriais.
- **Rodapé padronizado**: handle à esquerda, page-num central, logo à direita. Mesmo em todos os slides de um carrossel.
- **Capas de carrossel** usam banda inferior (gradient sobre foto) com título grande — evita competir com elementos visuais da foto.
- **Tabelas**: coluna B (o produto que estamos vendendo) recebe background translúcido da accent + tipo serif maior nos valores. Coluna A (concorrente/alternativa ruim) recebe opacity menor.

## 5. Decoração

- **Padrão fallback** para capas sem foto: dois radial-gradients suaves da accent em 20%/80% da tela. Evita fundo chapado sem competir com o texto.
- **Barra vertical** (6px solid accent) em destaques/citações. Referência editorial: "abertura de matéria de revista".
- **Pills/chips** (border-radius 999px, border 1px branca, padding 10×18) para page-num na capa. Discretos mas legíveis.
- **Ícones/emojis na UI**: evitar. Apenas como marcador de lista se estritamente necessário. Nunca como "substituto de tipografia".

## 6. Anti-padrões

- ❌ Renderizar texto via modelo de difusão (Gemini/DALL-E) quando ortografia importar.
- ❌ Usar Inter/Roboto/Arial como fonte-display.
- ❌ Logo gerado por IA (usar PNG/SVG oficial do cliente via `logoPath`).
- ❌ Frases em caixa-alta (exceto eyebrows curtos).
- ❌ Drop-shadow pesado, glassmorphism, gradient-mesh "AI-ish".
- ❌ Mais de 3 tamanhos de fonte por slide (fica ruído).
- ❌ Mais de 2 cores de accent no mesmo slide.

## 7. Checklist antes de publicar

- [ ] Texto do slide está correto palavra-por-palavra (é HTML, então SE está no JSON, está correto).
- [ ] Paleta corresponde ao brand manual do cliente.
- [ ] Logo renderizou (quadrado branco = PNG com fundo branco; corrigir para SVG se possível).
- [ ] Fontes carregaram (sem "fallback serif/sans genérico").
- [ ] Safe zone: 80px de margem de todos os lados (nada crítico fora disso).
- [ ] Dimensões: 1080×1080 (feed), 1080×1350 (feed portrait), 1080×1920 (stories).
