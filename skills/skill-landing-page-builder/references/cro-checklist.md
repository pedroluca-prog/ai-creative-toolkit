# CRO Checklist — Landing Page Builder

## Pre-Deploy (OBRIGATÓRIO)

### Conteúdo
- [ ] Headline promete resultado específico (número ou transformação)
- [ ] Subheadline qualifica o público ("para profissionais do agro que...")
- [ ] Copy usa linguagem do ICP, não jargão de marketing
- [ ] Prova social tem nome real + resultado mensurável
- [ ] FAQ cobre as 5 objeções principais do ICP
- [ ] Texto do CTA é ação + benefício ("Agendar meu diagnóstico grátis")
- [ ] Zero erros de português

### Design
- [ ] CTA aparece mínimo 3x (hero, meio, formulário)
- [ ] Botão CTA tem cor contrastante (destaca do resto)
- [ ] Hierarquia visual clara (título > subtítulo > corpo)
- [ ] Espaçamento adequado (seções respiram)
- [ ] Imagens relevantes (não stock genérico)
- [ ] Logo visível no topo

### Técnico
- [ ] Mobile responsive (testar 375px, 768px, 1024px)
- [ ] CTA sticky no mobile (bottom bar)
- [ ] Form funcional (submit → webhook → response)
- [ ] Form tem validação (required, email format, tel format)
- [ ] Form mostra loading + success state
- [ ] Página carrega em <3s (sem imagens pesadas)
- [ ] Sem erros no console do navegador
- [ ] Links funcionam (nenhum #broken)

### SEO / Meta
- [ ] Title tag (<60 chars, inclui palavra-chave)
- [ ] Meta description (<160 chars, inclui CTA)
- [ ] OG tags (title, description, image)
- [ ] Favicon presente
- [ ] lang="pt-BR" no html tag

### Tracking
- [ ] Google Tag Manager instalado (ou GA4 direto)
- [ ] Pixel Meta instalado (se usar Facebook/Instagram Ads)
- [ ] Evento de conversão configurado (form submit)
- [ ] UTM parameters passam pro webhook

### Integração
- [ ] Webhook URL é de produção (não teste)
- [ ] Dados do form chegam no CRM/planilha
- [ ] Notificação pro vendedor funciona
- [ ] Thank you page ou mensagem de sucesso configurada
- [ ] WhatsApp button tem número correto

## Post-Deploy (24h)

- [ ] Acessar a URL final e testar form ao vivo
- [ ] Testar no celular real (não só DevTools)
- [ ] Verificar se lead chegou no CRM
- [ ] Verificar se notificação do vendedor disparou
- [ ] Checar PageSpeed Insights (meta: >80 mobile)
- [ ] Verificar OG preview (compartilhar link no WhatsApp)
