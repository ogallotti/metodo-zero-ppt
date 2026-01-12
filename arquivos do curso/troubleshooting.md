# TROUBLESHOOTING - MÉTODO ZERO

Soluções para problemas comuns durante o desenvolvimento.

---

## Performance

### CLS Alto (Layout Shift)

**Sintomas:** Elementos "pulam" durante carregamento, pontuação CLS > 0.1

| Causa | Diagnóstico | Solução |
|-------|-------------|---------|
| Animação de ENTRADA no hero | DevTools > Performance > Layout Shift | Remover fade/reveal/typing que impeçam renderização imediata |
| font-display: swap | Verificar CSS | Mudar para `font-display: optional` |
| Imagens sem dimensões | HTML sem width/height | Adicionar `width` e `height` em todas |
| Conteúdo dinâmico | JavaScript adicionando elementos | Reservar espaço com CSS (min-height) |
| Fonte carregando tarde | Flash de texto diferente | Adicionar preload da fonte |

**Comando para verificar:**
```bash
# Abrir DevTools > Performance > gravar carregamento
# Procurar por "Layout Shift" na timeline
```

---

### LCP Lento (>2.5s)

**Sintomas:** Página demora para mostrar conteúdo principal

| Causa | Diagnóstico | Solução |
|-------|-------------|---------|
| Imagem hero grande | DevTools > Network > tamanho | Comprimir com Netlify CDN: `&w=1200&q=85` |
| Imagem hero sem eager | HTML | Adicionar `loading="eager"` + `fetchpriority="high"` |
| CDNs externos | DevTools > Network | Self-host todas fontes, ícones e libs |
| CSS bloqueante | CSS grande no `<head>` | Inline só CSS crítico, async o resto |
| Fonte bloqueante | CSS | Preload + `font-display: optional` |
| Servidor lento | Testar em diferentes horários | Verificar se é problema do hosting |

---

### Página Lenta em Geral

**Checklist de diagnóstico:**

1. **Rodou build?** `npm run build` antes de testar
2. **Testou em anônima?** Extensões podem interferir
3. **Está servindo dist/?** Verificar netlify.toml
4. **Cache antigo?** Hard refresh (Ctrl+Shift+R)
5. **CDNs externos?** Verificar aba Network por requests externos

---

## Build e Deploy

### Build Falhando

**Erro: "tailwindcss: command not found"**
```bash
# Reinstalar dependências
rm -rf node_modules
npm install
```

**Erro: "Cannot find module 'html-minifier-terser'"**
```bash
npm install html-minifier-terser --save-dev
```

**Erro: "terser: command not found"**
```bash
npm install terser --save-dev
```

**Erro genérico no script build:html:**
```bash
# Verificar se existe src/index.html
ls src/index.html

# Verificar se pasta scripts existe
ls scripts/build-html.js
```

---

### Netlify Deploy Falhando

**Erro: "Build script returned non-zero exit code"**
1. Verificar logs completos no painel da Netlify
2. Rodar `npm run build` localmente para ver erro
3. Garantir que `package.json` está commitado

**Erro: "Page not found" após deploy**
1. Verificar se `publish` no `netlify.toml` é `dist`
2. Verificar se `npm run build` gera arquivos em `dist/`
3. Verificar estrutura de pastas (usar `pagina/index.html`, não `pagina.html`)

**Erro: "Function not found" ou "404 on form submission"**
1. Verificar se `netlify.toml` está correto
2. Verificar se a função existe em `netlify/functions/`
3. Verificar sintaxe do arquivo da função

---

### Site Não Atualiza Após Deploy

1. **Cache do navegador:** Hard refresh (Ctrl+Shift+R)
2. **Cache do CDN:** Aguardar alguns minutos ou limpar no painel Netlify
3. **Build não rodou:** Verificar se commit foi feito corretamente
4. **Branch errada:** Verificar se está fazendo push para `main`

---

## Tailwind CSS

### Classes Não Aplicando

**Classe não existe no output:**
```bash
# Verificar se arquivo está no content do tailwind.config.js
# Deve incluir:
content: ["./src/**/*.html", "./src/**/*.js"]
```

**Classe com valor customizado não funciona:**
```javascript
// tailwind.config.js - verificar theme.extend
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          // ...
        }
      }
    }
  }
}
```

**CSS não atualiza no dev:**
```bash
# Reiniciar servidor
# Ctrl+C para parar
npm run dev
```

---

### Tailwind Gerando CSS Enorme

**Causa:** content muito amplo ou purge não funcionando

```javascript
// ✅ CORRETO
content: ["./src/**/*.html", "./src/**/*.js"]

// ❌ ERRADO (inclui node_modules)
content: ["./**/*.html"]
```

---

## GSAP

### Animação Não Dispara

**ScrollTrigger não registrado:**
```javascript
// Verificar se está registrando
gsap.registerPlugin(ScrollTrigger);
```

**Elemento não existe no DOM:**
```javascript
// Usar window load (não DOMContentLoaded)
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  // suas animações aqui
});
```

**Trigger errado:**
```javascript
// Verificar se o seletor existe
console.log(document.querySelector('.animate-on-scroll'));
```

---

### Elementos Ficam Invisíveis (FOUC)

