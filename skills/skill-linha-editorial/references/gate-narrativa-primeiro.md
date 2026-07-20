# GATE — Narrativa em prosa contínua (ETAPA 0, antes de qualquer design)

> **Regra fundadora:** nenhum carrossel vai para arquitetura de card, arte ou pixel antes de a narrativa inteira estar escrita em prosa contínua, lida de ponta a ponta e aprovada por um humano.

Este documento é a versão portável e client-agnóstica de um gate comprovado em produção. Ele serve para qualquer cliente: onde este texto diz **"o perfil do cliente"**, leia o brand/foundation do cliente em questão (voz, selo/assinatura, persona-alvo, produto). Onde diz **"a obra/caso"**, leia a referência cultural, o caso real ou a analogia que ancora o carrossel.

---

## 1. Por que a narrativa vem primeiro

O erro que este gate corrige: começar a fechar a copy card a card cedo demais, sem nunca escrever a história inteira e ler de ponta a ponta. Isso produz três defeitos que só aparecem quando é tarde:

- **Salto semântico** entre cards — o card 3 recomeça um assunto em vez de continuar o card 2.
- **Cacoete de IA** — travessão, negação paralela, staccato telegráfico, headline de efeito vazia.
- **Card de solução desperdiçado** — o slide que deveria ensinar o mecanismo gasta o espaço com uma frase bonita que não explica nada.

A copy é o **esqueleto** da peça, não a legenda da imagem. Se a narrativa não se sustenta como texto único, nenhum design salva. Por isso ela é escrita, lida e aprovada **antes** de existir qualquer card.

---

## 2. O que fazer — escrever o carrossel como UMA história

Escreva o carrossel **inteiro** como uma história em prosa contínua. Não fragmentos, não headlines soltas, não bullets. Card por card, mas lendo como um texto único que flui. Depois, **leia de ponta a ponta em voz alta** e cheque se faz sentido como narrativa. Só então quebre em beats de card e siga para a arquitetura.

### Regras de storytelling

1. **Abrir CONTANDO a história**, em prosa, de verdade. O molde canônico é *"Em `<obra/caso>`, `<personagem>` fez o que ninguém fez…"* — abertura como quem senta e narra, não fragmento de efeito nem rótulo telegráfico.
2. **Continuidade obrigatória, card→card.** Cada card CONTINUA e DESENVOLVE o anterior. O card N+1 nunca mata a conexão nem a curiosidade que o card N abriu — ele paga ou avança. Se o card 1 fisga, o card 2 aprofunda a MESMA linha (não reafirma a tese, não salta de assunto).
3. **Proibido salto semântico.** Leia cada transição card→card e pergunte: *"isso continua a história ou recomeça?"*. Se recomeça, reescreve.
4. **O card de SOLUÇÃO ensina o mecanismo.** Headline chama; o corpo EXPLICA como funciona, passo a passo, com o número/dado concreto. Não desperdice o card da solução com um visual bonito + frase de efeito que não ensina nada. É o card mais fácil de estragar e o mais caro quando estraga.
5. **Voz do perfil do cliente.** Prosa de gente contando uma história com autoridade — a voz definida na foundation/brand do cliente —, não bullet de PowerPoint. A **obra/caso apenas ambienta** a cena; ela nunca vira a lição. A lição é sempre sobre a dor e a solução do cliente.

---

## 3. Lista dura anti-cacoete (reprova na hora)

Qualquer um destes, sozinho, reprova a narrativa e manda de volta pra bancada:

- **Travessão (—) banido.** Reescreva com ponto, vírgula ou dois pontos.
- **Negação paralela banida:** *"não foi sorte, não foi palpite"*, *"não é X, é Y"*, *"não sobre X, é sobre Y"*. Estrutura de IA por excelência. **Exceção:** no máximo **UMA** antítese deliberada por peça, declarada como escolha e alinhada ao selo/assinatura do cliente (ex.: um selo que é uma afirmação curta pode justificar uma única antítese que rima com ele). Uma. Declarada na verificação. Nunca por acidente, nunca duas.
- **Repetição de palavra-função em frases vizinhas.** Ex.: *"…que **ninguém** confere, o número que **todo** ERP mostra e **ninguém** abre"* (ninguém 2x, todo). Reescrever.
- **Staccato telegráfico** — sequência de fragmentos curtos sem verbo, tipo rótulo (*"261 tarifas. Nenhuma conferida."* repetido como estilo). Banido como padrão.
- **Headline de efeito vazia** — manchete que soa bem e não diz nem ensina nada.

> A régua `anti-ai-copy` roda **por cima** desta lista, como camada extra. Ela **não substitui** a leitura da narrativa inteira. Passar na régua não é aprovar o texto; a leitura contínua é que aprova.

---

## 4. Processo de verificação (caça adversarial + fidelidade)

