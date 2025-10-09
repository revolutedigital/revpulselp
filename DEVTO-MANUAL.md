# 🚨 Dev.to: Contas Novas Têm Limite

## Problema:
Dev.to bloqueia publicação em massa via API para contas novas (anti-spam).

**Erro 403:** "Forbidden - Your account needs to be verified"

## Solução Temporária: Importação Manual (5min/artigo)

### Passo 1: Complete seu perfil
https://dev.to/settings

- ✅ Adicione foto de perfil
- ✅ Escreva bio (mínimo 50 caracteres)
- ✅ Adicione website: https://revpulse.com.br
- ✅ Adicione links sociais (LinkedIn, Twitter, GitHub)

### Passo 2: Publique os primeiros 5 artigos manualmente

**Método A: Via Dashboard (recomendado)**

1. Acesse: https://dev.to/new
2. Cole o conteúdo do Hashnode:
   - Abra: https://revpulse.hashnode.dev/chatbot-whatsapp
   - Copie o markdown (clique "..." → "Edit")
   - Cole no Dev.to
3. Adicione tags: `chatbot`, `whatsapp`, `automation`, `ai`
4. **IMPORTANTE:** No final, adicione:
   ```
   Canonical URL: https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html
   ```
5. Publique!

**Método B: Import from URL**

1. Acesse: https://dev.to/settings/extensions
2. Scroll até "Publishing from RSS"
3. Cole seu RSS: https://revpulse.com.br/rss.xml
4. Clique "Fetch Feed"
5. Selecione os artigos para importar

### Passo 3: Depois de 24-48h

Sua conta estará "verificada" automaticamente. Aí rode:

```bash
node scripts/publish-all-devto.js
```

E publica os 25 artigos restantes automaticamente!

## Alternativa: Use o RSS do Hashnode

Dev.to pode importar diretamente do seu Hashnode RSS:

1. Acesse: https://dev.to/settings/extensions
2. Em "Publishing from RSS", cole:
   ```
   https://revpulse.hashnode.dev/rss.xml
   ```
3. Clique "Fetch"
4. Importa todos automaticamente (com backlinks!)

---

## Status Atual:

✅ **Hashnode: 30 backlinks** (DA 92)
⏳ **Dev.to: 0 backlinks** (conta nova bloqueada)
📅 **Aguardar:** 24-48h para desbloqueio

---

## Enquanto espera:

**Você já tem 30 backlinks de alta qualidade!**

Isso já é suficiente para:
- Domain Authority +10-15 pontos
- Ranking melhor no Google
- Tráfego inicial do Hashnode

**Próximos passos (depois de 48h):**
1. Completar perfil Dev.to
2. Publicar 3-5 artigos manualmente
3. Aguardar verificação
4. Rodar script automático
5. **+30 backlinks** 🚀
