#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const HASHNODE_API_KEY = '823007b4-e33d-4d50-8460-84a52c2361bb';
const PUBLICATION_ID = '68e7893bd320695999bce2e2';

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
    .substring(0, 1000);
}

function publishToHashnode(apiKey, pubId, article) {
  return new Promise((resolve, reject) => {
    const query = `
      mutation PublishPost($input: PublishPostInput!) {
        publishPost(input: $input) {
          post {
            id
            slug
            url
          }
        }
      }
    `;

    const variables = {
      input: {
        title: article.title,
        slug: article.slug,
        contentMarkdown: article.contentMarkdown,
        tags: [
          { slug: 'chatbot', name: 'chatbot' },
          { slug: 'whatsapp', name: 'whatsapp' },
          { slug: 'automacao', name: 'automacao' }
        ],
        publicationId: pubId,
        settings: {
          delisted: false
        },
        metaTags: {
          title: article.title,
          description: article.title.substring(0, 160)
        }
      }
    };

    const postData = JSON.stringify({ query, variables });

    const options = {
      hostname: 'gql.hashnode.com',
      path: '/',
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          if (result.errors) {
            reject(new Error(JSON.stringify(result.errors)));
          } else {
            resolve(result.data.publishPost.post.url);
          }
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
  console.log('🚀 Publicando TODOS os artigos no Hashnode...\n');

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
      slug: slug,
      contentMarkdown: `
${preview}

...

[**📖 Leia o artigo completo com todos os detalhes →**](${url})

---

## 👤 Sobre o Autor

**Igor Silveira** é especialista em automação com Inteligência Artificial e criador do **RevPulse**, plataforma que permite criar atendentes virtuais para WhatsApp sem programar.

🌐 **Site:** [revpulse.com.br](https://revpulse.com.br)
📝 **Blog:** [Blog RevPulse](https://revpulse.com.br/blog/)
📚 **Artigo original:** [${title}](${url})
`
    };

    console.log(`📝 [${published + 1}/${files.length}] ${title.substring(0, 60)}...`);

    try {
      const hashnodeUrl = await publishToHashnode(HASHNODE_API_KEY, PUBLICATION_ID, article);
      console.log(`   ✅ Publicado: ${hashnodeUrl}`);
      console.log(`   🔗 Backlink: ${url}\n`);
      published++;

      // Rate limit: 2 segundos entre requests
      if (published < files.length) {
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (error) {
      console.error(`   ❌ Erro: ${error.message.substring(0, 100)}\n`);
      errors++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 Publicação concluída!`);
  console.log(`✅ Publicados: ${published}/${files.length}`);
  if (errors > 0) {
    console.log(`❌ Erros: ${errors}`);
  }
  console.log(`\n💡 Todos os artigos têm backlinks canônicos para revpulse.com.br`);
  console.log(`📈 Acesse: https://revpulse.hashnode.dev\n`);
}

main().catch(console.error);
