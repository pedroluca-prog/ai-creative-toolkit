# ui-ux-pro-max — engine vendorizado (Design System Generator)

Reasoning engine de design system. Dado um brief, devolve pattern de conversão, UI style,
paleta, par tipográfico, efeitos, anti-patterns e checklist. Usado na **Fase 1.5** da
skill-landing-page-builder. Roda 100% em stdlib do Python 3 (sem `pip install`).

## Origem
- Repo: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Commit: `b7e3af80f6e331f6fb456667b82b12cade7c9d35` (2026-04-03)
- Licença: MIT (ver `LICENSE`). Copyright (c) 2024 Next Level Builder.

## Uso (só o Design System Generator)
```bash
python3 vendor/ui-ux-pro-max/scripts/search.py "<setor + objetivo do brief>" --design-system -f markdown -p "<projeto>"
```
A camada de geração de código multi-stack do upstream (`--stack`, `data/stacks/`) **não é
usada** — a skill tem stack própria (HTML single-file + Tailwind CDN). A saída é ponto de
partida; o brand manual do cliente/projeto sobrescreve paleta e tipografia.

## O que foi mantido vs. removido (enxugamento)
Mantido só o necessário ao modo `--design-system` (domínios product/style/color/landing/
typography/ux/chart/icons/web + ui-reasoning). `data/` ~432 KB.

Removido do upstream (não aberto pelo design-system):
- `data/google-fonts.csv` (745 KB — catálogo de fontes da busca individual)
- `data/draft.csv`, `data/design.csv` (não referenciados pelo runtime)
- `data/react-performance.csv` (domínio code-gen React)
- `data/stacks/` (geração de código multi-stack)
- `data/_sync_all.py` e `templates/` (tooling do upstream)

## Como atualizar
1. `git clone --depth 1 <repo> /tmp/uiux && cd /tmp/uiux`
2. Copiar `src/ui-ux-pro-max/scripts/*.py` para `scripts/`.
3. Copiar de `src/ui-ux-pro-max/data/` só os CSVs listados em `data/` aqui (não trazer o google-fonts.csv nem stacks/).
4. Rodar o smoke test acima; saída deve ter PATTERN/STYLE/COLORS/TYPOGRAPHY/EFFECTS/AVOID sem traceback.
5. Atualizar o commit acima.
