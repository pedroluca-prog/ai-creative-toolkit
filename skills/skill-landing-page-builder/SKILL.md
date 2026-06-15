---
name: skill-landing-page-builder
description: "Produz landing pages completas como HTML single-file pronto pra deploy. Segue os 7 Níveis de Front-End Design: plan mode → anti-slop foundation → moodboard visual → site teardown → hero autoral + componentes → micro-detalhes premium → QA. Use quando pedir 'construir LP', 'montar página', 'criar landing page', 'HTML da LP', 'página pronta'."
---

# Skill Landing Page Builder — v2 · 7 Níveis

Constrói landing pages com personalidade. Não templates de IA — páginas com cara própria.

Fundamentada no **Playbook: Os 7 Níveis de Front-End Design com Claude Code** (ver `references/playbook-7-niveis.md`).

## Esta Skill vs Outras

| Skill | O que faz | Output |
|-------|----------|--------|
| skill-funil-copy | Escreve a COPY do funil | Textos (markdown) |
| skill-vibecoding | Gera SPEC TÉCNICA | Documento de especificação |
| **skill-landing-page-builder** | **CONSTRÓI a página** | **HTML pronto pra deploy** |

## Pré-requisitos (OBRIGATÓRIOS)

1. Copy aprovada — de skill-funil-copy OU briefing direto do KAM
2. Brand manual — cores hex, fontes, logo

Se copy não existir: rodar `skill-funil-copy` primeiro.

## Aprendizados
Ler `aprendizados.md` antes de iniciar.

## Referências (carregar sob demanda — não ler tudo de uma vez)

| Referência | Fase | Quando ler |
|-----------|------|-----------|
| `references/design-system-generator.md` | Fase 1.5 | Rodar o engine ui-ux-pro-max + regra "brand sobrescreve" |
| `references/html-architecture.md` | Fase 2 | Template base + stack |
| `references/moodboard-process.md` | Fase 3 | Protocolo Awwwards/Godly/Pinterest/Dribbble |
| `references/site-teardown.md` | Fase 4 | Como desconstruir site de referência via Firecrawl |
| `references/component-shopping.md` | Fase 5 | 21st.dev, Magic UI, Aceternity — como integrar |
| `references/hero-asset-autoral.md` | Fase 5 | gen-image.sh + image-prompt-generator + vídeo loop |
| `references/micro-details-premium.md` | Fase 6 | Glass morphism, ticker, counters, light sweep, scroll indicator |
| `references/editor-visual-hibrido.md` | Fase 6 | Stitch, epic-paper, Figma — quando sair do terminal |
| `references/cro-checklist.md` | Fase 7 | QA pré-entrega |
| `references/geo.md` | Fase 2 + 7 | **Só em site institucional / multi-página** — engenharia GEO-ready (não usar em LP de campanha paga) |

---

## Fluxo de Execução — Os 7 Níveis

### Fase 0 — Inputs

Coletar antes de começar:

```yaml
objetivo: "capturar lead / venda direta / waitlist / evento"
tipo_lp: "Captura | Inside Sales | Vendas Longa | Evento/Webinar"
copy_arquivo: "path para copy aprovada"
brand_manual: "path para brand manual"
referencias_visuais: ["URL ou screenshot 1", "URL ou screenshot 2"]  # mínimo 3
site_ancora: "URL do site cujo código vamos dissecar"
nivel_ambicao: "N2 (foundation) | N3 (moodboard) | N4 (teardown) | N5 (hero autoral) | N6 (premium)"
```

**Regra de entrada:** se `nivel_ambicao` não for informado, perguntar. LP para cliente pagante = mínimo N4. LP institucional de marca = N5 ou N6.

---

### Fase 1 — Plan Mode (N1)

Antes de escrever uma linha de HTML, responder:

1. Qual o **objetivo único** da página? (uma conversão, não duas)
2. Qual o **tipo de LP**? (ver tabela abaixo)
3. Quais as **seções necessárias**? (lista — sem inventar seções que a copy não cobre)
4. Qual o **CTA principal**? (texto exato)
5. Qual o **público**? (do ICP — não genérico)

