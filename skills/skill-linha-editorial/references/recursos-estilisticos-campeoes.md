# Recursos estilísticos campeões — catálogo replicável (decupagem verificada 2026-07-08)

> **UNIVERSAL, com exemplos do Recon.** Este catálogo de dispositivos é client-agnóstico. Onde ele diz "no stack Recon" ou cita tokens do Recon (Playfair, âmbar, "Confere.", Tessera), leia como **EXEMPLO de como executar no stack de um cliente** — troque pelos tokens do `config/exemplos/<cliente>.md`. A arquitetura de camadas e a lógica dos recursos não mudam entre clientes; só a marca aplicada muda.
>
> **O que é.** Índice dos dispositivos de estilo extraídos da decupagem **verificada card-a-card** de 8 carrosséis campeões reais (V4, G4, Blank, Vinci). Cada recurso vem com: o que é, quem usa (ref_id do `references/biblioteca-formatos.json`), por que funciona e como executar. Sempre que possível, **abra a imagem real do card de referência antes de montar** — não confie só no texto.
>
> **Como usar.** Na Etapa de Arquitetura de Card (SOP §b), cada slide escolhe UM formato + 2-4 recursos daqui. Troca-se o conteúdo deles pelo do cliente; mantém-se a arquitetura de camadas. Nunca invente formato "da cabeça" — puxe daqui.

## Sistema de marca (o fio constante — troque a marca deles pela do cliente)
Todo card carrega os tokens do perfil do cliente, constantes nos 8: fundo · fonte de manchete (só manchete) · fonte de corpo · fonte de dado/número-herói (mono) · cor-accent UMA vez por card · símbolo/logo · selo no rodapé · numeração XX/NN. Régua `anti-ai-copy` roda em toda copy.
> **Exemplo (Recon):** fundo `#0F1A13` · Playfair na manchete · Outfit no corpo · IBM Plex Mono no dado · grifo âmbar `#B07A2A` 1×/card · símbolo Tessera · selo "Confere." · numeração XX/08.

## Os 4 sistemas campeões num relance (cada um resolve o mesmo problema de um jeito)
| Perfil | Gramática visual | Assinatura tipográfica | O que roubar |
|---|---|---|---|
| **V4** (@v4company) | Colagem maximalista, 4-6 camadas/card, vermelho + halftone | Sans condensada gigante + eco/fantasma | Empilhamento de mídia (tv-composite, cutout, mockup, caixa) + CTA-bar como cliffhanger |
| **G4** (@g4.business) | Tabloide-esportivo/negócios, foto full-bleed + gradiente | Serif didone × sans grotesca + **grifo dourado** | Newsjacking esportivo, tweet-card verificado, grifo âmbar 1×/bloco, escada de números |
| **Blank** (@blankschoolbr) | Editorial limpo, respiro máximo, rotação zero | Serif **romano+itálico misto** na mesma linha | Template de dualidade júnior×sênior, card-pivô de meta-reveal, mock de UI como punchline |
| **Vinci** (@vinci.society) | Revista impressa, grão/halftone, grade quente | Serif CAPS com **1ª palavra em itálico swash** | Moldura de página, seta desenhada à mão, diagrama de convergência, inversão cromática no clímax |

---

## 1. TIPOGRAFIA

**1.1 Serif romano + itálico misto na mesma manchete** · Blank (`BLANK-DaLW0wPjl1q-c01/c08`), Vinci (`VINCI-DZqamlVGl4a` 6×)
Palavras-âncora em itálico, resto romano, na mesma frase ("Todo *social media* tem seu *Ancelotti*"). Ênfase sem negrito e sem cor. → **Execução:** skill-arte-onbrand, manchete em Playfair; envolver os 2 termos-chave em `<em>` (italic) no mesmo bloco. Grifar por itálico, **não** por cor, na capa/fecho — reservar o âmbar pros cards de miolo.

