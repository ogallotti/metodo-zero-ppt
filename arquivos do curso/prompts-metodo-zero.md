# PROMPTS - MÉTODO ZERO

Prompts prontos para usar em cada etapa do projeto.

---

## 1. Início de Projeto

### Criar Landing Page do Zero

```
Crie uma landing page profissional para [DESCREVER PRODUTO/SERVIÇO].

Público-alvo: [DESCREVER]
Objetivo: [CAPTURA DE LEADS / VENDAS / INSTITUCIONAL]
Tom de voz: [PROFISSIONAL / CASUAL / TÉCNICO / AMIGÁVEL]

Requisitos técnicos:
- HTML + Tailwind CSS via CLI (não CDN)
- JavaScript puro (sem frameworks)
- Fontes self-hosted .woff2 com font-display: optional
- Ícones Lucide inline SVG
- Hero impactante e animado (sem animações de ENTRADA que bloqueiem renderização)
- Animações scroll-triggered (GSAP ScrollTrigger)
- Three.js para background interativo diferenciado
- Estrutura: src/ para edição, dist/ auto-gerado
- Deploy: Netlify com npm run build

Estrutura da página:
1. Hero com headline + subheadline + CTA
2. Problema/Dor do público
3. Solução
4. Benefícios
5. Como funciona
6. Prova social
7. Para quem é
8. FAQ
9. CTA final
10. Garantia

Comece criando a estrutura de pastas e arquivos de configuração.
```

---

### Criar Projeto Vazio (Estrutura Base)

```
Crie a estrutura base de um projeto Método Zero:

1. Estrutura de pastas:
   src/
   ├── index.html
   ├── css/input.css
   ├── js/main.js
   ├── fonts/
   ├── images/
   └── icons/

2. Arquivos de configuração:
   - package.json (com scripts de build)
   - tailwind.config.js
   - netlify.toml
   - _headers

3. HTML base com:
   - Meta tags essenciais
   - Preload de fonte
   - CSS crítico inline + async
   - Scripts com defer

4. Instalar dependências:
   - tailwindcss
   - terser
   - html-minifier-terser
   - lucide-static

Não crie conteúdo ainda, apenas a estrutura pronta.
```

---

## 2. Adicionar Páginas

### Nova Página no Projeto

```
Adicione uma nova página "[NOME]" ao projeto.

URL desejada: dominio.com/[slug]/

Criar estrutura completa:
src/[slug]/
├── index.html
├── css/style.css
├── js/main.js
└── images/

A página deve seguir o mesmo padrão das existentes:
- Tailwind CSS
- Scripts com defer
- Imagens com Netlify CDN
- Meta tags para SEO

Conteúdo da página: [DESCREVER]
```

---

### Duplicar Página Existente

```
Duplique a página [ORIGEM] para criar [DESTINO].

1. Copiar estrutura: src/[origem]/ → src/[destino]/
2. Atualizar links internos
3. Atualizar meta tags (title, description)
4. Manter estrutura de assets independente

Após duplicar, liste os arquivos criados.
```

---

## 3. Conteúdo e Copy

### Gerar Copy para Seção

```
Escreva a copy para a seção "[NOME DA SEÇÃO]" da landing page.

Contexto do produto: [DESCREVER]
Público-alvo: [DESCREVER]
Tom de voz: [PROFISSIONAL / CASUAL / TÉCNICO]

A copy deve:
- Ser direta e persuasiva
- Focar em benefícios, não características
- Usar linguagem do público-alvo
- Ter headline impactante
- Incluir CTA quando apropriado

Formato de saída: HTML pronto com classes Tailwind.
```

---

### Reescrever Copy Existente

```
Reescreva a copy desta seção para ser mais [OBJETIVO]:

[COLAR COPY ATUAL]

Objetivo: [MAIS PERSUASIVA / MAIS CURTA / MAIS TÉCNICA / MAIS EMOCIONAL]

Manter:
- Estrutura HTML
- Classes Tailwind
- CTAs existentes

Mudar:
- Texto e headlines
- Tom de voz conforme objetivo
```

