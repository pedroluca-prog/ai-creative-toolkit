# Aprendizados — skill-video-remotion

> Arquivo persistente. Registrar padrões, erros recorrentes e insights após cada execução.
> Claude lê este arquivo ANTES de executar a skill para evitar repetir erros.

---

## Padrões que Funcionam

### 2026-04-23 — Escola Pecuária, Pack Variações AI v1 (5 specs Remotion inaugurais)

- **Duração-padrão agro curto: 16-20s.** Para pack Escola Pecuária definimos 3 durações: 16s (tipográfico puro, sem números) · 18s (desmonte + CTA, sem gráfico) · 20s (desmonte + gráfico/número + CTA). Passar de 22s em Reels pecuário parece esticar demais — confirmar no relatório de dia 14 se CTR cai em função de duração. Hipótese atual: 20s é teto seguro.
- **Padrão de scene sequence para agro técnico-comportamental:**
  1. `text_reveal` hook (2-3s) — desmonte ou pergunta-provocação
  2. `dado_destaque` ou `comparacao` ou `bullet_list` (5-8s) — o "recheio" que prova o hook
  3. `text_reveal_com_accent` ou `dado_destaque` (4-5s) — o clímax (número grande ou aforismo em mostarda)
  4. `cta` (3-4s) — logo oficial + texto + handle
  Total: 14-20s. Replicável em todas as 5 specs do pack.
- **Cena 5 (CTA) NUNCA deve carregar logo via IA.** PNG oficial de `brand-assets/` entra como asset real. Aprendizado herdado de skill-arte-onbrand sessão #9 — aplicável aqui. Documentar no spec: `logo_path: "Arquivos {cliente}/brand-assets/{cliente}-logo-lockup.png"`.
- **Split-screen tipográfico funciona em 9:16** (variação 2.1 Gado bravo). Dividir vertical 50/50 + linha divisória ocre fino + ícones monocromáticos outline em cada lado. Contraste de bg (lado esquerdo `#43372D`, lado direito `#261C15`) sutil mas percebido.
- **Count-up de cifra acumulada** (variação 2.5 "a conta que seu curral paga") é forte gatilho para Perfil A. Fazer o número subir visivelmente cria tensão. Se KAM não validar cifra exata, o Remotion aceita `"R$ ___"` como placeholder proposital — o leitor faz a soma de cabeça.
- **Legendas queimadas obrigatórias** em todas as cenas (80% consumo Meta é mudo). Montserrat 600 branco sobre caixa marrom 80% opacity, safe zone ⅓ inferior.
- **Símbolo EP como marca d'água sutil** (opacity 15%) funciona no topo — não compete com hook mas reforça marca durante silêncios.

### Princípio da dualidade com arte-onbrand

Rota (a) Remotion e rota (b) arte-onbrand devem ser **pares complementares** dentro de uma mesma célula da Mandala, não substituições. No pack Escola Pecuária, M5 (Descoberta × Urgência-oculta × Dor-financeira × Frio × Perfil A) foi coberta por:
- Variação 2.5 Remotion (vídeo — Reels)
- Variação 2.6 arte-onbrand puro (estático — Feed)

Teste de A/B natural: qual formato converte melhor na mesma célula? Se ambos vencem, escalar os dois em sprint 2.

---

### 2026-05-06 — Integração Remotion como skill de execução real (não só spec)

**Padrão #1 — Audio-first é inegociável.** A skill antiga gerava JSON de frames estimados que ficavam errados ao render. O correto: gerar áudio ElevenLabs → medir duração com `ffprobe` → calcular frames → só então codar as cenas. Nunca hardcodar duração de cena antes de ter o MP3.

**Padrão #2 — prompt.md executável > JSON spec.** O output da skill agora é um `prompt.md` que o Claude Code lê e executa (`> please read prompt.md and do it`). O prompt.md substitui o JSON spec — é muito mais detalhado e produz código funcional diretamente.

**Padrão #3 — Toda UI é React animado, zero screenshots.** Cards de ferramenta, emails, pipelines de automação — tudo é componente React. Não usar imagens de UI real. Componentes `<BrowserWindow>`, `<AnimatedCard>`, `<DashedConnector>` são reutilizáveis entre projetos.

