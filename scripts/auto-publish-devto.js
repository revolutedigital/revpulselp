#!/usr/bin/env node
/**
 * AUTO-PUBLISH PARA DEV.TO
 *
 * Este script publica automaticamente seus artigos do blog no Dev.to
 * gerando backlinks automáticos para seu site.
 *
 * SETUP (5 minutos, 1 vez):
 * 1. Crie conta no Dev.to: https://dev.to
 * 2. Pegue sua API key: https://dev.to/settings/extensions
 * 3. Cole a key abaixo na variável DEVTO_API_KEY
 * 4. Rode: node scripts/auto-publish-devto.js
 */

const https = require('https');

// ============================================
// CONFIGURAÇÃO - COLE SUA API KEY AQUI
// ============================================
const DEVTO_API_KEY = 'SUA_API_KEY_AQUI'; // Pegue em: https://dev.to/settings/extensions

// ============================================
// ARTIGOS PARA PUBLICAR
// ============================================
const ARTIGOS = [
  {
    title: 'Chatbot WhatsApp: Guia Completo para Automatizar Seu Atendimento em 2025',
    canonicalUrl: 'https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html',
    tags: ['chatbot', 'whatsapp', 'automation', 'ai', 'javascript'],
    contentMarkdown: `
O **chatbot WhatsApp** transformou completamente a forma como empresas se comunicam com seus clientes. Se você ainda está respondendo manualmente cada mensagem no WhatsApp Business, está perdendo tempo e dinheiro.

## O Que é um Chatbot WhatsApp?

Um chatbot WhatsApp é um assistente virtual automatizado que responde mensagens no WhatsApp de forma inteligente. Ele funciona 24/7, atende múltiplos clientes simultaneamente e nunca fica cansado.

### Vantagens:
- ✅ Responder instantaneamente
- ✅ Atender infinitos clientes ao mesmo tempo
- ✅ Trabalhar 24 horas por dia
- ✅ Nunca esquecer informações
- ✅ Integrar com sistemas externos

## Por Que Todo Negócio Precisa

Os números não mentem. Empresas que implementam chatbots WhatsApp relatam:

- **Redução de 80%** no tempo de resposta
- **Economia de até 70%** nos custos de atendimento
- **Aumento de 35%** na satisfação do cliente
- **Crescimento de 50%** nas vendas online

## Tipos de Chatbot WhatsApp

### 1. Chatbot Baseado em Regras
O tipo mais simples. Funciona com respostas pré-programadas baseadas em palavras-chave.

**Vantagens:** Fácil de criar, barato
**Desvantagens:** Limitado, não entende contexto

### 2. Chatbot com IA
Usa processamento de linguagem natural (NLP) para entender o que o cliente realmente quer.

**Vantagens:** Entende contexto, aprende com conversas
**Desvantagens:** Mais caro, requer configuração técnica

### 3. Chatbot Híbrido (Recomendado)
Combina regras simples com IA. Responde automaticamente o que consegue e transfere para humanos quando necessário.

## Como Criar Sem Programar

Você não precisa ser programador para criar um chatbot profissional. Existem plataformas no-code que fazem todo o trabalho pesado.

### Principais plataformas:
- **RevPulse** — A mais simples para iniciantes
- **ManyChat** — Popular mas limitada
- **N8N** — Complexo demais para não-programadores

## Quanto Custa?

Os preços variam muito:

- **Plataformas básicas:** R$ 50-200/mês
- **Plataformas avançadas:** R$ 300-800/mês
- **Desenvolvimento customizado:** R$ 3.000-15.000 (uma vez)
- **RevPulse:** Pagamento único de R$ 497 (sem mensalidade)

## Casos de Uso

### Restaurantes e Delivery
Cardápio automatizado, pedidos via WhatsApp, rastreamento de entrega.

### Clínicas e Consultórios
Agendamento de consultas, confirmação automática, lembretes.

### E-commerce
Catálogo de produtos, carrinho de compras, pagamento integrado.

## Conclusão

O mercado de chatbots WhatsApp está em plena expansão no Brasil. Empresas que não automatizarem nos próximos 2 anos vão ficar para trás.

A boa notícia? Você não precisa esperar. Com as ferramentas certas, pode criar seu primeiro chatbot hoje mesmo.

---

**📚 Leia o artigo completo com todos os detalhes:** [Chatbot WhatsApp: Guia Completo](https://revpulse.com.br/blog/artigos/chatbot-whatsapp.html)

**👤 Sobre o autor:** Igor Silveira é especialista em automação com IA e criador do RevPulse, plataforma para criar atendentes virtuais sem programar.
`
  },
  // Adicione mais artigos aqui...
];

// ============================================
// FUNÇÕES DO SCRIPT
// ============================================

function publishArticle(apiKey, article) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      article: {
        title: article.title,
        published: true,
        body_markdown: article.contentMarkdown,
        tags: article.tags,
        canonical_url: article.canonicalUrl, // IMPORTANTE: Backlink canônico
        series: 'Chatbots e Automação'
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
  console.log('🚀 Iniciando auto-publicação no Dev.to...\n');

  // Validar API key
  if (DEVTO_API_KEY === 'SUA_API_KEY_AQUI') {
    console.error('❌ ERRO: Você precisa configurar sua API key do Dev.to!');
    console.error('\n📝 COMO FAZER:');
    console.error('1. Acesse: https://dev.to/settings/extensions');
    console.error('2. Role até "DEV Community API Keys"');
    console.error('3. Clique em "Generate API Key"');
    console.error('4. Dê um nome: "RevPulse Auto-Publish"');
    console.error('5. Cole a key na variável DEVTO_API_KEY deste arquivo');
    console.error('6. Rode novamente: node scripts/auto-publish-devto.js\n');
    process.exit(1);
  }

  try {
    // Publicar cada artigo
    let published = 0;
    for (const article of ARTIGOS) {
      console.log(`📝 Publicando: "${article.title}"...`);
      try {
        const url = await publishArticle(DEVTO_API_KEY, article);
        console.log(`✅ Publicado com sucesso!`);
        console.log(`🔗 URL: ${url}`);
        console.log(`🎯 Backlink: ${article.canonicalUrl}\n`);
        published++;

        // Aguardar 3 segundos entre publicações (rate limit)
        if (published < ARTIGOS.length) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.error(`❌ Erro ao publicar: ${error.message}\n`);
      }
    }

    console.log(`\n🎉 Concluído! ${published}/${ARTIGOS.length} artigos publicados no Dev.to!`);
    console.log(`\n💡 PRÓXIMOS PASSOS:`);
    console.log(`1. Acesse dev.to/dashboard para ver os posts`);
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

module.exports = { publishArticle };