Antes de levar a narrativa ao humano, ela passa por duas verificações independentes:

### (a) Caça adversarial anti-cacoete

Um revisor que **assume que o texto tem defeito e tenta provar** — não lê pra gostar, lê pra pegar. Vasculha a lista dura da seção 3, incluindo os cacoetes **escondidos** (a negação paralela disfarçada de *"X, e não Y"*; a antítese não declarada; a repetição de palavra-função a duas frases de distância). Cada achado é corrigido e registrado.

No toolkit, essa caça é o papel do agente **`copy-auditor`** (definição em `agents/copy-auditor.md`, relativo à raiz do toolkit). Invoque-o por nome sobre a narrativa contínua e trate o retorno dele como bloqueante: achado não corrigido = narrativa não sai da bancada.

### (b) Fidelidade à obra/caso

Os fatos da obra/caso citada **conferem**. Nome de personagem, o que aconteceu na cena, a cronologia, o dado real. Uma analogia que erra o fato da referência queima a autoridade da peça inteira. Confira contra fonte, não contra memória.

---

## 5. Template do entregável

O entregável da ETAPA 0 é **um arquivo de narrativa** com quatro blocos, nesta ordem. Modelo:

```
# Post XX — <tema / obra-caso × dor do cliente> — NARRATIVA (ETAPA 0)

> Status: aguardando GATE (humano lê a narrativa contínua e aprova ANTES de qualquer design).
> Data: AAAA-MM-DD

Tema (obra/caso + gancho): ...
Assinatura/selo do cliente: ...
Persona ("você"): o DECISOR-alvo do perfil do cliente ...
Produto (entra no meio/fundo): ...
Motor narrativo: a imagem/cena que costura a peça ...
Ângulo: ...

---

## (a) LEITURA CONTÍNUA (ler de ponta a ponta como UM texto só)

<a história inteira em prosa, um parágrafo por card, fluindo como texto único.
 É esta seção que o humano lê no gate.>

---

## (b) QUEBRA POR CARD (manchete + candidato a grifo-accent + corpo)

| # | Papel | Manchete | Candidato a grifo-accent |
|---|-------|----------|--------------------------|
| 01 | capa | ... | "..." |
| 02 | ... | ... | "..." |
| ...                                       |
| 0N | fecho + CTA | ... | "..." |

Corpo por card:
01 — capa. <parágrafo>
02 — <papel>. <parágrafo>
...
0N — fecho + CTA. <parágrafo + CTA do cliente>

---

## (c) VERIFICAÇÃO (registro do gate anti-cacoete)

- Caça adversarial (copy-auditor): <achados e correções, ou "limpo">
- Fidelidade à obra/caso: <o que foi conferido contra fonte>
- Autocertificação: sem travessão · sem negação paralela (ou: 1 antítese
  deliberada declarada) · sem staccato · sem repetição de palavra-função
  em frases vizinhas · persona decisor · solução ensina o mecanismo ·
  continuidade total.
- Recursos retóricos deliberados mantidos (não são cacoete): <ex.: anáfora
  controlada, a única antítese on-brand com o selo>.

---

## (d) MICRO-FLAGS (pontos pro olho do humano, não bloqueiam a leitura)

1. <ponto de julgamento subjetivo: uma capa de 2 frases, um jargão, uma
   escolha de tom — sinalizado pro humano decidir, com a alternativa pronta>
2. <...>
```

Notas sobre cada bloco:

- **(a) Leitura contínua** é o coração. É o texto que o humano lê no gate. Um parágrafo por card, mas costurados de forma que a passagem de um pro outro seja invisível.
- **(b) Quebra por card** existe só para preparar a próxima etapa (arquitetura). O **grifo-accent** é a única palavra por card que vai carregar a cor/ênfase da marca — marque o candidato, não decida o design.
- **(c) Verificação** é o registro de que a caça adversarial e a fidelidade rodaram. Antítese deliberada, se houver, é **declarada aqui** — é o que a distingue de um cacoete acidental.
- **(d) Micro-flags** são os pontos onde o autor tem uma dúvida legítima de julgamento e entrega a decisão ao humano, já com a alternativa pronta pra troca. Não bloqueiam a leitura; agilizam a aprovação.

---

## 6. O GATE

O humano que aprova **lê a seção (a), a leitura contínua, como um texto único** — não card a card, não a tabela, não os assets. Lê como quem lê uma história e sente se ela se sustenta, se fisga, se ensina, se soa como a voz do cliente.

**Sem narrativa aprovada, não há design.** Nenhuma arquitetura de card, nenhum gen-image, nenhum render antes deste sim.

A narrativa aprovada fica **registrada junto da peça** (o próprio arquivo da ETAPA 0), como fonte da verdade da copy para todas as etapas seguintes. Copy aprovada é congelada: as etapas de arquitetura e design se adaptam ao texto, nunca o contrário.
