# Aprendizados — skill-arte-onbrand

Registros de padrões validados e erros recorrentes por execução.

---

## 2026-05-06 — Convivência com epic-paper (Paper.design)

A AZB adotou `epic-paper` como surface colaborativa de design (substitui Canva). epic-paper é renderer **diferente** desta skill, não competidor:

- **skill-arte-onbrand**: renderer determinístico HTML→PNG via Chromium. Output: PNG terminal. Use para entrega final de produção, posts/carrosséis, qualquer texto crítico em PT-BR onde queremos zero typo garantido. **Continua sendo o caminho default da AZB.**
- **epic-paper**: renderer colaborativo via Paper.design MCP. Output: arquivo Paper Desktop editável. Use quando o cliente vai mexer depois, pitch deck premium com continuidade humana, mockup multi-screen com iteração visual rápida.

Critério de decisão: se o entregável final é PNG production-ready, é skill-arte-onbrand. Se é arquivo colaborativo no Paper, é epic-paper. Os dois NÃO se substituem — coexistem.

---

## 2026-04-20 — Criação + piloto Xiru Mudas

### Validado
- **Texto em PT-BR 100% correto**: smoke test e piloto do carrossel "Tifton 85 vs. Braquiária na seca" validaram acentuação e ortografia em palavras que o Gemini errava historicamente: "Braquiária", "bilhões", "proteína", "fenação", "recuperação", "não", "comparação", "aproveitando", "ração". Zero typo em 7 slides renderizados.
- **Logo oficial via SVG**: priorizar SVG sobre PNG no `brand-loader.mjs`. SVG tem transparência limpa e escala sem perda. Data-URL via base64 elimina qualquer problema de path com espaços.
- **Google Fonts inline**: incluir o `<link>` do manual da marca diretamente no template resolve Bree Serif + Poppins sem config extra. `waitUntil: 'networkidle0'` + `document.fonts.ready` garante carregamento antes do screenshot.
- **Markdown inline**: `**palavra**` → `<strong>palavra</strong>` com cor accent do brand funciona em qualquer campo não-Html (title, subtitle, footnote, paragraphs). Permite destaque visual sem obrigar agente a escrever HTML.
- **Fluxo híbrido com Nano Banana**: template `carrossel-capa` aceita `backgroundImage` opcional. Quando fornecido (foto gerada pelo Nano Banana), vira cover com gradient-scrim; quando ausente, cai em padrão radial-gradient fallback — o mesmo template serve os dois casos.

### Erros capturados (e corrigidos)
- **v0.1.0-bug1**: Inicialmente usei `file://${path}` sem encode para paths com espaços — Chromium falhou silenciosamente ao carregar imagens. Corrigido convertendo todos os paths para data-URLs base64 via função `toDataUrl()`.
- **v0.1.0-bug2**: O `interpolate()` original retornava o valor bruto sem escapar HTML nem processar markdown. Isso resultou em `**texto**` aparecendo literalmente nos PNGs. Corrigido com `applyInline()` + allowlist `RAW_FIELDS` para campos que precisam passar brutos (googleFontsLink, logoPath, cores, fontes).
- **v0.1.0-bug3**: Logo PNG "XIRU MUDAS LOGOMARCA-1.png" tem fundo branco sólido. Com `filter: brightness(0) invert(1)` tudo virou quadrado branco. Remover o filter e priorizar SVG resolveu — o SVG do logo tem fundo verde #03411D que "mescla" com o `bgDeep` #02431b do template. **⚠️ CORRIGIDO NA SESSÃO #9 (2026-04-20):** essa "mescla" era ilusão de óptica em fundo liso. Sobre gradients, texturas e vignettes, o retângulo 2250×2250 embutido no SVG vira bloco retangular sólido visível — "quadrado verde" do canto do slide. Solução definitiva abaixo.

### Por cliente

**Xiru Mudas**:
- Paleta que funciona: `#02431b` fundo, `#47a613` accent, branco texto.
- Fonte serif (Bree Serif) em números grandes cria autoridade sem ser corporativo. Manter.
- Templates testados no piloto: `carrossel-capa`, `carrossel-texto`, `carrossel-tabela`, `carrossel-cta`, `post-estatico-dado`. `post-estatico-citacao` ainda não usado — validar na próxima execução.
- Handle padrão no rodapé: `@xirumudas.tifton`.