**1.2 Serif CAPS com 1ª palavra em itálico caligráfico swash** · Vinci (`VINCI-DZyIcdMDx8M` 4×)
Manchete em caixa-alta romana, mas a palavra-pivô ganha um itálico swash (D e C caligráficos). → **Execução:** Playfair + Playfair Italic no `<span>` da palavra-pivô; atenção aos tokens do brand-loader (ver `reference_arte_onbrand_tokens`, senão cai no fallback).

**1.3 Mistura serif didone (tese) × sans grotesca (instrução)** · G4 (4×), Blank (6×)
Serif de alto contraste carrega "verdade/editorial"; sans humanista carrega "faça agora/prático". A troca de família marca a troca de função. → **Execução:** já é o sistema Recon (Playfair na manchete/statement/pergunta, Outfit no corpo/comando). Nunca Playfair no corpo inteiro.

**1.4 Manchete condensada CAIXA-ALTA de acusação com número** · G4 (`G4-DaN4OayFRvm-c01`)
`[ENTIDADE] + [VERBO DE ACUSAÇÃO] + ["ASPAS IRÔNICAS"] + [VALOR GRIFADO]` — estilo tabloide investigativo ("A FIFA DISFARÇOU a 'pausa para hidratação' para colocar R$1 BILHÃO no bolso"). → **Execução:** Playfair CAIXA-ALTA; copy = `O MARKETPLACE "AJUSTOU" O REPASSE E TIROU R$ X DO SELLER`. Passar anti-ai-copy.

**1.5 Wordmark serifado dourado como statement (com ponto final)** · G4 (`G4-DaMD7pWmEw7-c06`)
No card de oferta, o nome do produto vira herói: serif didone gigante, âmbar, 2 linhas, ponto final ("G4 Gestão e Estratégia."). → **Execução:** único card com wordmark grande — "Recon." em Playfair âmbar `#B07A2A`, tamanho herói, ponto final, sobre `#0F1A13`. Nos outros, marca discreta.

**1.6 Contraste de escala tipográfica brutal** · V4 (4×)
Antetítulo minúsculo → manchete condensada gigante na mesma composição; o salto de tamanho é o próprio drama. → **Execução:** skill-arte-onbrand com 2 níveis extremos (ex: label 18px → statement 120px). Statement em Playfair; number-herói em IBM Plex Mono.

**1.7 Camada tipográfica fantasma / eco (echo type)** · V4 (`V4-...-c08`), + monograma-fantasma atrás da manchete (V4 2×)
Versão outline/translúcida do título atrás da versão sólida, deslocada, criando profundidade. O monograma da marca também entra como marca-d'água atrás do texto. → **Execução:** duplicar o `<h1>`, camada de trás em outline/opacity baixa deslocada; ou símbolo Tessera gigante a ~6% de opacidade atrás da manchete.

**1.8 Número-herói em Mono dentro de caixa escura** · Vinci (`VINCI-DZyIcdMDx8M-c08`), G4 (escada)
O dado grande sempre em mono tabular, isolado em caixa — o card mais "salvável". → **Execução:** IBM Plex Mono (o número-herói do sistema Recon), caixa `#0F1A13`, um dado por linha.

**1.9 Piada meta-tipográfica (fonte "errada" de propósito)** · Blank (`BLANK-DaLW0wPjl1q-c06`)
Responder "queria uma font bonita" com uma fonte script cafona — autoridade por autoironia (só quem domina tipografia brinca com fonte brega). → **Execução:** análogo Recon = "Lojista: queria uma planilha bonitinha" respondido com um Excel caótico multicolor. Usar 1×/série.

---

## 2. COR & TRATAMENTO

