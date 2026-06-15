# Design System Generator — N1.5 (engine ui-ux-pro-max)

> Carregar quando: o plan mode (Fase 1) está fechado e você quer um sistema de design concreto antes de abrir o HTML. O engine vive em `vendor/ui-ux-pro-max/` (ver `vendor/ui-ux-pro-max/VENDOR.md`).

## O que é

Um reasoning engine que casa o brief contra ~430 KB de tabelas curadas (estilos, paletas, pares tipográficos, padrões de conversão, regras de UX por indústria) e devolve um design system pronto para orientar a construção. Roda 100% em stdlib do Python 3 — sem rede, sem `pip install`.

Ele decide **o quê** (estilo, paleta, tipografia, efeitos, anti-patterns). Esta skill constrói **o como** (o HTML). São complementares, não concorrentes.

## Quando rodar

Sempre que a página for além do N2 (cliente pagante, brief "premium/diferenciado", decisor com olho apurado). Em LP de captura simples e descartável, é opcional.

## Comando

```bash
python3 vendor/ui-ux-pro-max/scripts/search.py "<brief em inglês>" --design-system -f markdown -p "<nome do projeto>"
```

- **Brief em inglês** — as tabelas são em inglês; o matching degrada em PT. Descrever setor + objetivo + público. Ex.: `"high-ticket B2B equine vet clinic, trust and authority"`.
- `--design-system` — o modo que interessa. **Não** usar `--stack` (geração de código multi-stack do upstream; descartada, a stack aqui é fixa).
- `-f markdown` — saída em markdown (há `ascii` para terminal).
- `-p "<projeto>"` — rotula o cabeçalho da saída.

Domínios avulsos, se quiser inspecionar uma dimensão: `--domain style|color|typography|landing|product|ux`.

## Como ler a saída

| Bloco | O que é | Como usar |
|-------|---------|-----------|
| **Pattern** | padrão de conversão + seções + colocação de CTA | sugestão — cruzar com a copy aprovada (Fase 1). Não criar seção que a copy não cobre. |
| **Style** | estilo de UI nomeado + keywords + nota de performance/acessibilidade | vira vocabulário concreto para a fundação (N2) e encurta o moodboard (N3). Respeitar os avisos de performance/contraste. |
| **Colors** | paleta de 10 roles (primary, accent, muted, border…) | **só preenche o que o brand não define.** Ver regra dura abaixo. |
| **Typography** | par tipográfico + link Google Fonts + CSS import | idem — brand vence; usar como par de apoio se o brand só define a fonte de display. |
| **Key Effects** | efeitos-chave (blur, morphing, transições) | alimenta a Fase 6 (micro-detalhes). Filtrar pelo que cabe na marca. |
| **Avoid (Anti-patterns)** | o que não fazer naquele estilo | levar direto para o QA (Fase 7). |
| **Checklist** | acessibilidade, responsividade, interações | somar ao `cro-checklist.md`. |

## Regra dura: brand sobrescreve, engine preenche lacuna

O engine **não conhece a marca** — ele entrega um default plausível, e quando não acha match forte de "Product Type" a paleta cai num navy genérico. Por isso:

1. **Onde o brand manual define cor ou fonte, o brand vence.** Sem exceção.
2. **Onde o brand é omisso, o engine preenche:** cor de CTA quando não especificada, par tipográfico de apoio, efeitos/micro-interações, anti-patterns, UX guidelines, chart types (se houver seção de dados).
3. O valor mais consistente do engine não é a paleta — é o **pattern + anti-patterns + checklist + vocabulário de estilo**. Tratar a paleta com ceticismo; tratar os anti-patterns como ouro.

## Limitações conhecidas

- O matching de **pattern** erra com brief curto ou ambíguo (ex.: classificar clínica como "Event/Conference"). Brief mais específico melhora; ainda assim, validar contra o objetivo real da Fase 1.
- **Paleta** tende ao default quando o setor não casa com nenhum "Product Type" — esperado, e por isso o brand sobrescreve.
- Saída é determinística por brief: mesmo brief → mesma saída. Para explorar, variar a descrição (mais/menos "premium", trocar o público).

## Onde salvar

Salvar a saída como `design-system.md` junto da copy/brief da campanha. Serve de âncora para as fases seguintes e de registro do raciocínio de design.