**Usando gsap.from() incorretamente:**
```javascript
// ❌ ERRADO: from() pode causar elementos invisíveis
gsap.from('.card', { opacity: 0 });

// ✅ CORRETO: fromTo() garante estado final
gsap.fromTo('.card',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, scrollTrigger: { ... } }
);
```

**Conflito com transition-all do Tailwind:**
```html
<!-- ❌ ERRADO: transition-all conflita com GSAP -->
<div class="card transition-all duration-300">

<!-- ✅ CORRETO: transições específicas -->
<div class="card transition-colors duration-300">
```

---

### Animação "Pula" ou Comportamento Estranho

**Elemento com overflow hidden no pai:**
```css
/* Verificar containers pai */
.container {
  overflow: visible; /* não hidden */
}
```

**ScrollTrigger conflitando:**
```javascript
// Usar ID único por trigger
scrollTrigger: {
  trigger: ".elemento",
  id: "minha-animacao-unica"
}
```

---

## Imagens

### Netlify CDN Retorna 404

**Caminho errado:**
```html
<!-- ❌ ERRADO: caminho relativo no url= -->
<img src="/.netlify/images?url=images/foto.jpg&w=800">

<!-- ✅ CORRETO: caminho absoluto no url= -->
<img src="/.netlify/images?url=/images/foto.jpg&w=800">
```

**Imagem não existe:**
```bash
# Verificar se arquivo existe em src/images/
ls src/images/

# Verificar se foi copiado para dist/images/
npm run build
ls dist/images/
```

**Subpasta:**
```html
<!-- Em src/sobre/index.html -->
<!-- Caminho deve ser relativo à raiz do site publicado -->
<img src="/.netlify/images?url=/sobre/images/foto.jpg&w=800">
```

---

### Imagem Não Carrega Localmente

**netlify dev não está rodando:**
```bash
npm run dev
# Acessar em localhost:8888, não em outra porta
```

**Imagem não foi copiada para dist:**
```bash
# Rodar build para copiar assets
npm run build
```

---

## Formulários

### Formulário Não Envia

**Atributo netlify faltando:**
```html
<form name="contato" method="POST" data-netlify="true">
  <!-- campos -->
</form>
```

**Hidden input faltando:**
```html
<form name="contato" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contato">
  <!-- campos -->
</form>
```

**Nome do form diferente:**
```html
<!-- O name do form deve bater com o value do hidden input -->
<form name="contato"> <!-- este nome -->
  <input type="hidden" name="form-name" value="contato"> <!-- deve bater aqui -->
</form>
```

---

### Formulário com Webhook Não Funciona

**Webhook não configurado:**
1. Ir em Site settings > Forms > Form notifications
2. Add notification > Outgoing webhook
3. Configurar URL do webhook

**Erro no webhook:**
1. Verificar logs no painel da Netlify
2. Verificar se URL do webhook está correta
3. Testar webhook diretamente (Postman ou curl)

---

## Mobile

### Página Quebrada no Mobile

**Viewport não configurado:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Overflow horizontal (scroll lateral):**
```css
/* Encontrar elemento causador */
* {
  outline: 1px solid red;
}

/* Depois de encontrar, corrigir */
.elemento-problema {
  max-width: 100%;
  overflow-x: hidden;
}
```

**Imagens muito grandes:**
```html
<img class="max-w-full h-auto" ...>
```

**Texto muito pequeno:**
```html
<!-- Usar tamanhos responsivos -->
<p class="text-base md:text-lg">...</p>
```

---

### Menu Mobile Não Funciona

**JavaScript não carregou:**
```bash
# Verificar console do navegador por erros
# F12 > Console
```

**IDs errados:**
```html
<!-- Verificar se IDs batem -->
<button id="mobile-menu-button">
<div id="mobile-menu">
```

```javascript
// No main.js
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
```

---

## Servidor Local

### Erro 404 no localhost

**Página não é index.html:**
```bash
# Para acessar src/sobre/index.html
# Usar: http://localhost:8888/sobre/

# NÃO: http://localhost:8888/sobre/index.html
```

**netlify dev não está rodando dist:**
```bash
# Verificar netlify.toml
[dev]
  publish = "dist"
```

**Build não foi rodado:**
```bash
npm run build
npm run dev
```

---

### Porta 8888 em Uso

```bash
# Matar processo na porta
lsof -i :8888
kill -9 [PID]

# Ou usar outra porta
netlify dev --port 3000
```

---

## Git

### Push Rejeitado

**Mudanças não commitadas:**
```bash
git add .
git commit -m "mensagem"
git push origin main
```

**Branch não existe no remote:**
```bash
git push -u origin main
```

**Conflito de histórico:**
```bash
# CUIDADO: só use se souber o que está fazendo
git pull origin main --rebase
git push origin main
```

---

### Arquivo Grande Demais

**Erro: "File exceeds GitHub's file size limit"**
```bash
# Adicionar ao .gitignore
echo "arquivo-grande.mp4" >> .gitignore

# Remover do histórico (se já commitou)
git rm --cached arquivo-grande.mp4
git commit -m "remove: arquivo grande"
```

---

## Dica Final

Quando encontrar um erro:

1. **Leia a mensagem de erro completa** — geralmente indica a solução
2. **Verifique o console do navegador** — F12 > Console
3. **Verifique os logs da Netlify** — no painel de deploys
4. **Rode build localmente** — `npm run build` para ver erros
5. **Simplifique** — remova código até encontrar o problema