**2.1 Grifo âmbar/dourado em UMA palavra-chave por bloco** · G4 (`DaN4OayFRvm` 6×, `DaMD7pWmEw7`), V4 (grifo-em-caixa 4×)
Em vez de negrito distribuído, só o termo-âncora recebe cor. Vira farol de leitura: quem só olha os grifos pega a espinha do argumento. → **Execução:** `<span style="color:#B07A2A">` na oração que carrega o insight/número. **Regra dura:** um grifo por bloco, nunca dois no mesmo parágrafo (é a regra do sistema Recon).

**2.2 Grade de cor semântica: dor fria/granulada × triunfo quente/limpo** · Blank (`DaeMzMTDYqM` 3×)
Lado sofrimento = frio, dessaturado, com grão; lado vitória = quente, saturado, nítido. A temperatura comunica emoção antes da palavra. → **Execução:** no prompt gpt-image (via image-prompt-generator): `cool desaturated grainy` vs `warm saturated clean`; ou LUT frio/quente em foto real. Cor é primeira classe (`reference_video_color_pipeline`).

**2.3 Textura de impressão (halftone / grão) nos fundos** · Vinci (5×+3×), V4 (colagem zine)
Trama de meio-tom / grão de filme sobre fundos e backdrops dá acabamento "mídia impressa", não "peça de design". → **Execução:** overlay de grão a 4-10% + `mix-blend-mode` sobre fundo/backdrop no skill-arte-onbrand; ou pedir `halftone print texture` no gpt-image. Backdrop tom-sobre-tom com logos (ver 3.3).

**2.4 Gradiente inferior de legibilidade sobre foto full-bleed** · G4 (2×), Blank (scrim 3×), Vinci (5×)
Gradiente escuro subindo da base (~40-45% da altura) segura texto branco sem esconder a foto nem usar caixa preta óbvia. → **Execução:** `linear-gradient(to top, #0F1A13 0%, rgba(15,26,19,.85) 30%, transparent 70%)` sobre a imagem, texto por cima. Verde-escuro Recon no lugar do preto/teal. É o resolvedor universal de texto-sobre-foto.

**2.5 Progressão cromática como sinal de estrutura narrativa** · V4 (8×), Blank (alternância claro↔escuro), G4 (palcos claro/escuro 6×)
A cor de fundo muda por slide sinalizando etapa (escuro = denso/profundo, claro = respiro, vermelho = clímax). O leitor lê a estrutura sem rótulo. → **Execução:** definir presets de canvas no skill-arte-onbrand; escuro `#0F1A13` como default, um card claro pontual pro ritmo, e uma quebra cromática (âmbar/vermelho) no card de virada.

**2.6 Quebra de padrão cromático como reset de atenção / inversão no clímax** · V4 (3×), Vinci (inversão cromática `DZyIcdMDx8M`)
Um card inverte a cor dominante (fundo vira texto, texto vira fundo) exatamente no pico, antes do CTA. → **Execução:** no card-clímax, inverter: `#0F1A13` vira o texto sobre âmbar/creme. Pattern-interrupt que impede o pulo.

**2.7 Acento cromático único disciplinado** · Vinci (rosa 5×), V4 (color wash vermelho)
Uma cor de destaque só (rosa Vinci / vermelho V4) reservada pro acento, o resto na base. → **Execução:** o âmbar `#B07A2A` é esse acento no Recon — reservado, nunca espalhado. Espelha o uso disciplinado do magenta/rosa da Vinci.

---

## 3. MÍDIA EM CAMADAS (o que separa card editorial de slide de PowerPoint)

**3.1 Template de autoridade repetido 4× (galeria de prova de baixo custo)** · V4 (`C8p8iVCNhH6` 4×)
Um único molde split (cutout + ficha + backdrop de marca) rodado 4 slides, trocando só a pessoa — "parede de prova" de alto volume e baixo custo. → **Execução:** 1 componente HTML com slots [cutout] [nome+cargo] [backdrop halftone] [logos]. Recon: 4 provas de conciliação (4 marketplaces/ERPs) no mesmo molde.

