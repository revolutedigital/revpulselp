# 📊 Facebook Pixel + API de Conversões - Rev Pulse

## ✅ O QUE JÁ ESTÁ IMPLEMENTADO

### 🎯 **Facebook Pixel (Client-Side Tracking)**

**2 Pixels Instalados:**
- Pixel ID 1: `1510338823013947`
- Pixel ID 2: `834524104691321`

### 📈 **Eventos Configurados:**

#### 1. **PageView** (Automático)
- Dispara quando a página carrega
- Rastreia todos os visitantes

#### 2. **ViewContent**
- Dispara quando usuário vê a seção de **Investimento** (#investimento)
- Threshold: 50% da seção visível
- Parâmetros:
  ```javascript
  {
    content_name: 'Seção de Investimento',
    content_category: 'Pricing',
    value: 497.00,
    currency: 'BRL'
  }
  ```

#### 3. **InitiateCheckout**
- Dispara quando usuário clica em **qualquer botão CTA** (GARANTIR ACESSO)
- 3 CTAs rastreados:
  1. Hero Section (Oferta Principal)
  2. Seção Investimento
  3. Última Chamada (final da página)
- Parâmetros:
  ```javascript
  {
    value: 497.00,
    currency: 'BRL',
    content_name: 'Rev Pulse - [Localização do CTA]'
  }
  ```

#### 4. **Lead** (Engajamento)
- Dispara em 2 momentos:
  - Scroll 50% da página
  - Scroll 75% da página
- Parâmetros:
  ```javascript
  {
    content_name: 'Scroll [50% ou 75%]',
    status: 'Engaged' ou 'Highly Engaged'
  }
  ```

#### 5. **Eventos Customizados**
- `TimeOnPage30s` - 30 segundos na página
- `TimeOnPage60s` - 1 minuto na página
- `TimeOnPage120s` - 2 minutos na página
- `CountdownViewed` - Visualizou contador regressivo

---

## 🚀 PRÓXIMO PASSO: API DE CONVERSÕES (Server-Side)

### ⚠️ **IMPORTANTE:**
A **API de Conversões do Facebook** requer um **backend/servidor** para funcionar corretamente.

Atualmente, a landing page é **estática** (apenas HTML/CSS/JS), então a API de Conversões **NÃO pode ser implementada diretamente**.

### 📋 **O Que É Necessário:**

1. **Servidor Backend** (Node.js, PHP, Python, etc.)
2. **Token de Acesso:**
   ```
   EAA32wZBPu76IBPsXRIVFmZAc3d0ZBjiEFa4p1fygPMXTC9ioOIrSVZBJJj84ueISu65QZBzeb6jFPwHyrIYxyKOgH7cRpjJHucJztlIh4UkyDHCEo4egnb5wjeJjzOOUNNLkmLdeZAHvOCnwQAw3lO7YRyJ5qL1DWuPIkhMZCwQyyW91aelOToIMbX2a2kzYgZDZD
   ```
3. **Pixel IDs:**
   - `1510338823013947`
   - `834524104691321`

---

## 💡 OPÇÕES PARA IMPLEMENTAR API DE CONVERSÕES

### **Opção 1: Usar Plataforma de Checkout (RECOMENDADO)**

Se você usa **Pagtrust, Hotmart, Kiwify, Monetizze**, etc.:

1. Configure os eventos de conversão **direto na plataforma**
2. A maioria dessas plataformas já tem **integração nativa** com Facebook
3. Vá em: **Configurações → Pixels → Adicionar Pixel IDs**

**Vantagem:** Mais simples, não precisa de código

---

### **Opção 2: Backend Próprio (Node.js)**

Se você quiser criar um backend próprio:

#### **Exemplo de Código (Node.js + Express):**

```javascript
const axios = require('axios');
const crypto = require('crypto');

const PIXEL_ID_1 = '1510338823013947';
const PIXEL_ID_2 = '834524104691321';
const ACCESS_TOKEN = 'EAA32wZBPu76IBPsXRIVFmZAc3d0ZBjiEFa4p1fygPMXTC9ioOIrSVZBJJj84ueISu65QZBzeb6jFPwHyrIYxyKOgH7cRpjJHucJztlIh4UkyDHCEo4egnb5wjeJjzOOUNNLkmLdeZAHvOCnwQAw3lO7YRyJ5qL1DWuPIkhMZCwQyyW91aelOToIMbX2a2kzYgZDZD';

// Função para enviar evento para Facebook API
async function sendConversionEvent(pixelId, eventName, userData, customData) {
  const url = `https://graph.facebook.com/v18.0/${pixelId}/events`;

  // Hash do email e telefone (GDPR compliance)
  const hashedEmail = userData.email ?
    crypto.createHash('sha256').update(userData.email.toLowerCase()).digest('hex') : null;

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: userData.pageUrl,
      user_data: {
        em: hashedEmail,
        client_ip_address: userData.ip,
        client_user_agent: userData.userAgent,
        fbp: userData.fbp, // Facebook Browser ID (cookie _fbp)
        fbc: userData.fbc  // Facebook Click ID (cookie _fbc)
      },
      custom_data: customData
    }],
    access_token: ACCESS_TOKEN
  };

  try {
    const response = await axios.post(url, payload);
    console.log(`Evento ${eventName} enviado para Pixel ${pixelId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao enviar evento para Pixel ${pixelId}:`, error.response?.data);
    throw error;
  }
}

