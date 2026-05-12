# Aprendizados — skill-landing-page-builder

> Arquivo persistente. Registrar padrões, erros recorrentes e insights após cada execução.
> Claude lê este arquivo ANTES de executar a skill para evitar repetir erros.

---

## Padrões que Funcionam

### Stack mínima sem build step (2026-04-20, build Xiru Mudas)

Tailwind CDN + Alpine.js + Google Fonts é o match certo para LP institucional hospedada estaticamente (Hostinger/subdomínio/CDN sem pipeline). Zero `npm`, zero `dist/`, zero SSR. O HTML gerado roda direto em `python3 -m http.server 8000` e faz Lighthouse verde. Custo de bytes aceitável: Tailwind CDN ~40KB gzipped + Alpine ~7KB gzipped. Para LP > 2.000 linhas, avaliar se vale trocar por build step real.

### Config Tailwind inline espelhando o brand manual

Colocar a paleta como `colors.brand.{9,7,5,2,1,05}` + `colors.ink.{1,2,3}` + `colors.bg/surface/border` no `tailwind.config` inline. As classes `bg-brand-9`, `text-brand-5`, `bg-brand-05` (verde bem claro) passam a bater 1-pra-1 com as CSS vars do manual. Trocar paleta fica centralizado. O sufixo numérico `9/7/5/2/1/05` espelha a escala de escuro→claro do manual.

### `scroll-margin-top` em `section[id]` resolve offset de header fixo

```css
html { scroll-behavior: smooth; }
section[id] { scroll-margin-top: 80px; }
```

Zero JS, zero recalcular em resize. Pura feature de CSS moderno. Incluir sempre em LP com header fixo + âncoras.

### Alpine.js inline para cada componente independente

Em vez de estado global, cada bloco tem seu próprio `x-data="{...}"`. No site Xiru funcionaram 4 usos independentes no mesmo arquivo sem conflito:
- `<header x-data="{open, scrolled}">` — menu mobile + sombra no scroll
- `<section x-data="{open: null}">` FAQ — accordion com 1 aberto por vez (padrão `open === N ? null : N`)
- `<form x-data="{loading, success, error}">` — state de submit + fetch()
- `<div x-data="{show, init(), accept(kind)}">` — cookie banner com `localStorage`

### Form estático com Formspree + fetch() + Alpine

```html
<form action="https://formspree.io/f/[ID]" method="POST"
      @submit.prevent="
        loading=true; const fd=new FormData($el);
        fd.append('origem','site-cliente'); fd.append('data_envio', new Date().toISOString());
        fetch($el.action,{method:'POST',body:fd,headers:{'Accept':'application/json'}})
          .then(r=>{if(!r.ok)throw 0; return r.json()})
          .then(()=>{success=true; $el.reset()})
          .catch(()=>{error=true})
          .finally(()=>{loading=false})">
```

Padrão mais enxuto pra captura de lead. Honeypot `<input name="_gotcha" tabindex="-1" class="hidden">` é uma linha e o Formspree filtra sozinho.

### Alternativa ao Formspree: Google Apps Script Web App + planilha como backend (2026-04-22, Xiru Mudas)

Quando o cliente já tem uma planilha Google operacional e quer **custo zero** + **dados dentro de casa**, deployar um Web App Apps Script anexado à planilha substitui Formspree com vantagens operacionais. Padrão validado no entregável 11 do site-institucional Xiru Mudas (planilha `Cadastro de Clientes` virou o "CRM embrionário" do cliente).

**Quando faz sentido**:
- Cliente já tem planilha Google com colunas estruturadas
- Volume previsto <20k submissions/dia (limite do tier grátis Apps Script)
- Cliente quer acesso direto ao lead (não depender de export/forward de terceiro)
- Meta é zero custo recorrente