### Próximos passos / TODO
- [x] Gerar versão do carrossel capa com foto real do cliente — feito na sessão #8 (2026-04-20) no carrossel "Antes/Depois". `backgroundImage` com foto do banco Xiru (Tifton formado).
- [x] Validar template `post-estatico-citacao` — feito na sessão #8 com citação do Glauco para post "Agrônomo dedicado".
- [ ] Testar formato `portrait` (1080×1350) em posts estáticos de citação — pode ter mais impacto no feed.
- [ ] Validar o mesmo pipeline com um segundo cliente fictício para confirmar que os tokens são 100% parametrizados (troca de paleta/fonte via `manualPath`).
- [ ] Medir tempo médio de render (Puppeteer launch + 7 screenshots ~15s no piloto — ok para lote; pode cair se reutilizar browser entre jobs, já implementado via singleton).

---

## 2026-04-20 — Sessão #8 execução em batch (Xiru Mudas)

### Validado
- **Batch consolidado funciona**: 1 spec.json com **23 jobs** (3 carrosséis: 7+7+8 slides + 1 post estático) renderizou em ~45s. Eficiente — evita fazer múltiplas invocações do CLI.
- **Template `carrossel-cta`**: validado como slide final de carrossel em 3 contextos diferentes (engajamento "comenta o número", mensagem direta "WhatsApp", gatilho de qualificação "QUERO PLANEJAR"). `ctaLabel` + `ctaValue` vira card verde-claro com borda accent — destacado do corpo mas on-brand.
- **Template `post-estatico-citacao`**: clean e impactante. Aspas SVG grandes em accent, nome em accent, role discreto. Espaço negativo generoso abaixo da citação funciona bem — não precisa preencher.

### Erros capturados (e corrigidos)
- **spec-v2-bug**: Coloquei `backgroundImage` dentro de `props` e o campo foi ignorado — o CLI lê `job.backgroundImage` direto do **nível do job** (root), não de `props`. Resultado: a capa do carrossel "Antes/Depois" saiu sem a foto de fundo. **Fix**: mover `backgroundImage` para o root do job. **Ação**: considerar atualizar SKILL.md com um exemplo explícito mostrando onde vai o `backgroundImage` (hoje está mencionado nos inputs mas pode não ficar óbvio em contraste com `props`).

### Por cliente

