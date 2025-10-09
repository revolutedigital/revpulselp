#!/usr/bin/env node
/**
 * AUTO-PUBLISH PARA HASHNODE
 *
 * Hashnode é MUITO melhor que Medium:
 * - API mais simples
 * - Backlinks mais fortes
 * - SEO melhor
 * - Funciona com contas gratuitas
 *
 * SETUP (3 minutos):
 * 1. Crie conta: https://hashnode.com
 * 2. Pegue API key: https://hashnode.com/settings/developer
 * 3. Pegue Publication ID: https://hashnode.com/settings
 * 4. Cole abaixo e rode!
 */

const https = require('https');

// ============================================
// CONFIGURAÇÃO
// ============================================
const HASHNODE_API_KEY = '823007b4-e33d-4d50-8460-84a52c2361bb';
const PUBLICATION_ID = '68e7893bd320695999bce2e2'; // revpulse.hashnode.dev

// ============================================
// ARTIGOS
// ============================================
const ARTIGOS = [
  {
    title: 'Chatbot WhatsApp: Guia Completo para Automatizar Seu Atendimento em 2025',
    slug: 'chatbot-whatsapp-guia-completo',
    canonicalUrl: 'https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html',
    tags: ['chatbot', 'whatsapp', 'automacao', 'ia'],
    contentMarkdown: `
O **chatbot WhatsApp** transformou completamente a forma como empresas se comunicam com seus clientes.

## O Que é um Chatbot WhatsApp?

Um chatbot WhatsApp é um assistente virtual automatizado que responde mensagens no WhatsApp de forma inteligente.

### Vantagens principais:
- ✅ Responder instantaneamente
- ✅ Atender infinitos clientes simultaneamente
- ✅ Trabalhar 24 horas por dia
- ✅ Nunca esquecer informações

## Por Que Todo Negócio Precisa

Empresas que implementam chatbots relatam:
- **80% redução** no tempo de resposta
- **70% economia** nos custos
- **35% aumento** na satisfação
- **50% crescimento** nas vendas

[Leia o artigo completo →](https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html)

---
**Autor:** Igor Silveira | **Site:** [RevPulse](https://revpulse.com.br)
`
  }
];

// ============================================
// FUNÇÕES
// ============================================

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
        tags: article.tags.map(tag => ({ slug: tag, name: tag })),
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
  console.log('🚀 Publicando no Hashnode...\n');

  if (HASHNODE_API_KEY === 'SEU_TOKEN_AQUI') {
    console.error('❌ Configure seu token do Hashnode!');
    console.error('\n📝 COMO FAZER:');
    console.error('1. Acesse: https://hashnode.com/settings/developer');
    console.error('2. Clique em "Generate New Token"');
    console.error('3. Nome: "RevPulse"');
    console.error('4. Cole na variável HASHNODE_API_KEY\n');
    process.exit(1);
  }

  let published = 0;
  for (const article of ARTIGOS) {
    console.log(`📝 Publicando: "${article.title}"...`);
    try {
      const url = await publishToHashnode(HASHNODE_API_KEY, PUBLICATION_ID, article);
      console.log(`✅ Publicado!`);
      console.log(`🔗 URL: ${url}`);
      console.log(`🎯 Backlink: ${article.canonicalUrl}\n`);
      published++;
      await new Promise(r => setTimeout(r, 2000));
    } catch (error) {
      console.error(`❌ Erro: ${error.message}\n`);
    }
  }

  console.log(`\n🎉 ${published}/${ARTIGOS.length} artigos publicados!\n`);
}

if (require.main === module) {
  main();
}
