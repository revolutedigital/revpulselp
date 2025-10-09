# Landing Page RevPulse - Instruções

## ✅ O que foi criado

Landing page completa com:
- Copy 10/10 otimizada para conversão
- Design dark profissional (inspirado no app RevPulse)
- Totalmente responsiva (funciona em mobile/tablet/desktop)
- Foto da família integrada na seção "Quem está te ensinando"
- Paleta de cores: #0f1419 (fundo), #FF6B35 (accent laranja), #1a1f2e (cards)

## 🚀 Como usar

1. **Abrir o arquivo:**
   - Navegue até: `/Users/yourapple/revpulsepagina/`
   - Abra o arquivo `index.html` em qualquer navegador

2. **Estrutura de arquivos:**
   ```
   revpulsepagina/
   ├── index.html          # Landing page completa
   ├── images/
   │   └── familia.jpg     # Sua foto com a família
   └── README.md           # Este arquivo
   ```

## ⚙️ Ajustes necessários antes de publicar

### 1. Links dos CTAs (botões de compra)
Todos os botões atualmente apontam para `#`. Você precisa trocar por seu link de pagamento:

**Busque no código por:** `href="#"`
**Substitua por:** `href="SEU_LINK_DE_CHECKOUT"`

**Exemplo:**
```html
<!-- ANTES -->
<a href="#" class="cta-button">GARANTIR ACESSO POR R$ 497 →</a>

<!-- DEPOIS -->
<a href="https://pay.hotmart.com/seu-produto" class="cta-button">GARANTIR ACESSO POR R$ 497 →</a>
```

### 2. Links de contato no footer
**Busque por:**
- `💬 Suporte WhatsApp` → adicione seu link do WhatsApp
- `📧 Email` → adicione seu email

**Exemplo:**
```html
<a href="https://wa.me/5511999999999">💬 Suporte WhatsApp</a>
<a href="mailto:contato@seudominio.com">📧 Email</a>
```

### 3. Logo no header
O logo atual é CSS puro (pulso laranja). Se quiser usar a imagem real do logo:

1. Copie o arquivo do logo para a pasta `images/`
2. Substitua a div `.logo-icon` por:
```html
<img src="images/logo-revpulse.png" alt="RevPulse" style="width: 50px; height: 50px;">
```

## 📱 Testado em

- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Tablet (iPad)
- ✅ Mobile (iPhone, Android)

## 🎨 Cores utilizadas

- **Fundo principal:** #0f1419 (dark blue/black)
- **Cards/Seções:** #1a1f2e (cinza escuro azulado)
- **Accent (botões, destaques):** #FF6B35 (laranja)
- **Texto principal:** #e4e6eb (branco suave)
- **Texto secundário:** #a8b3cf (cinza azulado claro)
- **Sucesso:** #4caf50 (verde)
- **Erro:** #f44336 (vermelho)

## 📝 Seções da página (na ordem)

1. Header (fixo no topo)
2. Pre-Hero (história João vs Maria)
3. Hero (título principal + preço)
4. A Verdade que Ninguém Te Conta
5. Comparação RevPulse vs N8N
6. Faça as Contas Comigo
7. O Que É o RevPulse (módulos do curso)
8. Funcionalidades que Fecham Vendas
9. Nichos Mais Rentáveis
10. Quem Está Te Ensinando Isso (sua história + foto família)
11. Para Quem É (e Para Quem NÃO É)
12. Investimento (preço + o que está incluído)
13. Bônus Incluídos
14. Sua Realidade em 90 Dias
15. FAQ (Perguntas Frequentes)
16. Próximas Atualizações
17. Última Chamada (CTA final)
18. Footer

## 🚀 Para publicar online

### Opção 1: Hospedagem simples (recomendado)
1. Contratar hospedagem (Hostinger, Hostgator, etc)
2. Fazer upload dos arquivos via FTP ou painel de controle
3. Configurar domínio personalizado

### Opção 2: Vercel (grátis, rápido)
1. Criar conta no Vercel.com
2. Conectar repositório ou fazer upload da pasta
3. Pronto! Seu site está no ar

### Opção 3: Netlify (grátis)
1. Criar conta no Netlify.com
2. Arrastar a pasta `revpulsepagina` para a área de upload
3. Pronto! Seu site está no ar

## 📧 Próximos passos sugeridos

1. ✅ Ajustar links dos CTAs
2. ✅ Adicionar pixel do Facebook/Google Ads
3. ✅ Configurar Google Analytics
4. ✅ Testar formulários de contato (se adicionar)
5. ✅ Adicionar chat (Tidio, JivoChat, etc)
6. ✅ Otimizar imagens para web (comprimir familia.jpg)
7. ✅ Configurar SSL (HTTPS)

## 💡 Dicas de otimização

- **Velocidade:** Comprima a imagem familia.jpg (use TinyPNG.com)
- **SEO:** Adicione meta tags de descrição e keywords
- **Analytics:** Instale Google Analytics ou Hotjar para ver comportamento dos visitantes
- **Testes A/B:** Teste diferentes headlines e CTAs

## 🆘 Precisa de ajuda?

Se tiver dúvidas sobre como ajustar algo na página, me chame!

---

**Desenvolvido com a copy 10/10 e estética inspirada no app RevPulse.**
