# Playbook: Os 7 Níveis de Front-End Design com Claude Code

> Playbook prático derivado da transcrição "Clawed Code sucks at front-end design". Um roteiro repetível para sair do template genérico e chegar a sites com personalidade, usando Claude Code como ferramenta — não como piloto automático.

## Premissa central
Claude Code (e IA em geral) não é ruim em design "por culpa dele": o gargalo é que a maioria das pessoas não consegue articular o que é "bom" porque não tem vocabulário visual. O caminho é construir esse repertório em camadas. Cada nível adiciona uma habilidade; pular etapas = ficar preso no "AI slop".

---

## Nível 1 — O Prompter Cru
**O que é:** Você + um prompt direto ("crie uma landing page para meu SaaS X").

**O que esperar:** Resultado genérico, gradientes roxos, hero + features + CTA padrão. O clássico template AI.

**Habilidades a dominar:**
- Escrever prompts descritivos.
- Entender o básico de frameworks (Next.js, Astro, HTML puro) — pergunte ao próprio Claude o que são.
- Usar **plan mode** para ser forçado a responder: qual o objetivo da página? (ex.: captar waitlist + mostrar produto), qual estilo?, quais seções?

**Armadilha:** Aceitar as opções genéricas que o plan mode sugere ("dark and techy", "clean and minimal") como se fossem suficientes.

**Gatilho para subir de nível:** Quando você perceber que o output está bonito "para IA" mas horrível para um humano com olho treinado.

---

## Nível 2 — A Educação de Design via Skills
**O que é:** Injetar no Claude Code skills especializadas de design (ex.: UI/UX Pro Max, front-end design skill) que funcionam como checklists anti-slop.

**Como fazer:**
- Instalar via `/plugin marketplace add` ou colando a URL do repo no Claude Code pedindo para instalar.
- Invocar com `/skill` ou em linguagem natural ("use a skill UIUX Pro Max").
- Deixar a skill perguntar tipografia, paleta, CTA.

**O que melhora:** Backgrounds com textura, hover states, micro-glows, variação de cor por seção, hierarquia tipográfica.

**Armadilha (teto do nível):** Mesmo com skill, o site continua sendo "um template de IA bem feito". É a mesma página de antes com window dressing. Prompt puro tem um teto de descritividade — você tenta explicar um meio visual só com texto.

**Gatilho para subir:** Você começa a sentir que precisa *mostrar* em vez de *descrever*.

---

## Nível 3 — O Diretor Visual
**O que é:** Texto + skills + **exemplos visuais**. Você para de descrever e começa a mostrar screenshots de sites que admira.

**Onde buscar referências:**
- **Awwwards** (awwwards.com) — trabalhos premiados, pegada criativa.
- **Godly** — scroll infinito de sites bons.
- **Pinterest** — surpreendentemente forte para SaaS landing pages.
- **Dribbble** — designs de concept.

**Como fazer:**
1. Identifique um site-âncora (no case: Open Hands).
2. Tire múltiplos screenshots das seções que você gosta.
3. Jogue tudo no Claude Code: "Quero que a página siga este estilo visual. Aqui estão as referências."
4. Combine referências de múltiplos sites — pegue o hero de um, os cards de outro.

**Armadilha (o "vibe gap"):** Claude Code chega a ~50% do visual. Aí você fica pedindo ajuste em cima de ajuste, em loop infinito, porque a tradução screenshot → código tem perda. É onde a maioria trava.

**Gatilho para subir:** Você percebe que precisa ir além da superfície — precisa ver o código que faz aquele efeito funcionar.

---

## Nível 4 — O Cloner (Aprender Roubando dos Pros)
**O que é:** Deixar de olhar só a casca e passar a deconstruir o HTML, CSS e JS dos sites que você ama. Não é plágio — é usar como template de aprendizado.

**Os 3 pilares de um site:**
- **HTML** = ossos (estrutura).
- **CSS** = roupas (estilo).
- **JavaScript** = músculos (interação).

