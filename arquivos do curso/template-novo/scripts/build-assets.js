/**
 * Método Zero - Build Script para Assets
 * Copia fonts, images, icons, js para dist/
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const ROOT_DIR = path.join(__dirname, '..');

// Pastas para copiar
const ASSET_FOLDERS = ['fonts', 'images', 'icons', 'js'];

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  
  fs.mkdirSync(dest, { recursive: true });
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Ignorar READMEs
      if (item === 'README.md') continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.copyFileSync(src, dest);
}

async function main() {
  console.log('📦 Copying assets...\n');
  
  fs.mkdirSync(DIST_DIR, { recursive: true });
  
  // Copiar pastas de assets
  for (const folder of ASSET_FOLDERS) {
    const src = path.join(SRC_DIR, folder);
    const dest = path.join(DIST_DIR, folder);
    
    if (fs.existsSync(src)) {
      copyDir(src, dest);
      console.log(`✓ ${folder}/`);
    }
  }
  
  // Copiar _headers
  const headersFile = path.join(ROOT_DIR, '_headers');
  if (fs.existsSync(headersFile)) {
    copyFile(headersFile, path.join(DIST_DIR, '_headers'));
    console.log('✓ _headers');
  }
  
  console.log('\n✅ Assets copiados');
}

main().catch(console.error);
