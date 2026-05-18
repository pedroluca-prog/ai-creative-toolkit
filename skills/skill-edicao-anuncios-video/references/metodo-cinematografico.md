# Método Cinematográfico — Layer 1 (Criativo)

> Carregado quando há decisão criativa no pedido (não só formato/logo). Sintetiza um framework prático de 5 elementos: 3 capítulos · shot sequence · sound design · música BPM/drops · color grading. Origem: vídeo-aula "The Power of SIMPLE Editing" + adaptação ao mercado agro AZB.

---

## Princípio guia

> "Less is more." Edição não vence pelo volume de cortes, e sim pela coerência entre **estrutura narrativa, ritmo musical e identidade visual**. Vídeo cinematográfico = história em 3 capítulos + ritmo + cor.

---

## 1. Estrutura em 3 Capítulos

Toda peça com mais de 15s deve ter 3 capítulos identificáveis. É o backbone narrativo que sustenta atenção.

| Capítulo | % da duração | Função | Ferramentas |
|---|---|---|---|
| **1. Hook** | 15-20% | Captura atenção; entrega promessa; abre loop | Shot sequence forte, música em build-up, frame esteticamente impactante |
| **2. Desenvolvimento** | 60-70% | Entrega o conteúdo; sustenta o loop aberto | Múltiplas tomadas, B-roll, dados, depoimentos, ritmo médio |
| **3. CTA / Pay-off** | 15-20% | Fecha o loop; chama ação | Texto na tela, logo, voz fechando, drop musical pra silêncio |

### Aplicação por formato

| Formato | Duração | Capítulo 1 | Capítulo 2 | Capítulo 3 |
|---|---|---|---|---|
| Reels (15s) | 15s | 0-3s | 3-12s | 12-15s |
| Reels (30s) | 30s | 0-5s | 5-25s | 25-30s |
| Reels (60s) | 60s | 0-10s | 10-50s | 50-60s |
| Anúncio Meta (30s) | 30s | 0-3s (hook + oferta no 1º segundo) | 3-25s | 25-30s (CTA forte) |
| YouTube curto (3-5min) | 4min | 0-30s | 30s-3:30 | 3:30-4:00 |

### Regra prática AZB

No Layer 1, antes de cortar, escreva no `_brief.md`:

```
Capítulo 1 (Xs) — HOOK: {frase ou pergunta que abre} | Visual: {descrição}
Capítulo 2 (Xs) — DEV:  {3 a 5 pontos / dados / momentos}
Capítulo 3 (Xs) — CTA:  {ação esperada} | Visual: {logo + handle + cor da marca}
```

Se você não consegue escrever isso em 3 linhas, o vídeo não tem história — pare e re-roteirize antes de cortar.

---

## 2. Shot Sequence (Sequência de Planos)

Técnica para acelerar narrativa **e** funcionar como gancho visual. Receita:

1. **Capturar** múltiplos planos da mesma ação (ou ações encadeadas) — mínimo 3, ideal 5-7.
2. **Cortar** todos os clipes para o **mesmo comprimento** (0.4-0.8s típico para Reels; 1-2s para YouTube).
3. **Unir** em sequência contínua de movimento — cada corte deve completar/avançar a ação.

**Onde usar:**
- Hook (Capítulo 1) — abre o vídeo com energia + comunica tema em 2-3s
- Transição entre capítulos — fecha um e abre o seguinte
- Momento de "demonstração" no Desenvolvimento (ex: pasto antes/depois, processo de plantio)

**Erros comuns:**
- Comprimentos desiguais → fica "tropeçado", quebra ritmo
- Sem unidade temática → vira clipão, não sequência
- Sem música marcando → cai na audição

**Adaptação agro AZB:**
- Glauco no campo: 5 planos de 0.6s cada — apontando muda → caminhando entre Tifton → ajoelhando → tocando o solo → close de muda saudável. Total 3s = hook completo.
- Escola Pecuária: 4 planos do manejo no NNM → boi entrando no curral → técnico medindo → cocho cheio → boi pastando. Total 2.4s.
- Equus: 5 planos da clínica → fachada → cavalo no protocolo → veterinário → laboratório → cavalo recuperado.

Marcar no brief: "Shot sequence sim/não. Se sim: lista de planos + duração padrão."

---

## 3. Sound Design

> "Os visuais são apenas metade da imagem." (transcrição)

SFX bem colocado salva edição mediana. Lista mínima a manter no banco AZB:

| SFX | Uso | Pontos críticos |
|---|---|---|
| **Whoosh** | Transição entre cortes / shot sequence | 0.3-0.5s, 2-4 dB abaixo da música |
| **Impact / boom** | Hook strong / drop musical / dado forte | Pico em 1 frame; sub-bass se possível |
| **Subtle click** | Texto aparecendo na tela | Frame-accurate com a animação |
| **Ambient room** | Cobrir falha de som de fundo | -25 dB, contínuo |
| **UI bleep** | Animação de UI/dado em data viz | Curto, agudo, EQ acima de 2kHz |

