# Aprendizados — skill-linha-editorial

> Lições comprovadas na operação que originou esta skill (canal Recon, decupando @v4company/@g4.business). Ler antes de operar, pra não repetir erro.

## Seleção de pauta
- **Ficção fria reprova.** Personagem de série sem hype nem material real (ex.: um patriarca de ficção) falha 2 dos 3 gates. Prefira sempre a versão REAL e quente da mesma ideia (um fundador do noticiário no lugar do personagem).
- **Personificação mesmo sem protagonista óbvio.** Pauta sobre empresa sem rosto ainda precisa de um rosto: fundador, CEO, herdeiro, rival ou avatar cultural (a V4 põe um político numa história de refrigerante). Sem rosto, não vai.
- **Fit de ICP não vence hype sozinho.** Um caso perfeito de nicho mas com rosto irreconhecível no país do público perde pra um caso quente e famoso. Carregue o caso de nicho pela HISTÓRIA, não pela cara.
- **Não repita molde.** Cada post queima uma veia/ângulo; não empilhe a mesma veia na janela seguinte. Registre no §8 do perfil.

## Headline de capa
- **A capa é condicionada pela imagem (Ogilvy).** Se a headline se sustenta sozinha, está fraca. A imagem (rosto nítido + elementos-âncora) tem que completar ou inverter o sentido de uma frase curta. Estrutura V4: setup / PALAVRA-SOCO / barra na cor-accent.
- **Copy aprovada é congelada.** Layout se adapta ao texto, nunca o contrário. Não reescreva copy aprovada pra caber no design.

## Narrativa (ETAPA 0)
- **Narrativa inteira ANTES de qualquer pixel.** Travar copy card a card cedo demais gera salto semântico e cacoete. Escreva a história contínua, leia de ponta a ponta, aprove, só então desenhe.
- **A caça anti-cacoete acha defeito real.** Rode o `copy-auditor` adversarial sempre — ele pega travessão que vazou, erro factual sobre a obra, palavra-função repetida. Autoverificação não substitui.
- **Mecanismo concreto obrigatório (GATE 1).** A história tem que dizer **por que exatamente** deu errado, **quem não conferiu o quê**, **o que vazava**. "O dinheiro escapou" é vago e enfraquece a ponte pro produto. Ex. RC: "a auditoria cruzou o que os shows e as empresas geraram contra o que a gestão prestava de conta".

## Arquitetura de card
- **A imagem é o lever nº1**, não a copy nem as regras. Olhe a imagem REAL da referência (card-NN.jpg do banco) antes de montar cada card.
- **Planeje os preenchimentos de mídia no GATE 2**, não improvise fill no meio do build. Cada card precisa de 2-4 registros de mídia empilhados; card raso = PowerPoint.
- **Nitidez é gate:** render 2×, foto fonte alta-res/upscale, texto/logo overlay vetorial, grão sutil, conferir a 1:1.
- **DISCIPLINA DE DIAGRAMAÇÃO (o erro que MAIS volta, comprovado 2026-07-20 no post RC):** texto SEMPRE em zona limpa/sólida, **NUNCA sobre rosto**; a mídia é **CONTIDA** (moldura c/ legenda OU painel de dados desenhado — tabela/ledger/mockup), **nunca full-bleed atrás do texto** (exceto a capa); **zero espaço vazio**. Régua = contact-sheet de um campeão editorial (post "Walter White"). As 2-4 camadas empilham DENTRO da zona de mídia, não por baixo do texto.
- **Nitidez de FIGURA PÚBLICA:** foto de imprensa é baixa-res → **upscale 4K** (Higgsfield) ANTES de compor. Esticar a foto crua = borrão = reprova.
- **Não recrie HTML:** copie o código-ouro do cliente (`_common.py` + template de capa + template de interiores) pro `build/` do post novo; troque copy+assets, mantenha a estrutura/CSS/grade.

## Marca
- **O brand-loader cai em fallback silencioso** se os nomes de token do manual não baterem com os que ele espera. Confira que o `brand_manual` do perfil usa os nomes certos, senão a arte sai fora da marca sem avisar.

