# 🚀 Deploy Rev Pulse no Railway

## 📋 Pré-requisitos

1. Conta no Railway: https://railway.app/
2. Git instalado
3. GitHub account (opcional, mas recomendado)

---

## 🎯 Método 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar repositório no GitHub

```bash
# Inicializar git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Rev Pulse Landing Page"

# Adicionar repositório remoto (substitua com seu repo)
git remote add origin https://github.com/SEU_USUARIO/revpulse.git

# Push para GitHub
git push -u origin main
```

### Passo 2: Deploy no Railway

1. Acesse https://railway.app/
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Escolha seu repositório `revpulse`
5. Railway detectará automaticamente o `package.json`
6. Clique em **"Deploy"**

**Pronto!** 🎉 Seu site estará no ar em ~2 minutos.

---

## 🎯 Método 2: Deploy via Railway CLI (Rápido)

### Passo 1: Instalar Railway CLI

```bash
npm install -g @railway/cli
```

### Passo 2: Login

```bash
railway login
```

### Passo 3: Inicializar projeto

```bash
# Na pasta do projeto
railway init
```

### Passo 4: Deploy

```bash
railway up
```

**Pronto!** 🎉 Seu site está no ar!

---

## 🌐 Configurar Domínio Personalizado

### No Railway Dashboard:

1. Vá para seu projeto
2. Clique na aba **"Settings"**
3. Em **"Domains"**, clique **"Generate Domain"** (domínio grátis `.railway.app`)
4. Ou clique **"Custom Domain"** para adicionar `revpulse.com.br`

### Para domínio personalizado:

1. No Railway, copie o CNAME fornecido
2. No seu provedor de DNS (Registro.br, Cloudflare, etc):
   - Tipo: `CNAME`
   - Nome: `@` ou `www`
   - Valor: `seu-projeto.up.railway.app`
3. Aguarde propagação DNS (até 24h, mas geralmente 5-10 min)

---

## ⚙️ Configurações Importantes

### Variáveis de Ambiente (se necessário)

No Railway Dashboard > Settings > Variables:

```
NODE_ENV=production
```

### Verificar Health Check

Railway automaticamente verifica se seu app está funcionando na porta `$PORT`

---

## 🔄 Atualizações Automáticas

**Com GitHub:** Cada `git push` fará um novo deploy automaticamente!

```bash
# Fazer alterações
git add .
git commit -m "Atualização da landing page"
git push

# Railway fará deploy automático! 🚀
```

---

## 📊 Monitoramento

### Ver logs em tempo real:

```bash
railway logs
```

### No Dashboard:
- Acesse seu projeto
- Aba **"Deployments"** mostra histórico
- Aba **"Metrics"** mostra uso de recursos

---

## ✅ Checklist Pós-Deploy

- [ ] Site acessível via URL do Railway
- [ ] Imagens WebP carregando corretamente
- [ ] CSS externo funcionando
- [ ] Animações AOS funcionando
- [ ] Facebook Pixel disparando
- [ ] Links de checkout funcionando
- [ ] Sitemap acessível: `/sitemap.xml`
- [ ] Robots.txt acessível: `/robots.txt`

---

## 🐛 Solução de Problemas

### Site não carrega:
```bash
# Ver logs
railway logs

# Verificar se porta está correta
# O Railway usa $PORT automaticamente
```

### CSS não carrega:
- Verifique se `styles.css` está na raiz
- Verifique MIME types no `server.js`

### Imagens não aparecem:
- Certifique-se que pasta `images/` está commitada
- Verifique caminhos relativos no HTML

---

## 💰 Custos

- **Hobby Plan (Grátis):**
  - $5 de créditos/mês
  - Suficiente para ~50k visualizações/mês
  - Domínio `.railway.app` incluído

- **Pro Plan ($20/mês):**
  - Mais recursos
  - Domínio personalizado sem limitações

Para uma landing page como Rev Pulse, o **plano grátis é mais que suficiente!**

---

## 🎉 Pronto!

Seu site Rev Pulse está no ar! 🚀

**URL do Railway:** `https://seu-projeto.up.railway.app`

Para suporte: https://docs.railway.app/
