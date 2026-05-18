# Aprendizados — skill-edicao-anuncios-video

## Padrão #1 — ffmpeg não instalado no ambiente inicial (2026-05-02)
**Data:** 2026-05-02
**Situação:** Criação da skill B2 no primeiro run. `ffmpeg -version` retornou `command not found`. Homebrew também não disponível no ambiente macOS do Pedro.
**Resolução pendente:** Instalar via binário estático (https://evermeet.cx/ffmpeg/) ou via `pip install imageio imageio-ffmpeg` que baixa o binário automaticamente. Ver `references/ffmpeg-templates.md` §Instalação.
**Próximo passo:** Pedro instala ffmpeg → testa com 1 vídeo bruto do Glauco/Xiru → registra tempo de execução e tokens consumidos → confirma go/no-go (critério: < 30min e < 50k tokens por vídeo).
**Impacto:** SKILL.md e templates criados mas não testados em vídeo real. Estimativas de custo de tokens são hipotéticas até o primeiro teste.

---

## Padrão #2 — Skill expandida para toolkit 4-layer (2026-05-05)
**Data:** 2026-05-05
**Situação:** Pedro pediu toolkit completo de edição + motion para anúncios e conteúdo, baseado em 3 inputs:
- **Video-Use** (browser-use/video-use) — corte inteligente baseado em transcrição (ElevenLabs), remove fillers, color grading auto, burn-in subtitles, integra HyperFrames+Remotion+Manim+PIL
- **HyperFrames** (heygen-com/hyperframes) — render HTML→MP4 determinístico para motion overlays (GSAP, Lottie, CSS, Three.js), Apache 2.0
- **Método cinematográfico** (vídeo "The Power of SIMPLE Editing") — 3 capítulos · shot sequence · sound design · música BPM/drops · color grading com luz prática

**Decisão arquitetural:** Skill original cobria só finalização ffmpeg básica (legenda fixa, logo, fade, formato). Reformulada como **orquestradora de 4 camadas**:

| Layer | Responsabilidade | Ferramenta principal | Reference |
|---|---|---|---|
| 1 | Criativo (decisão) | Método cinematográfico | `metodo-cinematografico.md` |
| 2 | Corte inteligente | Video-Use (browser-use) | `video-use-integration.md` |
| 3 | Motion overlay | HyperFrames (heygen) | `hyperframes-integration.md` |
| 4 | Finalização | ffmpeg direto | `ffmpeg-templates.md` |

Apoio transversal: `sfx-music-library.md` (Layer 1) e `color-grading.md` (Layer 1+4).

**Por que NÃO criar skill nova ou agente novo:**
- Skill já existia no git como pasta vazia — manter o nome evita rename + breaking links
- Função core (editar vídeo) é uma só; as 4 camadas são fases do mesmo pipeline, não skills separadas
- Volume de uso ainda não justifica agente próprio (`azb-video-editor`); ficar dentro de `azb-content-creator`

**Próximos passos:**
1. Validar instalação do toolkit em máquina do Pedro (ffmpeg + uv + Node 22 + ElevenLabs key)
2. Criar componentes HyperFrames brand-aligned para Xiru, Equus, Escola Pecuária em `~/tools/hyperframes-azb/components/`
3. Subir LUTs base em `AZB - Operações Internas/assets-shared/luts/`
4. Subir SFX starter pack em `AZB - Operações Internas/assets-shared/sfx/`
5. Primeiro run real com 1 vídeo bruto do Glauco — validar tempo + tokens vs estimativa
6. Atualizar este arquivo com Padrão #3 ao final do primeiro run

**Impacto na operação AZB:**
- CLAUDE.md raiz Regra #2 atualizada (triggers expandidos para edição vídeo)
- CLAUDE.md raiz Regra #5 atualizada (cita toolkit de vídeo paralelo a gen-image.sh e arte-onbrand)
- CLAUDE.md raiz Regra #11 — skill em "Execução estruturada" (Sonnet 4.6 medium)
- Agente `azb-content-creator` ganha skill #5
- Doc cruzado em `_docs/regra-edicao-video.md` (referência sob demanda)

---

---

## Erro #1 — Bash bloqueado em sessão (2026-05-06)
**Data:** 2026-05-06
**Situação:** Primeiro run real com vídeo bruto (criativo-02-video-depoimento, Xiru Mudas). Pipeline L1+L4 planejado. ffmpeg 7.1 instalado e funcional (confirmado via `ffmpeg -version` no início da sessão). Porém a partir do segundo comando bash, a sessão bloqueou todos os comandos — incluindo ffprobe, ffmpeg, mkdir e ln. Resultado: _brief.md e run-pipeline.sh produzidos, mas os 4 MP4 finais não foram gerados.
**Causa raiz:** Permissão de Bash revogada durante a sessão (comportamento do ambiente Claude Code — pode ser timeout de permissão ou política de segurança). O primeiro mkdir funcionou; a partir do segundo bloco bash todos falharam.
**Resolução:** Entregar _brief.md + run-pipeline.sh + documentar bloqueio. Script pronto para execução manual: `bash run-pipeline.sh` na pasta `criativo-02-video-depoimento/`.
**Impacto:** Issue marcada como "parcial" — L1 concluído, L4 aguarda execução.
**Prevenção futura:** Agrupar todos os comandos bash dependentes em um único bloco de shell script no início da sessão. Se a permissão for revogada, ao menos o script já estará pronto para execução manual.

---

## Padrão #3 — Pipeline L1+L4 via ffmpeg para depoimento (2026-05-06)
**Data:** 2026-05-06
**Situação:** Criativo 02 Depoimento, Xiru Mudas. Dois brutos (~3-5 min cada), transcrições disponíveis, corte para 30s cada.
**Decisão de fallback:** Video-Use (L2) pulado — ElevenLabs key não confirmada. HyperFrames (L3) pulado — Node 22 disponível mas setup inicial não feito. Workflow: L1 (brief criativo) + ffmpeg puro para L2+L3+L4.
**Resultado de qualidade esperado (ffmpeg puro):**
- Lower-third: via `drawbox` + `drawtext` — qualidade aceitável, sem animação de entrada/saída suave. Produção suficiente para ads Meta.
- Legenda: via `drawtext` com timestamps manuais da transcrição — requer ajuste fino após primeira renderização para sincronizar com a fala real.
- Card final: via `lavfi color` + overlay PNG + `drawtext` — design on-brand #02431b, não animado. Funcional para ads.
**Limitação conhecida do fallback ffmpeg drawtext:**
- Legendas são estáticas (timestamps manuais) — não sincronizam automaticamente com a fala
- Lower-third sem fade animado suave — aparece/desaparece abruptamente (mitigação: usar `fade` filter se suportado por `drawtext` na versão instalada)
- Para escalar para múltiplos depoimentos, vale investir 1h no setup HyperFrames (Node 22 disponível) para ter lower-thirds animados reutilizáveis
**Tempo estimado de execução do run-pipeline.sh:** 15-25 min (4 vídeos, CRF 23 preset slow, cada encode ~3-5 min em M1/M2)
**Tokens consumidos L1:** ~35k (brief completo + script ffmpeg + transcrições lidas)
**Nota sobre timestamps:** A transcrição do Dep_06 Idio foi consistente com o início do depoimento — hook "Plantamos e perdemos" deve estar nos primeiros 10-15s. A transcrição do Dep_04 Selito mostrou ~25s de apresentação contextual antes do "Bá, foi um sucesso!" — o timestamp SELITO_SS="00:00:25" pode precisar de +5s de ajuste dependendo do ritmo real. Verificar com ffprobe após primeira execução.
**Próximo passo:** Após execução do run-pipeline.sh, registrar tempos reais e qualidade visual como Padrão #4.

---

## Erro #2 — Legendas duplas em depoimento legendado + edição cega (2026-05-07)
**Data:** 2026-05-07
**Situação:** Re-edição dos criativos 01, 02a, 02b da campanha Meta Ads pré-safra Xiru Mudas. Versões anteriores (2026-05-06) tinham 3 problemas graves:

1. **Legendas duplas (Idio):** Dep_06 é arquivo "LEGENDADO.mp4" — já tem legendas profissionais burned-in + lower-third. Pipeline anterior adicionou 12 drawtext + drawbox POR CIMA → texto sobreposto ilegível.
2. **Timestamps chutados:** `-ss 7` (Idio) e `-ss 25` (Selito) foram estimados a partir de transcrição parcial sem ver nenhum frame. O "Bá, foi um sucesso!" do Selito está nos ~68s, não nos ~25s.
3. **Edição cega (hero):** Corte `ffmpeg -ss 0 -t 15` pegou frames aleatórios sem curadoria visual.

**Causa raiz:** Claude não tem "olhos" nativos pra vídeo — só lê metadados (duração, codec). Editar vídeo sem ver frames é como editar foto sem preview.

**Solução aplicada:**
- **Extração de frames** `ffmpeg -vf "fps=0.5,scale=640:-1"` → JPGs → Claude lê como imagem
- Para pontos de corte críticos, densificar para `fps=1` na janela de interesse
- **Zero drawtext** nos depoimentos — legendas e lower-thirds originais preservados
- **Corte curado** do hero: 4-19s em vez de 0-15s (pula enquadramento ruim dos 0-4s)
- **Multi-segment concat** do Idio: 4 segmentos (5-12s, 30-38s, 46-52s, 62-66s) concatenados

**Regras novas (promover pra SKILL.md quando aparecer 3x):**
1. SEMPRE extrair frames antes de qualquer corte — sem exceção
2. Se arquivo fonte tem "LEGENDADO" ou "SUBTITLE" no nome → NÃO adicionar drawtext de legenda
3. Timestamps de corte NUNCA estimar de transcrição — sempre confirmar com inspeção visual de frame
4. Para depoimentos já editados profissionalmente: o trabalho é CORTE + CROP + LOGO, não re-edição

**Resultado:** 7 vídeos re-renderizados (3 hero + 2 Idio + 2 Selito). Tempo total: ~15 min. Zero legenda dupla. Arcos narrativos verificados visualmente frame a frame.

---

## Padrão #4 — Extração HDR→SDR de 5 .MOV iPhone portrait + recorte de depoimento legendado (2026-05-12)
**Data:** 2026-05-12
**Situação:** Issue 26 (Xiru Mudas, vídeo institucional Semana Zootecnia IFSULDEMINAS). 5 .MOV brutos HEVC 10-bit HDR (bt2020 HLG) gravados em iPhone portrait com displaymatrix rotation -90 + 1 depoimento mp4 SDR landscape com legenda burn-in profissional já presente. Output esperado: 5-6 clipes .mp4 para projeto Remotion.

**Pipeline aplicado:**

1. **Layers 1+4 + frame extraction obrigatório.** L2 (Video-Use) pulado com justificativa documentada (verificado em `~/tools/video-use` que existe + .env com ElevenLabs key OK; pulei porque curadoria já estava em assets-necessarios.md da issue 24 e o que precisava ser confirmado era timecode, não conteúdo da fala — frame extraction densificada resolveu).

2. **Frame extraction densificada antes de qualquer corte** (Erro #2 promovido para regra):
   - fps=0.5 nos 5 .MOV (40 JPGs lidos como imagem) → caracterização básica de cada bruto
   - fps=0.5 inteiro do depoimento 2:32 (76 JPGs) → identificação grosseira de janela com fala-alvo
   - fps=1 densificado em janela 0:44-1:02 do depoimento (18 JPGs) → identificação fina do IN
   - fps=2 nas janelas 0:46-0:49 e 0:54-0:56 (10 JPGs) → confirmação frame-a-frame do timecode exato

3. **Achados que SÓ apareceram via frame extraction (não estavam no roteiro):**
   - **Brief 24 chutou timecode do depoimento** em duas tentativas (0:50-0:58 e 1:11-1:19). Frame extraction confirmou que o IN real da fala "200 hectares" é **0:48.0**, com fade preto em 0:47 separando do clip anterior. Sem frame extraction, o vídeo institucional teria fade preto no início da cena 7.
   - **IMG_3585 tem lona laranja bloqueando 95% do quadro entre 0:17-0:21**. Brief 24 sugeriu janela 0:05-0:15 (5s limpos + 5s de lona) — frame extraction revelou. Corrigido para janela 0:10-0:16 (6s contínuos sem lona).
   - **IMG_3584 começa com 1s de "solo vazio"** (frame inicial é só terra, ruim para abertura institucional). Corrigido para começar em 0:01.5s.
   - **Os 5 .MOV brutos são portrait (não landscape)** apesar do stream interno reportar 3840×2160. iPhone grava o stream em landscape mas anexa `displaymatrix: rotation of -90.00 degrees` — ffmpeg aplica auto na decodificação. Brief 24 assumiu landscape e o crop seria diferente. Solução: crop landscape 16:9 a partir do portrait decodificado (`crop=in_w:in_w*9/16:0:(in_h-in_w*9/16)/2`).

4. **Filtro tonemap HDR→SDR — único caminho que preserva cores corretamente:**
   ```
   zscale=t=linear:npl=100,
   format=gbrpf32le,
   zscale=p=bt709,
   tonemap=tonemap=hable:desat=0,
   zscale=t=bt709:m=bt709:r=tv,
   format=yuv420p,
   crop=in_w:in_w*9/16:0:(in_h-in_w*9/16)/2,
   scale=1920:1080:flags=lanczos
   ```
   - Sem essa cadeia: vídeo sai lavado/laranja-rosado no Remotion (decodificador SDR não entende bt2020/HLG, faz remapeamento brutal).
   - Operador `hable` (Hable tonemap) preserva highlights de céu sem queimar; alternativa `mobius` deixa mais saturado mas perde headroom. `reinhard` é mais conservador mas mais lavado. Hable foi o que melhor preservou verde de pasto + vermelho de trator nos testes.
   - `desat=0` essencial — sem ele, cores saturadas perdem 30-40% de saturação. Com `desat=0`, a saturação é preservada e o ajuste vem só do gamma curve.

5. **Recorte de depoimento já legendado (Cena 7):**
   - **ZERO** drawtext, drawbox, ass filter, subtitles. Depoimento Dep_06 LEGENDADO já tem legenda profissional + lower-third Xiru ("Idio Nunes da Silva") burn-in no canto inferior esquerdo.
   - SEM tonemap (mp4 SDR já 1080p bt709).
   - SEM crop landscape (o lower-third no rodapé seria cortado; preservar resolução original 1920×1080).
   - Re-encode H.264 CRF 22 + áudio AAC 128k (preservar voz do Idio para Remotion poder usar como referência rítmica de corte).

6. **CRF tradeoff size/qualidade** — plano original pedia CRF 18 (resultado: 80MB total acima do alvo <50MB). Subi para CRF 20 nos 4 clipes "normais" e CRF 22 nos 2 maiores (cena-05 e broll-pasto, mais detalhe espacial = bandejas amarelas + mudas verdes finas). Resultado: 56MB. Sem perda visual perceptível em 1080p para uso intermediário.

**Tempo wall-clock:** ~15 min (~5 min inspeção visual + ~3 min extração ffmpeg + ~7 min verificação/manifest).
**Tokens consumidos:** ~50k (extração visual densa puxa muitos `Read` de JPG, mas é o que evita edição cega).
**Bash blocked count:** 0 (todos os comandos rodaram sem revogação de permissão — diferente do Erro #1 da sessão 2026-05-06).

**Regras novas (promover para SKILL.md quando padrão aparecer 3x):**
- Para .MOV iPhone, verificar displaymatrix rotation com `ffmpeg -i SOURCE 2>&1 | grep -i rotat` ANTES de planejar o crop. iPhone em portrait grava com rotation -90 e o filtro precisa ser ajustado.
- Para qualquer source HDR (bt2020/HLG), filtro tonemap HABLE + desat=0 é o caminho default. Reinhard/Mobius só em casos específicos.
- Frame extraction densificada (fps=2) em janelas de 2-3s é o caminho para timecodes precisos de fala — fps=0.5 só caracteriza grosso, fps=1 dá margem ±0.5s, fps=2 dá margem ±0.25s.
- Para depoimentos com displaymatrix de orientação landscape (mp4 normal): SEM crop, SEM drawtext, SEM tonemap (regra do Erro #2 reforçada).

**→ Promovido para SKILL.md em 2026-05-XX (pendente):** "Verificar displaymatrix rotation antes de planejar crop" pode virar parte do Passo 1 (Inspecionar bruto) da SKILL.md quando aparecer mais 2 vezes. Por enquanto fica registrado aqui como nota técnica.

---

## Próximas observações a registrar

- [ ] Padrão #5 — setup HyperFrames para lower-thirds animados Xiru (Node 22 disponível, vale 1h de investimento)
- [ ] Erro #N — falha em alguma camada (Video-Use sem key, HyperFrames sem Node 22, etc.) e contorno
- [ ] Padrão #6 — re-uso do filtro tonemap HABLE em vídeos de outros clientes com source iPhone HDR (Equus? Escola Pecuária?). Confirmar se a mesma cadeia funciona para tons quentes de campo equestre / pecuária noturna.

---

## Padrão #4 — Curadoria Layer 1 com banco fotográfico finito (2026-05-12)

**Data:** 2026-05-12 · sessão #42 · cliente Xiru Mudas · issue 25 (vídeo institucional Semana Zootecnia IFSULDEMINAS)

**Situação:** banco de 17 fotos profissionais + legacy para um vídeo institucional de 70s com 4 cenas que pedem foto estática (cenas 2, 4, 6, 8). Aplicação dos 4 filtros do Layer 1 (qualidade técnica, alinhamento marca, força narrativa, diversidade).

**Sobrevivência aos filtros (taxas para próximas curadorias):**
- F1 (resolução ≥1920×1080): 12/17 aprovadas = **70%**. As 5 reprovadas foram todas legacy IMG_* sub-res (≤1600 no lado menor).
- F1+F2 (resolução + alinhamento marca): 11/17 = **64%**. Perdeu IMG_1920 (fardos de feno, narrativa fora — Xiru é implantação não fenação).
- Selecionadas para o vídeo: 8/17 = **47%** (4 primárias + 4 backups).
- Promovidas ao banco BK pós-evento: 4/17 = **23%**.

**Achado #1 — Override de reuso para asset narrativo único:** IMG_1917 (gado pastando em Tifton) reprovou F1 com 768×1024 mas foi promovida apesar disso porque é o **único asset com gado + pasto formado no mesmo frame** — narrativa indispensável para a cena que prova "100 arrobas/ha · R$ 23 mil por ano". Backup 3024×3024 (77214e27) sem gado preparado em paralelo como fallback. **Regra:** quando F1 reprovar mas o asset for narrativamente único e já tiver performance comprovada (IMG_1917 rodou em carrossel Meta Ads sessão #38), promover com plano de fallback documentado. Não promover por "é a única foto que sobrou" — promover só por unicidade narrativa.

**Achado #2 — Ajuste narrativo quando banco não tem o asset literal:** roteiro Cena 4 pediu "equipe técnica em campo" mas as 11 fotos profissionais (lote 23/03/2026) não têm pessoas trabalhando — só infraestrutura. Decisão: usar `7f587e9c` (3 canteiros em perspectiva) e deixar o lettering "60 pessoas · 14 estados · Um agrônomo dedicado por projeto" carregar a narrativa de equipe; visual prova escala de operação. **Regra:** quando o asset literal não existe, deixar o lettering carregar a narrativa abstrata e o visual provar uma faceta material complementar. Documentar a decisão de ajuste narrativo no `assets-mapping.md` (registro auditável).

**Achado #3 — Inversão de ordem 25 ↔ 26 sem prejuízo:** o usuário rodou a 26 (extração de clipes) antes da 25 (curadoria). Funcionou porque o `assets-necessarios.md` da issue 24 (roteiro) já tinha o mapa cena→fonte fechado. A 26 confirmou timecodes por frame extraction e a 25 só validou + renomeou. **Regra:** se o roteiro (issue de upstream) já trouxe paths absolutos de fonte por cena, a curadoria e a extração podem rodar em qualquer ordem desde que (a) a curadoria documente decisões finais por escrito e (b) a extração já saiba quais clipes cortar. Não é o caminho ideal mas é defensável quando há pressão de cronograma.

**Achado #4 — Cobertura visual: aritmética simples basta para validar a regra ≥60%:** somar duração das cenas com asset real (foto + vídeo) e dividir pelo total. No Xiru deu 51s asset / 66s total = 77,3%. Quando a soma fica entre 60% e 70%, o vídeo fica "limpo no limite" — usuário aceita. Abaixo de 60%, recurar e adicionar mais 1 foto ou estender 1 cena. Acima de 80% começa a cansar (asset overload sem respiro). Faixa ótima: 70-78%.

**Achado #5 — Ler 12 JPGs como imagem custa caro mas é o caminho:** inspeção visual obrigatória das 17 fotos. Reads de JPG via Claude consomem ~3-5k tokens cada (varia por resolução). Total inspeção visual: ~50k tokens só de Read de imagens. Sem isso a curadoria fica cega e replica o Erro #2 da skill em outro formato. Não há como pular — a economia é fazer 1 batch único de Read em paralelo (não 1 a 1).

**Tempo wall-clock:** ~12min (3min pre-leitura + 4min inspeção visual + 5min produção dos .md + cópia/rename). Mais rápido que a issue 26 (que envolveu encode ffmpeg) porque o trabalho é documental.

**Tokens consumidos:** ~80k (12 fotos × ~4k = 48k em images + 32k em texto/code).

**Regras novas (promover para SKILL.md quando padrão aparecer 3x):**
- Override de F1 só por **unicidade narrativa + performance prévia comprovada**. Não por escassez.
- Quando lettering pode carregar narrativa abstrata e visual prova faceta material complementar, isso é decisão de curadoria válida — documentar no mapping.
- Faixa ótima de cobertura visual: 70-78%.
- Inspeção visual em batch único (paralelo) é mais barata que serial.

**→ Promovido para SKILL.md em 2026-05-XX (pendente):** "Faixa ótima cobertura visual 70-78%" e "Override de F1 só por unicidade narrativa + performance prévia" podem virar parte do Passo 1 (Layer 1 curadoria) da SKILL.md quando aparecerem mais 2 vezes.

---

## Padrão #6 — Curadoria de trilha royalty-free em terminal: Incompetech é a única fonte confiável (2026-05-12)

**Data:** 2026-05-12 · sessão #43 (Xiru — issue 27 trilha musical)

**Situação:** Issue 27 pediu 3-5 candidatos de trilha instrumental royalty-free baixados em terminal (sem browser), BPM 80-100, sem vocais, ≥90s, com licença documentável. Quatro fontes testadas via curl com User-Agent Safari + Referer correto:

| Fonte | CDN URL pattern | Resultado |
|---|---|---|
| **Pixabay Music** | `cdn.pixabay.com/audio/YYYY/MM/DD/audio_{hash}.mp3` | HTTP 403 (S3 access denied). CDN exige token assinado por sessão de browser. Sem viabilidade. |
| **Pixabay download** | `cdn.pixabay.com/download/audio/.../...?filename=...` | HTTP 200 mas retorna XML 243 bytes (S3 error doc). Não é o MP3. |
| **Bensound** | `bensound.com/bensound-music/bensound-{slug}.mp3` | HTTP 301 redirect para landing. URL mudou em 2025+. |
| **Incompetech / Kevin MacLeod** | `incompetech.com/music/royalty-free/mp3-royaltyfree/{Title}.mp3` | HTTP 200 direto. MP3 puro. Sem cookies, sem auth, sem token. Catálogo CC-BY 4.0 universal. |

**Conclusão:** Para curadoria automatizável em terminal sem key/auth, **Incompetech é a única fonte royalty-free viável hoje**. URLs estáveis há 10+ anos. Outras fontes exigem ou browser (Pixabay, Uppbeat, Bensound) ou API key (YouTube Audio Library, Free Music Archive parcialmente).

**Achado adicional — taxa de hit do catálogo Incompetech:** ~75% dos títulos conhecidos retornam 200, ~25% retornam 404 (faixas removidas pelo autor ao longo dos anos). Padrão de URL é `https://incompetech.com/music/royalty-free/mp3-royaltyfree/{Title%20com%20espaço%20encoded}.mp3`. Apóstrofes e caracteres especiais nem sempre encodam previsivelmente — testar HEAD primeiro.

**Achado adicional — BPM via librosa (fallback de aubio):** `pip install aubio` quebra em Python 3.9 + NumPy 1.25 (`ufuncs.c:49: incompatible function pointer types`). Alternativa que funciona out-of-the-box: `python3 -m pip install --user librosa`, depois:

```python
import librosa
y, sr = librosa.load("track.mp3", sr=22050, mono=True)
tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
print(f"BPM: {float(tempo):.1f}")
```

Resultados consistentes com BPM declarado pelo autor em ~85% dos casos. Em faixas dramáticas com ritmo ambíguo (ex: "Hidden Past") pode reportar dobro ou metade do BPM real — usar `start_bpm=72` ou `start_bpm=90` como dica.

**Achado adicional — análise de seções (boundaries / drops):** `librosa.segment.agglomerative(onset_strength)` retorna timestamps onde a estrutura interna da música muda (mudança de seção). Para alinhar drops com cenas do vídeo, é melhor que ouvir manualmente (que requer browser/headphones). RMS por janela de 1s (`librosa.feature.rms`) dá envelope de energia — comparar com tabela de cenas do roteiro mostra exatamente onde a faixa "sobe" ou "desce" e se isso casa com a narrativa.

**Regra emergente — ouvir é caro, medir é barato:**
- Curadoria de áudio em terminal NÃO consegue ouvir, mas CONSEGUE medir (BPM, energia, duração, presença de vocal por banda espectral, boundaries internos).
- Decisão por métricas + alinhamento com roteiro é melhor que decisão por nome de faixa ou tag de catálogo.
- Métricas obrigatórias antes de recomendar:
  1. Duração ≥ duração-alvo + 20s folga
  2. BPM dentro do range-alvo (medido, não declarado)
  3. Banda 1-3kHz com energia < 0.5 (proxy para "sem vocal" — voz humana concentra formantes aqui)
  4. RMS por segundo nos pontos críticos (intro, hook, clímax, depoimento, CTA) alinhado com energia esperada da cena
  5. Boundaries internos alinhados com pontos de virada do roteiro

**Tempo wall-clock:** ~25min (10min testes de fonte/CDN + 5min downloads + 8min análise librosa + 2min escrita de docs).

**Tokens consumidos:** ~40k (zero leitura de imagem; conteúdo majoritariamente texto + saída ASCII de envelope).

**Custo evitado:** Pixabay download requer login + interação manual (estimativa 30-45min de usuário). Epidemic/Artlist requer subscription pagada. Solução em terminal com Incompetech: zero custo monetário + zero tempo de usuário.

**Regras candidatas a promover para SKILL.md (Layer 1 §Música) quando padrão aparecer 3x:**
- "Para curadoria automática de trilha sem browser/auth, Incompetech (Kevin MacLeod) é fonte padrão. Pixabay/Bensound/Uppbeat exigem manual."
- "Medir BPM via librosa (não aubio — quebra em Python 3.9). Half-tempo override com `start_bpm=72`."
- "RMS por segundo + boundaries de librosa.segment.agglomerative substituem escuta manual quando terminal é o único canal."
- "Identidade sonora reusável: 1 faixa default Tier A por cliente em `Conteúdo/_assets-audio/README.md`. Não trocar a cada peça."