**Quando NÃO usar**:
- Precisa de email transacional automático pro lead (Formspree manda auto-reply; Apps Script precisa código extra `MailApp.sendEmail`)
- Precisa ler a resposta do servidor no JS do site (CORS blocker — ver abaixo)
- Cliente não tem Google Workspace ou planilha pré-existente

**Template HTML** (substitui o bloco Formspree acima):
```html
<form action="[APPS_SCRIPT_WEB_APP_URL]" method="POST"
      @submit.prevent="
        loading=true; const fd=new FormData($el);
        fd.append('origem','site-cliente'); fd.append('url', window.location.href);
        fetch($el.action,{method:'POST',body:fd,mode:'no-cors'})
          .then(()=>{success=true; $el.reset()})
          .catch(()=>{error=true})
          .finally(()=>{loading=false})">
```

**Diferença crítica do Formspree**: `mode: 'no-cors'` é obrigatório. Apps Script Web App não manda headers CORS corretos por padrão — sem `no-cors` o browser bloqueia a request e `.catch` sempre dispara. Com `no-cors`, o browser aceita o POST mas **não deixa o JS ler a resposta** (opaque response). Padrão fire-and-forget: se fetch resolveu sem throw, assume sucesso. Trade-off conhecido: falha silenciosa do servidor aparece como sucesso no UI do site.

**Template Apps Script** (copiar pra Extensions → Apps Script da planilha alvo, depois Deploy → Web app → Execute as: conta AZB, Who has access: Anyone):
```javascript
const SHEET_NAME = 'Cadastro de Clientes';
function doPost(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  if (!sheet) return json({ ok: false, error: 'sheet_not_found' });
  const data = e.postData?.type === 'application/json'
    ? JSON.parse(e.postData.contents) : (e.parameter || {});
  if (data._gotcha) return json({ ok: true, ignored: true });    // honeypot
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map(h => mapField(h, data)));          // mapeamento dinâmico
  return json({ ok: true });
}
function doGet() { return json({ ok: true, time: new Date().toISOString() }); }  // health-check
function json(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
```

**5 regras operacionais que evitam bugs silenciosos**:

1. **URL `/exec`, não `/dev`**. `/dev` só funciona pro editor autenticado; `/exec` é pública. Se copiar a errada, form só funciona pra quem deployou.
2. **"Manage deployments → Edit → New version"** pra atualizar o código. **NUNCA** "New deployment" (gera URL nova e quebra o site em produção).
3. **Executor é a conta da agência** (ex: `direcao@azbagromarketing.com.br`), não a conta pessoal do cliente. Se o cliente revoga acesso ou sai do negócio, o script continua rodando.
4. **Mapeamento dinâmico por nome de coluna** (ler headers da linha 1 + `switch (header.toLowerCase())`) é mais robusto que posição fixa — permite o cliente reorganizar colunas na planilha sem quebrar a integração.
5. **Pré-condição antes de deployar**: a conta executora (AZB) tem que ser **editor** na planilha. Testar editando uma célula vazia. Se `doPost` executa como conta sem permissão, `SpreadsheetApp.getActive().getSheetByName(...).appendRow()` falha e retorna JSON de erro, mas como `no-cors` é opaque o site reporta sucesso.

**`doGet` como health-check**: abrir a URL no browser deve retornar JSON `{ok:true, service, time}`. Se retorna HTML de login, o deploy ficou restrito (volta no passo "Who has access: Anyone"). Monitoramento barato — não precisa instrumentar o form, é só abrir a URL.

**Monitoramento pós-deploy**: sem leitura de resposta, falhas silenciosas do servidor passam batido. Mitigação: alertar se a planilha ficar 48h sem linha nova em período de pico sazonal (ago-dez no agro). Ou teste E2E semanal curto. Em fluxo de alto volume, considerar migrar pra Cloudflare Worker/Cloud Run com CORS configurado.

### `data-cta="origem-intencao"` em todo link/botão comercial

