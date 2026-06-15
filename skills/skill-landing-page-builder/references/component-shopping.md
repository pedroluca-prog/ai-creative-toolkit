# Component Shopping — N5a Componentes de Bibliotecas

> Carregar quando: a estrutura base está montada (pós-teardown) e você quer substituir seções genéricas por componentes de qualidade.

## Princípio

O teardown dá a estrutura. O component shopping substitui peças genéricas por componentes curados que você adapta. É onde o site passa de "clone do âncora" para "tem cara própria".

**Regra:** aplicar em todas as seções, não só no hero. Cards chatos → cards com glass. CTA flat → CTA com animação. Footer padrão → footer com ticker.

**Default obrigatório:** toda busca de componente começa em **https://21st.dev/community/components**. É a primeira parada de cada seção — não uma opção entre várias. Magic UI, Aceternity e CodePen entram só como fallback, quando o community não cobre.

---

## 21st.dev /community — Ponto de Partida Obrigatório

**URL:** https://21st.dev/community/components

Galeria da comunidade do 21st.dev: componentes UI com **prompt pronto para colar no Claude Code** ("Copy Prompt") + o código-fonte. É o **default de toda seção** — antes de Magic UI, Aceternity ou CodePen, procurar aqui.

**O que tem:** navigation/navbars · botões (shimmer, ícone animado, loading) · cards (hover lift, glass, border glow) · carousels · scroll areas (sticky, parallax) · hero sections (vídeo, partículas, gradiente) · pricing tables · testimonial sliders · FAQ accordions · footers.

**Fluxo padrão (por seção):**
1. **Abrir a galeria pela categoria da seção** — `https://21st.dev/community/components` e filtrar por hero, navbar, pricing, testimonial, FAQ… (ou usar a busca do site pela categoria).
2. **Puxar a galeria com Firecrawl** quando precisar varrer/comparar opções sem sair do terminal: `mcp__claude_ai_Firecrawl__firecrawl_scrape` na URL da categoria → lista de componentes + links. Para um componente específico, scrapear a página dele e pegar o código/prompt.
3. **Escolher** o que casa com a seção e pegar o "Copy Prompt" (ou o código do componente).
4. **Integrar adaptando** — colar no Claude: "Integre este componente na seção [nome]. Adaptar: paleta → [cores brand], fonte → [fonte brand], conteúdo → [copy da seção]."

**Adaptação obrigatória (React → single-file):** os componentes são React/TypeScript (shadcn-style). A LP aqui é HTML single-file + Tailwind CDN + Alpine. Sempre pedir ao Claude para converter de React/JSX para **Vanilla JS + classes Tailwind + Alpine** (estado/interatividade). Não colar JSX direto.

**Quando o community não cobre:** descer para os fallbacks abaixo. Registrar no `aprendizados.md` qual seção precisou de fallback — alimenta o repertório.

---

---

# Fallbacks — só quando o /community não cobre a seção

## Magic UI (magicui.design)

Componentes React animados com foco em efeitos modernos. Mais complexo que 21st.dev, mais impressionante visualmente.

**Componentes de destaque para LPs:**
- `AnimatedBeam` — linhas animadas conectando elementos (fluxos, pipelines)
- `Marquee` — ticker/carrossel horizontal infinito (prova social, logos de clientes)
- `NumberTicker` — contador animado de 0 ao número alvo
- `BlurFade` — entrada suave com blur (alternativa ao fade simples)
- `TextRevealCard` — revelar texto no hover
- `ShimmerButton` — botão com efeito shimmer
- `RetroGrid` — grid com perspectiva estilo anos 80

**Quando usar:** elementos de destaque (hero, seção de números, depoimentos). Não usar Magic UI em elementos secundários — perde o impacto.

**Adaptação para HTML single-file:** Magic UI usa React. Pedir ao Claude:
```
Adapte o componente NumberTicker do Magic UI para Vanilla JS + Tailwind CDN.
Deve iniciar quando o elemento entrar na viewport (IntersectionObserver).
Duração: 2s. Easing: ease-out.
```

---

## Aceternity UI (ui.aceternity.com)

Componentes React premium com efeitos 3D e físicos. Mais pesado que Magic UI, mais impactante.

**Para LPs:**
- `Background Beams` — feixes de luz no background
- `Spotlight` — spotlight que segue o mouse
- `Floating Navbar` — navbar que flutua com blur
- `Card Hover Effect` — cards com perspectiva 3D no hover
- `Wavy Background` — fundo com ondas animadas

**Regra de uso:** máximo 1-2 componentes Aceternity por página. São pesados — se usar muitos, a LP fica lenta.

---

## CodePen (codepen.io)

Para efeitos específicos que não têm em biblioteca — buscar pens prontos.

**Buscas úteis:**
- "CSS noise texture" → backgrounds com grain/ruído
- "CSS light sweep" → animação de luz passando em headline
- "CSS glass morphism card" → card com backdrop-filter
- "JavaScript counter animation" → contador sem dependência
- "CSS scroll indicator" → barra de progresso no topo

**Fluxo:** achar o pen → copiar o CSS/JS relevante → pedir ao Claude para integrar e adaptar.

---

## Política de Integração AZB

### O que adaptar sempre:
- Cores → brand manual do cliente
- Fonte → brand manual do cliente
- Conteúdo → copy aprovada
- Espaçamento → consistente com o restante da LP

### O que nunca fazer:
- Manter o conteúdo placeholder/demo do componente (óbvio mas recorrente)
- Usar componente React sem verificar se funciona em single-file HTML
- Empilhar 5+ efeitos animados na mesma seção (fica caótico)
- Ignorar `prefers-reduced-motion` em animações (acessibilidade)

### Template de instrução para integração:

```
Integre [componente X do 21st.dev/Magic UI/CodePen] na seção [nome da seção].

Adaptações obrigatórias:
- Paleta: [cor original] → [cor brand]
- Fonte: [fonte original] → [fonte brand]
- Conteúdo: [descrever o conteúdo que vai entrar]
- Formato: adaptar de React para Vanilla JS + Tailwind CDN (single-file HTML)
- Mobile: verificar se funciona em viewport 375px

Manter:
- A animação de [efeito específico]
- O hover state de [comportamento]
```
