## Etapa OBRIGATÓRIA — Arquitetura de Card / Repertório de Formatos

> **Onde entra:** entre a **Roteirização** e o **Render**. Nenhum carrossel vai pro render sem passar por aqui. Roteiro pronto não é card pronto — o roteiro diz *o que* cada slide fala; esta etapa decide *como cada slide é construído*.

---

### (a) Princípio

**A capa é única. Nenhum card interno clona a capa.**

A capa é o anzol: layout, peso tipográfico e composição que só ela tem. A partir do card 02, cada slide troca de arquitetura — muda o esqueleto, muda a diagramação, muda a hierarquia de mídia. O que **não muda** é o sistema de marca. Ele é o fio que costura os cards; a arquitetura é o que impede o carrossel de virar N cópias da mesma foto-com-manchete-embaixo.

**Definição operacional de "esqueleto distinto"** (vale para o teste da capa e para o teste entre internos): dois cards têm esqueletos distintos quando a **geometria da zona de mídia é diferente** (onde a mídia mora, que forma tem, quanto ocupa) **E o reading path é diferente** (a ordem em que o olho percorre manchete, mídia e corpo). Trocar a foto e manter mídia-grande-em-cima/manchete-embaixo **não** é esqueleto distinto — é a capa de novo com outra imagem. Inclinação, botão de play e cor são arte; não contam como troca de esqueleto.

Regra prática: se você deslizar a capa e o card 02 lado a lado e eles compartilharem geometria de mídia e reading path, o card 02 está errado. **Variar arquitetura, manter marca.**

O sistema de marca é constante em TODO card, sem exceção — e vem inteiro do **perfil do cliente** (`config/exemplos/<cliente>.md`), nunca da cabeça:
- **o token de fundo do perfil**
- **a fonte de manchete do perfil** apenas na manchete
- **a fonte de corpo do perfil** no corpo
- **a fonte mono/técnica do perfil** em dado/label/rótulo técnico (isso inclui qualquer número-herói: big number segue a fonte técnica do perfil, nunca a de manchete)
- **a cor-accent do perfil** — **uma vez por card** (1 evento de accent por card), na palavra que carrega a tensão (seja grifo de palavra, seja borda de CTA — nunca os dois)
- **o selo do perfil** no rodapé
- **a numeração** XX/NN (NN = total de cards da peça)

---

### (a2) DISCIPLINA DE DIAGRAMAÇÃO — texto e imagem NÃO se sobrepõem (o erro que MAIS volta)

A mídia ousada da alínea (c) só funciona com esta disciplina de **zonas**. Sem ela, o card degenera nos três defeitos recorrentes que já custaram retrabalho: **texto sobre rosto**, **parágrafo mal formatado (prosa flutuando)** e **espaço vazio sem elemento**. Régua visual: o contact-sheet de um carrossel-campeão editorial (ex.: o post "Walter White" do Recon) — abra antes de diagramar.

1. **Texto SEMPRE numa zona limpa e sólida** (o token de fundo do perfil, chapado). **NUNCA sobre um rosto ou foto movimentada.** Prosa bem formatada, medida generosa, sem órfãs, 1 grifo accent. Única exceção = a **CAPA** (figura full-bleed + manchete no rodapé sobre gradiente, na área escura, jamais sobre o rosto).
2. **A mídia é CONTIDA numa zona própria — não é o fundo do texto.** Foto vai DENTRO de uma **moldura com legenda**, OU vira **painel de dados desenhado** (tabela/ledger/mockup com linhas e total), OU lista/diagrama. Rostos entram em molduras/mockups. **Foto full-bleed atrás do texto é proibida (fora da capa).**
3. **Zero espaço vazio:** uma zona = texto, a outra = moldura/painel (larga, preenchendo). Os **painéis de dados desenhados** são metade da riqueza — use-os nos cards de mecanismo (o furo, a brecha, a solução).

Ou seja: as 2-4 camadas de mídia da alínea (c) se empilham **DENTRO** da zona de mídia (na moldura/painel/mockup), nunca **POR BAIXO** do texto.

---

### (b) Repertório de Formatos

Cada card do carrossel escolhe UM formato desta biblioteca (a capa tem o dela; **dois internos nunca repetem o mesmo formato dentro da mesma peça** — o teto de internos sem repetir é o próprio número de formatos do repertório, doze, não uma licença pra clonar). Uma linha de quando usar:

1. **Triangulação** — três elementos em tensão numa mesma cena. Use quando a ideia tem três forças que se puxam.
2. **Coluna de imagens** — stack vertical de imagens empilhadas. Use pra mostrar sequência, acúmulo ou "camadas do problema" de cima pra baixo.
3. **Comparação / dualidade** — split-screen, dois lados. Use quando há duas opções, dois mundos ou dois estados enfrentados de igual pra igual.
4. **Antes e depois** — o mesmo sujeito nos dois tempos. Use pra provar transformação com evidência visual (o estado bagunçado → o estado resolvido).
5. **Erro comum × Solução certa no nicho** — o jeito que todo mundo faz errado contra o jeito certo. Use pra posicionar o produto/serviço como o "better mousetrap" sobre a dor existente.
6. **O que parece × o que realmente é** — bastidor contra realidade / reveal. Use pra quebrar uma crença ("parece que deu certo" × "não deu").
7. **Statement gigante** — tipografia condensada gigante sobre cor sólida, quase sem imagem. Use pra dar respiro e um soco de afirmação no meio do carrossel.
8. **Caixa de destaque (highlight box)** — bloco colorido isolando a frase-punch. Use pra cravar o insight ou o número que não pode passar batido.
9. **Mockup de celular / print** — screenshot de app, conversa, dashboard ou perfil inclinado no card. Use pra dar prova real e concretude ("isso aconteceu na tela de verdade").
10. **Recorte-colagem / cartoon** — figura recortada, colagem editorial, mascote ou ilustração. Use pra newsjacking, humor ou pra editorializar sem depender de foto perfeita.
11. **Still de vídeo** — frame do filme trabalhado no card (faixa sangrada, transcrição-overlay, card arredondado/inclinado). Use pra trazer movimento e o elenco real pra dentro do slide estático, sem cair no esqueleto da capa.
12. **Big number / dado dissecado** — um número grande decomposto em partes, sempre na fonte técnica do perfil. Use quando o argumento é quantitativo e o dado é o herói.

---

### (c) Regra de mídia em camadas

Card forte quase nunca é uma foto única chapada. Ele **empilha camadas** — combinando de dois a quatro **registros de mídia** no mesmo slide. Chrome de UI (botão de play, tag, barra de progresso) é overlay, não registro: um still com chrome por cima ainda conta como **uma** camada de mídia.

Registros que empilham:

- **Elenco proprietário** — atores/personagens do cliente ou personagens gerados por IA. Nunca stock genérico.
- **Figura pública via newsjacking** — rosto reconhecível (um nome do noticiário) usado pra ancorar o argumento na atualidade. Também vale como registro legítimo, sob a mesma regra: nunca stock genérico.
- **Still de vídeo** — frame do material gravado, trabalhado no card.
- **Cena gerada** — composição de IA pra o que não temos em filme.
- **Recorte / mockup / cartoon** — foto recortada, print de celular, colagem, ilustração.
- **Caixa de destaque** — o bloco que isola a frase ou o dado.

A camada de mídia carrega o clima; a camada de texto carrega o argumento; a caixa de destaque crava o ponto. Explore essas camadas até o limite — é a diferença entre um card que respira como editorial e um card que parece slide de PowerPoint. O que segura tudo junto e evita a bagunça é o sistema de marca da alínea (a): o fundo, as fontes e a cor-accent do perfil são o esqueleto que deixa as camadas serem ousadas sem perder identidade.

---

### (d) CHECK obrigatório antes do render

Esta etapa tem **um entregável obrigatório**: a **tabela de arquitetura** da peça, preenchida antes de qualquer render. Sem a tabela, o render não abre. Uma linha por card:

| Card | Formato do repertório | **ref_id da biblioteca** (`references/biblioteca-formatos.json`) | Registros de mídia (2 a 4, listados) | Geometria da zona de mídia | Reading path |
|---|---|---|---|---|---|

> **Coluna ref_id é obrigatória.** Todo card cita a(s) estrutura(s) campeã(s) de onde puxou a arquitetura (ex.: `V4-C8p8iVCNhH6-c02`, `G4-DaN4OayFRvm-c01`). Card sem ref_id = arquitetura inventada da cabeça → reprova. Consulte também `references/recursos-estilisticos-campeoes.md` para os recursos + caminho de execução de cada camada.

Com a tabela na mão, passe os cards em fila e responda. Se qualquer resposta falhar, volta pra bancada — **não renderiza**:

