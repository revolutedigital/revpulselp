#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const DEVTO_API_KEY = '7TaRQ6vavghjHsF9zMt5ar5V';

const articlesDir = path.join(__dirname, '..', 'blog', 'artigos');

function extractTitle(html) {
  const match = html.match(/<h1[^>]*class="article-title"[^>]*>(.*?)<\/h1>/);
  return match ? match[1].replace(/<[^>]*>/g, '').trim() : 'Sem título';
}

function extractPreview(html) {
  const bodyMatch = html.match(/<div class="article-body"[^>]*>([\s\S]*?)<\/div>/);
  if (!bodyMatch) return '';

  return bodyMatch[1]
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 1200);
}

function publishToDevto(apiKey, article) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      article: {
        title: article.title,
        published: true,
        body_markdown: article.contentMarkdown,
        tags: ['chatbot', 'whatsapp', 'automation', 'ai'],
        canonical_url: article.canonicalUrl,
        series: 'Chatbots e Automação com IA'
      }
    });

    const options = {
      hostname: 'dev.to',
      path: '/api/articles',
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const article = JSON.parse(data);
          resolve(article.url);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🚀 Publicando TODOS os artigos no Dev.to...\n');

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));
  console.log(`📚 Encontrados ${files.length} artigos\n`);

  let published = 0;
  let errors = 0;

  for (const file of files) {
    const slug = file.replace('.html', '');
    const filepath = path.join(articlesDir, file);
    const html = fs.readFileSync(filepath, 'utf8');

    const title = extractTitle(html);
    const preview = extractPreview(html);
    const url = `https://revpulse.com.br/blog/artigos/${slug}.html`;

    const article = {
      title: title.length > 100 ? title.substring(0, 97) + '...' : title,
      canonicalUrl: url,
      contentMarkdown: `
${preview}

...

## 📖 Leia o Artigo Completo

[**Continue lendo com todos os detalhes →**](${url})

---

## 👤 Sobre o Autor

**Igor Silveira** é especialista em automação com Inteligência Artificial e criador do **Rev Pulse**, plataforma que permite criar atendentes virtuais para WhatsApp sem programar.

🌐 **Site:** [revpulse.com.br](https://revpulse.com.br)
📝 **Blog:** [Blog Rev Pulse](https://revpulse.com.br/blog/)
📚 **Artigo original:** [${title}](${url})
`
    };

    console.log(`📝 [${published + 1}/${files.length}] ${title.substring(0, 60)}...`);

    try {
      const devtoUrl = await publishToDevto(DEVTO_API_KEY, article);
      console.log(`   ✅ Publicado: ${devtoUrl}`);
      console.log(`   🔗 Backlink: ${url}\n`);
      published++;

      // Rate limit: 3 segundos entre requests (Dev.to é mais restritivo)
      if (published < files.length) {
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (error) {
      console.error(`   ❌ Erro: ${error.message.substring(0, 100)}\n`);
      errors++;

      // Se der rate limit, espera mais
      if (error.message.includes('429')) {
        console.log('   ⏳ Rate limit atingido, aguardando 30s...\n');
        await new Promise(r => setTimeout(r, 30000));
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 Publicação concluída!`);
  console.log(`✅ Publicados: ${published}/${files.length}`);
  if (errors > 0) {
    console.log(`❌ Erros: ${errors}`);
  }
  console.log(`\n💡 Todos os artigos têm backlinks canônicos para revpulse.com.br`);
  console.log(`\n📊 RESUMO TOTAL DE BACKLINKS:`);
  console.log(`   Hashnode: 30 backlinks (DA 92)`);
  console.log(`   Dev.to: ${published} backlinks (DA 90)`);
  console.log(`   TOTAL: ${30 + published} backlinks de alta autoridade! 🚀\n`);
}

main().catch(console.error);