---

## 4. Animações

### Adicionar Animações Scroll-Triggered

```
Adicione animações scroll-triggered aos elementos da página.

Regras obrigatórias:
- GSAP + ScrollTrigger apenas
- Envolver em window.addEventListener('load', ...) com ScrollTrigger.refresh()
- Usar gsap.fromTo() (não gsap.from()) para estados determinísticos
- Usar once: true no ScrollTrigger para evitar glitches
- NUNCA usar transition-all em elementos animados (conflita com GSAP)
- Hero sem animações de ENTRADA (fade-in, opacity 0→1)

Padrão de código:
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  
  gsap.fromTo('.elemento',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: '.elemento',
        start: 'top 85%',
        once: true,
      },
    }
  );
});

Elementos para animar:
- Cards: fade-up com stagger
- Títulos de seção: fade-in
- Imagens: reveal lateral

Mostrar código JS completo.
```

---

### Corrigir Animações Problemáticas

```
Analise as animações desta página e corrija problemas.

Verificar:
1. Usando gsap.from() ao invés de gsap.fromTo()? → Trocar para fromTo
2. Animações fora do window load? → Mover para dentro
3. Faltando ScrollTrigger.refresh()? → Adicionar
4. Faltando once: true? → Adicionar
5. Usando transition-all em elementos animados? → Trocar para transition-colors
6. Elementos ficam invisíveis? → Verificar estados inicial/final

Mostrar o que foi alterado e por quê.
```

---

## 5. Componentes

### Criar FAQ Accordion

```
Crie um componente de FAQ accordion.

Requisitos:
- HTML semântico (details/summary)
- Tailwind CSS para estilização
- Acessível (keyboard navigation)
- Animação suave de abertura/fechamento

Perguntas:
1. [PERGUNTA 1]
2. [PERGUNTA 2]
3. [PERGUNTA 3]

Entregar HTML completo.
```

---

### Criar Depoimentos

```
Crie uma seção de depoimentos/testimonials.

Formato: [CARDS / CAROUSEL / GRID]

Dados de cada depoimento:
- Foto (placeholder)
- Nome
- Cargo/Empresa
- Texto do depoimento
- Estrelas (opcional)

Requisitos:
- Responsivo (mobile-first)
- Imagens com lazy loading
- Sem dependências externas

Depoimentos:
[LISTAR DEPOIMENTOS]
```

---

### Criar Formulário

```
Crie um formulário de [CONTATO / CAPTURA DE LEADS].

Campos:
- Nome (obrigatório)
- Email (obrigatório)
- [OUTROS CAMPOS]

Requisitos:
- HTML5 validation
- Estilização Tailwind
- Estados de focus visíveis
- Botão com loading state
- Configurado para Netlify Forms

Não usar JavaScript para validação básica.
```

---

## 6. Otimização

### Otimização Completa

```
Analise esta página para otimização de performance.

Verifique e corrija:

1. HERO
   - Remover animações de ENTRADA (fade-in, reveal, opacity 0→1)
   - Hero deve renderizar instantaneamente com conteúdo visível
   - Animações APÓS renderização são permitidas (hover, parallax, Three.js)
   - Animações abaixo da dobra: scroll-triggered

2. FONTES
   - Self-hosted .woff2 (não Google Fonts CDN)
   - font-display: optional (não swap)
   - Preload da fonte principal no <head>

3. IMAGENS
   - Usar Netlify Image CDN: /.netlify/images?url=/path&w=WIDTH&q=95
   - TODAS com width e height explícitos
   - Hero: loading="eager" + fetchpriority="high"
   - Demais: loading="lazy"

4. CSS
   - Tailwind via CLI com purge (não CDN)
   - CSS crítico inline no <head>
   - Resto do CSS carregado async

5. SCRIPTS
   - Todos com defer
   - GSAP só scroll-triggered
   - Zero CDN externo

Execute as correções necessárias e liste o que foi alterado.
```