- [ ] **Cada card cita um ref_id da biblioteca?** A tabela tem a coluna ref_id preenchida em TODOS os cards, apontando para `references/biblioteca-formatos.json`. Sem isso, a arquitetura foi inventada — reprova.
- [ ] **Cada card tem esqueleto distinto?** Nenhum interno divide geometria de mídia **e** reading path com outro (definição operacional da alínea (a)).
- [ ] **Algum card clonou a capa?** Aplique o teste "desliza a capa ao lado": se geometria de mídia e reading path baterem com os da capa, refaz. Inclinação e play não salvam.
- [ ] **A marca está constante?** Token de fundo do perfil, fonte de manchete só na manchete, fonte de corpo no corpo, fonte técnica do perfil (incluindo todo número-herói), **um único evento de accent por card**, selo do perfil no rodapé, numeração XX/NN — conferidos em todos, card a card.
- [ ] **A mídia está em camadas?** Os cards de peso combinam mais de um **registro** (não chrome de UI), não uma foto única chapada.

**Gate:** esta lista entra como item pontuado na auditoria pré-render, com a tabela de arquitetura anexada como evidência. Sem tabela e sem os itens marcados, a auditoria reprova — o CHECK deixa de ser autoatestação e vira portão.

**Rotação entre peças:** registre a tabela de arquitetura de cada carrossel num histórico. Peça nova **não pode repetir a sequência de abertura da anterior** e deve trocar **pelo menos três formatos** em relação à peça imediatamente anterior. Sem isso, a variação intra-peça vira template inter-peça — o mesmo vício que esta etapa combate, só que espalhado no tempo.

---

### (e) Referência viva — biblioteca de campeões

Os perfis de referência decupados são **biblioteca viva**, não gabarito pra copiar. Estude a **arquitetura**, não a arte. A cada carrossel novo, volte aos prints de referência e pergunte "o que eles fizeram no esqueleto que eu ainda não usei?".

O ground truth vive nos arquivos irmãos:
- `references/biblioteca-formatos.json` — entradas verificadas (camada a camada). Fonte única de estruturas.
- `references/recursos-estilisticos-campeoes.md` — catálogo dos dispositivos de estilo com caminho de execução no stack.

**Lição a extrair (a estrutura, não os detalhes de arte):** a **marca** é constante (posição de logo, cor, tipo, barra de CTA) e a **arquitetura do card muda a cada slide**. As camadas de mídia — vídeo + imagem + cartoon + mockup + recorte + caixa de destaque — são exploradas ao máximo. É esse o padrão a replicar, trocando o sistema de marca da referência pelo do cliente (o token de fundo, as fontes e a cor-accent do perfil, o selo do perfil). A lição de arquitetura vale sempre; o que **não** vale é tratar a arte da referência como algo a copiar em vez de decupar a estrutura.

---

## MÉTODO OBRIGATÓRIO — Decupar referência → JSON → Replicar

> **Nunca invente formato de card "da cabeça".** Formato de card nasce de uma referência real, decupada no nível da MÁQUINA DE PRODUÇÃO.

**Fluxo, toda vez que for construir card:**
1. **Descreva** a referência (o print campeão) camada por camada.
2. **Decupe / transforme em JSON** — cada camada com: papel, tipo de mídia (personalidade-IA, recorte-cutout, video-still, mockup-celular, tv-composite, cartoon, caixa-destaque, tipografia, foto-meme, colagem-surreal, cta-bar), posição no grid, rotação em graus, tratamento, z-order.
3. **Registre** na biblioteca: `references/biblioteca-formatos.json` (fonte única de estruturas). Toda referência nova entra aqui.
4. **Replique** a estrutura mapeando o conteúdo do cliente em CADA camada. Troca-se o conteúdo, mantém-se a arquitetura de camadas.

> **Sobre o campo `replicacao_recon` no banco:** as entradas de `references/biblioteca-formatos.json` trazem um campo `replicacao_recon` — é o exemplo de como aquela estrutura foi remapeada num cliente concreto. Num cliente novo, esse campo vira `replicacao_<cliente>`: você adiciona a sua própria chave com o mapeamento das camadas para o conteúdo do perfil, sem apagar as existentes. Elas são exemplos, não a verdade a copiar.

**Anti-vício (o erro que originou esta regra):** "mudar o layout da imagem" NÃO é encolher a foto, jogá-la de lado e baixar a opacidade — isso destrói a imagem. É montar as camadas da estrutura de referência (mockup inclinado com sombra, personalidade IA em cena, tv composite, recorte-colagem, caixa de destaque). Se a card não tem 2-4 registros de mídia empilhados como na referência, ela está rasa.

**Ângulo/rotação é SPEC, não decisão de render:** todo elemento inclinado carrega o `rotacao_graus` da biblioteca (ex.: mockup 8°, video still 6°, cutout 0° reto). Grau + drop-shadow vêm do JSON.
