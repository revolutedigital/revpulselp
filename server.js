const express = require('express');
const path = require('path');
const app = express();

// Porta dinâmica para Railway
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos com cache agressivo
app.use(express.static(__dirname, {
  maxAge: '1h',
  etag: true,
  lastModified: true,
  setHeaders: (res, filepath) => {
    // HTML: cache de 10 minutos no browser, 1h no CDN
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=3600');
    }
    // CSS/JS: cache de 1 dia
    else if (filepath.endsWith('.css') || filepath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    }
    // Imagens: cache de 7 dias
    else if (filepath.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
    // Sitemap/Robots: cache de 1 dia
    else if (filepath.match(/\.(xml|txt)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

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

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para sitemap
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Rota para robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 RevPulse rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
});