Desacopla o build do tracking. O issue de tracking depois injeta GA4/GTM e segmenta eventos por `[data-cta]`, sem precisar mexer no HTML. No build Xiru foram 18 pontos nomeados (`hero-primary`, `form-submit`, `wa-fab`, `cookies-accept-all` etc.). Permite que issue 07 (calculadora) e issue 08 (tracking) rodem em paralelo.

### `sips` como fallback para otimização de imagem (macOS)

Se `cwebp` não estiver disponível: `sips --resampleHeightWidthMax 1200 --setProperty formatOptions 80 arquivo.jpg` redimensiona lado-maior-1200 + JPEG q80 em 1 comando. 12 fotos × ~400KB médio = ~5MB total é aceitável pra LP institucional. Quando `cwebp` estiver disponível, adicionar camada `<picture>` com WebP é ganho de ~30% mas não bloqueia go-live.

### Mensagens WA padronizadas em 2 (não 7)

Para evitar poluição do WhatsApp Business do cliente com variações aleatórias:
- **Mensagem principal** (CTAs de intenção geral): `"Olá, vim pelo site da [cliente] e quero falar com um especialista!"`
- **Mensagem secundária** (botão flutuante / footer): `"Olá, quero fazer uma cotação."`
- **Variantes específicas** só quando justificadas: calculadora com valor preenchido, cotar item X vs. Y, fallback de form.

Consolidar num só lugar no código (constante ou comentário) pra facilitar mudança.

### Comentários `<!-- SEÇÃO -->` como índice navegável

Em arquivo de 1.000+ linhas, `Cmd+F "<!-- HERO"` leva instantaneamente à seção certa. Padrão:
```html
<!-- ============================================== -->
<!-- NOME DA SEÇÃO                                  -->
<!-- ============================================== -->
```

### Banner LGPD com hook desacoplado para Consent Mode v2

```js
accept(kind) {
  localStorage.setItem('site_cookies_ok', kind);
  this.show = false;
  if (window.updateConsent) window.updateConsent(kind);  // Issue de tracking implementa
}
```

A gente implementa o UX no build; o `gtag('consent','update',{...})` vem depois via `window.updateConsent`. Padrão "publish via `window.*`" é suficiente e evita dependência circular entre skills.

### Placeholders `[COPY-XX]` vs. texto real

Quando uma skill upstream (copy) ainda não entregou conteúdo específico (ex: cases regionais pendentes, FAQ detalhado), buildar a **estrutura completa** com placeholders literais `[COPY-01 · ...]`, `[COPY-02 · ...]` em vez de texto genérico ou Lorem Ipsum. Motivo:
1. Review visual fica possível — o site renderiza.
2. Troca posterior é `Cmd+F "[COPY-01"` → substituir.
3. Fica visualmente óbvio em QA que ainda falta conteúdo (evita go-live com texto provisório).

---

## Erros Recorrentes

### 2 H1s no mesmo arquivo passa despercebido

Tailwind não avisa, Alpine não avisa. Fácil cair no buraco de usar `<h1>` por estilização. **Regra de fechamento**: rodar `grep -c "<h1" index.html` — tem que retornar `1`. Checklist obrigatório pós-build.

### Conflito z-index entre chrome fixo (header + banner LGPD + sticky mobile + WA flutuante)

Cada um é `fixed bottom-*`; sem hierarquia explícita, a pilha fica aleatória conforme a ordem no HTML. **Padrão fixado para próximos builds** (deixar como comentário no topo do arquivo):
```
z-40: header fixo, banner cookies
z-30: CTA sticky mobile, botão flutuante WhatsApp
z-20: modals (se houver)
```

E garantir que no mobile o banner de cookies fique **acima** do sticky (`bottom-20` ou equivalente) para não se sobreporem.

### IDs de tracking são tentadores de "inventar temporário"