**Padrão #4 — Spring em tudo, nunca linear.** Qualquer entrada de elemento usa `interpolate` com spring (damping:10, stiffness:150, mass:0.8). Linear easing faz o vídeo parecer robótico.

**Padrão #5 — Skill remotion do projeto PM Work como referência.** O projeto do Paulo Castellano (gist e18a1cb0c26895ad0e5252d2ba0f9bd9) é o modelo de qualidade a replicar. Lembrar que o skill `azb-contexto-cliente` MCP do antigravity é usado para criar variações do prompt.md por cliente.

---

## Erros Recorrentes

### 2026-04-23 — Validação de números em rota (a)

**Risco detectado:** números financeiros em Remotion (R$ 57.600/ano hematoma, R$ 80.000 conta total, 3h→40min, 20 manejos/ano, "payback em 1 manejo") são **impossíveis de validar em tempo de render** — depende de decisão KAM/cliente.

**Protocolo adotado no pack Escola Pecuária:**
1. No spec JSON, marcar todo número financeiro com `"placeholder_valor": true` e listar em `"pendencias_kam_pre_render"` na raiz.
2. No roteiro-vN.md, incluir checklist explícito de validação KAM.
3. Propor 2-3 fallbacks qualitativos (sem cifra) caso KAM não valide.

Sem esse protocolo, a variação vira "copy que Claude inventou" e a auditoria derruba nota D3 (Especificidade).

### Exemplo-contrato

Campo `pendencias_kam_pre_render[]` no topo do spec:
```json
"pendencias_kam_pre_render": [
  "Validar R$ 57.600 — é defensável publicamente? Fonte?",
  "Validar 3h→40min (caso Ildo ou média?)",
  "Validar 'payback em 1 manejo' — se muito agressivo, trocar por 'poucos manejos'"
]
```

Ficou como padrão sugerido para toda spec de agro com números.

---

## Insights de Clientes

### Escola Pecuária — Perfil A pede número-âncora financeiro

A auditoria 23/04/2026 identificou a célula "Descoberta × Urgência-oculta × Dor-financeira × Frio × A" como **vazia** — e é exatamente onde Remotion brilha (números grandes animados sem precisar de pessoa na câmera). Pack v1 cobriu a célula com 2 variações em rotas complementares (2.5 Remotion + 2.6 arte-onbrand puro). Próximo sprint: se a célula validar, abrir 4+ variações com ângulos financeiros distintos (hematoma / IATF perdida / peão machucado / padronização).

### Escola Pecuária — Aforismo sozinho pode carregar Remotion tipográfico

Variação 3.1 "No curral, menos é mais" é tipográfica pura — zero cena, zero pessoa, zero número. Aposta na força do aforismo já validado em orgânico (16.1K likes). Se performar em ad pago com CPL ≤ R$ 73, é evidência forte de que **rota (a) Remotion tipográfico + aforismo de marca validado** é uma fórmula replicável barata para re-aquecer audiência morna/quente.

### Avatar AI — protocolo de autorização

Rota (c) avatar AI CORTADA no pack v1 por ausência de autorização KAM dos 3 representados (Leonardo + Adriane + Ana Silvia). Protocolo registrado: KAM dispara email individual com template AZB (direito de uso de imagem via avatar AI, escopo Meta Ads, duração do teste, retirada a qualquer momento) + aguarda 72h escritas. Slots 2.6 e 3.6 realocados para rotas (a)/(b). Replicável em qualquer cliente com múltiplos sócios.

---

### 2026-05-08 — Unificação do fluxo Remotion em processo único iterativo

Eliminada a falsa dicotomia "Modo A (spec audio-first) vs Modo B (interativo)". O fluxo iterativo cena-a-cena é o método válido para QUALQUER vídeo Remotion — narração ElevenLabs vira passo opcional ao final (Passo 8), não pré-requisito do método.

