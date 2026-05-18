# Editor Visual Híbrido — N6b Quando Sair do Terminal

> Carregar quando: você está em loop de "ajusta isso → ainda não ficou certo" por mais de 3 iterações. O texto está limitando o visual. É hora de mostrar em vez de descrever.

## Princípio

Claude Code é excelente com texto. Visual iterativo no texto tem teto: você tenta descrever o que quer com palavras, Claude interpreta, nem sempre bate. O loop de ajuste texto→código→visual torna-se ineficiente rapidamente.

A saída é um fluxo híbrido: gerar variação visual em ferramenta externa → escolher → voltar ao Claude com a imagem. Mostra em vez de descrever.

---

## Ferramentas

### Stitch — Google (gratuito, AI-first)

**URL:** https://stitch.withgoogle.com

Canvas visual onde você:
- Cola screenshot do estado atual do site
- Pede redesigns em linguagem natural ("muda o hero para tons mais escuros, menos espaço em branco")
- Gera múltiplas variações com clique direito → "Generate variations"
- Ajusta layout, cores, imagens sem sair do canvas

**Quando usar:**
- Você tem o draft e quer explorar direções visuais antes de codar
- Você quer ver 4 variações de paleta em 2 minutos
- Você está travado em "como deveria ser o layout dessa seção"

**Fluxo:**
1. Screenshot do estado atual (`Cmd+Shift+4` no Mac → selecionar a seção)
2. Abrir Stitch → novo canvas → colar a screenshot
3. Pedir: "Redesenha essa seção com glass morphism nos cards e paleta mais escura"
4. Stitch gera variações → escolher favorita
5. Screenshot da variação escolhida
6. Voltar ao Claude: "Aqui está a direção visual que quero. Implemente esse efeito de [X] usando Tailwind."

**Limitação:** Stitch gera imagens, não código. O Claude ainda vai codificar. Mas a imagem gerada é um brief visual perfeito.

### epic-paper (Paper.design MCP)

**Quando usar no AZB:** para designs que precisam de edição mais estruturada — layouts de seção específicos, carrosséis, artes on-brand que depois viram assets da LP.

**Diferença do Stitch:** epic-paper gera designs editáveis (não só imagens). Útil quando o output vai ser usado como PNG/SVG em múltiplos lugares (cards de depoimento, infográfico de prova social, seção com ilustração).

**Ferramentas do MCP:**
- `mcp__claude_ai_Canva__generate-design` — gerar design a partir de descrição
- `mcp__claude_ai_Canva__perform-editing-operations` — editar design existente
- `mcp__claude_ai_Canva__export-design` — exportar como PNG/PDF

### Figma / Penpot (se KAM tem conta)

Para LPs com múltiplos stakeholders aprovando o design antes do código, criar o mockup em Figma primeiro. Mais overhead, mais alinhamento.

**Quando vale:** LP de lançamento grande (produto novo, campanha maior), onde o cliente vai querer revisar o visual antes de ir para HTML.

**Fluxo:**
1. Criar mockup no Figma (desktop + mobile)
2. Aprovar com o cliente
3. Usar o Figma como referência visual para o Claude: exportar como PNG e usar como moodboard

---

## Fluxo Híbrido Completo

### Quando entrar nesse fluxo

- LP está no N4/N5 (estrutura pronta, hero asset no lugar)
- Há seções que "estão funcionando mas não estão premium"
- Você repetiu o mesmo pedido de ajuste 3+ vezes sem resultado satisfatório

### Passo a passo

```
1. Screenshot do estado atual do draft

2. Abrir Stitch/epic-paper
   → Colar screenshot
   → Pedir variações: "Quero 4 variações dessa seção:
      - Mais dark (fundo quase preto, texto claro)
      - Glass morphism nos cards
      - Layout em 2 colunas em vez de 3
      - Com ticker de números abaixo dos cards"

3. Escolher a variação que mais parece certo

4. Analisar o que mudou:
   - Qual elemento visual fez a diferença?
   - É a cor? O espaçamento? O efeito nos cards?
   Nomear o efeito específico é o que permite pedir ao Claude com precisão

5. Voltar ao Claude com:
   → A imagem da variação escolhida (screenshot)
   → A descrição específica do efeito: "Quero implementar este glass morphism nos cards.
      O background dos cards é rgba(255,255,255,0.08), com backdrop-blur de 12px e
      borda de 1px rgba(255,255,255,0.15). Antes de codar, faz web search de 
      'css glass morphism best practices 2026' para ver se tem alguma consideração 
      de performance que eu não conheço."

6. Claude implementa com referência visual clara
```

### Por que "web search de best practices" antes de codar

Essa instrução específica do playbook (Nível 6) tem um motivo: Claude code às vezes implementa técnicas desatualizadas ou com anti-padrões conhecidos que foram corrigidos. Pedir a web search força o Claude a verificar o estado da arte antes de escrever o código. Para efeitos como `backdrop-filter`, `scroll-driven-animation`, `CSS Houdini` — que evoluem rápido — esse passo vale o tempo.

---

## Google Fonts — Exploração de Tipografia

Quando a tipografia do brand manual é genérica ou não existe, explorar aqui antes de implementar.

**URL:** https://fonts.google.com

**Método de seleção rápida:**
1. Abrir Google Fonts
2. Digitar a headline do hero no campo de preview
3. Ativar filtro "Serif" → testar as 5 primeiras opções
4. Ativar filtro "Sans-serif" → testar as 5 primeiras opções
5. Fazer a combinação: Serif no headline + Sans-serif no body

**Pares validados para contexto agro B2B:**

| Tom | Headline | Body | Exemplo |
|-----|---------|------|---------|
| Premium/técnico | Fraunces 700 | Inter 400/600 | Consultoria, premium agro |
| Robusto/direto | Barlow Condensed 700 | Barlow 400/500 | Equipamentos, insumos |
| Moderno/digital | DM Serif Display 400 | DM Sans 400/600 | Tech agro, cursos online |
| Institucional/sério | Source Serif 4 600 | Source Sans 3 400 | Cooperativas, associações |

**Como entregar ao Claude:**
```
Troque a tipografia da LP para:
- Headlines (h1, h2): 'Fraunces', serif, weight 700
- Body e UI elements: 'Inter', sans-serif, weight 400/500/600

Link Google Fonts:
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

Usar clamp() para tamanho responsivo:
h1: clamp(2.5rem, 5vw, 4.5rem)
h2: clamp(1.75rem, 3.5vw, 3rem)
h3: clamp(1.25rem, 2vw, 1.75rem)
```

---

## Quando NÃO Usar Editor Visual

- LP simples de captura (captura + form + 3 bullets) — overhead maior que o ganho
- LP com prazo curto (menos de 4 horas) — ir direto para N2 sólido
- Iteração de conteúdo (mudança de copy, ajuste de CTA) — não precisa visual para isso