`[GTM_ID]`, `[FORMSPREE_ID]`, `[GA4_ID]`, `[META_PIXEL_ID]` devem ficar literais no código. NÃO gerar um ID "temporário" ou "fake" — o agente deve deixar o script comentado (`<!-- <script>...[GTM_ID]</script> -->`) e confiar na issue de tracking subsequente. Inventar IDs = 1ª coisa que quebra em produção.

### Logo em fundo escuro sem versão branca explícita

Se o logo oficial é colorido e o header/footer são escuros, dá pra usar `class="brightness-0 invert"` no CSS, mas isso perde nuances. **Preferência**: ver se o brand manual tem logo branco/monochrome dedicado antes de recorrer a filter. Se não tiver, avisar o KAM que seria bom gerar (skill-branding pode fazer).

### cwebp não vem por padrão no macOS

Documentar fallback: `sips` (nativo macOS) com `--resampleHeightWidthMax` + `formatOptions 80` resolve. Em Linux, `convert` do ImageMagick funciona. A SKILL.md desta skill deveria listar o fallback por SO antes de exigir toolchain específica.

---

## Padrões SEO técnico para LP estática

> Inauguração: 2026-04-20 (Entregável 09 Xiru Mudas). Aplica pra qualquer LP single-file com Tailwind CDN / Alpine hospedada em Apache/Hostinger.

### 1. 3 scripts JSON-LD separados > 1 array misturado

Padrão Google: aceita ambos, mas validação falha de forma silenciosa quando os schemas estão no mesmo array. 3 `<script type="application/ld+json">` separados = se um quebrar (JSON malformado, campo obrigatório faltando), os outros 2 continuam sendo reconhecidos pelo parser do Google. Regra: **fail isolado > fail coletivo** para schemas. Cada schema tem seu comentário `<!-- SCHEMA: LocalBusiness -->`, `<!-- SCHEMA: Organization -->`, `<!-- SCHEMA: FAQPage -->` pra navegação rápida.

### 2. LocalBusiness > AgriculturalBusiness (mesmo quando o cliente é agro)

`AgriculturalBusiness` é aceito pelo schema.org mas o Rich Results Test do Google tem cobertura menor nos parsers desse subtipo. `LocalBusiness` + `knowsAbout` (array de tópicos: "Tifton 85", "Jiggs", "Mudas forrageiras", "Pecuária intensiva") + `areaServed` + `hasOfferCatalog` já sinalizam o setor suficientemente para o Knowledge Graph. Trocar `"@type"` pra `AgriculturalBusiness` depois é mudança de 1 linha — zero risco.

### 3. `hasOfferCatalog` dentro de LocalBusiness documenta preços oficiais

Para negócio B2B com preços declarados (R$ 8.180/ha implantação; R$ 80/bandeja muda), incluir `hasOfferCatalog.itemListElement[]` com `Offer` + `priceSpecification` (UnitPriceSpecification). Google usa esses valores no Knowledge Panel + permite filtros por faixa de preço. Cada `Offer` aponta pra `Service` ou `Product` com descrição. Campos obrigatórios: `price`, `priceCurrency` (BRL), `unitText` (hectare, bandeja, mês etc.).

### 4. `founder.Person` com `jobTitle + description` reforça EEAT

Quando o cliente tem figura-chave reconhecida (Glauco = inventor da plantadeira de Tifton), declarar `founder` como `Person` com `name + jobTitle + description` no schema Organization. Google pondera em E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Cuidado: não inventar credenciais. Usar `description` fatual ("Técnico em mecânica industrial, inventor da plantadeira de Tifton. Visitou centros de pesquisa nos Estados Unidos em 2023").

### 5. FAQPage schema com texto LITERAL da copy aprovada

**Regra de ouro**: as respostas do `FAQPage` schema precisam ser IDÊNTICAS ao texto visível no `<div>` do accordion. Se reescrever a resposta no JSON (simplificar, cortar links inline etc.), Google pode (a) penalizar como conteúdo duplicado divergente, (b) escolher a versão do schema pro SERP e causar confusão se o usuário clicar e achar texto diferente. Copiar literal da copy aprovada (entregável 02 no caso Xiru). Se accordion mudar, atualizar schema em paralelo.