// Endpoint para receber eventos do frontend
app.post('/api/track-conversion', async (req, res) => {
  const { eventName, userData, customData } = req.body;

  try {
    // Enviar para ambos os pixels
    await Promise.all([
      sendConversionEvent(PIXEL_ID_1, eventName, userData, customData),
      sendConversionEvent(PIXEL_ID_2, eventName, userData, customData)
    ]);

    res.json({ success: true, message: 'Evento enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

#### **Como Chamar do Frontend:**

```javascript
// Quando usuário clica no CTA
async function trackPurchase(email, value) {
  await fetch('/api/track-conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'Purchase',
      userData: {
        email: email,
        ip: userIP, // Capturar do servidor
        userAgent: navigator.userAgent,
        pageUrl: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc')
      },
      customData: {
        value: value,
        currency: 'BRL',
        content_name: 'Rev Pulse',
        content_type: 'product'
      }
    })
  });
}
```

---

### **Opção 3: Google Tag Manager (Intermediário)**

1. Criar container no GTM
2. Adicionar Pixel IDs no GTM
3. Configurar triggers para eventos
4. GTM pode fazer chamadas server-side via **Server-Side Tagging**

**Vantagem:** Mais controle, sem precisar de muito código

---

## 📊 COMO TESTAR SE PIXEL ESTÁ FUNCIONANDO

### **1. Facebook Pixel Helper (Chrome Extension)**
- Instalar: https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc
- Abrir landing page
- Verificar se aparecem os 2 pixels
- Verificar eventos disparando (PageView, ViewContent, InitiateCheckout, Lead)

### **2. Eventos Manager (Facebook Business)**
1. Acesse: https://business.facebook.com/events_manager2
2. Selecione o Pixel `1510338823013947`
3. Clique em **"Test Events"**
4. Abra a landing page e navegue
5. Veja os eventos em tempo real

### **3. Console do Navegador**
- Abrir DevTools (F12)
- Console deve mostrar: `Facebook Pixel Advanced Tracking Initialized`
- Verificar se `fbq` está definido: digite `fbq` no console

---

## 🎯 EVENTOS PARA RASTREAR NA API DE CONVERSÕES

Quando implementar backend, rastrear esses eventos:

| Evento | Quando Disparar | Parâmetros |
|--------|----------------|------------|
| `Purchase` | Pagamento confirmado | `value`, `currency`, `content_name` |
| `CompleteRegistration` | Usuário cria conta | `status: completed` |
| `AddPaymentInfo` | Adiciona cartão no checkout | `payment_method` |
| `Subscribe` | Assina serviço mensal | `value`, `predicted_ltv` |

---

## 🔐 SEGURANÇA DO TOKEN

**IMPORTANTE:** O token fornecido (`EAA32w...`) deve ser usado **APENAS no backend**, nunca expor no frontend!

**Boas práticas:**
- Armazenar em variável de ambiente (`.env`)
- **NUNCA** commitar no GitHub
- Rotacionar token a cada 60 dias
- Usar HTTPS em produção

---

## ✅ CHECKLIST FINAL

- [x] Facebook Pixel instalado (2 pixels)
- [x] Evento PageView funcionando
- [x] Evento ViewContent (seção investimento)
- [x] Evento InitiateCheckout (3 CTAs)
- [x] Eventos Lead (scroll depth)
- [x] Eventos customizados (time on page, countdown)
- [ ] API de Conversões (requer backend)
- [ ] Teste com Facebook Pixel Helper
- [ ] Verificar no Events Manager

---

## 🆘 SUPORTE

**Dúvidas sobre implementação?**
- Documentação oficial: https://developers.facebook.com/docs/marketing-api/conversions-api
- Pixel Helper: https://www.facebook.com/business/help/742478679120153

**Token expirado?**
- Gerar novo token: https://developers.facebook.com/tools/accesstoken/

---

**Desenvolvido para Rev Pulse Landing Page**
**Data:** 2025-01-07
