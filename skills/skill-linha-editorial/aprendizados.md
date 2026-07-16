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

## Arquitetura de card
- **A imagem é o lever nº1**, não a copy nem as regras. Olhe a imagem REAL da referência (card-NN.jpg do banco) antes de montar cada card.
- **Planeje os preenchimentos de mídia no GATE 2**, não improvise fill no meio do build. Cada card precisa de 2-4 registros de mídia empilhados; card raso = PowerPoint.
- **Nitidez é gate:** render 2×, foto fonte alta-res/upscale, texto/logo overlay vetorial, grão sutil, conferir a 1:1.

## Marca
- **O brand-loader cai em fallback silencioso** se os nomes de token do manual não baterem com os que ele espera. Confira que o `brand_manual` do perfil usa os nomes certos, senão a arte sai fora da marca sem avisar.

## Instanciação
- **Um cliente = um arquivo de perfil.** Nunca hardcode marca nos agentes/referências. Se algo do cliente aparecer fora do `config/exemplos/<cliente>.md`, é bug de portabilidade.