**3.2 Template de 2 cápsulas com dualidade júnior × sênior** · Blank (`DaLW0wPjl1q` 6×)
Miolo inteiro num gabarito: cápsula-topo = expectativa ingênua, cápsula-base = realidade profissional. 1 layout, N conteúdos. → **Execução:** componente com [cápsula-top: cutout + label serif + fala sans] [cápsula-bottom: prova]. Recon = "Lojista: (expectativa)" × "Recon: (realidade/ganho)". Cantos 28px.

**3.3 Backdrop de marca em halftone tom-sobre-tom** · V4 (4×)
Atrás do cutout, o logo/padrão da marca-cliente em meio-tom da mesma família de cor — dá contexto sem competir. → **Execução:** backdrop com logos de marketplaces/ERPs (Mercado Livre, Shopee, Bling…) em halftone verde-sobre-verde no skill-arte-onbrand.

**3.4 Cutout que quebra a moldura (frame-breaking)** · Blank (6×), V4 (cutout entrando pela borda 2×)
PNG recortado da pessoa transborda as bordas da cápsula/card — profundidade sem sombra pesada. → **Execução:** gpt-image gera o cutout (persona lojista/operador, fundo removido); no HTML, `position:absolute` com top negativo pra estourar a borda. `rotacao_graus=0`.

**3.5 Mock de UI real como punchline** · Blank (4×), G4 (tweet-card 4×)
A "resposta" não é texto — é uma interface reconhecível reconstruída (comentários, áudio 29:15, WhatsApp, Google Calendar, tweet verificado). Humor/autoridade por reconhecimento. → **Execução:** reconstruir em HTML mocks relevantes ao lojista: extrato do marketplace com repasse divergente, notificação Recon ("achei R$ X"), painel de conciliação. **Inverter o gag:** no original a UI é dor; no Recon é alívio. Número em Mono, grifo âmbar 1×.

**3.6 Tweet-card verificado como corpo do carrossel** · G4 (`DaMD7pWmEw7` 4×)
Cards são screenshots de tweets do próprio perfil (avatar, selo verificado, handle, foto embutida arredondada). Lê como timeline, baixa a guarda. → **Execução:** componente HTML "tweet-card" reutilizável — avatar Tessera, selo verificado em **âmbar** no lugar do azul, @recon, corpo Outfit, foto com `border-radius`.

**3.7 Tv-composite / barra-placar de transmissão** · V4 (tv na cena), G4 (`DaMD7pWmEw7-c01` scoreboard + grid multi-câmera)
Moldura de TV/broadcast com montagem diegética, ou barra-placar "ENCERRADO 2×1" — empresta a linguagem mais escaneada do feed esportivo. → **Execução:** barra HTML topo "MARKETPLACE × REPASSE" com placar (pedidos × valor conciliado) e selo "NÃO BATE" vermelho; números em Mono. Só na capa, pra gerar a tensão que "Confere." resolve.

**3.8 Still de vídeo em card arredondado (às vezes inclinado)** · V4 (2×), Vinci (2×)
Frame de reels tratado como objeto: cantos arredondados, às vezes leve inclinação (6°), drop-shadow, dentro de layout estático. → **Execução:** `<img>`/frame com `border-radius` + `rotate(6deg)` opcional + sombra; `rotacao_graus` vem do JSON. (No sistema Blank/Vinci a rotação é 0 — respeitar o estilo do formato escolhido.)

**3.9 Colagem: zine / renascentista / surreal** · V4 (halftone zine `DZyHpA9ETyc-c06`), Vinci (arte clássica espelhada no fecho)
Colagem editorial que vira imagem-conceito (saco de papel cuspindo produtos; arte renascentista espelhada como moldura de marca). O frame mais memorável. → **Execução:** gpt-image (image-prompt-generator) com prompt de colagem editorial; no Recon a colagem clássica espelhada puxa o símbolo Tessera de `_sistema/brand/recon/`.

