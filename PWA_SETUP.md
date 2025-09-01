# Configuração PWA - Flag Quiz

## ✅ Arquivos já criados:
- `public/manifest.json` - Configuração do PWA
- `public/sw.js` - Service Worker para cache offline
- `src/main.jsx` - Registro do Service Worker
- `index.html` - Meta tags PWA
- `src/App.jsx` - Botão de instalação

## 🔧 Passos para completar:

### 1. Criar ícones (OBRIGATÓRIO)
Você precisa criar ícones PNG reais para substituir os placeholders:

**Opções para criar ícones:**
- **Favicon.io**: https://favicon.io/ (mais fácil)
- **RealFaviconGenerator**: https://realfavicongenerator.net/
- **Favicon Generator**: https://www.favicon-generator.org/

**Tamanhos necessários:**
- `public/icon-192x192.png` (192x192 pixels)
- `public/icon-512x512.png` (512x512 pixels)

### 2. Testar o PWA
```bash
npm run build
npm run preview
```

### 3. Como instalar no celular:

#### Android (Chrome):
1. Abra o site no Chrome
2. Toque no menu (3 pontos)
3. Selecione "Adicionar à tela inicial"
4. Confirme a instalação

#### iPhone (Safari):
1. Abra o site no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Selecione "Adicionar à Tela Inicial"
4. Confirme a instalação

### 4. Funcionalidades PWA:
- ✅ Instalação no celular
- ✅ Funcionamento offline (cache)
- ✅ Interface nativa
- ✅ Botão de instalação automático
- ✅ Meta tags para iOS/Android

### 5. Deploy para produção:
Para funcionar completamente, o PWA precisa estar em HTTPS:
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- GitHub Pages: https://pages.github.com

## 🎯 Próximos passos:
1. Criar os ícones PNG
2. Fazer deploy em HTTPS
3. Testar a instalação no celular