| Tipo de LP | Seções padrão |
|-----------|--------------|
| Captura (isca) | Hero + 3 bullets + Form + Social proof |
| Inside Sales | Hero + Problema + Solução + Prova + Como funciona + FAQ + Form |
| Vendas (longa) | Hero + Problema + Solução + Prova + Como funciona + Preço + Garantia + Urgência + FAQ + Form |
| Evento/Webinar | Hero + Palestrante + Agenda + Form + Countdown |

**Armadilha N1:** aceitar sugestões genéricas como "dark and techy" ou "clean and minimal". Essas descrições não orientam nada.

---

### Fase 1.5 — Design System de Partida (engine ui-ux-pro-max)

Ler `references/design-system-generator.md`. Esta fase mata a Armadilha N1: transforma "dark and techy" num sistema concreto — estilo nomeado, paleta, par tipográfico, efeitos, anti-patterns — antes de abrir o HTML.

Rodar local (sem rede, sem `pip install`), com o brief em inglês:

```bash
python3 vendor/ui-ux-pro-max/scripts/search.py "<setor + objetivo + público>" --design-system -f markdown -p "<cliente>"
```

A saída traz: pattern de conversão + seções sugeridas · UI style + keywords · paleta (10 roles) · par tipográfico (com link Google Fonts) · efeitos-chave · **anti-patterns** · checklist pré-entrega.

**Como tratar a saída (regra dura):**
1. **Brand manual do cliente sobrescreve** paleta e tipografia. O engine não conhece a marca — entrega um default. Onde o brand define cor/fonte, o brand vence, ponto.
2. Aproveitar o que o brand **não** cobre: cor de CTA quando não especificada, par tipográfico de apoio, efeitos/micro-interações, **anti-patterns**, UX guidelines, chart types (se houver seção de dados).
3. Pattern e seções são sugestão — cruzar com o que a copy aprovada cobre (Fase 1). Não criar seção que a copy não tem.
4. Usar **só** `--design-system`. A geração de código multi-stack do upstream é descartada — a stack aqui é fixa (HTML single-file + Tailwind CDN).

Salvar a saída junto da copy/brief da campanha como `design-system.md`.

---

### Fase 2 — Anti-Slop Foundation (N2)

Ler `references/html-architecture.md`.

**Stack obrigatória:**
- Tailwind CDN (não build step) + config inline espelhando brand manual
- Alpine.js apenas se precisar interatividade (FAQ, menu mobile, form state)
- Google Fonts via `<link>` no `<head>`
- Single-file: tudo num único `.html`

**Regras de construção:**
1. Mobile-first — todo layout mobile por padrão, `md:` pra desktop
2. Formulário com `fetch()` + loading state + success message (ver `aprendizados.md`)
3. Meta tags completas: title, description, OG, favicon
4. Semântico: `<header>`, `<main>`, `<section id="...">`, `<footer>`
5. `scroll-margin-top` em todo `section[id]` (evita header fixo cobrindo âncora)
6. Z-index explícito: `z-40` header/cookies · `z-30` sticky mobile/WA flutuante · `z-20` modals
7. `data-cta="nome-intencao"` em todo botão/link comercial
8. Comentários de seção `<!-- ====== HERO ====== -->` pra navegação em arquivo longo
9. Sem IDs fake: `[GTM_ID]`, `[FORMSPREE_ID]`, `[META_PIXEL_ID]` ficam literais

**Modo GEO (condicional):** se o entregável for site institucional ou multi-página, ler `references/geo.md` aqui e aplicar a camada de engenharia GEO-ready já na fundação (HTML semântico, conteúdo no HTML sem depender de JS, `robots.txt` + `sitemap.xml`, linkagem interna densa, JSON-LD por tipo de página). É mais barato construir GEO-ready do que retrofitar. **Não ativar em LP de campanha paga** — busca generativa não alimenta tráfego pago.

