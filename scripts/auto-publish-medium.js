#!/usr/bin/env node
/**
 * AUTO-PUBLISH PARA MEDIUM
 *
 * Este script publica automaticamente seus artigos do blog no Medium
 * gerando backlinks automáticos para seu site.
 *
 * SETUP (5 minutos, 1 vez):
 * 1. Crie conta no Medium: https://medium.com
 * 2. Pegue seu token: https://medium.com/me/settings/security
 * 3. Cole o token abaixo na variável MEDIUM_TOKEN
 * 4. Rode: node scripts/auto-publish-medium.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURAÇÃO - COLE SEU TOKEN AQUI
// ============================================
const MEDIUM_TOKEN = 'SEU_TOKEN_AQUI'; // Pegue em: https://medium.com/me/settings/security

// ============================================
// ARTIGOS PARA PUBLICAR
// ============================================
const ARTIGOS = [
  {
    title: 'Chatbot WhatsApp: Guia Completo para Automatizar Seu Atendimento em 2025',
    url: 'https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html',
    tags: ['chatbot', 'whatsapp', 'automacao', 'ia', 'atendimento'],
    contentMarkdown: `
# Chatbot WhatsApp: Guia Completo para Automatizar Seu Atendimento em 2025

O **chatbot WhatsApp** transformou completamente a forma como empresas se comunicam com seus clientes. Se você ainda está respondendo manualmente cada mensagem no WhatsApp Business, está perdendo tempo e dinheiro.

[Leia o artigo completo →](https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html)

## O Que é um Chatbot WhatsApp?

Um **chatbot WhatsApp** é um assistente virtual automatizado que responde mensagens no WhatsApp de forma inteligente. Ele funciona 24/7, atende múltiplos clientes simultaneamente e nunca fica cansado ou mal-humorado.

## Por Que Todo Negócio Precisa

Empresas que implementam chatbots WhatsApp relatam:
- **Redução de 80%** no tempo de resposta
- **Economia de até 70%** nos custos de atendimento
- **Aumento de 35%** na satisfação do cliente
- **Crescimento de 50%** nas vendas online

## Como Criar Sem Programar

Você não precisa ser programador. Existem plataformas no-code que fazem todo o trabalho pesado.

[Continue lendo no RevPulse Blog →](https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html)

---

**Sobre o autor:** Igor Silveira é especialista em automação com IA e criador do RevPulse, plataforma para criar atendentes virtuais sem programar.
`
  },
  // Adicione mais artigos aqui...
];

// ============================================
// FUNÇÕES DO SCRIPT
// ============================================

function getUserId(token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.medium.com',
      path: '/v1/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const user = JSON.parse(data);
          resolve(user.data.id);
        } else {
          reject(new Error(`Erro ao obter user ID: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function publishPost(userId, token, article) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      title: article.title,
      contentFormat: 'markdown',
      content: article.contentMarkdown,
      tags: article.tags,
      canonicalUrl: article.url, // IMPORTANTE: Backlink canônico
      publishStatus: 'public'
    });

    const options = {
      hostname: 'api.medium.com',
      path: `/v1/users/${userId}/posts`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const post = JSON.parse(data);
          resolve(post.data.url);
        } else {
          reject(new Error(`Erro ao publicar: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🚀 Iniciando auto-publicação no Medium...\n');

  // Validar token
  if (MEDIUM_TOKEN === 'SEU_TOKEN_AQUI') {
    console.error('❌ ERRO: Você precisa configurar seu token do Medium!');
    console.error('\n📝 COMO FAZER:');
    console.error('1. Acesse: https://medium.com/me/settings/security');
    console.error('2. Clique em "Integration tokens"');
    console.error('3. Crie um token com descrição "RevPulse Auto-Publish"');
    console.error('4. Cole o token na variável MEDIUM_TOKEN deste arquivo');
    console.error('5. Rode novamente: node scripts/auto-publish-medium.js\n');
    process.exit(1);
  }

  try {
    // Obter user ID
    console.log('🔍 Obtendo informações da conta...');
    const userId = await getUserId(MEDIUM_TOKEN);
    console.log(`✅ Conectado! User ID: ${userId}\n`);

    // Publicar cada artigo
    let published = 0;
    for (const article of ARTIGOS) {
      console.log(`📝 Publicando: "${article.title}"...`);
      try {
        const url = await publishPost(userId, MEDIUM_TOKEN, article);
        console.log(`✅ Publicado com sucesso!`);
        console.log(`🔗 URL: ${url}`);
        console.log(`🎯 Backlink: ${article.url}\n`);
        published++;

        // Aguardar 2 segundos entre publicações (rate limit)
        if (published < ARTIGOS.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`❌ Erro ao publicar: ${error.message}\n`);
      }
    }

    console.log(`\n🎉 Concluído! ${published}/${ARTIGOS.length} artigos publicados no Medium!`);
    console.log(`\n💡 PRÓXIMOS PASSOS:`);
    console.log(`1. Acesse seu perfil Medium para ver os posts`);
    console.log(`2. Todos os posts têm backlinks canônicos para seu site`);
    console.log(`3. Rode este script sempre que criar novos artigos\n`);

  } catch (error) {
    console.error(`\n❌ ERRO: ${error.message}\n`);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { publishPost, getUserId };