**Por quê:** quando documentei dois modos separados pela primeira vez, criei uma diferença artificial (presença/ausência de narração). Mas o processo de produção do vídeo (roteiro → cenas → V1 → iteração visual) é idêntico nos dois casos. O ElevenLabs só entra DEPOIS da iteração visual estar travada — não muda o método, só adiciona um passo final.

**Como aplicar:** sempre seguir Passos 1–7 (visual). Só ir pro Passo 8 (narração) se o brief pedir locução explícita. Passos 9–10 (render + salvar) fecham em qualquer cenário.

**Princípios consolidados do fluxo iterativo** (extraídos de referência externa em vídeo-tutorial Remotion Skills + aplicação AZB):

**Padrão #6 — Prompt de 1 linha não funciona.** "Gerar vídeo com 1 prompt" é clickbait. Pra resultado usável, o prompt precisa descrever cada cena com duração, cor de fundo, componentes, animações, transição. Sem isso gera genérico que dá mais retrabalho que descrever direito desde o início.

**Padrão #7 — Assets em `public/` ANTES de codar.** Fontes, logos, imagens, GIFs preparados primeiro. Se faltar asset, o Claude inventa ou omite.

**Padrão #8 — V1 é ponto de partida, não entrega.** Aceitar de início que a V1 não vai ficar perfeita. O valor está no loop: assistir → anotar → pedir ajuste → verificar no Studio → próxima cena.

**Padrão #9 — Iterar UMA cena por vez.** Pedir 6 mudanças de 6 cenas num prompt só confunde o modelo. Uma cena por vez, verificar no Studio antes de seguir.

**Padrão #10 — Remotion Studio (localhost:3000) pra preview, não render.** Não renderizar MP4 a cada iteração. `npm run dev` mostra em tempo real. Render só no final.

**Padrão #11 — Pensar em cenas = pensar em arquitetura.** Quem não internaliza Composition → Scenes → Components se enrola. O modelo mental é pré-requisito pra prompts efetivos.

**Padrão #12 — Contraste e tilt são ajustes recorrentes na V1.** Ajustes mais comuns: (a) adicionar contraste (terminal bg preto, pills pretas com texto branco), (b) remover tilts indesejados que o modelo adiciona pra "dinamismo", (c) adicionar movimento (confetti, stagger). Antecipar esses 3 no prompt inicial economiza 2–3 iterações.

**Padrão #13 — `remotion-best-practices` (skill oficial Remotion) é o domain knowledge.** Já instalada em `~/.claude/skills/`. Carrega automaticamente quando código Remotion é tocado. Não precisa ser invocada manualmente — ela é o equivalente do "Remotion Skills" do canal referenciado no vídeo-tutorial.

---

### 2026-05-12 — Render em macOS Sequoia (Darwin 25.x): SIGKILL no chrome-headless-shell

**Erro #1 — `spawn Unknown system error -88` no render Remotion em macOS Sequoia**

O binário `chrome-headless-shell` baixado automaticamente pelo Remotion tem assinatura de código inválida no macOS Sequoia (Darwin 25.x). O SO mata o processo com SIGKILL ao tentar executar. `codesign --verify` retorna "invalid or unsupported format for signature". Tentativas de re-assinar com `xattr -d com.apple.provenance` + `codesign --force --sign -` falham.

**Fix obrigatório em macOS Sequoia:** usar o Chrome do sistema como browser de render:

```bash
npx remotion render src/index.ts VideoZootecnia out/video.mp4 \
  --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

Verificar que Chrome está instalado primeiro: `ls "/Applications/Google Chrome.app/"`.

**Se Chrome não estiver instalado:** instalar via `brew install --cask google-chrome` ou download manual em google.com/chrome.

**Por que o `--browser-executable` resolve:** o Chrome do sistema tem assinatura válida pelo código de distribuição do Google, aceita pelo macOS Gatekeeper. O chrome-headless-shell do Remotion é um binário sem assinatura válida para o novo Darwin 25.x.

**Adicionar ao comando de render padrão em todo projeto AZB em macOS:** sempre incluir `--browser-executable` como flag. Não é overhead — é prevenção de quebra silenciosa em máquinas Sequoia.


