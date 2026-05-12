# HTML Architecture — Template Base LP

## Template Completo (Inside Sales)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TITULO] | [EMPRESA]</title>
  <meta name="description" content="[META_DESC — max 160 chars]">
  
  <!-- OG Tags -->
  <meta property="og:title" content="[TITULO]">
  <meta property="og:description" content="[META_DESC]">
  <meta property="og:image" content="[OG_IMAGE_URL]">
  <meta property="og:type" content="website">
  
  <!-- Favicon -->
  <link rel="icon" href="[FAVICON_URL]" type="image/png">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=[FONT_TITULO]:wght@600;700;800&family=[FONT_CORPO]:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '[HEX_PRIMARY]',
            secondary: '[HEX_SECONDARY]',
            cta: '[HEX_CTA]',
            fundo: '[HEX_FUNDO]',
          },
          fontFamily: {
            titulo: ['[FONT_TITULO]', 'sans-serif'],
            corpo: ['[FONT_CORPO]', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <!-- Alpine.js (se FAQ ou interatividade) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  
  <!-- Tracking (substituir IDs) -->
  <!-- Google Tag Manager -->
  <!-- Meta Pixel -->
</head>

<body class="font-corpo text-gray-800 bg-fundo">

  <!-- ==================== HERO ==================== -->
  <header class="relative bg-gradient-to-br from-primary to-secondary text-white">
    <!-- Nav -->
    <nav class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <img src="[LOGO_URL]" alt="[EMPRESA]" class="h-10">
      <a href="#form" class="hidden md:inline-block bg-cta text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition">
        [CTA_NAV]
      </a>
    </nav>
    
    <!-- Hero Content -->
    <div class="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
      <h1 class="font-titulo text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        [HEADLINE]
      </h1>
      <p class="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
        [SUBHEADLINE]
      </p>
      <a href="#form" class="inline-block bg-cta text-white font-bold py-4 px-10 rounded-lg text-lg hover:scale-105 transition-transform shadow-lg">
        [CTA_TEXT]
      </a>
      <p class="mt-4 text-sm opacity-75">[PROVA_RAPIDA]</p>
    </div>
  </header>

  <main>
  
    <!-- ==================== PROBLEMA ==================== -->
    <section class="py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-titulo text-2xl md:text-3xl font-bold mb-6">[TITULO_PROBLEMA]</h2>
        <p class="text-gray-600 mb-12 max-w-2xl mx-auto">[DESC_PROBLEMA]</p>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- DOR 1 -->
          <div class="bg-red-50 border border-red-100 p-6 rounded-xl">
            <div class="text-3xl mb-3">[EMOJI]</div>
            <h3 class="font-semibold text-lg mb-2">[DOR_1_TITULO]</h3>
            <p class="text-gray-600 text-sm">[DOR_1_DESC]</p>
          </div>
          <!-- DOR 2 -->
          <div class="bg-red-50 border border-red-100 p-6 rounded-xl">
            <div class="text-3xl mb-3">[EMOJI]</div>
            <h3 class="font-semibold text-lg mb-2">[DOR_2_TITULO]</h3>
            <p class="text-gray-600 text-sm">[DOR_2_DESC]</p>
          </div>
          <!-- DOR 3 -->
          <div class="bg-red-50 border border-red-100 p-6 rounded-xl">
            <div class="text-3xl mb-3">[EMOJI]</div>
            <h3 class="font-semibold text-lg mb-2">[DOR_3_TITULO]</h3>
            <p class="text-gray-600 text-sm">[DOR_3_DESC]</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SOLUÇÃO ==================== -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-titulo text-2xl md:text-3xl font-bold mb-6">[TITULO_SOLUCAO]</h2>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <!-- BENEFICIO 1-3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">[ICON]</span>
            </div>
            <h3 class="font-semibold mb-2">[BENEFICIO]</h3>
            <p class="text-gray-600 text-sm">[DESC]</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== PROVA SOCIAL ==================== -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-titulo text-2xl md:text-3xl font-bold text-center mb-12">[TITULO_PROVA]</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- DEPOIMENTO (repetir) -->
          <div class="bg-white border p-6 rounded-xl shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">[INICIAIS]</div>
              <div>
                <p class="font-semibold">[NOME]</p>
                <p class="text-sm text-gray-500">[CARGO]</p>
              </div>
            </div>
            <p class="text-gray-600 italic text-sm">"[DEPOIMENTO]"</p>
            <p class="mt-3 text-sm font-bold text-primary">[RESULTADO]</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== COMO FUNCIONA ==================== -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-titulo text-2xl md:text-3xl font-bold text-center mb-12">[TITULO_COMO]</h2>
        <div class="space-y-8">
          <!-- STEP (repetir) -->
          <div class="flex gap-6">
            <div class="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 class="font-semibold text-lg">[PASSO]</h3>
              <p class="text-gray-600">[DESC]</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FORMULÁRIO ==================== -->
    <section id="form" class="py-16 px-4 bg-primary">
      <div class="max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-2xl">
        <h2 class="font-titulo text-2xl font-bold text-center mb-2">[TITULO_FORM]</h2>
        <p class="text-gray-600 text-center mb-6">[SUB_FORM]</p>
        <form id="leadForm" class="space-y-4">
          <input name="nome" type="text" required placeholder="Seu nome completo"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
          <input name="whatsapp" type="tel" required placeholder="WhatsApp com DDD"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
          <input name="email" type="email" placeholder="Seu melhor email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
          <button type="submit" id="submitBtn"
            class="w-full bg-cta text-white font-bold py-4 rounded-lg hover:opacity-90 transition text-lg">
            [CTA_TEXT]
          </button>
          <p class="text-xs text-gray-400 text-center">Dados protegidos. Não compartilhamos com terceiros.</p>
        </form>
        <div id="successMsg" class="hidden text-center py-8">
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-xl font-bold mb-2">Pronto!</h3>
          <p class="text-gray-600">[MSG_SUCESSO]</p>
        </div>
      </div>
    </section>

    <!-- ==================== FAQ ==================== -->
    <section class="py-16 px-4" x-data="{ open: null }">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-titulo text-2xl md:text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <div class="space-y-3">
          <!-- FAQ ITEM (repetir, incrementar index) -->
          <div class="border rounded-lg overflow-hidden">
            <button @click="open = open === 1 ? null : 1" 
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition">
              <span class="font-semibold pr-4">[PERGUNTA]</span>
              <svg :class="{ 'rotate-180': open === 1 }" class="w-5 h-5 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 1" x-collapse class="px-6 pb-4 text-gray-600">
              [RESPOSTA]
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="bg-gray-900 text-gray-400 py-8 px-4">
    <div class="max-w-6xl mx-auto text-center">
      <img src="[LOGO_URL_BRANCO]" alt="[EMPRESA]" class="h-8 mx-auto mb-4 opacity-75">
      <p class="text-sm">&copy; [ANO] [EMPRESA]. Todos os direitos reservados.</p>
      <p class="text-xs mt-2">
        <a href="#" class="hover:text-white transition">Política de Privacidade</a> · 
        <a href="#" class="hover:text-white transition">Termos de Uso</a>
      </p>
    </div>
  </footer>

  <!-- CTA Sticky Mobile -->
  <div class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 md:hidden z-50">
    <a href="#form" class="block w-full bg-cta text-white text-center font-bold py-3 rounded-lg">
      [CTA_TEXT]
    </a>
  </div>

  <!-- WhatsApp Float -->
  <a href="https://wa.me/55[NUMERO]?text=[MSG]" target="_blank" rel="noopener"
    class="fixed bottom-20 md:bottom-6 right-4 md:right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition z-40"
    aria-label="Contato WhatsApp">
    <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
  </a>

  <!-- Form Script -->
  <script>
  document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    const formData = Object.fromEntries(new FormData(e.target));
    formData.origem = '[NOME_LP]';
    formData.data_envio = new Date().toISOString();
    formData.url = window.location.href;
    
    try {
      await fetch('[WEBHOOK_URL]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      e.target.classList.add('hidden');
      document.getElementById('successMsg').classList.remove('hidden');
    } catch (err) {
      btn.textContent = originalText;
      btn.disabled = false;
      alert('Erro ao enviar. Por favor, tente novamente.');
    }
  });
  </script>

</body>
</html>
```

## Notas de Implementação

- **Substituir todos os `[PLACEHOLDERS]`** com dados reais do cliente
- **Imagens:** Usar URLs absolutas (Cloudinary, Imgur, ou CDN do cliente)
- **Webhook:** Configurar no Make/n8n ANTES de publicar
- **Tracking:** Adicionar GTM/Pixel ANTES de rodar ads
- **Teste:** Abrir no Chrome DevTools (mobile), verificar form funciona
