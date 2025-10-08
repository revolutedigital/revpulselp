# 🚀 IndexNow - Setup Rápido

IndexNow permite notificar Google, Bing, Yandex e outros buscadores **instantaneamente** quando você publica conteúdo novo.

---

## 📋 Como Obter sua API Key

### 1. Cadastre-se no Bing Webmaster Tools

1. Acesse: https://www.bing.com/webmasters
2. Entre com conta Microsoft (ou crie uma grátis)
3. Clique em **"Adicionar site"**
4. Digite: `revpulse.com.br`

### 2. Verificar o site via DNS (Cloudflare)

1. No Bing Webmaster, escolha método: **"DNS Verification"**
2. Copie o registro TXT fornecido (exemplo: `MS=1234567890`)
3. Vá no **Cloudflare**:
   - DNS Records
   - Add Record
   - Type: `TXT`
   - Name: `@`
   - Content: `MS=1234567890` (o que o Bing forneceu)
   - TTL: Auto
   - Save
4. Volte no Bing e clique **"Verify"**

### 3. Obter API Key do IndexNow

1. No Bing Webmaster Tools (após verificado)
2. Menu lateral → **"IndexNow"**
3. Clique em **"Generate API Key"** ou copie a existente
4. Copie a chave (exemplo: `a1b2c3d4e5f6g7h8i9j0`)

### 4. Adicionar no seu site

Substitua o conteúdo de `indexnow-key.txt`:

```bash
nano /Users/yourapple/revpulsepagina/indexnow-key.txt
```

Cole sua chave (exemplo):
```
a1b2c3d4e5f6g7h8i9j0
```

Salve o arquivo.

---

## 🔄 Como Submeter URLs

### Método 1: Manual (via curl)

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "revpulse.com.br",
    "key": "SUA_CHAVE_API",
    "urlList": [
      "https://revpulse.com.br/",
      "https://revpulse.com.br/blog/",
      "https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html"
    ]
  }'
```

### Método 2: Script Automatizado

Crie um script para submeter todos os artigos:

```bash
#!/bin/bash

API_KEY="SUA_CHAVE_API"

# Submeter artigos principais
for article in chatbot-whatsapp atendente-virtual automacao-whatsapp; do
  curl -X POST "https://api.indexnow.org/indexnow" \
    -H "Content-Type: application/json" \
    -d "{
      \"host\": \"revpulse.com.br\",
      \"key\": \"$API_KEY\",
      \"urlList\": [\"https://revpulse.com.br/blog/artigos/$article.html\"]
    }"

  echo "✅ Submetido: $article"
  sleep 2
done
```

### Método 3: Via Bing Webmaster (mais fácil)

1. Bing Webmaster Tools → **"URL Submission"**
2. Cole as URLs (uma por linha)
3. Clique **"Submit"**
4. IndexNow é ativado automaticamente

---

## 📊 Verificar se Funcionou

### Bing Webmaster Tools:
1. Menu → **"IndexNow"**
2. Veja o histórico de submissions
3. Status: **"Submitted successfully"**

### Google Search Console:
1. Inspeção de URL
2. Verificar se "URL is on Google"
3. Se não, clicar **"Request Indexing"**

---

## ⚡ Quando Usar IndexNow

Use sempre que:
- ✅ Publicar novo artigo no blog
- ✅ Atualizar artigo existente
- ✅ Adicionar nova página
- ✅ Fazer mudanças importantes no conteúdo

**NÃO use para:**
- ❌ Mudanças de CSS/design (sem impacto SEO)
- ❌ Correções de typos pequenos
- ❌ Mudanças em imagens (use sitemap image)

---

## 🎯 URLs Prioritárias (Submeter primeiro)

```
https://revpulse.com.br/
https://revpulse.com.br/blog/
https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html
https://revpulse.com.br/blog/artigos/atendente-virtual.html
https://revpulse.com.br/blog/artigos/automacao-whatsapp.html
https://revpulse.com.br/blog/artigos/como-criar-chatbot-whatsapp-sem-programar.html
https://revpulse.com.br/blog/artigos/quanto-custa-atendente-virtual-whatsapp.html
```

---

## 📈 Benefícios do IndexNow

- **Indexação instantânea** (minutos em vez de dias)
- **Gratuito** para sempre
- **Suportado por:** Google, Bing, Yandex, Seznam, Naver
- **Usado pelo ChatGPT** (via Bing)
- **Sem limite de submissions**

---

## 🆘 Troubleshooting

### "Invalid API Key"
- Certifique-se que `indexnow-key.txt` está na raiz do site
- Verifique se a chave está correta (sem espaços)
- Aguarde 5-10 minutos após criar o arquivo

### "Host not verified"
- Complete a verificação no Bing Webmaster primeiro
- DNS pode demorar até 48h para propagar

### URLs não indexadas após 7 dias
- Verifique robots.txt (deve permitir crawling)
- Cheque se sitemap está acessível
- Submeta manualmente no Google Search Console

---

## ✅ Checklist Rápido

- [ ] Cadastrar no Bing Webmaster
- [ ] Verificar site via DNS
- [ ] Gerar API Key IndexNow
- [ ] Adicionar chave em `indexnow-key.txt`
- [ ] Fazer commit e push para Railway
- [ ] Testar submissão de 1 URL
- [ ] Submeter 5-10 URLs principais
- [ ] Monitorar no Bing Webmaster → IndexNow

---

**Tempo total:** 15-20 minutos
**Resultado:** Indexação 10-100x mais rápida! 🚀
