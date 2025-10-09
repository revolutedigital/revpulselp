# 📊 SEO Checklist - RevPulse

## ✅ Buscadores Principais

### 1. Google Search Console
- [x] Cadastrado e verificado
- [x] Sitemap enviado (sitemap.xml)
- [ ] Aguardar indexação (3-7 dias)
- [ ] Monitorar em "Páginas" → ver quantas indexadas

**Link:** https://search.google.com/search-console

---

### 2. Bing Webmaster Tools (PRIORITÁRIO)
- [ ] Criar conta: https://www.bing.com/webmasters
- [ ] Adicionar site: revpulse.com.br
- [ ] Verificar via DNS (Cloudflare)
- [ ] Enviar sitemap: https://revpulse.com.br/sitemap.xml
- [ ] Ativar IndexNow

**Por que:** Usado pelo ChatGPT, Copilot, Perplexity

**Passo a passo:**
1. Entre com conta Microsoft
2. "Adicionar site" → revpulse.com.br
3. Método verificação: DNS
4. Copie registro TXT fornecido
5. Cloudflare → DNS → Add Record → TXT
6. Cole o valor do Bing
7. Volte no Bing → Verify
8. Settings → Sitemaps → Add sitemap.xml

---

### 3. IndexNow (Indexação Rápida)
- [ ] Obter API Key no Bing Webmaster
- [ ] Criar arquivo: `indexnow-key.txt` na raiz
- [ ] Submeter URLs principais

**Script de submissão:**
```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "revpulse.com.br",
    "key": "SUA_CHAVE_API",
    "urlList": [
      "https://revpulse.com.br/",
      "https://revpulse.com.br/blog/"
    ]
  }'
```

---

### 4. Yandex Webmaster (Opcional - mas bom ter)
- [ ] Criar conta: https://webmaster.yandex.com/
- [ ] Adicionar site
- [ ] Verificar via DNS
- [ ] Enviar sitemap

---

## 📱 Ferramentas de IA (Não tem cadastro direto)

### ChatGPT
- **Fonte:** Bing (configure Bing Webmaster ✅)
- **Não requer cadastro separado**

### Perplexity AI
- **Fonte:** Múltiplos buscadores (Google, Bing)
- **Não requer cadastro**

### Claude (Anthropic)
- **Não indexa web publicamente ainda**

---

## 🔍 Validação de Schema

### Schema.org Validator
- [ ] Testar homepage: https://validator.schema.org/
- [ ] Testar artigo do blog
- [ ] Verificar Product, Organization, BlogPosting

### Google Rich Results Test
- [ ] https://search.google.com/test/rich-results
- [ ] Testar URLs principais
- [ ] Verificar se Schema está correto

---

## 📈 Monitoramento

### Google Analytics (se configurado)
- [ ] Instalar tag no site
- [ ] Configurar Goals
- [ ] Monitorar tráfego do blog

### Google Search Console
- [ ] Verificar "Páginas indexadas" semanalmente
- [ ] Monitorar "Desempenho" → impressões/cliques
- [ ] Corrigir erros de indexação

### Bing Webmaster
- [ ] Verificar "Site Scan"
- [ ] Monitorar "Search Performance"
- [ ] Verificar "IndexNow" submissions

---

## 🚀 Indexação Rápida (Primeiros Dias)

### Submeter URLs manualmente:

**Google:**
1. Search Console → Inspeção de URL
2. Cole URL do artigo
3. "Solicitar indexação"
4. Limite: 10-15 URLs/dia

**Bing:**
1. Webmaster Tools → URL Submission
2. Cole URL
3. Submit
4. Sem limite com IndexNow

---

## 📊 URLs Prioritárias para Indexação

1. ✅ Homepage: https://revpulse.com.br/
2. ✅ Blog Index: https://revpulse.com.br/blog/
3. 🎯 Top 10 artigos (cauda curta):
   - chatbot-whatsapp.html
   - atendente-virtual.html
   - automacao-whatsapp.html
   - chatbot-empresas.html
   - bot-whatsapp.html
   - assistente-virtual.html
   - ia-whatsapp.html
   - atendimento-automatico.html
   - chatbot-inteligente.html
   - automacao-atendimento.html

---

## 🔗 Backlinks e Autoridade

### Criar perfis em:
- [ ] LinkedIn (postar artigos do blog)
- [ ] Medium (republicar artigos com canonical)
- [ ] Dev.to
- [ ] Reddit (subreddits relevantes)
- [ ] Quora (responder perguntas linkando artigos)

### Redes Sociais:
- [ ] Instagram: @oigorsilveira (linkar bio)
- [ ] YouTube: @oigorsilveira (descrição dos vídeos)
- [ ] Facebook
- [ ] Twitter/X

---

## ✅ Status Atual

- ✅ **Sitemap criado** - 32 URLs (homepage + blog + 30 artigos)
- ✅ **Robots.txt configurado** - Permitindo crawling
- ✅ **Schema.org markup** - BlogPosting, BreadcrumbList
- ✅ **Meta tags completas** - Open Graph, Twitter Cards
- ✅ **Google Search Console** - Verificado e sitemap enviado
- ⏳ **Bing Webmaster** - Pendente cadastro
- ⏳ **IndexNow** - Pendente configuração
- ⏳ **Yandex** - Pendente cadastro

---

## 📅 Timeline Esperada

**Semana 1:**
- Google/Bing descobrem sitemap
- Primeiras 5-10 páginas indexadas

**Semana 2-3:**
- 20-25 páginas indexadas
- Primeiras impressões no Google

**Mês 1:**
- Todas as 32 URLs indexadas
- Artigos começam a aparecer em buscas long-tail

**Mês 2-3:**
- Artigos ganham posições
- Tráfego orgânico começa a crescer
- Artigos aparecem no ChatGPT/Perplexity

**Mês 4-6:**
- Autoridade de domínio aumenta
- Artigos ranqueiam top 10 para long-tail
- Top 20-30 para short-tail (mais competitivo)

---

## 🎯 Próximos Passos

1. **Hoje:**
   - [ ] Cadastrar no Bing Webmaster
   - [ ] Configurar IndexNow
   - [ ] Submeter 5 URLs principais manualmente (Google)

2. **Esta semana:**
   - [ ] Cadastrar no Yandex (opcional)
   - [ ] Criar perfis em redes sociais linkando blog
   - [ ] Postar 1º artigo no LinkedIn/Medium

3. **Este mês:**
   - [ ] Monitorar indexação diariamente
   - [ ] Publicar 3-5 novos artigos
   - [ ] Conseguir 2-3 backlinks externos
   - [ ] Compartilhar artigos nas redes sociais

---

## 🆘 Suporte

**Documentação:**
- Google Search Console: https://support.google.com/webmasters
- Bing Webmaster: https://www.bing.com/webmasters/help
- IndexNow: https://www.indexnow.org/documentation

**Ferramentas úteis:**
- Ahrefs (pago): https://ahrefs.com
- Ubersuggest (freemium): https://neilpatel.com/ubersuggest/
- Google Keyword Planner (grátis)

---

**Data de criação:** 08/01/2025
**Última atualização:** 08/01/2025