**Xiru Mudas** (atualização):
- Template `carrossel-texto` + `highlight` rendeu muito bem para slides de "número + contexto" (custos, economia, lotação). Padrão a replicar.
- Capa de carrossel com foto do banco ficou boa visualmente, mas eyebrow verde-claro (#47a613) fica pouco legível sobre grama verde — considerar shadow ou container no futuro.

---

## 2026-04-20 — Sessão #9: correção do asset de logo Xiru (quadrado verde) + símbolo decorativo

### Bug raiz (descoberto em uso)
- O SVG oficial `XIRU MUDAS   LOGOMARCA-1.svg` começa com `<path fill="#03411D" d="M0 0L2250 0L2250 2250L0 2250L0 0Z"/>` — um retângulo sólido 2250×2250 embutido no viewBox funcionando como "fundo" do arquivo.
- Sobre fundo sólido `#02431b` (bgDeep), parecia OK (contraste mínimo). Mas em cima dos **gradients**, **bg-pattern** e **bg-vignette** do `carrossel-texto` enriquecido, o retângulo aparece como bloco retangular sólido no canto inferior direito — destoa totalmente.
- **Lição**: SVGs de logo vendor-supplied frequentemente trazem retângulo de fundo embutido pra "garantir contraste" no preview do fornecedor. Sempre abrir o SVG como texto e buscar `<path ... d="M0 0..."/>` com dimensões do viewBox. Se existir, remover.

### Solução aplicada
1. **Criado `xiru-logo-limpo.svg`** em `Arquivos Xiru Mudas/XIRU MUDAS _ ID/` — cópia exata do SVG original com a primeira linha `<path fill="#03411D" d="M0 0L2250 0L2250 2250L0 2250L0 0Z"/>` removida. Todo o resto dos paths permanece idêntico. Reversibilidade preservada (SVG original intacto).
2. **Criado `xiru-simbolo-capim.svg`** na mesma pasta — extração dos 3 paths do capim decorativo que fica acima do texto "XIRU" na logo: 2 folhas verdes (`#268246`) + 1 folha creme (`#CACF78`). viewBox normalizado para `940 120 390 640` cobrindo o bounding box do capim.
3. **`brand-loader.mjs` atualizado**:
   - `scanForLogo()`: ordem de prioridade — arquivos com `limpo`/`sem fundo`/`transparente`/`nobg` no nome vêm primeiro, depois SVG, depois PNG. Exclui arquivos com `símbolo`/`symbol`/`ícone` do match de logo.
   - Nova função `scanForLogoSymbol()` — busca arquivos com `símbolo`/`symbol`/`ícone`/`icon` no nome.
   - `loadBrand()` agora retorna também `logoSymbolPath` (ou `null` se não existir).
4. **`compose.mjs` atualizado**: `logoSymbolPath` entra no `context` como data-URL (via `toDataUrl()`) e é adicionado ao allowlist `RAW_FIELDS` pra passar bruto na interpolação.
5. **Templates atualizados**:
   - `carrossel-texto.html`: SVG inline amador do `.bg-leaf` (folha genérica de stroke verde) substituído por `.bg-symbol` que usa `{{logoSymbolPath}}` — marca d'água real da logo no canto superior direito, rotação 15°, opacity 0.28, brightness 1.35.
   - `carrossel-cta.html`: recebeu `.bg-gradient`, `.bg-pattern`, `.bg-vignette` e `.bg-symbol` equivalentes — antes era fundo liso sem camadas. Agora os 2 templates (texto e cta) usados no corpo de carrossel têm tratamento visual unificado.
   - **NÃO alterados**: `carrossel-capa`, `carrossel-tabela`, `post-estatico-citacao`, `post-estatico-dado` — layouts com foto de fundo ou composição distinta, não precisam do símbolo.

### Validado (protótipo v2)
Renderizado em `Clientes/Xiru Mudas/Conteúdo/_banco-imagens-geradas/_prototipos/prototipo-v2-logo-limpa-simbolo-real.png` com o mesmo conteúdo do protótipo v1 (slide 3 da Pauta 5 "Formigueiro e solo exposto"):
- Logo no canto inferior direito **sem bloco retangular** — fundo transparente integra com o gradient do template.
- Capim estilizado como marca d'água sutil, reconhecivelmente "da Xiru" (e não folha amadora genérica).
- Zero typo — texto PT-BR renderizado nativo (Erosão, fertilidade, começar, adubação, touceiras).
- Layout intacto.

### Padrão replicável para outros clientes
Para evitar esse bug em novos clientes AZB:
- Ao onboardar um cliente, abrir o SVG oficial em editor de texto e verificar se existe `<path ... d="M0 0L{w} 0L{w} {h}L0 {h}L0 0Z"/>` (retângulo do viewBox). Se existir, criar `{cliente}-logo-limpo.svg` na mesma pasta removendo essa linha.
- Se a logo tem um símbolo gráfico (brasão, folha, ícone) separável, extrair para `{cliente}-simbolo-*.svg` pra ser usado como decorativo on-brand sem SVG amador inline nos templates.
- `brand-loader.mjs` já busca automaticamente por nomes com `limpo`/`sem fundo`/`transparente` e por `símbolo`/`symbol`/`ícone`/`icon` — basta respeitar o naming.

---

## 2026-04-20 — Repetição headline × pull-quote (bug de autoria, não de template)

### Bug observado
- Slide 5 de "Antes e depois" (post-03-antes-depois) saiu com "**Pegamento acima de 95%**" aparecendo duas vezes: uma como headline grande e uma como destaque/pull-quote no final do slide.
- Causa: copy.md tinha a frase como **primeira sentença do body**. A autoria do conteúdo (Claude) escolheu a mesma frase pra ser title implícito E pull-quote — foi decisão de redação, não bug de renderização.

### Regra de autoria pra slides que têm pull-quote/destaque final
Quando escrever copy para slide que o template renderiza com headline + body + destaque final (pull-quote grande):
1. **Headline** deve ser um rótulo temático ou pergunta (ex: "O que aconteceu em 60 dias", "Por que isso importa").
2. **Body** desenvolve o tema sem revelar a punchline.
3. **Pull-quote (destaque final)** é a frase-chutão, dado duro, ou conclusão que o leitor leva do slide.
4. **Nunca** repetir a mesma frase em 2 dos 3 campos — o leitor percebe como retórica preguiçosa e o slide parece quebrado.

### Fix aplicado
- Reestruturado slide 5 com 3 campos nomeados explícitos (`**Headline:**`, `**Body:**`, `**Destaque final:**`) — evita que a ambiguidade "qual frase é o destaque?" reapareça em renders futuros.
- Padrão replicável: **sempre nomear os 3 campos** em copies de slide com pull-quote. Se o slide não tem pull-quote, corpo solto funciona.

---

## 2026-04-23 — Escola Pecuária — Pack Variações AI v1 (spec consolidado por semente)

### Validado (pré-render — spec estruturada)

- **1 spec.json por semente, não por variação.** O pack Escola Pecuária tem 3 sementes (Diploma / Gado bravo / Menos é mais) com 9 jobs de arte-onbrand no total. Consolidar em 3 specs (1 por semente com 3-5 jobs cada) bate com o aprendizado sessão #8 (23 jobs/~45s). Evita 9 invocações separadas do CLI.
- **Padrão de naming para ponteiro:** quando `arte-onbrand-spec-v{N}.json` aponta para o spec consolidado da semente, criar arquivo stub com `{"_redirect": "./arte-onbrand-spec-v2.json"}`. Preserva o naming `v{N}` documentado no index.md sem duplicar conteúdo.
- **`_variacao` + `_mandala` como campos de metadados** em cada job do spec — pre-fixados com `_` para não serem processados pelo interpolador. Permite rastreabilidade futura sem sobrecarregar o template.
- **`_pendencia_kam` como campo de spec** para marcar jobs que têm dependência externa bloqueante (autorização, validação de número). Lido pela skill-auditoria + permite filtro "pode renderizar agora vs. depende de validação".

### A testar na execução (24-25/04)

- `manualPath` apontando para `manual-da-marca-escola-pecuaria.html` (não `.md`) — brand-loader deve extrair paleta + fontes + logo direto do HTML. Hipótese: funciona pois o HTML foi gerado especificamente com CSS variables + base64 de logo.
- **Risco SVG 2250×2250 (bug sessão #9 Xiru)**: brand-assets da EP só tem PNG (sem SVG confirmado). Se na execução brand-loader resolver direto pro PNG oficial lockup, bug não aplica. Se pedir SVG em pipeline futuro, retestar.
- **Fonte Vintage Riders NÃO está no Google Fonts** (manual §8.4.1). Fallback Rye é Google Fonts — brand-loader deve pegar o link automaticamente se o manual HTML já tiver `<link rel="stylesheet" href="...Rye...">`.
- **Template `post-estatico-citacao`** testado apenas 1x na sessão #8 Xiru. Pack EP usa 3x (3.4, 3.6 + variações). Vai consolidar padrão de uso para citações com quote longa (3.6 tem 93 chars) vs. aforismo curto (3.4 tem 25 chars).

### Protocolo "pendência KAM" para campos de texto

Quando copy tem número não-validado (ex: R$ 57.600), 2 opções:
1. **Deixar o número no spec** e marcar `_pendencia_kam` + checklist no roteiro-md — pressuposição de que KAM valida antes do render.
2. **Colocar placeholder textual** (ex: "R$ Y.YYY") no spec e esperar validação para substituir.

**Padrão adotado pack EP:** opção 1 — número fica visível no spec + roteiro tem checklist explícito + copy-anuncios.md tem versão de fallback sem número. Se auditoria + KAM aprovarem o número, segue. Se não, substituição ponto-a-ponto antes do render.

Protocolo assegura que o pack estrutural é 100% entregável sem dependência de KAM para a construção.

### Observação sobre "NNM" em descrição Meta Ads

Descrição Meta tem limite de 30 chars. "Curso Manejo Nada nas Mãos — R$ 347" tem 38 chars — não cabe. "Curso NNM online R$ 347" cabe em 24 chars mas viola a regra "zero NNM em copy pública". Solução do pack EP: trocar descrição para *"Curso online — R$ 347"* (22 chars) em TODAS as variações, sem nome do produto no campo descrição (o nome vem no texto principal + overlay da arte).

Recomendar como padrão futuro: **descrição Meta NÃO deve conter o nome do produto se o nome for longo**. Apenas categoria ("Curso online") + ticket. Reserva nome para o texto principal.


---

## 2026-05-03 — AZB · Template PDF Diagnóstico PASTO (B8)

### Validado

- **Pipeline `Chrome --headless=new --print-to-pdf` rodou em 3,73-4,44s para PDF A4 6 páginas** (440KB cada). Confirma aprendizado de operacao-azb.md (2026-04-29) que Chrome headless `--print-to-pdf` voltou a funcionar no ambiente AZB OS. Meta da skill B1 era ≤ 2 min/PDF — render real ficou 17-30× abaixo do alvo.

- **Template multi-página A4 com `@page A4` + `page-break-after:always` entre `<section class="page">`** funciona limpo no Chrome `--print-to-pdf`. `page-break-inside:avoid` em `.dim-block` honrado mesmo em conteúdo longo. Padrão replicável para futuros PDFs multi-página AZB (ex: relatórios mensais, briefings, propostas).

- **SVG inline para radar gráfico (pentágono regular 5 eixos)** é solução portátil e leve — polígono computado via `polar(angle, nota×36)` em Python (5 ângulos -90, -18, 54, 126, 198). Fill `rgba(79,123,58,0.40)` + stroke 2.2pt fica legível mesmo em impressão B&W. Vértices marcados com `<circle r="4.5">` ancoram visualmente. Padrão replicável para qualquer "radar de avaliação" em outros entregáveis AZB.

- **Logo embutido em base64 inline no HTML** (PBSEMFUNDO.png 400×400 reduzido via PIL → ~57KB base64) elimina dependência de filesystem path no PDF gerado. PDF fica auto-contido (~440KB final) e portátil. Para o PNG do logo do AZB, a versão `PBSEMFUNDO.png` 3000×3000 RGBA tem alfa transparente — escolha correta sobre `logo.png` 3000×3000 RGB sem alfa (este último renderiza com fundo branco quadrado em background creme — mesma classe de bug da sessão #9 Xiru, que era SVG com retângulo embutido).

- **Fallback elegante para logo do prospect ausente**: card com inicial em Space Grotesk grande (1-2 letras) preenche o espaço sem visual quebrado. Padrão replicável para qualquer template que receba dados externos opcionais (logo de cliente, foto de pessoa, etc.).

### Erro capturado (e corrigido) — Bug do screenshot, NÃO do PDF

- Ao testar visualmente cada página individualmente, injetei CSS `<style>section.page:nth-of-type(N){display:flex !important}</style>` para isolar cada página. Forcei `display:flex` em TODAS as páginas — mas `.page` deveria ser `display:block` para páginas tipo "summary", "detail" e só `display:flex; flex-direction:column` para páginas "cover", "radar-page", "cta-page".
- Resultado do bug: páginas tipo block (sumário, detalhes) renderizaram com filhos como flex-row siblings (lado a lado horizontal em vez de empilhados verticais). **Bug exclusivo do screenshot debug — o PDF gerado pelo Chrome `--print-to-pdf` NÃO tem essa CSS injetada e renderiza correto.**
- Lição: ao usar inject-CSS para isolar páginas durante visual audit, mapear `display` conforme classe original de cada page (`display:flex` para `.cover/.radar-page/.cta-page`, `display:block` para o resto). Evita falso-positivo de "layout quebrado" durante audit.

### Padrão replicável: builder Python independente em vez de spec → template existente

- A B8 não usou o pipeline `compose.mjs` da skill-arte-onbrand. Em vez disso, criei `render.py` standalone que faz: load logo b64 → compute radar SVG points → resolve fallback de logo → markdown inline `**` → mustache replace `{{var}}` → Chrome `--print-to-pdf`.
- Quando faz sentido fazer isso? **Quando o entregável é um documento auto-contido (PDF/relatório longo) e não uma peça de redes sociais (PNG quadrado/portrait).** O pipeline Node existente é otimizado para múltiplos PNGs em batch; para 1 PDF de 6 páginas com computação custom (radar SVG points), Python standalone foi 50× mais rápido de implementar e 100% portátil.
- Recomendação: para futuros documentos PDF AZB (relatórios mensais, briefings, propostas), copiar o padrão de `render.py` em vez de tentar forçar pelo `compose.mjs`.

### Por cliente

**AZB (interno)**:
- Paleta validada em PDF: `#0F0F0F` Tinta + `#F5EFE3` Osso (esqueleto 70%), `#A06832` Terra (accent strong + letras dim), `#E5A532` Âmbar (CTA card + divider capa), `#4F7B3A` Pasto (radar fill + check ✓ ações). 5 níveis de score-pill colored (1=erro vermelho, 2=cobre, 3=âmbar, 4=oliva, 5=Pasto/OK) cobrem o range visual sem ambiguidade.
- Tipografia validada: Space Grotesk 700 (display capa 32-48pt, score number 64pt) + Inter 400-700 (body 9.5-11.5pt). PT-BR com til/acento/cedilha (Aquisição, Otimização, Diagnóstico, Tráfego, Höhl, Caminhões, máquina, sócio) sem typo. Reforça aprendizado #1 — Chromium native render = zero typo.
- **Símbolo AZB** PB primário (`PBSEMFUNDO.png`) usado em 3 contextos: brand-mini topo-esquerda 11mm (todas as páginas), AZB-mark 24mm na assinatura pg6, prospect-card-fallback como contraste. Nenhuma vez usado o `Logo nome zoobloguer.ai` ou variantes com wordmark legacy "ZooBloggeя".

### Erro #4 — Gridlines SVG hardcoded com ângulo errado (B10, 2026-05-06)

Bug sistemático nas 4 pontas laterais do radar pentagonal no template v1 (B8, 2026-05-03): quem digitou as gridlines usou `sin(-54°) ≈ -0.809` em vez de `sin(-18°) ≈ -0.309` para os eixos A e O (e simétrico em S e T). O desvio acumula com o raio — na ponta A, nível 5: hardcoded `(421.21, 125.66)`, valor correto `(421.22, 194.37)` — **68.71px de erro acumulado em Y**. Visualmente: polígono do prospect (gerado com fórmula correta) atravessava as gridlines dando aparência de "perspectiva torcida". Bug só aparece no PDF final — o HTML no browser com `display:block` mascara (bug similar ao Erro de screenshot debug da sessão #12).

**Correção aplicada em v2 (2026-05-06)**: gridlines e eixos radiais gerados dinamicamente pelo `render.py` via funções `compute_radar_gridlines()` e `compute_radar_axes()` — compartilham a mesma `polar_xy()` do polígono do prospect. Gridline nível 5 = polígono `todos-5` em 5/5 eixos (validação matemática confirmada). Template v2 não tem mais nenhum ponto de gridline hardcoded.

### Padrão #9 — SVG pentágono polar: nunca hardcode, sempre fórmula

Para qualquer gráfico de radar/spider em SVG (pentágono, hexágono, etc.): **nunca digitar coordenadas de gridlines à mão**. Sempre:
1. Definir `DIMENSIONS = [(letra, ângulo_deg), ...]` como constante única
2. Usar `polar_xy(angle_deg, radius)` = `(cx + r·cos(rad), cy + r·sin(rad))` em loop para gridlines E polígono do prospect
3. Validar que `gridline_nivel_5 == poligono_todos_5` matematicamente antes de commit

O erro do template v1 foi digitado "à mão" em sessão de desenvolvimento rápido. Com a fórmula em loop, é impossível ter gridlines e polígono em sistemas de coordenadas diferentes.

### A testar / próximos passos

- [ ] Validar impressão A4 física real (dpi 300, papel offset 90g) — preview de impressão Chrome `--print-to-pdf` aprovou; impressão real é a prova final.
- [ ] Gerar com logo do prospect REAL (Bentevi tem IG público @bentevi.insumos? Höhl tem site?) — testar fluxo de fetch + base64 + injeção em `prospectLogoDataUrl`.
- [ ] Calibrar limite de chars por justificativa/ação após 5 diagnósticos reais — hoje recomendação é 350 chars justif / 200 chars por ação. Pode dar pra apertar mais com font-size 9pt.
- [ ] Considerar embed de Space Grotesk + Inter via `@font-face` woff2 (~250KB) para garantir offline-fidelity do PDF (hoje depende de Google Fonts CDN no primeiro render).

### Permissões observadas

- Em sessões com permissões restritas (Bash sandbox limitado a paths whitelisted), construir tudo em `/tmp/{nome-projeto}/` e copiar via `python3 shutil.copytree(src, dst, dirs_exist_ok=True)` no fim. Mais resiliente do que tentar `mkdir -p` direto no destino.
