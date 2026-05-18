# Micro-Detalhes Premium — N6a Polish Layer

> Carregar quando: a estrutura está sólida e você quer a diferença entre "feito com IA" e "crafted com IA como ferramenta". Implementar depois de hero, componentes e copy no lugar.

## Princípio

Nenhum desses detalhes, sozinho, é percebido conscientemente pelo visitante. Juntos, eles comunicam **cuidado** — que é o que separa um site de agência de um template.

**Regra de implementação:** da esquerda para a direita da tabela de impacto. Não fazer todos de uma vez — implementar 2-3 por sessão, verificar no browser, depois continuar.

---

## Tabela de Prioridade

| Detalhe | Impacto visual | Esforço | Implementar quando |
|---------|---------------|---------|-------------------|
| Tipografia deliberada | Alto | Baixo | Sempre (N2+) |
| Glass morphism em cards | Alto | Médio | Quando há seção de cards sobre fundo escuro/foto |
| Contadores animados | Alto | Médio | Quando há números de prova social |
| Ticker rolante | Médio | Baixo | Entre seções com fundo diferente |
| Light sweep em headlines | Médio | Baixo | Hero e seção de destaque |
| Loading hesitation | Médio | Baixo | Qualquer página que queira dar sensação de "carregando algo real" |
| Scroll indicator | Baixo | Baixo | LP longas (Inside Sales, Vendas) |

---

## 1. Tipografia Deliberada

**O que é:** escolher fontes com personalidade em vez de usar a default do sistema (Arial, Helvetica).

**Por que:** tipografia é a identidade sonora do site. A mesma copy com fonte diferente soa diferente.

**Processo:**
1. Verificar brand manual — se tiver fonte definida, usar.
2. Se não tiver, escolher no Google Fonts com critério:

| Tom | Fontes que funcionam |
|-----|---------------------|
| Robusto/técnico/agro | Montserrat · Raleway · DM Sans · Barlow |
| Premium/elegante | Fraunces · DM Serif Display · Cormorant Garamond |
| Moderno/tech | Inter · Geist · IBM Plex Sans |
| Confiança/institucional | Source Serif 4 · Lora · Libre Baskerville |

3. Combinação clássica: **serif no headline + sans-serif no body**. Cria hierarquia clara.

**Implementação:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  h1, h2 { font-family: 'Fraunces', serif; }
  body { font-family: 'Inter', sans-serif; }
</style>
```

**Escala tipográfica com `clamp()`** (fluida, sem media queries):
```css
h1 { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; }
h2 { font-size: clamp(1.75rem, 4vw, 3rem); line-height: 1.2; }
```

---

## 2. Glass Morphism em Cards

**O que é:** cards com blur do fundo visível através deles, borda sutil, sombra suave. Tira os cards da flatness sem adicionar peso visual.

**Quando funciona:** sobre fundos com foto, gradiente, ou cor sólida (não sobre fundo branco).

**Implementação:**
```css
.card-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari */
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

**Variação dark (para fundo claro):**
```css
.card-glass-dark {
  background: rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
```

**Cuidado com performance:** `backdrop-filter` força GPU compositing. Em mobile, limitar para no máximo 3-4 elementos com glass ao mesmo tempo.

---

## 3. Contadores Animados

**O que é:** números de prova social (600 projetos, 14 estados, 12 mil hectares) que sobem de 0 até o valor final quando entram na viewport.

**Impacto:** faz o visitante prestar atenção nos números. Um número estático é ignorado; um número em movimento é lido.

**Implementação (Vanilla JS + IntersectionObserver):**
```html
<span class="counter" data-target="600" data-suffix=" projetos">0 projetos</span>
<span class="counter" data-target="14" data-suffix=" estados">0 estados</span>
<span class="counter" data-target="12000" data-suffix=" ha formados">0 ha formados</span>

<script>
const formatNum = (n) => n >= 1000 ? (n/1000).toFixed(0) + 'k' : n.toString();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (!el.isIntersecting) return;
    const span = el.target;
    const target = parseInt(span.dataset.target);
    const suffix = span.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      span.textContent = formatNum(Math.round(target * ease)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(span);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.counter').forEach(el => observer.observe(el));
</script>
```

**Alternativa com Alpine.js** (se já está no projeto):
```html
<span x-data="counter(600, ' projetos')" x-init="start()" x-text="display"></span>
```

---

