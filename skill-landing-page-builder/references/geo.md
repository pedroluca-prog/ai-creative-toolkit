# GEO — Generative Engine Optimization (camada de engenharia)

> Referência carregada **sob demanda**. Ativar **só em site institucional ou multi-página** — não em LP de campanha paga (tráfego pago não depende de busca generativa).
> Escopo desta referência: **engenharia de build**. O que o agente de sites executa no HTML. Estratégia de conteúdo (produzir em inglês, domínios semânticos, estar no Reddit/Wikipédia) e medição ficam fora — são handoff pro content/strategist.

---

## Premissa: GEO é a "primeira batalha"

Quando alguém pergunta ao ChatGPT/Gemini/Perplexity "qual a melhor empresa de X", o motor não lê o site como humano. Ele:

1. Quebra a pergunta em ~200 variações (core fanouts), inclusive em inglês
2. Joga essas variações nos buscadores (Google, **Bing**, Brave)
3. Faz crawl em paralelo das páginas retornadas — **com orçamento de tempo curto**
4. Converte o conteúdo em embeddings, monta a nuvem semântica e compõe a resposta

O passo 3 é um portão. Site lento ou pesado é **cortado antes de ser avaliado**, por mais relevante que o conteúdo seja. A analogia da transcrição: chegar correndo no portão do ENEM carregando uma mochila de livros — se você não passa rápido, não importa o que tem na mochila.

Por isso GEO, na camada de build, é **performance + HTML semântico + crawlability**. Não é copy.

---

## 1. Performance — passar pelo portão

O crawler de LLM tem orçamento de tempo por página. Site lento sai do páreo.

- Carregamento de conteúdo **sub-segundo**. O HTML com o texto precisa estar disponível rápido, sem esperar JS.
- **Conteúdo no HTML, não no JS.** Texto, tabelas e listas renderizados server-side ou já no HTML estático. SPA que monta conteúdo via JavaScript depois do load = crawler vê página vazia.
- Sem JS/CSS decorativo bloqueando render. Animação, parallax, glass morphism são N6 — bonito pro humano, peso morto pro robô. Mantê-los `defer`/`async` e fora do caminho crítico.
- Imagens otimizadas e com `loading="lazy"` fora do above-the-fold. Imagem pesada derruba a velocidade — ver trade-off no item 5.
- Tailwind CDN + Alpine.js (stack padrão da skill) já é leve o suficiente. O risco é o que se adiciona em N5–N6.

**Trade-off do ponto de ótimo:** texto + imagem otimizada aumenta a "massa probabilística" (autoridade semântica) da página. Mas só vale se a página **ainda passa rápido**. Adicionar peso que estoura o orçamento de tempo é perder a página inteira.

---

## 2. HTML semântico limpo — o modelo "Wikipédia"

A Wikipédia é o site que mais influencia respostas de IA no Brasil em parte por engenharia: estática, leve, estrutura previsível, linkagem interna densa. Replicar esse padrão estrutural:

- Tags semânticas corretas: `<header>`, `<main>`, `<article>`, `<section id="...">`, `<footer>`, `<nav>`. Nada de `<div>` genérica onde existe tag certa.
- **Hierarquia de headings limpa e única:** um `<h1>`, `<h2>` para seções, `<h3>` para subseções. Sem pular níveis, sem `<h1>` decorativo.
- **Tabelas comparativas em `<table>` real** — `<thead>`, `<tbody>`, `<th>`. Não simular tabela com grid de divs. O crawler extrai tabela estruturada com precisão; grid de div vira sopa.
- Listas em `<ul>`/`<ol>`. FAQ em `<dl>` ou estrutura clara com heading por pergunta.
- Texto é texto. Nunca embutir informação crítica (preço, especificação, nome de categoria) dentro de imagem ou SVG — o crawler não lê.
- `<main>` contém o conteúdo de valor. Header/nav/footer fora dele.

---

## 3. Crawlability — deixar o robô entrar e navegar

- **`robots.txt` permissivo para bots de IA.** Por padrão muitos sites bloqueiam ou não declaram. Liberar explicitamente:

```
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Bingbot
Allow: /
User-agent: Amazonbot
Allow: /

Sitemap: https://dominio.com.br/sitemap.xml
```

- **`sitemap.xml` completo** e referenciado no `robots.txt` e no `<head>`. Em site multi-página, todas as URLs.
- **Linkagem interna densa.** Páginas conectadas por links contextuais no corpo do texto — não só pelo menu. É o que dá "autoridade semântica" (massa probabilística): o crawler navega com fluidez e o site ganha peso. Padrão Wikipédia.
- URLs limpas e descritivas: `/mudas/tifton-85` e não `/produto?id=4471`.
- `rel="canonical"` em toda página (a skill já valida isso no QA da Fase 7).
- Indexar no **Bing Webmaster Tools**, não só no Google Search Console. A correlação entre ranquear no Bing e ser citado no ChatGPT é muito maior que Google↔ChatGPT — a OpenAI usa Bing pesado no fanout.

---

## 4. Dados estruturados — JSON-LD

LLM tem viés por dado quantitativo e estruturado. Schema.org em JSON-LD entrega a informação mastigada e reforça precisão.