**Regra de mixagem:**
- Voz: -6 dB pico (referência)
- Música: -15 a -18 dB (deve estar abaixo da voz)
- SFX: -8 a -12 dB (chama atenção, mas não compete)

Lista completa de fontes em `references/sfx-music-library.md`.

---

## 4. Música — BPM, Drops, Gênero

A música é a **espinha dorsal** do vídeo. Ela dita ritmo, andamento, emoção, narrativa.

### Princípios

1. **Escolher música ANTES de filmar** sempre que possível — define o BPM da edição.
2. **Olhar BPM**: define velocidade de cortes. 60-80 = lento/cinematográfico. 90-110 = médio. 120+ = energético.
3. **Identificar drops**: pontos naturais para mudar cena, abrir capítulo, entrar CTA.
4. **Gênero — tabela AZB**:

| Gênero | Quando usar | Quando NÃO usar |
|---|---|---|
| **Cinematic / orchestral** | Lançamento, hero piece, depoimento emocional | Conteúdo rápido informativo |
| **Jazz** | Vídeo "premium / bem produzido" — Equus, vinho, agro premium | Vídeos rápidos de meme |
| **House / electro chill** | Reels energético, anúncio, demo de produto | Conteúdo emocional, depoimento |
| **Ambient / corporate uplift** | Institucional, sem pessoa, motion 100% | Comercial direto duro |
| **Lo-fi** | ❌ **EVITAR** — antiquado e sobreusado (transcrição original) | Quase tudo |

### Sincronização ritmo-corte

- Cada corte cai em **batida** ou **acento melódico**.
- Mudança de capítulo → drop ou silêncio musical.
- Texto na tela aparece com **kick** ou **snare** ou um pulso musical claro.
- Saída (CTA → fim) → fade out gradual ou drop final.

Listas de bibliotecas com BPM tagueado em `references/sfx-music-library.md`.

---

## 5. Color Grading & Iluminação

> "Color grading comunica toda a estética do vídeo." (transcrição)

### A ordem importa: capturar bem é metade do grading

| Ação | Quando | Impacto |
|---|---|---|
| **Mais luz no set** | Captura | Mais informação para corrigir; sombras controláveis |
| **Luzes práticas atrás do sujeito** | Captura | "Pop" no quadro, profundidade, separação fundo/primeiro-plano |
| **Objetos coloridos no enquadramento** | Captura | Riqueza cromática; pontos de fuga para o olhar |
| **LUT 1-clique** | Edição | 80% do look em segundos; refino manual no resto |
| **Curves manuais** | Edição refino | Ajuste fino de skin tones e sombras |

### Looks-base AZB

| Look | Quando | Stack |
|---|---|---|
| **Cinematic warm** | Equus, Xiru hero, depoimento | LUT teal-orange leve + bump em saturação 5% |
| **Natural / clean** | Escola Pecuária, conteúdo técnico | LUT Rec.709 default + denoise |
| **High contrast brand** | Anúncio Meta, hook forte | LUT contraste + saturação +10%, vinheta sutil |
| **Pasto verde rico** | Conteúdo Xiru de campo | LUT custom: green boost + sky blue boost |

LUTs `.cube` curados e comandos ffmpeg em `references/color-grading.md`.

---

## Checklist do Layer 1 (antes de cortar)

- [ ] 3 capítulos definidos no `_brief.md`
- [ ] Shot sequence decidida (sim/não, lista de planos se sim)
- [ ] Música escolhida (gênero + BPM + drops marcados em segundos)
- [ ] SFX necessários listados (whoosh, impact, etc.)
- [ ] Look de color grading definido (cinematic warm, natural, etc.)
- [ ] Brand manual lido (cores entram em Layer 3 e 4)
- [ ] Brief salvo em `_brief.md` na pasta do entregável

Se algum item ficou em branco, **não passe para o Layer 2**. Briefar custa 5min; cortar errado custa 60min de retrabalho.

---

## Adaptação ao agronegócio brasileiro

| Princípio do método original | Tradução agro AZB |
|---|---|
| "Lugares estéticos" como cenário | Pasto, lavoura, drone aéreo da fazenda, curral organizado, fachada de clínica |
| Luzes práticas no set | Lanterna LED no curral à noite; golden hour no campo; luz de janela no escritório |
| Objetos coloridos | Cor da camisa do produtor, equipamento amarelo (John Deere), barracas de feira agro, sal mineral |
| Música cinematográfica não-lo-fi | Country acústico moderno + cinematic + house chill — depende do segmento (premium vs popular) |
| 3 capítulos | Hook = pergunta/dor → Dev = solução técnica → CTA = link/contato |

---

## Anti-padrões a evitar

- ❌ Cortar sem música definida — ritmo errado
- ❌ Usar lo-fi default — antiquado e genérico
- ❌ Shot sequence com clipes de comprimentos diferentes — quebra magia
- ❌ Color grading "filtro pesado" sem LUT calibrado — cara de TikTok 2020
- ❌ Hook fraco "olá pessoal hoje vou falar sobre" — perde 80% no primeiro segundo
- ❌ CTA na borda do tempo (último 0.5s) — não dá tempo de ler
- ❌ Vídeo de 60s sem capítulos definidos — vira monólogo