### 6. Placeholders visíveis `[CAMPO]` + cabeçalho "CAMPOS A CONFIRMAR" no topo do JSON

Mesma regra do build HTML: NUNCA inventar email, CNPJ, CEP, coordenadas GPS, horário. **Schema com dado inventado é pior que schema sem o campo** — Google penaliza divergência entre schema e conteúdo real via cross-check (email no schema ≠ email no footer HTML = sinal de baixa qualidade). Usar placeholders literais com chaves visíveis (`[EMAIL_CORPORATIVO]`, `[CNPJ]`, `[CEP]`, `[LATITUDE]`, `[LONGITUDE]`, `[HORARIO_FUNC]`, `[MF_RURAL_URL]`). Cada JSON tem um bloco `_comment_header` / `_comment_title` / `_comment_rule` / `_comment_placeholders` no topo listando os placeholders visualmente. Rich Results Test aceita placeholder (warning, não erro bloqueante); Knowledge Panel fica mais fraco mas não incorreto.

### 7. Sitemap enxuto > sitemap completão

Se o site fazia 301 dos posts antigos do blog (link-juice preservado), NÃO incluir as URLs antigas no sitemap.xml. Google NÃO deve indexar URLs redirecionadas — incluir no sitemap manda sinal contraditório pro crawler e pode gerar warning "Duplicate content" no GSC. Sitemap ideal tem só URLs canônicas vivas (home + páginas legais + LPs separadas se houver). 3 URLs bem declaradas > 10 URLs com sinais mistos. Âncoras (`#faq`, `#calculadora`) também não entram — Google trata como fragmento da mesma URL.

### 8. Canônico non-www + .htaccess consolidando sinal

Se o site atual já usa `https://xirumudas.com.br/` sem `www`, manter. Adicionar no `.htaccess` uma regra `RewriteCond %{HTTP_HOST} ^www\.dominio\.com$` que 301 para non-www — isso consolida todo o sinal de SEO numa URL canônica. Mesmo raciocínio pra HTTPS: `RewriteCond %{HTTPS} off` + 301 pra versão HTTPS. Validar com `curl -I http://www.dominio.com.br/` → deve retornar 301 + Location correto antes de considerar deploy OK.

### Validações grep obrigatórias antes de entregar SEO técnico

Rodar estes greps DEPOIS de patchar o `index.html`:

```bash
# 1. Zero URL duplicada (bug comum em sites que geraram OG manualmente)
grep -n "https.*https" index.html           # esperado: 0 matches
grep -rn "https.*https" seo/schema-*.json   # esperado: 0 matches

# 2. H1 único (anti-padrão SEO é ter 2 H1s)
grep -c "<h1" index.html                    # esperado: 1

# 3. Todos os schemas injetados
grep -c 'application/ld+json' index.html    # esperado: N (número de schemas)

# 4. Canonical único
grep -c 'rel="canonical"' index.html        # esperado: 1

# 5. JSON sintaticamente válidos
python3 -c "import json; json.load(open('seo/schema-localbusiness.json'))"
python3 -c "import json; json.load(open('seo/schema-organization.json'))"
python3 -c "import json; json.load(open('seo/schema-faqpage.json'))"

# 6. XML do sitemap válido
python3 -c "import xml.etree.ElementTree as ET; ET.parse('seo/sitemap.xml')"
```

Incluir estas 6 validações no README do entregável SEO como "pré-entrega" — evita bug chegar em staging.

### Entregáveis técnicos (não-copy) pulam auditoria formal com justificativa

