# RULES - MÉTODO ZERO

Regras e referências para desenvolvimento. Copie para as Rules do Antigravity.

---

## IDIOMA

Comunicação com o usuário sempre em português do Brasil.

---

## AUTONOMIA

Você é o desenvolvedor. Use o terminal para tudo que puder fazer sozinho. Pergunte ao usuário apenas para decisões criativas ou aprovação.

---

## STACK OBRIGATÓRIA

- HTML5 semântico
- Tailwind CSS via CLI (nunca CDN)
- JavaScript puro (nunca React, Vue, Angular, jQuery)
- GSAP + ScrollTrigger para animações
- Three.js para efeitos 3D
- Fontes self-hosted .woff2
- Ícones Lucide SVG

---

## ZERO CDN EXTERNO

Nunca usar CDNs externos. Tudo self-hosted em `src/`.

---

## ESTRUTURA DO PROJETO

```
src/           ← Editar aqui
dist/          ← Auto-gerado (nunca editar)
inserir/       ← Imagens do usuário
copy.md        ← Copy da página
```

---

## ARQUIVOS DE CONTEXTO

Em nova conversa, leia estes arquivos para entender o projeto:
- `copy.md` — Conteúdo e objetivo da página
- `INSTRUCTIONS.md` — Fluxo completo e detalhes técnicos

---

## COMANDOS ESSENCIAIS

```bash
# Servidor local (manter rodando sempre)
npm run dev

# Build para produção
npm run build

# Primeiro push (criar repo)
gh auth login
gh repo create NOME --private --source=. --push

# Push subsequente (só quando usuário pedir)
git add .
git commit -m "mensagem"
git push origin main
```

---

## FONTES

Local: `src/fonts/`

```css
/* src/css/input.css */
@font-face {
  font-family: 'NomeFonte';
  src: url('/fonts/arquivo.woff2') format('woff2');
  font-weight: 100 900;
  font-display: optional;
}
```

```html
<!-- Preload no <head> -->
<link rel="preload" href="/fonts/arquivo.woff2" as="font" type="font/woff2" crossorigin>
```

```js
// tailwind.config.js → theme.extend
fontFamily: {
  sans: ['NomeFonte', 'system-ui', 'sans-serif'],
}
```

---

## IMAGENS

```bash
# Copiar da pasta do usuário
cp inserir/foto.jpg src/images/
```

```html
<!-- Sempre usar Netlify CDN -->
<img 
  src="/.netlify/images?url=/images/foto.jpg&w=800&q=95"
  width="800" 
  height="600"
  alt="Descrição"
  loading="lazy"
>

<!-- Hero: eager + fetchpriority -->
<img 
  src="/.netlify/images?url=/images/hero.jpg&w=1200&q=95"
  width="1200" 
  height="800"
  loading="eager"
  fetchpriority="high"
>
```

---

## ÍCONES

```bash
# Listar disponíveis
ls node_modules/lucide-static/icons/

# Copiar para o projeto
cp node_modules/lucide-static/icons/nome.svg src/icons/
```

```html
<img src="/icons/nome.svg" alt="" class="w-6 h-6">
```

---

## SCRIPTS

Ordem no HTML (todos com defer):
```html
<script src="/js/gsap.min.js" defer></script>
<script src="/js/ScrollTrigger.min.js" defer></script>
<script src="/js/three.min.js" defer></script>  <!-- se usar -->
<script src="/js/main.js" defer></script>
```

---

## ANIMAÇÕES GSAP

### Padrão Obrigatório

```js
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  
  // Usar fromTo (não from) para evitar bugs de visibilidade
  gsap.fromTo('.elemento',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.elemento',
        start: 'top 85%',
        once: true,  // Evita glitches
      },
    }
  );
});
```

### ⚠️ Nunca usar `transition-all` em elementos animados pelo GSAP

```html
<!-- ❌ CONFLITO -->
<div class="transition-all ...">

<!-- ✅ CORRETO -->
<div class="transition-colors ...">
```

---

## INICIALIZAÇÃO DE PROJETO NOVO

```bash
npm install

# Copiar vendors para src/js/
cp node_modules/gsap/dist/gsap.min.js src/js/
cp node_modules/gsap/dist/ScrollTrigger.min.js src/js/
cp node_modules/three/build/three.min.js src/js/  # se usar

npm run dev
```

O `npm run dev` automaticamente roda o build antes de iniciar o servidor.

---

## GIT

Push apenas quando o usuário solicitar (consome créditos Netlify).

---

## SERVIDOR LOCAL

Manter `npm run dev` rodando sempre. URL: `localhost:8888`