- `Organization` — sempre. Nome, logo, contato, redes sociais.
- `Product` / `Service` — em páginas de produto. Incluir specs numéricas.
- `FAQPage` — quando houver FAQ. Cada par pergunta/resposta vira entidade. Cobre core fanouts diretamente.
- `LocalBusiness` — se há operação física (endereço, horário, área de atendimento).
- `Article` / `BlogPosting` — em conteúdo editorial.
- `BreadcrumbList` — em site multi-página, reforça a hierarquia.

A skill já valida `application/ld+json` no QA (Fase 7). Em modo GEO, exigir o schema **certo para o tipo de página**, não só presença de um JSON-LD qualquer.

---

## 5. Conteúdo de precisão — o que é build, não copy

A copy vem pronta da skill-funil-copy. Mas a forma como ela é estruturada no HTML é build:

- **Números precisos vencem vagos.** "47 variedades" é priorizado sobre "dezenas de variedades" — o LLM lê precisão como confiabilidade. Na hora de montar tabelas e specs, usar o número exato que a copy fornecer; se a copy trouxe vago, sinalizar pro KAM.
- **Nomear a categoria explicitamente.** Se o produto é genérico farmacêutico, a página diz "genérico" — não eufemismo de marca. O crawler casa a pergunta do usuário ("melhores genéricos") com o termo literal + o campo semântico ao redor.
- **FAQ real e marcada.** Perguntas no formato como as pessoas perguntam, com `FAQPage` schema. É o jeito mais direto de cair nos core fanouts.
- **Tabela comparativa** sempre que houver comparação — é o formato que o LLM extrai e cita melhor.

---

## 6. Imagem otimizada para busca semântica

Do caso Pinterest: o embedding da imagem também entra na nuvem semântica e soma massa probabilística. Mas imagem mal feita só pesa.

- `alt` descritivo e semântico — descreve o conteúdo e o contexto, não "imagem1.jpg". É o que o crawler lê.
- Formato moderno (WebP/AVIF), comprimida, dimensão correta. Imagem pesada estoura o orçamento de tempo (item 1).
- `width`/`height` explícitos — evita layout shift.
- Nome de arquivo descritivo: `muda-tifton-85-pasto.webp`, não `IMG_4471.jpg`.
- Nunca texto crítico dentro da imagem.

---

## Checklist GEO-ready (Fase 7 — só em modo GEO)

**Performance**
- [ ] Conteúdo textual presente no HTML sem depender de JS
- [ ] Carregamento de conteúdo sub-segundo (PageSpeed mobile > 90)
- [ ] JS/CSS decorativo com `defer`/`async`, fora do caminho crítico
- [ ] Imagens em WebP/AVIF, comprimidas, `loading="lazy"` abaixo da dobra

**HTML semântico**
- [ ] Um único `<h1>`, hierarquia de headings sem pulos
- [ ] Tags semânticas corretas (`<main>`, `<article>`, `<section>`, `<nav>`)
- [ ] Tabelas comparativas em `<table>` real, não grid de div
- [ ] Nenhuma informação crítica embutida em imagem ou SVG

**Crawlability**
- [ ] `robots.txt` libera GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Bingbot
- [ ] `sitemap.xml` completo, referenciado no robots.txt
- [ ] Linkagem interna contextual no corpo (não só menu)
- [ ] URLs limpas e descritivas
- [ ] `rel="canonical"` em toda página

**Dados estruturados**
- [ ] JSON-LD `Organization` presente
- [ ] Schema específico do tipo de página (`Product`, `FAQPage`, `LocalBusiness`...)
- [ ] `FAQPage` quando houver FAQ

**Precisão**
- [ ] Números exatos nas tabelas/specs (não "dezenas", "vários")
- [ ] Categoria nomeada explicitamente, sem eufemismo
- [ ] `alt` semântico em todas as imagens

**Validações grep (somar às da Fase 7):**
```bash
grep -c 'application/ld+json' index.html      # esperado: ≥1 (idealmente ≥2 em modo GEO)
test -f robots.txt && grep -c 'GPTBot' robots.txt   # esperado: 1
test -f sitemap.xml && echo "sitemap ok"
grep -c '<table' index.html                   # >0 se a página tem comparação
```

---

## Anti-padrões

- **Conteúdo montado por JS.** Crawler vê página vazia. O conteúdo de valor tem que estar no HTML.
- **Peso decorativo no caminho crítico.** N5–N6 (vídeo hero, glass morphism, animação) bonito pro humano, mortal pro robô se bloqueia o render.
- **Grid de div fingindo tabela.** Perde a estrutura que o LLM extrai.
- **Texto crítico dentro de imagem.** Invisível pro crawler.
- **`robots.txt` que não declara bots de IA.** Default de muito CMS bloqueia ou ignora — o site some do fanout.
- **Otimizar só pro Google.** Bing tem correlação muito maior com ChatGPT. Indexar nos dois.
- **Cloaking / "página só para robôs" com conteúdo invisível ao humano.** A transcrição menciona "réplica para robôs" como tendência — mas conteúdo escondido do humano e servido só pro crawler é cloaking, penalizável. Não fazer. O caminho legítimo é uma página que é leve e semântica **para ambos**.
