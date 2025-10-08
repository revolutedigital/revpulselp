const express = require('express');
const path = require('path');
const app = express();

// Porta 8080 para o blog
const PORT = 8080;

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(__dirname));

// Configurar MIME types corretos
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.type('text/css');
  } else if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  } else if (req.url.endsWith('.webp')) {
    res.type('image/webp');
  }
  next();
});

// Rota para o blog
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog', 'index.html'));
});

app.get('/blog/', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog', 'index.html'));
});

// Rota principal (landing page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Rev Pulse Blog rodando na porta ${PORT}`);
  console.log(`📍 Landing Page: http://localhost:${PORT}`);
  console.log(`📝 Blog: http://localhost:${PORT}/blog`);
  console.log(`\n🎯 Artigos disponíveis:`);
  console.log(`   - 15 artigos de cauda curta (short-tail keywords)`);
  console.log(`   - 15 artigos de cauda longa (long-tail keywords)`);
  console.log(`   - Total: 30 artigos SEO-optimized`);
});
