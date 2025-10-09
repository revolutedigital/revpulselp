# Como Pegar o Token do Medium (com prints)

## Passo a Passo:

### 1. Acesse a página de segurança
URL direta: https://medium.com/me/settings/security

OU

- Clique no seu avatar (canto superior direito)
- Clique em "Settings"
- **No menu lateral esquerdo**, clique em "Security and apps"

### 2. Procure por "Integration tokens"
- Role a página para baixo
- Você vai ver uma seção chamada **"Integration tokens"**
- Embaixo dela tem o texto: "Integration tokens allow third party applications to access your Medium account"

### 3. Crie o token
- Clique no botão **"Get integration token"** ou **"Create token"**
- Aparece um campo de texto
- Digite: **"Rev Pulse Auto-Publish"**
- Clique em "Get token"

### 4. Copie o token
- O token aparece na tela (parece com: `2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f`)
- **COPIE IMEDIATAMENTE** (ele só aparece 1 vez!)
- Guarde em lugar seguro

### 5. Cole no script
Abra o arquivo: `scripts/auto-publish-medium.js`

Procure a linha 21:
```javascript
const MEDIUM_TOKEN = 'SEU_TOKEN_AQUI';
```

Substitua por:
```javascript
const MEDIUM_TOKEN = '2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f'; // seu token real
```

### 6. Rode o script
```bash
node scripts/auto-publish-medium.js
```

## ⚠️ Você está na tela errada!

Você está em "Settings" geral. Precisa ir em **"Security and apps"** no menu lateral esquerdo.

## Se não encontrar

Tente a URL direta: https://medium.com/me/settings/security

Deve aparecer uma página com várias seções, incluindo "Integration tokens" no meio da página.
