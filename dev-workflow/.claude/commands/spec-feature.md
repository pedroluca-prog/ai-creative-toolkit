---
description: Gera uma spec de feature/correção em conversa curta. Etapa 1 do workflow Spec → Break → Plan → Execute.
argument-hint: [descrição livre da feature, opcional]
---

Você vai gerar uma **spec** de feature para um projeto de software. Leia `directives/workflow_dev.md` se ainda não leu — ele descreve o fluxo completo. Este comando cobre a etapa 1 (Spec).

## Input

O usuário pode ter passado uma descrição como argumento: **$ARGUMENTS**

Se vazio, pergunte: "Qual feature ou correção você quer especificar? Em 2-3 frases já ajuda."

## O que produzir

Um arquivo `.md` em `execution/<projeto>/specs/<nome-kebab>.md` contendo:

1. **Título** — uma frase clara.
2. **Contexto (por quê)** — 2-3 frases sobre o problema que a feature resolve e quem ganha com ela.
3. **Páginas tocadas** — se aplica. Para cada página, liste os componentes principais.
4. **Comportamentos do usuário** — lista de intenções que o usuário executa (ex: "submeter formulário", "visualizar resultado", "exportar CSV"). Cada um vira uma issue na etapa 2.
5. **Mudanças de schema** — se aplica. Descrição alto-nível (tabela X com colunas Y, Z). Detalhamento fino é etapa 3.
6. **Fora do escopo** — explicite o que você NÃO está construindo, para evitar escopo inchado.

## Conversa ideal

Pergunte só o mínimo necessário. Se o usuário disse "quero permitir exportar CSV da tela de resultados", pergunte apenas coisas que você não consegue inferir:
- Quem pode exportar? (todos, só autenticado, admin?)
- Formato do CSV tem restrição? (colunas específicas, separador, encoding?)
- Exporta o que está na tela ou o dataset completo?

Não pergunte o óbvio. Não invente 10 requisitos. Se estiver claro, apenas escreva a spec e mostre.

## Qual projeto?

Se existir só um projeto em `execution/`, use ele. Se existir mais de um, pergunte qual. Se o repositório é single-project (sem subpasta por projeto), grave direto em `execution/specs/`. O usuário também pode indicar o projeto no argumento.

## Output

Após gravar, mostre o caminho do arquivo criado e diga ao usuário: "Para quebrar em issues pequenas, rode: `/break-spec <caminho>`."

## O que NÃO fazer

- Não detalhe arquivos a criar — é etapa 3.
- Não escreva código — é etapa 4.
- Não misture contexto estratégico (ICP, GTM). A spec é técnica e focada.
