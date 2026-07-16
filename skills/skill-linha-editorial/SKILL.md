---
name: skill-linha-editorial
description: Motor client-agnóstico de linha editorial + carrosséis de newsjacking para Instagram (estilo @v4company/@g4.business). Constrói a linha editorial de QUALQUER cliente a partir de um perfil parametrizável, roda varredura de newsjacking com agentes, pontua pautas num score de 3 gates, e produz os carrosséis ponta a ponta (narrativa → arquitetura de card a partir de um banco de 69 formatos decupados de campeões reais → render on-brand → auditoria). Use quando pedir "linha editorial", "pauta de conteúdo", "carrossel de newsjacking", "calendário editorial", "post no estilo V4/G4", "banco de pautas", ou "faça uma linha editorial para <cliente>". Parametrizado por config/exemplos/<cliente>.md — nunca hardcode a marca.
metadata:
  version: 1.0.0
  depends-on: [skill-arte-onbrand, anti-ai-copy, image-prompt-generator]
---

# skill-linha-editorial — Orquestrador

Motor de conteúdo editorial reutilizável. Um cliente = um arquivo de perfil; o resto é universal.

## Regra #0 — SEMPRE começa pelo perfil
Nenhuma fase roda sem um `config/exemplos/<cliente>.md` preenchido (schema em `config/perfil-cliente.template.md`). Se o cliente não tem perfil, a **Fase 0** o cria antes de tudo. O perfil é o único lugar com marca/ICP/tese; todo agente e referência lê dele.

## As 4 fases (com gates humanos)

### Fase 0 — Instanciar o cliente
Copie `config/perfil-cliente.template.md` → `config/exemplos/<cliente>.md` e preencha (marca, tese numa palavra, persona, filtro de fit, veias, contas de referência de arquitetura, tokens de marca, tabus, voz). Lacuna vira `[PENDENTE — humano preenche]`, nunca invenção. **Gate:** humano confere o perfil.

### Fase 1 — Linha editorial
A partir do perfil, escreva a linha editorial: bandeira, contraponto, persona "você", modos de pauta e a política de personificação. Curta e operacional, não manifesto. Base teórica: `references/criterios-linha-editorial.md`.

### Fase 2 — Newsjacking → pipeline de pautas
1. `editorial-researcher` (um por veia do perfil, em paralelo) varre o que está quente AGORA no mercado do cliente.
2. `editorial-estrategista` consolida, deduplica, pontua no score `Hype × Personificação × Fit-tese × Matéria-prima`, corta o que falha 2+ gates e escreve a **headline V4** (setup / PALAVRA-SOCO / barra-accent) de cada sobrevivente.
3. Saída: banco de pautas datado (`pipeline-<AAAA-MM>.md`). **Gate:** humano escolhe 1-2 pra produzir.

### Fase 3 — Produção do carrossel (o post)
Para cada pauta escolhida, na ordem, com gates:
1. **ETAPA 0 — Narrativa em prosa contínua** (`references/gate-narrativa-primeiro.md`). Escreve o carrossel inteiro como UMA história; passa pela `anti-ai-copy` + caça adversarial anti-cacoete. **GATE 1:** humano aprova a narrativa antes de qualquer pixel.
2. **ETAPA 2 — Arquitetura de card** (`references/sop-arquitetura-card.md` + `references/biblioteca-formatos.json` + `references/recursos-estilisticos-campeoes.md`). `card-arquiteto` mapeia cada card num `ref_id` do banco + 2-4 recursos + os preenchimentos de mídia. **GATE 2:** humano aprova a tabela.
3. **ETAPA 3 — Render.** Via `skill-arte-onbrand` (brand-loader lê o `brand_manual` do perfil). Capa primeiro, depois o resto. Nitidez 2×.
4. **Auditoria de fidelidade.** `copy-auditor` compara a copy renderizada com a narrativa aprovada card a card; restaura o que o design dropou.

## Roteamento rápido
| Pedido | Fase |
|---|---|
| "faça uma linha editorial para \<cliente\>" | 0 (se preciso) → 1 |
| "acha pautas / newsjacking para \<cliente\>" | 2 |
| "produz o post da pauta X" | 3 |
| "monta o perfil do \<cliente\>" | 0 |

## Dependências no toolkit
- **Render:** `skill-arte-onbrand` (HTML→PNG, brand-loader). Foto de fundo: `image-prompt-generator` + `gen-image.sh`.
- **Texto:** `anti-ai-copy` (transversal, obrigatória).
- **Vídeo em card:** `skill-edicao-anuncios-video` / `skill-video-remotion`.

## Princípio inegociável
A capa é única e **condicionada pela imagem** (Ogilvy); nenhum card interno clona a capa; a marca é constante nos 8; todo card cita um `ref_id` do banco (nunca inventa formato); a solução ENSINA o mecanismo. Detalhes: `references/`.