**3.10 Diagrama como metáfora do produto** · V4 (sunburst concêntrico), Vinci (convergência: canais → lente → 1 resultado)
V4 põe a marca no centro de um universo de logos (mensagem = VOLUME); Vinci mostra muitos pilares convergindo numa lente pra um resultado. → **Execução:** **é a metáfora perfeita do Recon** — várias fontes (marketplaces, logística, ERP) → lente Recon → uma conciliação. Montar com `dataviz` (sunburst/convergência) sobre `#0F1A13`, nós em âmbar.

**3.11 Big-numbers em grade / badges triangulares** · V4 (grade 2×2 glow vermelho; badges triangulares `+260/+12/+8.5BI`)
Provas numéricas dispostas em grade ou triângulo, número em destaque com glow. → **Execução:** grade CSS de cartões; número em IBM Plex Mono; glow âmbar sutil sobre `#0F1A13`. Recon: pedidos conciliados / divergências achadas / R$ recuperados.

---

## 4. COMPOSIÇÃO & GRID

**4.1 Split vertical antes/depois com costura quase reta (~2°)** · Blank (`DaeMzMTDYqM` 3×)
Card dividido em duas metades verticais (dor esq / triunfo dir), costura levemente torta, texto cavalgando a junção. → **Execução:** dois `<div>` 50/50 com `background-image`; costura em `rotate(2deg)`. Imagens gpt-image: "lojista exausto na planilha" | "mesmo lojista tranquilo no dashboard".

**4.2 Moldura fina emoldurando o card (frame de página)** · Vinci (6×+5×)
Linha fina colorida na borda interna dá aparência de página de revista. → **Execução:** `border` 1px + inset no card; cor creme/âmbar discreta. Constância de marca entre slides.

**4.3 Header utilitário com régua** · Blank (6×)
Faixa fina no topo com rótulo à esquerda e à direita (caps, tracking aberto) — parece cabeçalho de dossiê. → **Execução:** régua 1px + dois rótulos Outfit caps — hospeda a **numeração XX/08** do Recon ("RECON ——— 03/08").

**4.4 Respiro editorial extremo / rotação zero** · Blank (6×+3×)
Poucas camadas, muito vazio, nada inclinado; o vazio é elemento de design. Transmite premium/confiança. → **Execução:** margens generosas, 1 ideia/card, `rotacao_graus=0`. No Recon o "respiro" é área de `#0F1A13` chapado. Disciplina: máx. 1 punch por card.

**4.5 Coluna de retratos / dupla de imagens como prova** · G4 (coluna de mentores; dualidade NFL×NBA)
Lateral com fotos empilhadas de autoridade, ou duas imagens lado a lado como precedente. → **Execução:** coluna direita com 3 blocos (screens do produto ou rostos-cliente via gpt-image), hairline âmbar entre eles.

**4.6 Escalada visual antes do fecho** · Blank (`DaLW0wPjl1q-c07`)
O penúltimo card cresce em densidade/escala — crescendo antes da virada pro fecho. → **Execução:** reservar o penúltimo card pro punch mais rico (ex: dashboard Recon completo com valor recuperado), escala levemente maior.

---

## 5. COPY & CTA

**5.1 Objeção-como-manchete** · V4 (`C8p8iVCNhH6` 2×)
A capa vira a dúvida do lead no próprio título ("Por que confiar na V4?") e promete responder no swipe. → **Execução:** capa Recon = "Por que confiar num robô pra achar seu dinheiro?" → 4 slides de prova.

**5.2 Fórmula "X precisou [dor]… para que Y [triunfo]"** · Blank (`DaeMzMTDYqM` 3×)
Manchete em 2 tempos: 1ª parte (serif) o sacrifício com reticências, 2ª parte (sans) a recompensa. Abre e fecha loop de curiosidade. → **Execução:** template mkt-content-creator: "O lojista de 2020 precisou perder R$ X no braço… / para que o de 2025 conciliasse marketplace, logística e ERP num lugar só." Grifo âmbar na dor.

