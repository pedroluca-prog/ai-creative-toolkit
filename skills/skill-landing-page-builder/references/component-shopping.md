# Component Shopping — N5a Componentes de Bibliotecas

> Carregar quando: a estrutura base está montada (pós-teardown) e você quer substituir seções genéricas por componentes de qualidade.

## Princípio

O teardown dá a estrutura. O component shopping substitui peças genéricas por componentes curados que você adapta. É onde o site passa de "clone do âncora" para "tem cara própria".

**Regra:** aplicar em todas as seções, não só no hero. Cards chatos → cards com glass. CTA flat → CTA com animação. Footer padrão → footer com ticker.

---

## 21st.dev — Componentes com Prompt Pronto

**URL:** https://21st.dev

Biblioteca de componentes UI com o diferencial de ter **prompts prontos para colar no Claude Code**. Cada componente tem um botão "Copy Prompt" que você cola direto na sessão.

**O que tem:**
- Navigation menus (hamburger, mega menu, mobile drawer)
- Botões (com shimmer, com ícone animado, com loading state)
- Cards (hover lift, glass morphism, border glow)
- Carousels (scroll infinito, fade, ken burns)
- Scroll areas (sticky column, parallax)
- Hero sections (com vídeo, com partículas, com gradiente animado)
- Pricing tables
- Testimonial sliders
- FAQ accordions

**Como usar:**
1. Navegar em 21st.dev → filtrar por categoria
2. Escolher o componente
3. Clicar "Copy Prompt"
4. Colar no Claude: "Integre este componente na seção de [nome] da nossa LP. Adaptar: paleta → [cores brand], fonte → [fonte brand], conteúdo → [copy da seção]"

**Importante:** os componentes do 21st.dev são em React/TypeScript. Para LP single-file HTML+Tailwind, pedir ao Claude para adaptar pra Vanilla JS + Tailwind classes.

---

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