---

### Diagnóstico de CLS

```
O site está com CLS alto (mudança de layout).

Analise a página e identifique as causas:

Verificar:
1. Animações de ENTRADA no hero (fade, reveal, typing que atrasam exibição)
2. font-display: swap nas fontes
3. Imagens sem width/height
4. Conteúdo carregado dinamicamente sem espaço reservado

Para cada problema encontrado:
- Mostrar onde está
- Explicar por que causa CLS
- Corrigir

Após correções, testar novamente.
```

---

### Diagnóstico de LCP

```
O site está com LCP lento (demora para carregar conteúdo principal).

Analise a página e identifique as causas:

Verificar:
1. Imagem do hero muito grande ou não otimizada
2. Fonte bloqueando renderização
3. CSS bloqueante (não inline)
4. CDNs externos lentos

Para cada problema encontrado:
- Mostrar onde está
- Explicar por que causa LCP lento
- Corrigir
```

---

## 7. Troubleshooting

### Build Falhando

```
O build está falhando com o seguinte erro:

[COLAR ERRO]

Diagnostique o problema e corrija.

Verificar:
- package.json está correto?
- Dependências instaladas?
- Caminhos de arquivos corretos?
- Sintaxe de scripts válida?
```

---

### Página Quebrada no Mobile

```
A página está quebrada no mobile.

Problemas relatados:
[DESCREVER PROBLEMAS]

Verificar:
- Meta viewport presente?
- Classes Tailwind responsivas corretas?
- Imagens com max-width?
- Overflow horizontal?
- Tamanho de fonte legível?

Corrigir os problemas mantendo o desktop funcionando.
```

---

### Deploy Falhando

```
O deploy na Netlify está falhando.

Log de erro:
[COLAR LOG]

Verificar:
- netlify.toml configurado corretamente?
- Build command correto?
- Publish directory correto?
- Dependências no package.json?
- Node version compatível?

Diagnosticar e corrigir.
```

---

### Tailwind Não Aplica Classes

```
As classes do Tailwind não estão sendo aplicadas.

Verificar:
- tailwind.config.js com content correto?
- npm run build está rodando sem erro?
- Classe existe no Tailwind?
- CSS está linkado corretamente no HTML?

Diagnosticar e corrigir.
```

---

### GSAP Não Anima

```
As animações GSAP não estão funcionando.

Verificar:
- ScrollTrigger está registrado?
- Scripts carregando na ordem correta?
- Seletores existem no DOM?
- Console mostra algum erro?

Diagnosticar e corrigir.
```

---

### Imagem Netlify CDN Retorna 404

```
As imagens não estão carregando com Netlify CDN.

Verificar:
- Caminho no url= está correto (absoluto)?
- Arquivo existe em src/images/?
- Build copiou para dist/images/?
- Sintaxe do CDN está correta?

Diagnosticar e corrigir.
```

---

## 8. Deploy

### Preparar para Produção

```
Prepare o projeto para deploy em produção.

Checklist:
1. [ ] npm run build executa sem erros
2. [ ] Todos os assets em dist/
3. [ ] Links internos funcionando
4. [ ] Meta tags preenchidas (title, description, OG)
5. [ ] Favicon configurado
6. [ ] _headers com cache correto
7. [ ] netlify.toml configurado
8. [ ] Testar em netlify dev localmente

Executar build e listar qualquer problema encontrado.
```

---

## Como Usar Estes Prompts

1. **Copie o prompt** relevante para sua tarefa
2. **Substitua os placeholders** [ENTRE COLCHETES] com suas informações
3. **Cole no chat** com o agente
4. **Itere** se necessário com prompts de follow-up

**Dica:** Combine prompts quando fizer sentido. Ex: Criar página + Adicionar animações + Otimizar.