**5.3 Escada aritmética de números crescentes** · G4 (`DaN4OayFRvm-c02`)
Cifras em ordem crescente (3 min → 104 jogos → US$750 mil → R$1,3 bi), saltos maiores em grifo. Dissecar o número grande o torna crível. → **Execução:** um dado por linha, ordem crescente, número em Mono/âmbar. Recon: "X pedidos → Y% divergência → R$ Z retidos → R$ W/ano que ninguém audita".

**5.4 Checklist ✅ autoaplicável** · G4 (`DaMD7pWmEw7-c05`)
Critérios em lista com checkmark convidam o leitor a se medir ("faço isso?"). → **Execução:** lista com selo âmbar dos critérios da operação certa (concilia no automático / sabe onde o repasse parou / fecha sem planilha / vê margem por pedido).

**5.5 Exemplo concreto entre aspas curvas (vago → específico)** · Blank (2×)
Demonstrar > evocar: "passando por um momento difícil" (ruim) vs "perdeu metade dos clientes em 2 meses" (bom). → **Execução:** trocar "você pode estar perdendo dinheiro" por "R$ 3.200 descontados a mais em 30 dias". Aspas curvas. Casa com `feedback_anti_ai_text`.

**5.6 Seta desenhada à mão como afordância de swipe** · Vinci (8×+8×), G4 (âmbar 2×), Blank (→)
Seta manuscrita/glifo no fim de cada card de conteúdo — loop aberto que sustenta o swipe. → **Execução:** virar 1 SVG reutilizável (cream/âmbar); ao fim de cada card-ponte + frase-isca de continuidade.

**5.7 CTA-bar como motor narrativo (cliffhanger, não só "arraste")** · V4 (4×), + pill "Arraste para o lado" serif itálica (G4 3×)
A barra de CTA nomeia o próximo slide ("O nome dele é Diogo Defante →") em vez de um "arrasta" genérico. → **Execução:** CTA-bar Recon que puxa o próximo card ("Faltou a parte que ninguém te conta →"); pill âmbar/vermelha, texto Outfit, seta. Um único evento âmbar/card (grifo OU borda de CTA, nunca os dois — regra SOP).

**5.8 Escada de parágrafos curtíssimos** · G4 (3×)
Frases muito curtas isoladas ("Perde o cliente. Fura a meta.") com linhas em branco — ritmo acelerado, ênfase por isolamento. → **Execução:** copy Recon 1-2 frases/bloco, remates aforísticos ("Quem concilia no braço, trava. Quem tem o Recon, fecha."). Passa por anti-ai-copy.

**5.9 Pergunta-serifa no rodapé como transição** · Blank (2×)
Cada card fecha com pergunta em serifa que abre o loop do próximo. → **Execução:** último elemento de cada card de conteúdo = pergunta Playfair que o próximo responde.

---

## 6. NARRATIVA & ESTRUTURA

**6.1 Newsjacking (esportivo) como cavalo de Troia** · G4 (`DaMD7pWmEw7` 5×), Blank (Taylor Swift 3×), Vinci (Endrick 5×)
O carrossel sequestra um evento viral e só revela o assunto real (negócio) no meio, quando o leitor já está emocionalmente dentro. → **Execução:** mkt-researcher acha o gancho quente (mudança de repasse de plataforma, Black Friday, IPO e-commerce); card 03 é sempre o "Da mesma forma é no seu financeiro:". 1 evento real/carrossel. Régua `feedback_recon_persona_decisor_midia`: figura pública + elenco IA, nunca stock, nunca Bodra.

**6.2 Card-pivô de meta-reveal** · Blank (`DaeMzMTDYqM-c04`)
Depois de 3 cards saturados, um card branco vazio nomeia o truque ("você acabou de vivenciar o poder do conflito"). Pattern-interrupt + autoridade. → **Execução:** card de statement puro (Playfair centralizado) invertendo o canvas anterior; única aparição do wordmark Tessera; CTA "Vamos mostrar. →".