## Instanciação
- **Um cliente = um arquivo de perfil.** Nunca hardcode marca nos agentes/referências. Se algo do cliente aparecer fora do `config/exemplos/<cliente>.md`, é bug de portabilidade.
- **Padrão: Fase 0 por fan-out de leitores.** Um agente por doc da foundation (ICP, brand, business model, metodologia, competitiva, operação), cada um devolvendo só fato + citação literal + "AUSENTE" onde não há dado, rende perfil com zero invenção — as lacunas viram `[PENDENTE]` honestos em vez de preenchimento plausível. Comprovado na instanciação AZB (2026-07-16, 6 fontes).
- **Perfil pode conter dado sensível do cliente** (ticket, margem, ICP interno). Se o repo da skill for público, decidir gitignore/privacidade do `config/exemplos/<cliente>.md` ANTES do primeiro commit.

## Fase 2 (pautas)
- **Erro #1: Personificação medida contra o país, não contra o ICP.** O motor V4/G4 recompensa rosto nacional (Hype × Personificação), o que serve pra audiência urbana de marketing/gestão. Aplicado a ICP de nicho (dono de revenda agro), encheu o topo do ranking de pauta pop (farmácia na Copa, streamer, futebol) e feriu o posicionamento anti-"agência paulista" do cliente. Correção (AZB, 2026-07-17): o eixo Personificação pontua contra o DECISOR do cliente ("o Cléber reconhece em 0,5s?"), e porta pop é decisão explícita do perfil, default CORTADA. Ao instanciar cliente novo, perguntar ao humano: pop entra ou não?

## Produção (Fase 3)
- **Padrão-MESTRE de capa (Phoebe/post-04 + Rei/post-07 Recon, validado na Lavoro AZB): CENA REGERADA, não camadas.** O caminho vencedor é gerar UMA cena editorial coesa via `gen-image-ref.sh` (images/edits) com 2 fotos reais da figura como âncora de likeness, colocando o contexto narrativo DENTRO da cena no prompt (Phoebe: pai no fundo + dinheiro queimando; Lavoro: púlpito da bolsa na frente + galpão de paletes de sacas atrás + glow azul de telas sem texto). Prompt exige: "keep exact face/likeness" + descrição física da pessoa + luz cinematográfica (key âmbar + rim frio) + "no text/letters/numbers/logos". Depois o build só põe: gradiente de legibilidade + chip logo real (se figura desconhecida do ICP) + frase única bold + selo. Escada de aprendizado registrada: sticker/colagem CSS = lixo · camadas blend (soja screen) = ruído · CENA regerada = aprovada. Inspecionar likeness contra as fotos-referência antes de usar.
- **Erro #3: condicionar capa com textura de clima em vez de objeto do mundo.** Na capa Lavoro (AZB), a 1ª tentativa de "camada de condicionamento" foi confete/flash (clima de festa). Reprovada pelo humano: clima genérico não responde "revenda DE QUÊ?". Regra: o elemento de condicionamento tem que responder as duas perguntas que o leitor faz em 0,5s: (1) *de quê?* → objeto físico do mundo do caso (sacas de insumo em palete, não confete); (2) *quem?* → identidade real da empresa como tag editorial (logo oficial em chip, uso jornalístico). Textura de atmosfera é tempero por cima, nunca a resposta.
- **Erro #2: comer conectores.** A régua anti-IA pede frase curta de corte, e a ETAPA 0 da Lavoro (AZB) overcorrigiu pra telegrama ("Funciona. Até o dia em que..."). Feedback do humano no GATE 1: corpo de card é PROSA PADRÃO com conectores naturais (e, mas, porque, enquanto, tanto que, só que); fragmento sem verbo só na estocada final ou no card-statement, 1-2 por peça no máximo. Telegrama é cacoete de IA igual à parataxe simétrica, só que no espelho.
- **Regra nova (master prompt do humano, 2026-07-17): capa SEM hierarquia de tamanho.** Frase única de 6-10 palavras, ênfase só por cor-accent em 1 palavra. O molde "setup / PALAVRA-SOCO gigante / barra" morreu na capa; segue útil só como compressão de pauta no banco (Fase 2). Ver `references/master-prompt-diretor-carrossel.md` (lei da produção; carregar inteiro antes de toda ETAPA 0).

## Linha editorial (Fase 1)
- **Padrão: orçamento de antítese.** O par "X, não Y" é assinatura da voz, mas vira cacoete na 3ª ocorrência no mesmo doc. A caça anti-cacoete deve CONTAR as ocorrências e deixar ~1 par autorizado por peça (o que vier verbatim do perfil), cortando os demais. Comprovado na linha AZB (2026-07-16: copy-auditor achou 3 pares, absolveu o do perfil, cortou o da abertura).