## 4. Ticker Rolante

**O que é:** faixa horizontal com texto ou logos rolando continuamente, usada como divisor entre seções.

**Quando usar:** entre seções com backgrounds muito diferentes (hero escuro → seção clara), ou para prova social com logos de clientes/parceiros.

**Implementação (CSS puro, sem JS):**
```html
<div class="ticker-wrapper overflow-hidden py-4 bg-brand-9">
  <div class="ticker-track flex gap-12 animate-ticker whitespace-nowrap">
    <!-- duplicar o conteúdo para loop sem corte -->
    <span>600 PROJETOS</span>
    <span class="text-brand-5">·</span>
    <span>14 ESTADOS</span>
    <span class="text-brand-5">·</span>
    <span>12 MIL HECTARES</span>
    <span class="text-brand-5">·</span>
    <!-- duplicado -->
    <span>600 PROJETOS</span>
    <span class="text-brand-5">·</span>
    <span>14 ESTADOS</span>
    <span class="text-brand-5">·</span>
    <span>12 MIL HECTARES</span>
    <span class="text-brand-5">·</span>
  </div>
</div>

<style>
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* -50% porque conteúdo está duplicado */
}
.animate-ticker {
  animation: ticker 20s linear infinite;
}
.animate-ticker:hover { animation-play-state: paused; }
</style>
```

---

## 5. Light Sweep em Headlines

**O que é:** animação de luz passando sobre o texto do headline, como um shimmer sutil.

**Quando usar:** hero headline ou seção de destaque.

**Implementação:**
```css
.light-sweep {
  background: linear-gradient(
    90deg,
    var(--text-color) 0%,
    var(--text-color) 40%,
    rgba(255, 255, 255, 0.85) 50%,
    var(--text-color) 60%,
    var(--text-color) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: sweep 4s linear infinite;
  animation-delay: 2s; /* esperar antes de animar */
}

@keyframes sweep {
  from { background-position: 200% center; }
  to   { background-position: -200% center; }
}
```

**Cuidado:** só funciona com `background-clip: text`. Se o texto precisa de cor sólida para contraste (acessibilidade), não usar.

---

## 6. Loading Hesitation

**O que é:** um delay de 300-500ms antes do conteúdo principal aparecer, com uma animação de "carregando". Dá a sensação de que o site está buscando algo real — aumenta a percepção de valor.

**Quando usar:** LP de qualificação de lead, calculadora, diagnóstico. Não usar em LP de captura direta (remove o visitante do fluxo).

**Implementação Alpine.js:**
```html
<div x-data="{ loading: true }" x-init="setTimeout(() => loading = false, 400)">
  <!-- Estado de loading -->
  <div x-show="loading" x-transition:leave="transition ease-in duration-300"
       class="flex items-center justify-center h-screen">
    <div class="w-8 h-8 border-4 border-brand-5 border-t-transparent rounded-full animate-spin"></div>
  </div>
  <!-- Conteúdo real -->
  <div x-show="!loading" x-transition:enter="transition ease-out duration-500"
       x-transition:enter-start="opacity-0 translate-y-4">
    <!-- conteúdo da página -->
  </div>
</div>
```

---

## 7. Scroll Indicator

**O que é:** barra de progresso no topo do browser que avança conforme o visitante rola a página.

**Quando usar:** LP longas (Inside Sales, Vendas) — indica ao visitante onde está na jornada.

**Implementação (Vanilla JS):**
```html
<div id="scroll-indicator" class="fixed top-0 left-0 h-1 bg-brand-5 z-50 transition-all duration-100"
     style="width: 0%"></div>

<script>
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrolled / total) * 100;
  document.getElementById('scroll-indicator').style.width = progress + '%';
});
</script>
```

---

## Checklist de Aplicação N6

Antes de entregar, verificar:
- [ ] Fonte não é Arial/Helvetica/system-ui (deve ser Google Fonts intencional)
- [ ] Cards sobre fundo escuro/foto têm glass morphism ou borda visível
- [ ] Números de prova social têm contador animado
- [ ] Ticker presente se há logos de clientes/parceiros ou números para destacar
- [ ] Hero headline tem light sweep OU é suficientemente tipograficamente forte para não precisar
- [ ] `prefers-reduced-motion` está sendo respeitado em todas as animações CSS
- [ ] Nenhuma animação conflita com outra (animações simultâneas num mesmo elemento)