Meta tags, JSON-LD, sitemap, robots, .htaccess são infra. As dimensões D1-D6 da skill-auditoria (tom de voz, especificidade, acionabilidade, etc.) não se aplicam. Justificar o skip com "artefato técnico de infra, não copy — dimensões D1-D6 não se aplicam a JSON estrutural" e registrar no operacao como "sem auditoria formal". Substituir por checklist de validação técnica (grep, Lighthouse, Rich Results Test, Schema Validator) — que é o que já está no próprio entregável.

---

## Insights de Clientes

### Xiru Mudas (2026-04-20) — contexto que virou requisito de build

- **Público 90%+ masculino 40-70 anos** → microtextos técnicos, sem linguagem jovem/casual. `"WhatsApp com DDD"` em vez de `"Entre em contato"`, `"Hectares para implantar"` em vez de `"Sua área"`.
- **Site atual tinha 2 H1s** (anti-padrão SEO documentado em `Inteligência/site-atual-xirumudas-2026-04-20.md`). **Build novo corrige**: 1 H1 único no hero.
- **Âncoras `#jiggs` e `#sobre` quebradas no site atual** → build novo endereça IDs estruturalmente corretos: `#tifton` + `#jiggs` separados, `#sobre` leva à seção Glauco (não aos depoimentos).
- **`og:image` com URL duplicada** no site atual (bug conhecido). Novo build usa URL absoluta completa e única.
- **7 botões idênticos pra WhatsApp com 2 mensagens diferentes aleatórias** → consolidado em 2 mensagens padronizadas + variantes específicas justificadas.
- **Banco de 17 fotos subutilizado** (só 5 apareciam no site antigo) → novo build seleciona 12 com nome semântico, organizadas por seção.
- **RenovAgro R$ 10 bi como gancho** de urgência no CTA final (a partir de jan/2026 exige documentação técnica — diferencial Xiru).
- **Arroba em máxima histórica (R$ 355,6 em mar/2026 → R$ 367 em abr/2026)** funciona como gatilho de ROI na calculadora e na copy de CTA final.

---

## Padrão `<video>` hero institucional iOS-safe (2026-05-01, Xiru Mudas issue 15)

> Inauguração: substituição de `<iframe>` YouTube por `<video>` HTML5 local pra resolver autoplay bloqueado no iOS Safari + ganho de LCP.

### 1. Atributos iOS-safe são 4 (não 3)

`<video autoplay muted loop playsinline>` — todos os 4 são obrigatórios pra Safari iOS aceitar autoplay sem ir pra fullscreen ou bloquear silenciosamente. **Sem `playsinline` o iOS abre fullscreen**; sem `muted` o autoplay é negado por política; sem `autoplay` óbvio; sem `loop` o vídeo para no fim e expõe o frame final estático. Adicionar também `preload="metadata"` (carrega só metadata, não o vídeo inteiro) e `poster="..."` (frame de fallback enquanto descodifica).

### 2. Ordem dos `<source>`: webm → mp4 (não inverter)

Browser pega o **primeiro** que suporta. Webm em VP9 é ~25% menor que H.264 com qualidade similar — colocar primeiro economiza tráfego em Chrome/Firefox/Edge modernos. Safari (incluindo iOS Safari) ignora webm e cai no mp4 fallback. Ordem inversa = todo browser baixa mp4 maior.

### 3. `object-fit: cover` no `<video>` evita cortes feios

Quando o vídeo é landscape e o container é responsivo (ex: `width:100vw; height:56.25vw`), o aspect ratio nem sempre bate com a viewport. `object-fit: cover` garante que o vídeo preenche o container cortando o que sobra (versão CSS do `crop center`).

### 4. Quando a fonte é portrait de celular (`displaymatrix=-90`), cropar landscape > rotacionar

5 MOVs do banco Xiru (IMG_3583..3587) são iPhone portrait 4K HEVC com flag `displaymatrix=-90`. Cropar `2160:1215:0:1312` (largura cheia, altura 16:9 do meio do portrait) gera frame landscape coerente. Forçar `-noautorotate` "deita" o vídeo (interpretação errada). Padrão pra futuros videos de cliente: **respeitar a orientação nativa + cropar**, nunca rotacionar manualmente.