**Processo de teardown:**
1. Abra o site de referência e dê `Ctrl+U` para ver o HTML.
2. Copie todo o HTML e cole no Claude Code.
3. No final do HTML, identifique os links para os arquivos CSS e JS.
4. Peça ao Claude Code para analisar CSS e JS também.
5. **Importante:** o `web_fetch` padrão do Claude usa um modelo menor que resume — e você perde detalhes. Use uma **skill de "site teardown"** que puxa o conteúdo integral dos arquivos.
6. Instrua: "Use essas informações para clonar o site como ponto de partida do nosso."

**Por que isso educa:** Com o código real na mesa, você consegue ter uma *conversa inteligente* com o Claude: "Como eles fizeram esse background? O que é um `gap`? Como funciona a animação de scroll?"

**Habilidades a dominar:**
- Ler e entender código-fonte (com Claude explicando).
- Identificar qual técnica gera qual efeito.
- Adaptar o padrão clonado ao seu próprio design.

**Armadilha (clone ceiling):** Só copiar sem entender o porquê. Se você vira macaco de teclado no "accept-accept-next", qualquer pessoa te substitui.

**Gatilho para subir:** Você já consegue replicar o clone — agora quer colocar sua cara.

---

## Nível 5 — Componentes + Assets Autorais
**O que é:** Começar a substituir pedaços do clone por componentes curados e por assets visuais criados por você. É onde o site deixa de ser "de outra pessoa" e vira seu.

### 5a. Componentes de bibliotecas
- **21st.dev** — botões, carousels, scroll areas, navigation menus com prompt pronto para colar no Claude Code.
- **CodePen** — efeitos criativos.
- **Magic UI / Aceternity** — componentes React modernos.

Fluxo: achou um componente → copia o prompt → cola no Claude Code → pede para integrar → ajusta até ficar seu.

### 5b. Assets visuais próprios (storytelling visual)
Este é o verdadeiro diferencial. Em vez de background genérico, crie uma **imagem-conceito** que conta a história do produto.

**Processo (case Argus):**
1. Pergunte ao Claude Code ideias de tagline alinhadas ao nome/mitologia do produto ("Argus" = 10.000 olhos → "See what's next").
2. Peça ideias de imagery que amarrem a tagline ao produto.
3. Gere a imagem em Midjourney / Nano Banana / Kadream (Midjourney v7 é ótimo para concept art). **No AZB: usar `gen-image.sh` (gpt-image-2) com prompt construído pelo `image-prompt-generator`.**
4. Baixe, jogue no Claude Code: "Use esta imagem como background do hero, info à esquerda, negative space à direita."

### 5c. Upgrade: background em vídeo
- Use a imagem como **start frame** em Kling 3.0 ou Veo 3.1.
- Se possível, forneça end frame idêntico para fechar o loop.
- Movimento deve ser **sutil** (nuvens, água, parallax) — nada de videogame.
- Duração ~15s; usuário raramente vê o corte.
- **Performance:** instrua o Claude a servir imagem estática no mobile e vídeo só no desktop.

**Regra do nível:** Aplique o mesmo processo (inspiração → customização) em *todas* as seções, não só no hero. Cards chatos, CTA flat, footer padrão → tudo passa pelo mesmo filtro.

---

## Nível 6 — Ferramentas Externas + Expressão Criativa
**O que é:** Sair um pouco do terminal do Claude Code e usar editores visuais para iterar onde o texto é limitante. Aqui você para de ser operador e vira designer.

**Ferramentas úteis:**
- **Stitch** (Google, gratuito) — canvas visual AI-first; você cola screenshots e pede redesigns; dá para variar layout, cores, imagens com clique direito.
- **Paper.design** (epic-paper), **Figma**, **Penpot**, **pencil.dev** — editores visuais.
- **Google Fonts** — biblioteca gigante e gratuita para explorar tipografia (Claude Code usa qualquer uma).

**Fluxo híbrido:**
1. Gera variações no Stitch com base em screenshots do estado atual.
2. Escolhe uma, copia a imagem.
3. Volta ao Claude Code: "O que achou desse redesign? Implemente esse efeito de glass morphism."
4. Pede ao Claude para fazer **web search de best practices** sobre o efeito antes de codar.
5. Lista de ideias → descarta/aprova → implementa.

