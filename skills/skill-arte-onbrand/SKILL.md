---
name: skill-arte-onbrand
description: Gera PNGs on-brand (posts estáticos e slides de carrossel) a partir de copy e do manual da marca do cliente. Use quando precisar montar arte visual com TEXTO crítico em português — números, tabelas, citações, CTAs, headlines. O texto é renderizado nativo pelo Chromium (HTML+CSS), não gerado por modelo de difusão — resultado garantidamente sem typos de acentuação/ortografia.
---

# skill-arte-onbrand — Router

## Quando usar

Use esta skill para **qualquer slide com texto crítico** em que a grafia precise estar correta:
- Posts estáticos com número grande (ex: "R$ 367", "R$ 10 bilhões")
- Slides de carrossel com dados, tabelas, citações, CTAs, headlines
- Qualquer arte on-brand em que typo de IA seria inaceitável

**Não use** para:
- Artes 100% fotográficas → use `gen-image.sh` (gpt-image-2) direto, com prompt construído pela skill `image-prompt-generator`
- Entregáveis que precisam ser editáveis pelo cliente depois → use `epic-paper` (Paper.design via MCP, substitui Canva). epic-paper é renderer DIFERENTE de skill-arte-onbrand — surface colaborativa (Paper Desktop) vs. PNG terminal determinístico. Para produção final, esta skill aqui é o caminho default.
- Vídeos (use `skill-video-remotion`, `skill-roteiro-video` ou `skill-edicao-anuncios-video`)

## Fluxo híbrido com Nano Banana

A skill pode receber uma **foto de fundo** gerada pelo Nano Banana (passada como `backgroundImage`) e sobrepor texto HTML — ideal para capas de carrossel.

```
Nano Banana (fundo fotográfico)  ─┐
                                  ├─►  skill-arte-onbrand ─►  PNG final
Copy + Brand manual ──────────────┘
```

Se não houver foto, os templates usam cor sólida + padrão geométrico fallback.

## Inputs

