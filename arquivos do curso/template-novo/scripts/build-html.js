/**
 * Método Zero - Build Script para HTML
 * Processa todos os arquivos HTML em src/ mantendo a estrutura de pastas.
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
};

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!['css', 'js', 'fonts', 'images', 'icons'].includes(item)) {
        findHtmlFiles(fullPath, files);
      }
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function processHtmlFile(srcPath) {
  const relativePath = path.relative(SRC_DIR, srcPath);
  const distPath = path.join(DIST_DIR, relativePath);
  const distDir = path.dirname(distPath);
  
  fs.mkdirSync(distDir, { recursive: true });
  
  const html = fs.readFileSync(srcPath, 'utf-8');
  const minified = await minify(html, minifyOptions);
  
  fs.writeFileSync(distPath, minified);
  console.log(`✓ ${relativePath}`);
}

async function main() {
  console.log('🔨 Building HTML...\n');
  
  fs.mkdirSync(DIST_DIR, { recursive: true });
  
  const htmlFiles = findHtmlFiles(SRC_DIR);
  
  if (htmlFiles.length === 0) {
    console.log('Nenhum arquivo HTML encontrado em src/');
    return;
  }
  
  for (const file of htmlFiles) {
    await processHtmlFile(file);
  }
  
  console.log(`\n✅ ${htmlFiles.length} arquivo(s) HTML processado(s)`);
}

main().catch(console.error);