**Teto do N2:** o site é um template bem feito. Bonito "para IA", não pra quem tem olho treinado.

---

### Fase 3 — Moodboard Visual (N3)

Ler `references/moodboard-process.md`.

**Quando ir além do N2:**
- Sempre que o cliente for pagante
- Quando o brief mencionar "premium", "diferenciado", "moderno"
- Quando o target é um decisor com olho apurado (agronegócio B2B de alto ticket)

**Processo resumido:**
1. Coletar 5–10 screenshots de Awwwards / Godly / Pinterest / Dribbble
2. Identificar: o que está funcionando visualmente em cada referência?
3. Escolher elementos de referências diferentes (hero de um, cards de outro)
4. Passar os screenshots para o Claude junto com o brief: "Quero este estilo visual"

**Armadilha N3 (vibe gap):** Claude Code traduz ~50% do visual de uma screenshot. Ficar pedindo ajuste em cima de ajuste fecha o loop no mesmo lugar. A saída é N4.

---

### Fase 4 — Site Teardown (N4)

Ler `references/site-teardown.md`.

**Processo resumido:**
1. Escolher 1 site-âncora (do moodboard)
2. Usar Firecrawl MCP (`mcp__claude_ai_Firecrawl__firecrawl_scrape`) para puxar HTML completo
3. Identificar CSS e JS externos, puxar também (não resumir — conteúdo integral)
4. Pedir ao Claude para explicar os efeitos que você não entende (constrói vocabulário)
5. Instruir: "Use como ponto de partida — clone adaptado ao nosso design"

**Por que o teardown muda o resultado:** com o código real na mesa, você tem uma conversa inteligente com o Claude. Sem o código, você tenta descrever um problema visual só com texto. Isso tem teto.

**Armadilha N4 (clone ceiling):** clonar sem entender. O objetivo é aprender o vocabulário, não copiar. Se você virar "accept-accept-next" cegamente, qualquer ajuste novo vai quebrar.

---

### Fase 5 — Hero Autoral + Componentes (N5)

Ler `references/hero-asset-autoral.md` e `references/component-shopping.md`.

#### 5a. Componentes de bibliotecas

Substituir seções genéricas por componentes curados. Ler `references/component-shopping.md`.

**Ponto de partida obrigatório: https://21st.dev/community/components.** Toda seção que precisa de componente começa por essa galeria — é o default, não uma opção entre outras. Filtrar pela categoria da seção (hero, navbar, pricing, testimonial, FAQ…), pegar o "Copy Prompt"/código, adaptar de React para HTML single-file + Tailwind + Alpine.

Descer para os fallbacks **só** quando o community não cobrir a seção:
- **Magic UI / Aceternity** — efeitos React mais pesados (beam, marquee, spotlight)
- **CodePen** — efeitos CSS/JS pontuais sem biblioteca

Fluxo: achou no community → copia o prompt/código → pede ao Claude para integrar → adapta para HTML+Tailwind+Alpine e aplica cor/fonte do brand.

Aplicar em **todas** as seções, não só no hero: cards chatos, CTA flat, footer padrão — tudo passa pelo filtro.

#### 5b. Asset hero autoral (imagem-conceito)

Em vez de background genérico, criar imagem que conta a história do produto.

Fluxo:
1. Usar `image-prompt-generator` para construir o prompt
2. Executar `gen-image.sh` (gpt-image-2) para gerar a imagem
3. Validar: a imagem tem negative space à direita para o texto do hero?
4. Instruir: "Use esta imagem como background do hero, texto à esquerda"

Logo SEMPRE via PNG/SVG oficial — nunca via gen-image.sh.

#### 5c. Upgrade para vídeo loop (opcional)

Quando o brief pede hero em movimento:
- Usar a imagem como start frame em Kling 3.0 ou Veo 3.1
- Movimento sutil (vento, luz, água) — nunca videogame
- Duração ~15s para loop imperceptível
- **Obrigatório:** vídeo só no desktop, imagem estática no mobile (atributo `<source media="(min-width:768px)">` ou Alpine.js)
- Atributos iOS-safe: `autoplay muted loop playsinline preload="metadata" poster="..."` (ver `aprendizados.md` §Padrão vídeo hero)

