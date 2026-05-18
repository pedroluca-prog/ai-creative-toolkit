# Site Teardown — N4 Cloner

> Carregar quando: você tem o site-âncora definido (saída do moodboard) e precisa passar do "parece com" para o "é feito com".

## Por que o Teardown Muda Tudo

Screenshot → código tem perda de ~50%. Código → código tem perda de ~10%.

Com o HTML/CSS/JS real na mesa, você e o Claude têm uma conversa diferente:
- "Como eles fizeram esse background?" → Claude mostra o CSS exato
- "O que é um `backdrop-filter`?" → Claude explica com o código que você está vendo
- "Como funciona o `@keyframes` dessa animação?" → Claude lê, explica, adapta

Você constrói vocabulário visual enquanto constrói o site. Isso é o que os níveis 1-3 não conseguem dar.

---

## Os 3 Pilares de Qualquer Site

| Pilar | O que é | O que controla |
|-------|---------|---------------|
| HTML | ossos | estrutura, hierarquia, semântica |
| CSS | roupas | visual, animações, responsividade |
| JavaScript | músculos | interação, scroll behavior, state |

Entender onde cada efeito mora é o vocabulário mínimo para pedir ajustes precisos.

---

## Processo de Teardown (passo a passo)

### 1. Puxar o HTML completo via Firecrawl

Usar o MCP Firecrawl para pegar o HTML integral — não um resumo.

```
mcp__claude_ai_Firecrawl__firecrawl_scrape
url: [URL do site âncora]
formats: ["html", "rawHtml"]
onlyMainContent: false
```

**Por que Firecrawl e não `WebFetch` direto:** o `web_fetch` padrão do Claude passa por um modelo menor que sumariza. Você perde os atributos de CSS class, os data-attributes, as classes do Tailwind. O Firecrawl puxa o raw HTML.

**Se o site exigir JS para renderizar** (SPA React/Next): usar `firecrawl_browser_create` + `firecrawl_interact` para esperar o JS rodar antes de capturar.

### 2. Identificar os arquivos CSS e JS externos

No final do HTML, procurar:
```html
<link rel="stylesheet" href="/assets/main-abc123.css">
<script src="/assets/bundle-def456.js"></script>
```

Puxar cada um com Firecrawl também:
```
firecrawl_scrape url: [URL_BASE + path_do_css]
```

**Importante:** sites com Tailwind inline não têm CSS externo — o estilo está nas classes HTML. Nesses casos, o HTML já é o suficiente.

### 3. Pedir ao Claude para explicar os efeitos que você quer

Com o código na tela, perguntar sobre os efeitos específicos do moodboard:

```
Com base nesse CSS, como eles fizeram:
- O background com textura de ruído (noise)?
- O efeito de glass morphism nos cards?
- A animação de scroll nessa seção?

Me explique a técnica, não só o código — quero entender o que está acontecendo.
```

Esse passo **é opcional mas valioso**. Cada efeito que você entende vira ferramenta permanente no seu repertório.

### 4. Instruir a clonar adaptado

```
Com base no HTML/CSS/JS desse site, crie a estrutura base da nossa landing page.

Adaptar:
- Paleta: trocar [cor deles] por [cor do brand manual]
- Tipografia: trocar [fonte deles] por [fonte do brand manual]
- Conteúdo: os textos são placeholders por enquanto — estrutura é o que importa
- Manter: a estrutura de grid, as técnicas de animação, os hover states

A página vai ter as seções: [lista do plan mode]
```

---

## Glossário — Termos que Aparecem em Sites Bons

Construir vocabulário para pedir ajustes precisos:

| Termo | O que é | Onde aparece |
|-------|---------|-------------|
| `backdrop-filter: blur()` | desfoque do que está atrás do elemento | glass morphism em cards |
| `@keyframes` | definição de animação CSS pura | entradas, pulsos, sweeps |
| `transition: all .3s ease` | transição suave em propriedades | hover states |
| `clip-path: polygon()` | cortar elemento em forma geométrica | seções com corte diagonal |
| `mix-blend-mode: overlay` | blending de camadas (tipo Photoshop) | efeitos de sobreposição de cor |
| `scroll-driven-animation` | animação vinculada ao progresso de scroll | parallax, fade-in ao entrar na viewport |
| `IntersectionObserver` | JS: detectar quando elemento entra na viewport | trigger de animação + contadores |
| `CSS Grid` com `auto-fill` | grade responsiva sem breakpoints | galerias de cards |
| `clamp()` | tamanho de fonte fluido entre min e max | headlines responsivas sem `@media` |
| `will-change: transform` | hint pro browser otimizar camada de GPU | animações pesadas |
| `prefers-reduced-motion` | respeitar preferência do usuário por menos animação | acessibilidade |
| `transform: translateZ(0)` | forçar GPU compositing | fix de flickering em animações |

---

## Quando o Teardown não Funciona Bem

- **Site em Webflow:** código gerado é verboso demais e difícil de adaptar. Usar como referência visual apenas.
- **Site em WordPress + Page Builder:** HTML cheio de `div` sem semântica. Pegar só os efeitos CSS que interessam.
- **SPA em React sem SSR:** Firecrawl pode pegar o HTML antes do JS rodar. Usar `browser_create` + `interact` para aguardar.
- **Site com CSS-in-JS (Emotion, styled-components):** os estilos estão num `<style>` gerado dinamicamente no head — Firecrawl pega mas o nome das classes é hash aleatório. Nesses casos, inspecionar no DevTools é mais produtivo.

---

## Adaptação para o Contexto AZB (Agro B2B)

Sites de referência que funcionam bem como âncoras para clientes AZB:

**Estilo robusto/técnico (fazendas, insumos, maquinário):**
- Sites institucionais de marcas de equipamento agrícola europeu (John Deere, AGCO, Fendt)
- Não clonar o conteúdo — clonar a estrutura de hero + features + depoimento

**Estilo moderno/digital (cursos, consultoria, tech agro):**
- Sites de SaaS B2B americanos em Tailwind (Vercel, Linear, Render)
- Mais próximos do tom que Escola Pecuária e produtos de capacitação precisam

**Regra AZB:** sempre verificar se o site âncora tem copyright agressivo antes de usar como base de código. Sites em Tailwind open-source são escolha mais segura.