### 5. Bytes finais Xiru issue 15 (referência de calibração)

| Arquivo | Bytes | Codec | Duração | Bitrate | Comando-chave |
|---|---|---|---|---|---|
| `hero-xiru.mp4` | 6.7 MB | H.264 high yuv420p | 26.93s | 2074 kbps | `-c:v libx264 -crf 30 -preset medium -an -movflags +faststart -vf "crop=...,scale=1280:720,fps=30,format=yuv420p"` |
| `hero-xiru.webm` | 5.3 MB | VP9 yuv420p | 26.93s | 1654 kbps | `-c:v libvpx-vp9 -b:v 1500k -minrate 750k -maxrate 2000k -row-mt 1 -an -deadline good -cpu-used 4 -tile-columns 2` |

Total bytes hero: **12 MB** somando os 2 (browser baixa só 1). Tempo de encode em M-series: mp4 ~6 min com preset medium, webm ~10 min com cpu-used 4. Quando o limite de bytes é apertado, ir de **CRF mode** (mp4) pra **VBR target bitrate** (webm) é mais previsível.

### 6. `imageio-ffmpeg` (pip) substitui Homebrew quando ffmpeg não está disponível

Em macOS sem Homebrew (cliente sem `brew`), instalar `pip3 install --user imageio-ffmpeg` baixa um binário ffmpeg standalone em `/Users/pluca/Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1`. Tem libx264 e libvpx-vp9 incluídos. Sem dependência sistêmica. **Trick útil pra unblock issues técnicas em ambientes do cliente sem sudo**.

### 7. `<link rel="preload" as="image" fetchpriority="high">` no `<head>` antecipa LCP

Padrão pra LP onde a imagem hero é o LCP candidate: preload no `<head>` + `fetchpriority="high"` no próprio `<img>` (duplicar o sinal). Combinado, o browser inicia o download da hero antes do CSS terminar de calcular layout. Mensurável em Lighthouse: ganho típico de 200-500ms no LCP em 4G simulado.

### 8. `<link rel="preconnect" href="https://player.vimeo.com">` warm-up sem bloquear

Quando a LP tem N iframes Vimeo (depoimentos lazy-load), o browser ainda precisa fazer DNS+TCP+TLS pro player.vimeo.com no momento do play. **Preconnect** abre essas conexões em paralelo logo no parse do HTML, sem bloquear render. Ganho típico: 100-300ms na primeira interação. Adicionar também `https://i.vimeocdn.com` pra thumbnails. **Não usar `preload`** — ainda baixaria os iframes na hora.

### 9. Decisão de fonte: YouTube `T2XNb2UTLaQ` é podcast de 60+ min, NÃO institucional

`T2XNb2UTLaQ` é o MF Cast Ep. 71 (Glauco entrevistado, podcast longo). Pra hero institucional não serve — corte arbitrário não passaria mensagem. **Padrão pra próximos clientes**: validar antes (com Read na duração via yt-dlp/oembed) se URL é institucional curto ou conteúdo longo. No Xiru, fonte alternativa do banco local (5 MOVs `.MOV` no Drive) deu B-roll superior — gente trabalhando + plantadeira em ação > stock corporativo.

### 10. Gatilho social estático com placeholder `[N_CALCULOS_30D]`

Pra prova social na calculadora ("287 produtores calcularam sua área nos últimos 30 dias"), o número precisa ser **plausível, fixo e validado**. Sem dado real, deixar **placeholder literal** `[N_CALCULOS_30D]` visível no HTML segue o mesmo padrão de `[GTM_ID]`/`[FORMSPREE_ID]` da skill. Evita inventar dado que vira "mentira pequena" quando descoberto. **Atualização semestral** (não dinâmico) é o trade-off: simplicidade operacional > precisão.

---