---

### Fase 6 — Micro-Detalhes Premium (N6)

Ler `references/micro-details-premium.md` e `references/editor-visual-hibrido.md`.

**Quando entrar aqui:** após a estrutura estar sólida. N6 é camada de polish, não de construção.

**Lista de micro-detalhes prioritários (implementar por ordem de impacto):**

| Detalhe | Impacto visual | Esforço |
|---------|---------------|---------|
| Tipografia deliberada (Google Fonts, não default) | Alto | Baixo |
| Glass morphism em cards | Alto | Médio |
| Contadores animados (0 → número no load) | Alto | Médio |
| Ticker rolante entre seções | Médio | Baixo |
| Light sweep sutil em headlines | Médio | Baixo |
| Scroll indicator no topo | Baixo | Baixo |
| Loading state com leve hesitação (300ms delay) | Médio | Baixo |

Nenhum desses é percebido conscientemente, mas juntos comunicam **cuidado** — e cuidado é o que separa "feito com IA" de "crafted com IA como ferramenta".

**Fluxo híbrido com editor visual:**
1. Fazer screenshot do estado atual
2. Abrir no Stitch (Google) ou epic-paper e gerar variações visuais
3. Escolher variação favorita
4. Voltar ao Claude: "Implemente esse efeito de glass morphism"
5. Pedir ao Claude para fazer web search de best practices antes de codar o efeito

---

### Fase 7 — QA Pré-Deploy

Ler `references/cro-checklist.md`.

**Validações grep obrigatórias:**
```bash
grep -c "<h1" index.html                      # esperado: 1
grep -n "https.*https" index.html             # esperado: 0 matches
grep -c 'rel="canonical"' index.html          # esperado: 1
grep -c 'application/ld+json' index.html      # esperado: ≥1
```

**Se modo GEO ativo:** rodar também o checklist GEO-ready e as validações grep extras de `references/geo.md` (robots.txt com bots de IA, sitemap.xml, tabelas em `<table>` real, JSON-LD do tipo certo).

**Checklist visual (mobile first):**
- [ ] Headline visível sem scroll no mobile
- [ ] CTA aparece 3+ vezes na página
- [ ] Botão CTA tem cor contrastante (não mesma do fundo)
- [ ] Prova social tem nome + resultado específico (não "cliente satisfeito")
- [ ] FAQ responde objeções reais do ICP
- [ ] Form: max 3-4 campos
- [ ] Mobile: CTA sticky no bottom
- [ ] Hero video: imagem estática no mobile, vídeo só no desktop
- [ ] Logo visível em fundo claro e escuro
- [ ] Sem `[PLACEHOLDER]` descoberto no código (buscar com grep)
- [ ] Sem erros no console (abrir DevTools)

**Salvar em:** `Clientes/{cliente}/Campanhas/{campanha}/index.html`

---

## Integração com Outras Skills

| Skill | Relação |
|-------|---------|
| skill-funil-copy | Fornece a copy (INPUT obrigatório) |
| skill-vibecoding | Pode gerar spec que esta skill executa |
| skill-branding | Fornece cores, fontes, logo |
| image-prompt-generator | Helper obrigatório antes de gen-image.sh |
| skill-arte-onbrand | Para texto crítico em PT-BR como PNG/imagem |
| anti-ai-copy | Toda copy da LP passa pela régua |
| skill-auditoria | Audita o output final (nota mín. 80/100) |

---

## Instruções de Deploy

```
OPÇÃO 1 — Vercel (recomendado):
vercel --prod --yes  (na pasta com index.html)

OPÇÃO 2 — Netlify:
Sites → Drag and drop o HTML

OPÇÃO 3 — GitHub Pages:
Subir como index.html → Settings → Pages → Deploy from main
```
