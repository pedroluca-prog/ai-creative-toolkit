# Moodboard Process — N3 Visual Director

> Carregar nesta fase: antes de escrever o primeiro componente. O moodboard define o DNA visual. Sem ele, o Claude trabalha cego.

## Por que moodboard antes de código

Texto descreve mal o visual. "Dark and premium" produz gradiente roxo genérico. Uma screenshot de Awwwards produz o que o texto nunca conseguiria. O moodboard é o vocabulário visual que você passa pro Claude.

**Regra:** cada sessão de LP N3+ começa com pelo menos 3 screenshots de referência.

---

## Fontes de Referência (ordenadas por qualidade)

### Awwwards (awwwards.com)
- Trabalhos premiados globais — o topo de qualidade front-end
- Filtrar por: categoria "Landing Pages" · Award "Site of the Day" · Technologies "HTML/CSS"
- Focar na navegação: hover states, transições, como as seções se conectam
- **Agro/B2B:** buscar na categoria "Corporate" e "Business" — mais próximo do tom certo

### Godly (godly.website)
- Scroll infinito de sites bem feitos, mais rápido de navegar
- Forte em startups SaaS e tecnologia — útil para tom "moderno sem ser chamativo"
- Filtro por cor (buscar paletas neutras + um acento) ajuda a alinhar com brand manual

### Pinterest
- Surpreendentemente forte para landing pages B2B e agro
- Buscar: "landing page design", "hero section design", "agricultural website design"
- Usar como banco de micro-referências: só o hero, só os cards, só o footer

### Dribbble (dribbble.com)
- Designs de conceito — ótimo para layouts criativos que ainda não viraram sites reais
- Filtrar por: "Landing Page", "Web Design", "UI/UX"
- Menos confiável para código — é mockup, não site funcional. Usar só como inspiração visual

---

## Como Fazer o Moodboard em Sessão

### Passo 1 — Definir o "mood" do cliente em 3 adjetivos

Antes de abrir os sites, responder:
- O que o cliente NÃO quer? ("não quero parecer startup americano")
- O que o cliente admira em concorrentes? ("gosto do site da Fazenda X")
- Qual é o público? (decisores 40-60 anos agro B2B = menos fluidez, mais solidez e confiança)

Resultado: 3 adjetivos como filtro. Ex: "robusto · técnico · confiável" ou "moderno · direto · premium agro".

### Passo 2 — Coletar 5–10 screenshots

Para cada referência, capturar:
- O hero completo (desktop)
- Uma seção interna com cards ou features
- O footer ou seção de prova social
- (opcional) um hover state ou animação

Salvar em pasta local: `moodboard/{cliente}/ref-01-nome-site/` com nomes descritivos.

### Passo 3 — Montar a sessão com o Claude

Abrir nova sessão e passar:
```
Vamos construir a landing page para [cliente]. Aqui estão as referências visuais 
que definem o estilo que eu quero: [screenshots]. 

Quero capturar:
- Hero de [site A] — o negative space e a tipografia grande
- Cards de [site B] — o glass morphism e a borda sutil
- A cor de acento de [site C] — não o roxo, o verde-escuro deles

O brand manual do cliente usa: [cor primária], [cor secundária], [fonte].
```

### Passo 4 — Identificar o site-âncora

Após ver as referências, escolher 1 site que serve de base estrutural (o que mais alinha com o objetivo da LP). Esse será o alvo do teardown na Fase 4.

**Critério de escolha do âncora:**
- Estrutura de seções similar ao que você precisa construir
- Código HTML/CSS provável de ser limpo e legível (sites em Tailwind/Vanilla são melhores que Webflow)
- Não precisa ter o mesmo setor — só a estrutura e os efeitos que você quer replicar

---

## O que Documentar do Moodboard

Para cada referência selecionada, anotar:
```
Site: [nome]
URL: [url]
Capturar: [hero / cards / typography / animation]
Por que: [o que está funcionando visualmente]
Adaptar: [como vai se encaixar no brand do cliente]
```

Isso vira o briefing visual que você passa pro Claude. Quanto mais específico, melhor o output.

---

## Erro Clássico do N3 — O Vibe Gap

Claude Code traduz ~50% da referência visual. O 50% que se perde são:
- Micro-animações (timing curves, spring physics)
- Texturas sutis de background (noise, grain, gradient mesh)
- Hierarquia de peso tipográfico entre headline/body/caption
- Espaçamento deliberado que não segue grid óbvio

A saída NÃO é ficar em loop de "ajusta isso, ajusta aquilo". É ir pro N4 (teardown) e puxar o código real que gera o efeito.

**Regra:** se passar de 3 iterações tentando replicar um efeito visual só por screenshot, ir pro teardown.
