---
# ─────────────────────────────────────────────────────────────
# PERFIL DE CLIENTE — bloco parseável pelos agentes (não remover chaves)
# Preencha um arquivo por cliente em config/exemplos/<cliente>.md
# ─────────────────────────────────────────────────────────────
cliente: "<nome-curto-kebab>"            # ex: recon, azb, planning
marca_display: "<Nome da marca>"          # ex: Recon
produto_uma_frase: "<o que o produto faz em 1 frase concreta>"
tese_uma_palavra: "<o que você vende, reduzido a UMA palavra>"   # ex: contabilidade
bandeira: "<a linha editorial-mãe, 1 frase>"                     # ex: o repasse que ninguém confere
selo: "<assinatura funcional curta, opcional>"                   # ex: Confere.
brand_manual: "<caminho do manual/tokens da marca p/ o brand-loader do skill-arte-onbrand>"
formato_padrao: "1080x1350"              # 4:5 default IG; 1080x1920 stories; 1080x1080 feed quadrado
n_cards_padrao: 8
contas_referencia_arquitetura:            # os perfis "gabarito" de ESQUELETO (não de arte)
  - "<@perfil1>"                          # ex: v4company, g4.business
  - "<@perfil2>"
teto_de_risco: "<liberado | conservador>"   # liberado = usa figura real/ficção, licença depois
cta_link: "<url do produto/demo>"
warm_up_rule: "<em que card o produto entra>"   # ex: só a partir do card 7/8
---

# Perfil de Cliente — `<Nome da marca>`

> **Como usar:** este arquivo é o único que muda entre clientes. Preencha tudo abaixo; os agentes e as skills leem daqui. Onde não souber, escreva `[PENDENTE — humano preenche]` em vez de inventar. O bloco YAML acima é o resumo parseável; as seções abaixo são o detalhe que dá alma à linha.

## 1. O que vendemos (a tese-mãe)
Reduza a oferta a **uma palavra** (`tese_uma_palavra`) e explique em 2-3 linhas. Todo o resto do sistema usa isso como o **filtro de fit**: nenhuma pauta entra se o gap dela não cair nessa faixa.
> *Regra:* a tese é o que separa este canal de um canal genérico de negócios. Ela é o "recheio" que entra no meio/fundo de todo carrossel; a personalidade pop é a "porta".

## 2. Persona ("você") — o DECISOR
- **Quem é:** cargo, porte, idade, setor, ferramentas que usa.
- **Reconhece em 0,5s:** que mundos/marcas/dores ele identifica na hora (a arte é aferida por isto).
- **O que teme / o que quer:** a dor emocional que a pauta ativa.
- **Fala de:** o vocabulário dele (caixa, margem, risco…).
- **NÃO é:** quem o "você" nunca pode ser (ex.: o operador, o fraudador, o consumidor final).

## 3. Filtro de fit + veias de sourcing
A **faixa temática** que toda pauta tem que tocar (derivada da tese). Depois, liste 4-6 **veias recorrentes** — os tipos de história que sempre produzem pauta na faixa, pra o researcher saber onde pescar. Formato de cada veia: `nome curto — o gap — rosto típico — a ponte pro produto`.

## 4. Personificação — política de rostos
- Toda pauta abre com um **rosto real reconhecível** (Lei do Canal). Defina a política:
  - Figuras públicas por newsjacking? Elenco de IA recorrente? Nomes barrados?
  - Se a pauta é sobre empresa sem rosto, qual é a regra de **avatar** (fundador/CEO/rival/avatar cultural)?
- **Nunca:** stock genérico; (liste vetos específicos do cliente).

## 5. Marca (design) — tokens
Aponte o `brand_manual` e resuma os tokens que TODO card carrega (constância de marca):
- Fundo · fonte de manchete · fonte de corpo · fonte de dado/mono · cor-accent (1 evento por card) · selo · numeração.
> O render sai do `skill-arte-onbrand` (brand-loader lê o manual). Se os nomes de token do manual não baterem com o brand-loader, ele cai em fallback silencioso — conferir.

## 6. Régua de risco / tabus
- **Teto de risco** (`teto_de_risco`) e o que isso libera/barra.
- **Tabus de tom** (o que faz a persona desligar).
- **Tabus jurídicos** (imputar dolo, nome de pessoa viva em peça comercial, IP de obra, concorrente com deboche…).
- **Regra de número:** todo número de manchete anexa fonte; sem fonte, hedge ou corta.

## 7. Voz
Régua `anti-ai-copy` sempre. Além dela, notas de voz do cliente (referência de tom, ex.: "Embraer, não Tesla"; humor de in-group permitido; o que nunca dizer).

## 8. Sequência / rotação (preenchido ao longo do tempo)
Histórico de posts publicados + molde usado, pra não repetir arquitetura nem ângulo em janela curta. (Começa vazio.)