1. `manualPath` — path absoluto do `Inteligência/foundation/manual-da-marca-{cliente}.html`. A skill extrai automaticamente paleta hex, fontes (Google Fonts link incluído) e logo.
2. `clienteDir` — path absoluto da pasta do cliente (usado para resolver `backgroundImage` relativos e para buscar logo em `Arquivos {cliente}/.../*.svg|png`).
3. `jobs[]` — array de tarefas de render. Cada job:
   - `template` — nome do template (sem extensão). Ver [Templates disponíveis](#templates-disponíveis).
   - `size` — `"square"` (1080×1080), `"portrait"` (1080×1350) ou `"story"` (1080×1920). Default: square.
   - `outputPath` — path absoluto do PNG a gerar.
   - `backgroundImage` — opcional, path de imagem (Nano Banana ou foto do cliente).
   - `props` — dicionário de variáveis para o template. Ver cada template.

## Templates disponíveis

| Template | Use para | Props principais |
|---|---|---|
| `post-estatico-dado` | Número grande de destaque (arroba, crédito, ROI) | `eyebrow`, `title`, `highlight`, `subtitle`, `handle` |
| `post-estatico-citacao` | Frase de autoridade / testimonial | `quote`, `attribution`, `role`, `handle` |
| `carrossel-capa` | Slide 1 de carrossel (com ou sem foto de fundo) | `eyebrow`, `headline`, `subhead`, `pageNum`, `pageTotal` |
| `carrossel-texto` | Slide com parágrafos (contexto, explicação) — fundo enriquecido (gradient, padrão, símbolo) | `eyebrow`, `title`, `paragraphs[]` ou `bodyHtml`, `highlight`, `handle`, `pageNum`, `pageTotal` |
| `carrossel-foto-texto` | Slide com foto topo (45%) + corpo de texto bottom (55%) com gradient de transição | `eyebrow`, `title`, `paragraphs[]` ou `bodyHtml`, `highlight`, `handle`, `pageNum`, `pageTotal` + `backgroundImage` obrigatório |
| `carrossel-tabela` | Comparativo 2-colunas (ex: Tifton vs. Braquiária) | `eyebrow`, `title`, `colAHeader`, `colBHeader`, `rows[]` (array de `{label,a,b}`), `footnote`, `handle`, `pageNum`, `pageTotal` |
| `carrossel-cta` | Slide final com CTA em card destacado — fundo enriquecido | `eyebrow`, `title`, `body`, `ctaLabel`, `ctaValue`, `handle`, `pageNum`, `pageTotal` |

## Princípios visuais (onde colocar foto)

Cada carrossel deve ter **no mínimo ~40% dos slides com foto real ou gerada**, exceto quando o conteúdo é 100% numérico/tabular (aí a capa ainda precisa de foto). Slides sem foto devem usar **`carrossel-texto` ou `carrossel-cta` enriquecidos** — nunca cor chapada pura.

**Decisão por slide:**
1. **Slide é capa** → `carrossel-capa` com `backgroundImage` (foto real do banco ou Nano Banana)
2. **Slide tem texto médio + cena fotografável** ("o antes", "o depois", "implantação", "resultado") → `carrossel-foto-texto` com `backgroundImage`
3. **Slide é denso de texto, numérico ou conceitual** → `carrossel-texto` sem foto (fundo enriquecido cobre)
4. **Slide final com CTA** → `carrossel-cta` sem foto (fundo enriquecido cobre)

**Ordem de preferência para obter fotos:**
1. Banco de fotos reais do cliente
2. Pool de geradas aprovadas em `_banco-imagens-geradas/{tema}/`
3. gen-image.sh / Nano Banana (salvar output aprovado no pool temático para reuso)

**Nunca** peça texto PT-BR nem logos ao Nano Banana — Gemini erra acentos e hallucina logos. Texto é sempre renderizado via skill-arte-onbrand; logos vêm do SVG oficial.

## Sintaxe de texto (markdown inline)

Qualquer campo de texto aceita:
- `**palavra**` → `<strong>palavra</strong>` (renderizado em cor accent do brand)
- `\n` → quebra de linha (`<br>`)

Arrays são processados automaticamente:
- `paragraphs: [...]` → vira `<p>...</p>` cada
- `items: [...]` → vira `<ul><li>...</li></ul>`
- `rows: [{label,a,b}, ...]` → linhas de tabela comparativa

## Como chamar

### Via CLI (recomendado)

```bash
cd "skill-arte-onbrand"
node pipeline/cli.mjs --spec /caminho/para/spec.json
```

O spec.json deve ter o formato:
```json
{
  "manualPath": "/abs/path/manual-da-marca-cliente.html",
  "clienteDir": "/abs/path/pasta-do-cliente",
  "jobs": [
    {
      "template": "post-estatico-dado",
      "size": "square",
      "outputPath": "/abs/path/.../imagens/slide-01.png",
      "props": {
        "eyebrow": "Plano Safra 2025/26",
        "title": "O governo tá financiando recuperação de pastagem.",
        "highlight": "R$ 10 bilhões",
        "subtitle": "Você está aproveitando?",
        "handle": "@seuhandle"
      }
    }
  ]
}
```

### Em runtime Node

```js
import { compose } from "./pipeline/compose.mjs";
import { closeBrowser } from "./pipeline/render.mjs";

await compose({
  manualPath: "...",
  clienteDir: "...",
  template: "carrossel-tabela",
  size: "square",
  outputPath: "...",
  props: {
    title: "Proteína bruta",
    colAHeader: "Braquiária",
    colBHeader: "Tifton 85",
    rows: [{ label: "Na seca", a: "3-5%", b: "10-14%" }],
    footnote: "**Tifton na seca entrega o que braquiária não entrega nem na chuva.**",
  },
});
await closeBrowser();
```

## Pasta de output

```
{projeto}/{cliente}/Conteúdo/{ano}-{mes}/{formato}/{pasta-post}/imagens/slide-NN.png
```

Onde `{formato}` é `post-estatico`, `carrossel`, `reels`, etc.

## Dependências

- Node.js 20+ (o repo usa 24)
- Puppeteer (Chromium headless) — instalado via `npm install` na raiz desta skill

## Verificação rápida

Para testar a skill rapidamente num texto com acentos críticos PT-BR:
```bash
node pipeline/cli.mjs --spec /tmp/smoke-test-spec.json
```

Verifique o PNG — "Braquiária", "bilhões", "recuperação", "proteína", "não" devem renderizar com acentos perfeitos.

## Extensão (novos templates)

Para adicionar um novo template:
1. Criar `templates/{nome}.html` com placeholders `{{var}}`.
2. Usar as CSS variables da brand: `{{bgDeep}}`, `{{accent}}`, `{{accentLight}}`, `{{fontDisplay}}`, `{{fontBody}}`, `{{logoPath}}`, `{{googleFontsLink}}`.
3. Documentar as props esperadas no topo como comentário HTML.
4. Registrar no arquivo `references/design-principles.md`.

## Referências

- [references/design-principles.md](references/design-principles.md) — princípios anti-AI slop, hierarquia visual, escolhas tipográficas.
- [references/instagram-formats.md](references/instagram-formats.md) — dimensões, safe zones, padrões por canal.
- [aprendizados.md](aprendizados.md) — padrões que funcionam por cliente, erros recorrentes.