**6.3 Regra dos três (3 provas antes do reveal)** · Blank (3×)
Três cards de gancho idênticos em estrutura, um exemplo cada, antes de virar a chave no card 4. → **Execução:** empilhar 3 provas de repasse-que-não-bate (3 personas/3 números) antes do card-pivô.

**6.4 Moldura narrativa capa↔fecho** · Blank (2×), V4 (arco emocional), Vinci
Card 01 e último usam a mesma gramática; capa afirma/fisga, fecho vira pergunta de engajamento — o carrossel "rima". → **Execução:** template único de capa/fecho: capa = afirmação da dor, fecho = "Já conferiu se seu repasse bate?". Concentra comentários no último slide.

**6.5 Arco emocional de personagem** · V4 (caos na capa → serenidade na conclusão 2×)
O mesmo personagem muda de estado ao longo do carrossel (caótico → sereno), materializando a transformação. → **Execução:** persona lojista IA (image-prompt-generator) aflita no card 01 → tranquila no fecho, mesma pessoa.

**6.6 Ruptura total de universo no CTA** · V4 (`DZyHpA9ETyc-c09`)
O card de conversão muda completamente de mundo (árbitros V4 em campo tático) pra sinalizar "acabou a história, agora é a oferta". → **Execução:** card final quebra o universo do conteúdo e entra o produto/demo Recon com clareza; contraste proposital.

**6.7 Marca por restrição** · Blank (wordmark 1×)
O logotipo aparece uma única vez (no pivô), discreto; o resto sustenta a marca só pelo sistema tipográfico. → **Execução:** Tessera + "Recon" só no card-pivô e/ou final; nos demais, a assinatura é o selo "Confere." + numeração XX/08.

**6.8 Logo-âncora + selo editorial constante** · V4 (topo-esq 9×), Vinci ("A post by VINCI SOCIETY®")
Um elemento de marca fixo no mesmo lugar em todos os cards = fio que costura o carrossel. → **Execução:** símbolo Tessera topo-esquerda + selo "Confere." rodapé, constantes em todos os 8 cards. É o que deixa a arquitetura variar sem perder identidade.

---

## Receita de montagem (carrossel Recon de 8 cards, usando o repertório)
1. **Capa** — Objeção-como-manchete (5.1) OU manchete de acusação com número (1.4) sobre foto full-bleed + gradiente de legibilidade (2.4) + grifo âmbar 1× (2.1).
2-4. **Gancho/provas** — Regra dos três (6.3) via newsjacking (6.1), fórmula de copy (5.2), cada card fechando em pergunta-serifa (5.9) ou seta hand-drawn (5.6).
5. **Pivô** — Card de meta-reveal (6.2) OU quebra cromática (2.6): nomeia o problema Recon.
6. **Solução (explica, não decora)** — mock de UI invertido (3.5) OU diagrama de convergência (3.10). O card de solução ENSINA (SOP Etapa 0).
7. **Prova** — big-numbers/escada aritmética (5.3/3.11) OU template de autoridade (3.1).
8. **Fecho** — moldura capa↔fecho (6.4) com pergunta de engajamento + CTA-bar cliffhanger (5.7) + selo "Confere." (6.8).
Marca constante nos 8 (2.x/6.8); arquitetura distinta card a card (SOP §a). Máx. 1 evento âmbar/card.

> **Fontes-máquina (todas em `recon/inteligencia/marketplace/referencias-ig/`):** estruturas card-a-card em `biblioteca-formatos-v4.json` (63 entradas verificadas com camadas + `replicacao_recon`); recursos crus em `decupagem/*.json`; **imagens reais em `<perfil>/<shortcode>/card-NN.jpg` — abrir com Read antes de replicar.**