**Detalhes que dão peso "premium" (os pequenos grandes toques):**
- **Loading state** com leve hesitação antes do texto aparecer.
- **Tipografia deliberada** (Google Fonts, não a default).
- **Scroll indicators** no topo.
- **Ticker rolante** como divisor natural entre seções com backgrounds diferentes.
- **Contadores animados** (0 → 10M no load).
- **Light sweep** sutil em headlines.
- **Glass morphism** em cards para tirar da flatness.

Nenhum desses detalhes, sozinho, é percebido conscientemente. Juntos, eles comunicam cuidado — e cuidado é o que separa "feito com AI" de "crafted, com AI como ferramenta".

**Regra de ouro:** Se o site reflete sua visão criativa, é seu — independente de ter usado IA.

---

## Nível 7 — O Arquiteto / Frontier (3D, WebGL, Shaders)
**O que é:** Experiências tipo videogame no browser — WebGL customizado, shaders, 3D interativo (ex.: site do Igloo, cases do Awwwards "Site of the Month").

**Realidade (abril 2026):** Está fora do alcance prático de fluxos puramente AI-driven. São times de designers que passam meses. Você pode *admirar* e *inspirar-se*, mas não clonar com Claude Code — ainda.

**Para que serve esse nível no playbook:** Ampliar seu referencial do que é possível em front-end. Ver Awwwards "Sites of the Day" regularmente recalibra seu senso do que é "bom".

---

## Checklist repetível (use isto em qualquer projeto)

1. **Defina o objetivo da página** (waitlist? demo? venda?) — não pule o plan mode.
2. **Carregue uma skill de design** (UIUX Pro Max ou equivalente).
3. **Colete 5–10 referências** em Awwwards/Godly/Pinterest/Dribbble. Monte um moodboard.
4. **Escolha um site-âncora** e faça teardown completo (HTML + CSS + JS via skill de teardown).
5. **Peça ao Claude para explicar** os efeitos que você não entende. Anote o vocabulário novo.
6. **Gere o primeiro draft** baseado no clone + suas referências.
7. **Crie seu asset hero** (imagem conceito via gen-image.sh → opcional vídeo loop).
8. **Substitua seção por seção** usando 21st.dev e customização.
9. **Itere no Stitch/epic-paper** quando o texto começar a travar.
10. **Adicione os micro-detalhes** do Nível 6 (loading, tipografia, tickers, contadores).
11. **Teste mobile** — sirva imagem estática no lugar do vídeo.
12. **Critique com olho de designer** e volte ao passo 8 até parar de te incomodar.

---

## Armadilhas a evitar em todos os níveis

- **Aceitar a primeira saída** do Claude Code como "boa o suficiente".
- **Só descrever com texto** quando o problema é visual.
- **Screenshot-only** sem ler o código que gera o efeito.
- **Clonar sem entender** — vira macaco de teclado.
- **Gradientes roxos default.** Se aparecer, é sinal que você não direcionou nada.
- **Consistência forçada** — não tenha medo de mudar paleta/tipografia entre seções se fizer sentido.
- **Ignorar storytelling visual** — a imagem do hero deve contar a história do produto.
- **Confundir "usar IA" com "ter taste".** IA não tem taste. Você também não tinha — construa nos níveis 1–4.

---

## Mentalidade final

O maior insight da transcrição: *"IA não tem taste"* é meia-verdade. O problema real é que **você tem dificuldade de articular seu taste porque não tem vocabulário de design.** Você não é web designer, não conhece os termos, não sabe o que pedir. Isso cria uma desvantagem de tradução entre você e o Claude Code — e o output vira genérico.

Os níveis 1–4 existem para você *construir esse vocabulário*. Os níveis 5–6 existem para você *expressar criatividade com ele*. O nível 7 existe para te lembrar do teto do que é possível.

Não existe skill mágica. Existe repertório acumulado + processo repetível. Este playbook é o processo. O repertório, só o tempo (e muito Awwwards) constrói.
