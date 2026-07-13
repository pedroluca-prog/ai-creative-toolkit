# AI Creative Toolkit

> Skills para Claude Code cobrindo os 3 pilares de produção criativa com IA: vídeo programático, imagem on-brand e landing pages.

Cada skill é um conjunto de instruções carregadas no Claude Code que define **como** produzir um tipo específico de entregável criativo — com padrões técnicos, fluxos testados e aprendizados de produção real.

> Além das skills criativas, o repo inclui um **módulo de workflow de desenvolvimento** (Spec → Break → Plan → Execute) em [`dev-workflow/`](dev-workflow/) — pule para [essa seção](#módulo-dev-workflow-spec--break--plan--execute) se veio pelo lado dev.

---

## Skill Transversal: anti-ai-copy

Antes dos 3 kits, uma régua que vale pra **todo texto** produzido em qualquer kit (legendas de carrossel, scripts de vídeo, copy de LP, CTAs).

| Skill | Quando usar | O que faz |
|-------|------------|-----------|
| `anti-ai-copy` | Toda produção e revisão de texto | Régua operacional: princípio fundante, 11 grupos de desperdício, maquinário retórico transferível (período longo + remate curto, tríade, chiasmus, abertura como veredito, fechamento como estocada) e teste de bolso de 7 perguntas |

Aplica antes de entregar qualquer copy. Tem prioridade sobre outras skills de texto.

---

## Os 3 Kits

### Kit Vídeo

| Skill | Quando usar | Como funciona |
|-------|------------|---------------|
| `skill-video-remotion` | Vídeo 100% programático sem pessoa gravando (institucional, motion graphics, lettering animado) | React + Remotion → composition + cenas → `npx remotion render` → MP4 |
| `skill-edicao-anuncios-video` | Vídeo bruto existente vira anúncio / conteúdo | Toolkit 4-layer: método cinematográfico → Video-Use (corte por transcrição) → HyperFrames (motion overlay) → ffmpeg |

**Skill global complementar:** `remotion-best-practices` (instalar em `~/.claude/skills/`)

### Kit Imagens

| Skill | Quando usar | Como funciona |
|-------|------------|---------------|
| `skill-arte-onbrand` | Texto crítico em PT-BR: carrosséis, slides, posts com número/tabela/citação | HTML+CSS → Chromium headless → PNG. Zero typos de acentuação. |
| `image-prompt-generator` | Construir prompt para gpt-image-2 (gen-image.sh) | Helper que estrutura prompt por surface: fotografia realista, editorial, conceitual |

**Script:** `scripts/gen-image.sh` — executa gpt-image-2 via OpenAI API. Requer `OPENAI_API_KEY`.

### Kit Landing Page

| Skill | Quando usar | Como funciona |
|-------|------------|---------------|
| `skill-landing-page-builder` | Construir LP HTML single-file pronta pra deploy | 7 fases: plan mode → anti-slop → moodboard → site teardown → hero autoral → micro-detalhes premium → QA |

**Playbook:** `skill-landing-page-builder/references/playbook-7-niveis.md` — Os 7 Níveis de Front-End Design com Claude Code.

---

## Módulo Dev: Workflow Spec → Break → Plan → Execute

Além das skills criativas, o repo carrega um **workflow agêntico de desenvolvimento** em [`dev-workflow/`](dev-workflow/) — um fluxo de 4 etapas (cada uma com um agente especializado) que estrutura mudanças de código não-triviais e evita o modo de falha clássico do código gerado por IA: implementar antes de entender.

| Etapa | Comando | Agente |
|---|---|---|
| 1. Spec | `/spec-feature` | — (conversacional) |
| 2. Break | `/break-spec` | `spec-breaker` |
| 3. Plan | `/plan-issue` | `issue-planner` |
| 4. Execute | `/execute-issue` | `component-writer` / `supabase-writer` |

O estado de cada issue mora no próprio nome do arquivo (`[BRUTA]` → `[PLANEJADA]` → `[IMPLEMENTADA]`), então o fluxo é retomável e auditável. Diferente das skills, este módulo é **copy-in** (não faz parte do plugin): copia-se `.claude/agents/` e `.claude/commands/` para o repositório-alvo. Instruções completas em [`dev-workflow/README.md`](dev-workflow/README.md).

---

## Como Instalar

### 1. Clonar o repo

```bash
git clone https://github.com/pedroluca-prog/ai-creative-toolkit.git
```

Ou instale como plugin do Claude Code (recomendado):

```bash
# No Claude Code:
/plugin marketplace add pedroluca-prog/ai-creative-toolkit
/plugin install ai-creative-toolkit@ai-creative-toolkit
```

### 2. Instalar dependências das skills que precisam de Node

```bash
# skill-arte-onbrand (Puppeteer)
cd ai-creative-toolkit/skills/skill-arte-onbrand && npm install

# skill-video-remotion — instalar Remotion no projeto de cada vídeo
# npx create-video@latest  (na pasta onde for criar o vídeo)
```

### 3. Configurar variáveis de ambiente

Para `gen-image.sh`:
```bash
export OPENAI_API_KEY="sk-..."
```

Para `skill-video-remotion` (narração ElevenLabs — opcional):
```bash
export ELEVENLABS_API_KEY="..."
```

### 4. Registrar skills no Claude Code

As skills ficam ativas quando o Claude Code detecta código ou contexto relevante. Para invocar manualmente:

```
/skill skill-video-remotion
/skill skill-edicao-anuncios-video
/skill skill-arte-onbrand
/skill skill-landing-page-builder
```

Ou em linguagem natural: "use a skill de vídeo remotion para criar um vídeo institucional de 60s".

---

## Estrutura do Repo

```
ai-creative-toolkit/
├── .claude-plugin/
│   ├── marketplace.json      ← define o marketplace ai-creative-toolkit
│   └── plugin.json           ← define o plugin único (com todas as skills)
│
├── skills/
│   ├── anti-ai-copy/
│   │   └── SKILL.md          ← régua transversal pra todo texto
│   │
│   ├── skill-video-remotion/
│   │   ├── SKILL.md          ← instruções principais (lidas no boot)
│   │   ├── aprendizados.md   ← padrões acumulados após uso real
│   │   ├── references/       ← docs técnicas carregadas sob demanda
│   │   └── scripts/          ← helpers shell
│   │
│   ├── skill-edicao-anuncios-video/
│   │   ├── SKILL.md
│   │   ├── aprendizados.md
│   │   └── references/
│   │
│   ├── skill-arte-onbrand/
│   │   ├── SKILL.md
│   │   ├── aprendizados.md
│   │   ├── pipeline/         ← Node.js: compose.mjs, render.mjs, cli.mjs
│   │   ├── templates/        ← HTMLs dos templates de arte
│   │   └── references/
│   │
│   ├── skill-landing-page-builder/
│   │   ├── SKILL.md
│   │   ├── aprendizados.md
│   │   └── references/
│   │       ├── playbook-7-niveis.md
│   │       ├── html-architecture.md
│   │       ├── moodboard-process.md
│   │       ├── site-teardown.md
│   │       ├── component-shopping.md
│   │       ├── hero-asset-autoral.md
│   │       ├── micro-details-premium.md
│   │       ├── editor-visual-hibrido.md
│   │       └── cro-checklist.md
│   │
│   └── image-prompt-generator/
│       └── SKILL.md
│
├── scripts/
│   └── gen-image.sh
│
└── dev-workflow/               ← módulo copy-in: workflow Spec→Break→Plan→Execute
    ├── README.md
    ├── CLAUDE.md               ← bootstrap para colar no repo-alvo
    ├── architecture.example.md
    ├── .claude/
    │   ├── agents/             ← spec-breaker, issue-planner, component-writer, supabase-writer
    │   └── commands/           ← spec-feature, break-spec, plan-issue, execute-issue
    ├── directives/
    │   └── workflow_dev.md
    └── execution/              ← specs + issues materializadas (entra vazia)
```

---

## Filosofia

Cada skill tem 3 camadas:

1. **SKILL.md** — o que fazer, em que ordem, com quais ferramentas. Carregado automaticamente pelo Claude Code.
2. **aprendizados.md** — padrões que funcionam e erros recorrentes, acumulados após uso real. O Claude lê antes de executar para não repetir erros.
3. **references/** — documentação densa carregada sob demanda (não no boot). Cada seção da SKILL.md indica quando ler qual referência.

O sistema auto-evolui: cada execução pode adicionar ao `aprendizados.md`. Padrões que aparecem 3+ vezes são promovidos para regras na SKILL.md.

---

## Requisitos

- Claude Code (claude.ai/code ou extensão VS Code/JetBrains)
- Node.js 20+ (para skill-arte-onbrand e projetos Remotion)
- ffmpeg (para skill-edicao-anuncios-video e renders finais)
- Google Chrome instalado (para skill-arte-onbrand via Puppeteer e para render Remotion em macOS Sequoia)
- `OPENAI_API_KEY` com org verificada (para gen-image.sh / gpt-image-2)
